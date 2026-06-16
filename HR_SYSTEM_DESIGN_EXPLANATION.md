# BMG Interiors CRM - 5 to 10 Minute System Design Explanation

Use this as a speaking script for HR or a non-deep technical interviewer. The goal is to explain the project clearly, professionally, and confidently.

## 30-Second Introduction

This project is a CRM system for BMG Interiors, an interior design and project execution company. The CRM helps the business manage projects, tasks, workers, attendance, documents, reports, and customer access from one web dashboard.

The system is built with Next.js for the frontend and Supabase for authentication, database, and authorization. It supports role-based access, so admins can manage the complete CRM while customers can only see their own project-related information.

## 1-Minute Overview

At a high level, the system has three main parts:

1. The user interface built in Next.js.
2. Supabase Auth for login, signup, and session management.
3. Supabase Postgres with Row Level Security for secure data storage and role-based access.

The frontend is responsible for pages, navigation, dashboards, forms, and user experience. Supabase is responsible for identity, database storage, and permission enforcement.

The most important design decision is that authorization is not only handled in the frontend. The frontend hides restricted screens, but the real security is enforced at the database level using Supabase Row Level Security policies.

## Main Architecture Explanation

The user opens the CRM in the browser. The request goes to the Next.js application. Next.js renders the CRM pages and uses a proxy file to keep Supabase sessions refreshed.

When the user logs in, Supabase Auth validates the credentials. After that, the app loads the user's profile from the `profiles` table. That profile contains the user's effective role, either `ADMIN` or `CUSTOMER`.

Based on the role:

- Admins can access the full CRM.
- Customers get restricted access and can only see customer-safe project information.

All CRM data such as projects, tasks, workers, attendance, and documents is stored in Supabase Postgres.

## Authentication Flow

The authentication flow works like this:

1. The user opens the CRM.
2. If there is no active session, the login screen is shown.
3. The user can either sign in or sign up.
4. On sign in, Supabase checks the email and password.
5. If the credentials are correct, the app loads the user's profile.
6. The profile tells the app whether the user is an admin or customer.
7. The dashboard then renders based on the role.

For signup, the user enters full name, email, password, and requested role. But the system does not automatically grant admin access from public signup. If someone requests admin access, it is stored as a requested role, but the actual effective role remains controlled securely in the profile table.

That is important because public signup should never allow someone to make themselves an admin.

## Role-Based Access

There are two main roles:

- `ADMIN`
- `CUSTOMER`

Admin users can manage projects, tasks, workers, attendance, documents, reports, and settings.

Customer users have restricted access. They can only see information related to their own assigned projects.

This role-based access is enforced in two layers:

1. Frontend layer: the sidebar and pages hide restricted options.
2. Database layer: Supabase Row Level Security blocks unauthorized queries.

The database layer is the real source of security. Even if someone tries to bypass the UI, the database policies still protect the data.

## Database Design

The main database tables are:

- `profiles` for user profile and role information.
- `projects` for project records.
- `tasks` for project tasks.
- `workers` for worker details.
- `attendance` for daily attendance records.
- `documents` for project document metadata.

The `profiles` table is connected to Supabase Auth users. When a new auth user is created, a database trigger automatically creates a matching profile row.

The `projects` table can be linked to a customer profile. This lets the system decide which customer can see which projects.

Tasks, documents, and attendance records are scoped through the project information.

## Data Flow

The data flow is simple:

1. A page loads in the CRM.
2. The page calls a helper function from `crmData.ts`.
3. That helper function sends a typed Supabase query.
4. Supabase checks the logged-in user's role and RLS policies.
5. If allowed, Supabase returns the data.
6. The UI renders the data.

For example, on the Projects page:

The page calls `listProjects()`. Supabase checks whether the user is admin or whether the customer is assigned to that project. Then it returns only the records the user is allowed to see.

For create, update, and delete operations, only admins are allowed by the database policies.

## Why Supabase Was Chosen

Supabase was used because it gives several production-ready features quickly:

- Authentication
- Postgres database
- Row Level Security
- Session handling
- SQL migrations
- Realtime and storage support for future expansion

This allowed the CRM to focus on business features while still having a secure backend foundation.

## Security Design

The most important security points are:

