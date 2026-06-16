# BMG Interiors CRM

Production-oriented CRM for BMG Interiors, built with a Next.js App Router frontend and Supabase authentication, authorization, and database storage.

For the full developer architecture, auth flow, data/API flows, database model, and production checklist, read `PROJECT_SYSTEM_DESIGN.md`.

## Local Development

Install frontend dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Frontend Environment

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-or-anon-key
NEXT_PUBLIC_AUTH_EMAIL_DOMAIN=bmginteriors.com
NEXT_PUBLIC_ENABLE_DEMO_ACCESS=false
```

Set `NEXT_PUBLIC_ENABLE_DEMO_ACCESS=true` only for local demo environments where seeded credentials should appear on the login screen.

## Supabase Setup

Create a Supabase project, then run the schema in `supabase/migrations/0001_crm_schema.sql` using the Supabase SQL editor or CLI. The migration creates CRM tables, profile creation triggers, and row-level security policies.

Authentication uses Supabase email/password. Users can sign in with a full email address, or with a username that maps to `username@NEXT_PUBLIC_AUTH_EMAIL_DOMAIN`. Create an admin user such as `admin@bmginteriors.com` and set its app metadata role to `ADMIN`; customer users should use role `CUSTOMER`.

Authorization is enforced by Supabase RLS. Admins can manage CRM records, while customers can read projects, tasks, documents, and attendance associated with their profile.

## Legacy Backend Environment

The Spring Boot backend is still available for deployments that need it, but the frontend CRM now reads and writes through Supabase.

The backend reads deploy-time settings from environment variables:

```bash
DATABASE_URL=jdbc:postgresql://localhost:5432/crm
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
JPA_DDL_AUTO=update
JPA_SHOW_SQL=false
PORT=8080
CORS_ALLOWED_ORIGINS=http://localhost:3000
JWT_SECRET=replace-with-a-long-random-secret-at-least-32-characters
JWT_EXPIRATION_MS=86400000
SEED_DEMO_DATA=true
```

For production, use a managed PostgreSQL database, set `JPA_DDL_AUTO=validate` after migrations are established, set `SEED_DEMO_DATA=false`, and replace `JWT_SECRET` with a strong private value.

## Verification

```bash
npm run lint
npm run build
```
