# BMG Interiors CRM - System Design and Developer Guide

## 1. Product Scope

BMG Interiors CRM is an internal and client-facing project operations system for interior design delivery. It supports dashboards, project tracking, task management, worker management, attendance, documents, reports, settings, and role-based customer access.

The current production path uses:

- Next.js App Router for the frontend.
- Supabase Auth for identity and session management.
- Supabase Postgres for CRM data.
- Supabase Row Level Security for authorization.
- Next.js Proxy for Supabase session refresh.
- A legacy Spring Boot backend retained in the repository for compatibility and future migration needs.

## 2. High-Level Architecture

```text
Browser
  |
  | Next.js client components
  v
Next.js App Router
  |
  | proxy.ts refreshes Supabase auth cookies
  v
Supabase Auth <----> Supabase Postgres
                       |
                       | RLS policies
                       v
                 CRM tables
```

Primary application routes:

- `/` - Executive dashboard.
- `/projects` - Project register and customer-scoped project view.
- `/tasks` - Task management.
- `/workers` - Workforce directory.
- `/attendance` - Daily attendance and calendar widgets.
- `/documents` - Project document metadata.
- `/reports` - Analytics and reporting.
- `/settings` - Local settings and role configuration UI.

## 3. Key Files

- `app/context/AuthContext.tsx` - Client auth state, login, signup, logout, profile loading.
- `app/components/LoginView.tsx` - Sign in and sign up UI with requested role selection.
- `app/components/DashboardShell.tsx` - Auth gate and customer route restrictions.
- `app/lib/supabase.ts` - Browser Supabase singleton wrapper used by CRM data functions.
- `app/lib/crmData.ts` - Typed data access functions for projects, tasks, workers, attendance, and documents.
- `app/lib/supabaseTypes.ts` - Local Supabase database type map.
- `utils/supabase/client.ts` - Supabase SSR browser client helper.
- `utils/supabase/server.ts` - Supabase SSR server client helper.
- `utils/supabase/middleware.ts` - Session refresh helper used by Next proxy.
- `proxy.ts` - Next.js 16 Proxy entrypoint for refreshing Supabase sessions.
- `supabase/migrations/0001_crm_schema.sql` - Database schema, triggers, grants, indexes, and RLS policies.
- `.env.local` - Local Supabase project credentials.
- `.env.example` - Environment variable template.

## 4. Authentication Flow

### Sign In

1. User opens the CRM.
2. `DashboardShell` checks `AuthContext`.
3. If no session exists, `LoginView` is shown.
4. User signs in with username or email and password.
5. `AuthContext.login()` maps usernames to `username@NEXT_PUBLIC_AUTH_EMAIL_DOMAIN`.
6. Supabase Auth validates credentials.
7. `AuthContext.loadProfile()` reads the user's `profiles` row.
8. The app stores the effective role in memory and renders authorized routes.

### Sign Up

1. User switches to Sign Up in `LoginView`.
2. User enters full name, email, password, and requested access role.
3. `AuthContext.signUp()` calls Supabase Auth with user metadata:
   - `full_name`
   - `username`
   - `requested_role`
4. Supabase creates an auth user.
5. The database trigger `handle_new_user()` creates a row in `public.profiles`.
6. The effective role defaults to `CUSTOMER` unless trusted app metadata sets `role`.
7. If Supabase email confirmation is enabled, the user confirms email before signing in.

Important security decision:

- Public signup records requested roles but does not automatically grant admin power.
- Effective authorization uses `profiles.role`.
- Admin access should be granted by an existing admin or by setting trusted Supabase app metadata.

## 5. Role-Based Access Model

Supported effective roles:

- `ADMIN`
- `CUSTOMER`

Profile fields:

- `role` - Effective authorization role used by RLS and frontend gates.
- `requested_role` - Role requested during signup. This is informational and does not grant access by itself.

Frontend access:

- Admins can access the full CRM navigation.
- Customers are limited by `DashboardShell` and `Sidebar` to customer-safe sections.
- Project actions are hidden for customers in `app/projects/page.tsx`.

Database access:

- RLS policies enforce admin/customer separation in Supabase.
- Admins can manage CRM records.
- Customers can read records connected to their assigned project/customer profile.

## 6. Database Schema

Tables created by `supabase/migrations/0001_crm_schema.sql`:

- `profiles` - User profile, effective role, requested role, identity metadata.
- `projects` - Project records, client assignment, dates, budgets, progress.
- `tasks` - Task records linked by project name/project id.
- `workers` - Workforce directory.
- `attendance` - Daily worker attendance.
- `documents` - Document metadata and optional URL.