- No service role key is used in browser code.
- Public signup cannot grant admin access directly.
- Effective role is stored in the secured `profiles.role` field.
- RLS policies protect the database.
- Frontend route restrictions are only for user experience, not the main security layer.
- Environment variables are used for Supabase configuration.

This makes the system safer because sensitive permissions are not trusted from the client side.

## Scalability and Maintainability

The system is scalable because Next.js can run as a stateless web application. User sessions are stored through Supabase cookies and tokens, not server memory. That means the app can be deployed on modern hosting platforms and scaled horizontally.

The code is maintainable because responsibilities are separated:

- UI components handle presentation.
- `AuthContext` handles authentication state.
- `crmData.ts` handles database operations.
- Supabase migrations handle database schema and policies.
- Documentation explains architecture, flows, and deployment.

If a new module is added in the future, for example invoices, the same pattern can be followed: create a table, add RLS policies, add typed data helpers, and build the UI page.

## Future Improvements

The future improvements I would add are:

- A proper admin approval screen for users who request admin access.
- Real file uploads using Supabase Storage.
- Audit logs for create, update, and delete actions.
- Better modals and form validation instead of prompt-based actions.
- Automated tests for admin and customer flows.
- Server actions or API routes for workflows that need trusted backend logic.

## 5-Minute Speaking Version

If I have to explain this project in around five minutes, I would say:

This CRM is built for BMG Interiors to manage interior design operations. It includes project tracking, task management, workers, attendance, documents, reports, and customer access.

The architecture is based on Next.js and Supabase. Next.js handles the frontend, routing, pages, and user interface. Supabase handles authentication, the Postgres database, sessions, and authorization through Row Level Security.

When a user opens the CRM, the app checks whether there is an active Supabase session. If there is no session, the login or signup screen is shown. Users can sign in with email and password. They can also sign up and request a role.

The system supports two roles: admin and customer. Admin users can manage the full CRM. Customer users can only see project-related information assigned to them.

One important security decision is that public signup cannot directly create an admin account. The user can request admin access, but the actual effective role is controlled in the secured profile table. This prevents a user from making themselves admin from the frontend.

After login, the app loads the user's profile from the `profiles` table. That profile contains the effective role. Based on that role, the frontend shows the correct navigation and pages.

But the frontend is not the only security layer. The real authorization is handled in Supabase Row Level Security. So even if someone bypasses the frontend, the database will only return records they are allowed to access.

The main tables are profiles, projects, tasks, workers, attendance, and documents. Profiles are linked with Supabase Auth users. Projects can be assigned to customers, and customer access is based on that assignment.

For data flow, each page calls helper functions from `crmData.ts`. These helpers send Supabase queries. Supabase checks RLS policies and returns only allowed data. Admins can create, update, and delete records, while customers mainly have read access to assigned project data.

This design is maintainable because responsibilities are clearly separated. UI components manage presentation, AuthContext manages login and signup state, crmData manages database queries, and Supabase migrations manage schema and security policies.

For future improvements, I would add admin approval workflows, real file uploads with Supabase Storage, audit logs, automated tests, and stronger form validation.

Overall, this system is designed to be secure, scalable, and easy to extend for a production CRM.

## Short HR-Friendly Summary

This is a role-based CRM for an interior design company. The frontend is built with Next.js, and Supabase is used for authentication, database, and authorization. Admins can manage the full system, while customers can only access their own project data. The most important part of the design is that permissions are enforced at the database level with Row Level Security, not only in the UI.

## Possible HR Questions and Answers

### What problem does this project solve?

It centralizes project, task, worker, attendance, document, and customer management for an interior design business.

### What technologies did you use?

Next.js for the frontend and Supabase for authentication, Postgres database, session handling, and authorization.

### How did you handle security?

I used role-based access and Supabase Row Level Security. Admin and customer access is enforced at the database level.

### Why is public admin signup not allowed?

Because it would be a security risk. Users can request admin access, but actual admin permission must be approved securely.

### How is the project scalable?

The Next.js app is stateless and Supabase manages auth and database services, so it can scale without relying on server memory.

### What would you improve next?

I would add admin approval workflows, Supabase Storage for file uploads, audit logging, and automated tests.

