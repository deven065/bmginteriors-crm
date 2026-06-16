create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text not null,
  role text not null default 'CUSTOMER' check (role in ('ADMIN', 'CUSTOMER')),
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id bigint generated always as identity primary key,
  name text not null,
  type text not null default 'Residential',
  location text not null default 'Mumbai',
  status text not null default 'Planning',
  percentage integer not null default 0 check (percentage between 0 and 100),
  date text,
  tasks_completed integer not null default 0,
  total_tasks integer not null default 0,
  avatar_seed text,
  client_user_id uuid references public.profiles(id) on delete set null,
  client_name text,
  start_date date,
  deadline date,
  budget numeric(14,2) default 0,
  spent numeric(14,2) default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id bigint generated always as identity primary key,
  title text not null,
  subtitle text,
  project_id bigint references public.projects(id) on delete set null,
  project_name text,
  assigned_to text,
  due_date date,
  status text not null default 'Pending',
  priority text not null default 'MEDIUM',
  progress integer not null default 0 check (progress between 0 and 100),
  days_remaining integer,
  type text,
  location text,
  assignee_role text,
  avatar_seed text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workers (
  id bigint generated always as identity primary key,
  name text not null,
  emp_id text unique,
  role text not null,
  phone text,
  email text,
  site text,
  joined_date date,
  status text not null default 'Active',
  avatar_seed text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.attendance (
  id bigint generated always as identity primary key,
  worker_id bigint references public.workers(id) on delete set null,
  worker_name text not null,
  role text,
  project text,
  check_in text,
  check_out text,
  work_date date not null default current_date,
  status text not null default 'Present',
  avatar_seed text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id bigint generated always as identity primary key,
  name text not null,
  project text,
  category text,
  type text,
  file_type text,
  size text,
  uploaded_by text,
  uploaded_role text,
  uploaded_date timestamptz default now(),
  url text,
  avatar_seed text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists touch_profiles_updated_at on public.profiles;
create trigger touch_profiles_updated_at before update on public.profiles
for each row execute function public.touch_updated_at();

drop trigger if exists touch_projects_updated_at on public.projects;
create trigger touch_projects_updated_at before update on public.projects
for each row execute function public.touch_updated_at();

drop trigger if exists touch_tasks_updated_at on public.tasks;
create trigger touch_tasks_updated_at before update on public.tasks
for each row execute function public.touch_updated_at();

drop trigger if exists touch_workers_updated_at on public.workers;
create trigger touch_workers_updated_at before update on public.workers
for each row execute function public.touch_updated_at();

drop trigger if exists touch_attendance_updated_at on public.attendance;
create trigger touch_attendance_updated_at before update on public.attendance
for each row execute function public.touch_updated_at();

drop trigger if exists touch_documents_updated_at on public.documents;
create trigger touch_documents_updated_at before update on public.documents
for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_app_meta_data ->> 'role', new.raw_user_meta_data ->> 'role', 'CUSTOMER')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'ADMIN'
  );
$$;

create or replace function public.current_profile_name()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select full_name from public.profiles where id = auth.uid();
$$;

create or replace function public.current_profile_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.can_view_project(project_client_user_id uuid, project_client_name text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_admin()
    or project_client_user_id = auth.uid()
    or lower(coalesce(project_client_name, '')) = lower(coalesce(public.current_profile_name(), ''));
$$;

create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_projects_client_user_id on public.projects(client_user_id);
create index if not exists idx_projects_client_name on public.projects(lower(client_name));
create index if not exists idx_tasks_project_name on public.tasks(lower(project_name));
create index if not exists idx_documents_project on public.documents(lower(project));
create index if not exists idx_attendance_project on public.attendance(lower(project));

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.workers enable row level security;
alter table public.attendance enable row level security;
alter table public.documents enable row level security;

drop policy if exists "profiles are readable by owner or admin" on public.profiles;
create policy "profiles are readable by owner or admin"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id or (select public.is_admin()));

drop policy if exists "admins manage profiles" on public.profiles;
create policy "admins manage profiles"
on public.profiles for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "users update own basic profile" on public.profiles;
create policy "users update own basic profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id and role = public.current_profile_role());

drop policy if exists "assigned users read projects" on public.projects;
create policy "assigned users read projects"
on public.projects for select
to authenticated
using (public.can_view_project(client_user_id, client_name));

drop policy if exists "admins manage projects" on public.projects;
create policy "admins manage projects"
on public.projects for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "assigned users read project tasks" on public.tasks;
create policy "assigned users read project tasks"
on public.tasks for select
to authenticated
using (
  (select public.is_admin()) or exists (
    select 1 from public.projects p
    where lower(p.name) = lower(coalesce(tasks.project_name, ''))
      and public.can_view_project(p.client_user_id, p.client_name)
  )
);

drop policy if exists "admins manage tasks" on public.tasks;
create policy "admins manage tasks"
on public.tasks for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "admins read workers" on public.workers;
create policy "admins read workers"
on public.workers for select
to authenticated
using ((select public.is_admin()));

drop policy if exists "admins manage workers" on public.workers;
create policy "admins manage workers"
on public.workers for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "assigned users read documents" on public.documents;
create policy "assigned users read documents"
on public.documents for select
to authenticated
using (
  (select public.is_admin()) or exists (
    select 1 from public.projects p
    where lower(p.name) = lower(coalesce(documents.project, ''))
      and public.can_view_project(p.client_user_id, p.client_name)
  )
);

drop policy if exists "admins manage documents" on public.documents;
create policy "admins manage documents"
on public.documents for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "assigned users read attendance" on public.attendance;
create policy "assigned users read attendance"
on public.attendance for select
to authenticated
using (
  (select public.is_admin()) or exists (
    select 1 from public.projects p
    where lower(p.name) = lower(coalesce(attendance.project, ''))
      and public.can_view_project(p.client_user_id, p.client_name)
  )
);

drop policy if exists "admins manage attendance" on public.attendance;
create policy "admins manage attendance"
on public.attendance for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.projects to authenticated;
grant select, insert, update, delete on public.tasks to authenticated;
grant select, insert, update, delete on public.workers to authenticated;
grant select, insert, update, delete on public.attendance to authenticated;
grant select, insert, update, delete on public.documents to authenticated;
grant usage, select on all sequences in schema public to authenticated;