Supporting database objects:

- `touch_updated_at()` trigger keeps `updated_at` fresh.
- `handle_new_user()` creates `profiles` rows after Supabase Auth user creation.
- `is_admin()` centralizes admin checks.
- `current_profile_name()` supports customer/project matching.
- `current_profile_role()` avoids recursive profile RLS checks.
- `can_view_project()` centralizes project visibility logic.

## 7. Data/API Flows

This app does not currently expose custom Next API routes for CRM data. The frontend uses typed Supabase client calls through `app/lib/crmData.ts`.

### Projects

Read:

```text
Projects page -> listProjects() -> Supabase projects select -> RLS -> UI table
```

Create/update/delete:

```text
Admin action -> saveProject()/deleteProject() -> Supabase mutation -> RLS admin policy
```

Customer read:

```text
Customer session -> listProjects() -> RLS can_view_project() -> assigned records only
```

### Tasks

```text
Tasks page -> listTasks()/createTask()/updateTask()/deleteTask()
          -> Supabase tasks table
          -> RLS allows admin mutations and customer reads for assigned projects
```

### Workers

```text
Workers page -> listWorkers()/createWorker()/updateWorker()/deleteWorker()
            -> Supabase workers table
            -> Admin-only RLS
```

### Attendance

```text
Attendance page -> listAttendance()/updateAttendance()/deleteAttendance()
                -> Supabase attendance table
                -> Admin mutations, customer reads by assigned project
```

### Documents

```text
Documents page -> listDocuments()/createDocument()/updateDocument()/deleteDocument()
               -> Supabase documents table
               -> Admin mutations, customer reads by assigned project
```

## 8. Session Refresh Flow

Next.js 16 uses `proxy.ts` instead of the older `middleware.ts` naming.

```text
Incoming request
  -> proxy.ts
  -> updateSession(request)
  -> Supabase server client reads auth cookies
  -> supabase.auth.getUser()
  -> refreshed cookies written to response
  -> route renders
```

The matcher skips static/image assets to avoid unnecessary auth work.

## 9. Environment Variables

Required frontend variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_AUTH_EMAIL_DOMAIN=bmginteriors.com
NEXT_PUBLIC_ENABLE_DEMO_ACCESS=false
```

Local `.env.local` contains the active Supabase project credentials. `.env.local` is ignored by git.

## 10. Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Run verification:

```bash
npm run lint
npm run build
npm audit
```

Legacy backend verification:

```bash
cd backend
mvn test
```

## 11. Production Deployment Checklist

1. Create or verify Supabase project.
2. Run `supabase/migrations/0001_crm_schema.sql`.
3. Confirm RLS is enabled on all CRM tables.
4. Create the first admin user using Supabase dashboard or trusted SQL/app metadata.
5. Set production environment variables in the hosting platform.
6. Keep `NEXT_PUBLIC_ENABLE_DEMO_ACCESS=false`.
7. Run `npm run build`.
8. Deploy with `next start` or a compatible Next.js host.
9. Verify admin login, customer login, customer route restrictions, and RLS-protected reads.

## 12. Creating the First Admin

Recommended production approach:

1. Create the user in Supabase Auth.
2. Set trusted app metadata:

```json
{
  "role": "ADMIN"
}
```

3. Ensure the `profiles.role` value is `ADMIN`.

Manual SQL option:

```sql
update public.profiles
set role = 'ADMIN'
where id = '<auth-user-uuid>';
```

Do not rely on public signup metadata to grant admin access.

## 13. Security Notes

- Supabase RLS is the source of truth for authorization.
- Frontend route hiding is for usability, not security.
- Admin self-signup is intentionally not automatic.
- Keep `.env.local` out of git.
- Use Supabase Auth email confirmation for public signup.
- Use strong password policies in Supabase Auth settings.
- Review RLS policies before adding new tables.
- Avoid service role keys in browser code.

## 14. Known Gaps and Future Improvements

- Replace prompt-based create/edit actions with full modals and validation.
- Add an admin approval screen for `profiles.requested_role = 'ADMIN'`.
- Add audit log tables for mutations.
- Add Supabase Storage integration for actual document uploads.
- Add typed Supabase generation from the live schema instead of maintaining local types manually.
- Add automated browser tests for role routing and CRUD flows.
- Add server actions or route handlers for workflows that need trusted server-side logic.

