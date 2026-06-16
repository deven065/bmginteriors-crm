create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text not null,
  role text not null default 'CUSTOMER' check (role in ('ADMIN', 'CUSTOMER')),
  requested_role text not null default 'CUSTOMER' check (requested_role in ('ADMIN', 'CUSTOMER')),
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
add column if not exists requested_role text not null default 'CUSTOMER';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_requested_role_check'
  ) then
    alter table public.profiles
    add constraint profiles_requested_role_check check (requested_role in ('ADMIN', 'CUSTOMER'));
  end if;
end $$;

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
  insert into public.profiles (id, username, full_name, role, requested_role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    case
      when new.raw_app_meta_data ->> 'role' in ('ADMIN', 'CUSTOMER') then new.raw_app_meta_data ->> 'role'
      when new.raw_user_meta_data ->> 'requested_role' in ('ADMIN', 'CUSTOMER') then new.raw_user_meta_data ->> 'requested_role'
      else 'CUSTOMER'
    end,
    case
      when new.raw_user_meta_data ->> 'requested_role' in ('ADMIN', 'CUSTOMER') then new.raw_user_meta_data ->> 'requested_role'
      else 'CUSTOMER'
    end
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

insert into public.profiles (id, username, full_name, role, requested_role)
select
  users.id,
  coalesce(users.raw_user_meta_data ->> 'username', split_part(users.email, '@', 1)),
  coalesce(users.raw_user_meta_data ->> 'full_name', split_part(users.email, '@', 1)),
  case
    when users.raw_app_meta_data ->> 'role' in ('ADMIN', 'CUSTOMER') then users.raw_app_meta_data ->> 'role'
    when users.raw_user_meta_data ->> 'requested_role' in ('ADMIN', 'CUSTOMER') then users.raw_user_meta_data ->> 'requested_role'
    else 'CUSTOMER'
  end,
  case
    when users.raw_user_meta_data ->> 'requested_role' in ('ADMIN', 'CUSTOMER') then users.raw_user_meta_data ->> 'requested_role'
    else 'CUSTOMER'
  end
from auth.users
on conflict (id) do update
set
  username = coalesce(excluded.username, profiles.username),
  full_name = excluded.full_name,
  role = excluded.role,
  requested_role = excluded.requested_role,
  updated_at = now();

update public.profiles as profiles
set role = 'ADMIN',
    requested_role = 'ADMIN',
    updated_at = now()
from auth.users as users
where profiles.id = users.id
  and users.raw_user_meta_data ->> 'requested_role' = 'ADMIN';

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

create or replace function public.promote_admin_by_email(target_email text)
returns table (
  id uuid,
  email text,
  full_name text,
  role text,
  requested_role text
)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  update public.profiles as profiles
  set role = 'ADMIN',
      requested_role = 'ADMIN'
  from auth.users as users
  where profiles.id = users.id
    and lower(users.email) = lower(target_email)
  returning
    profiles.id,
    users.email::text,
    profiles.full_name,
    profiles.role,
    profiles.requested_role;
end;
$$;

revoke all on function public.promote_admin_by_email(text) from public, anon, authenticated;

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

insert into public.projects (
  name,
  type,
  location,
  status,
  percentage,
  date,
  tasks_completed,
  total_tasks,
  avatar_seed,
  client_name,
  start_date,
  deadline,
  budget,
  spent
)
select *
from (
  values
    ('Skyline Apartments', 'Residential', 'Mumbai', 'In Progress', 75, '10 Jan 2024 - 10 Jun 2024', 24, 32, 'skylineapartments', 'Aarav Mehta', date '2024-01-10', date '2024-06-10', 4500000, 3120000),
    ('Orchid Commercial', 'Commercial', 'Delhi', 'In Progress', 40, '05 Feb 2024 - 05 Aug 2024', 12, 30, 'orchidcommercial', 'Neha Kapoor', date '2024-02-05', date '2024-08-05', 6200000, 2100000),
    ('Green Valley Villa', 'Residential', 'Bangalore', 'Near Completion', 90, '15 Dec 2023 - 15 Jun 2024', 36, 40, 'greenvalleyvilla', 'Rohan Iyer', date '2023-12-15', date '2024-06-15', 3800000, 3520000),
    ('Palm Resort', 'Hospitality', 'Goa', 'Planning', 20, '01 Mar 2024 - 01 Dec 2024', 5, 25, 'palmresort', 'Karan Shah', date '2024-03-01', date '2024-12-01', 9500000, 1200000),
    ('Lake View Homes', 'Residential', 'Pune', 'On Hold', 10, '20 Feb 2024 - 20 Nov 2024', 2, 20, 'lakeviewhomes', 'Ananya Rao', date '2024-02-20', date '2024-11-20', 5200000, 600000),
    ('Corporate Office', 'Commercial', 'Hyderabad', 'In Progress', 60, '12 Mar 2024 - 12 Sep 2024', 18, 30, 'corporateoffice', 'Vikram Nair', date '2024-03-12', date '2024-09-12', 7100000, 3900000),
    ('Marine Drive Penthouse', 'Residential', 'Mumbai', 'Completed', 100, '01 Sep 2023 - 15 Jan 2024', 42, 42, 'marinedrivepenthouse', 'Ishaan Malhotra', date '2023-09-01', date '2024-01-15', 12000000, 11850000),
    ('Pearl Boutique', 'Retail', 'Jaipur', 'In Progress', 55, '05 Apr 2024 - 05 Aug 2024', 11, 20, 'pearlboutique', 'Meera Soni', date '2024-04-05', date '2024-08-05', 2800000, 1420000),
    ('Aster Medical Lounge', 'Commercial', 'Ahmedabad', 'Planning', 15, '10 May 2024 - 10 Oct 2024', 3, 22, 'astermedicallounge', 'Dr. Rishi Patel', date '2024-05-10', date '2024-10-10', 4300000, 350000),
    ('Cedar Co-Working Hub', 'Commercial', 'Gurgaon', 'Near Completion', 85, '18 Nov 2023 - 18 Jun 2024', 29, 34, 'cedarcoworkinghub', 'Sana Qureshi', date '2023-11-18', date '2024-06-18', 6800000, 6100000),
    ('Riverfront Duplex', 'Residential', 'Surat', 'In Progress', 48, '02 Apr 2024 - 30 Sep 2024', 12, 25, 'riverfrontduplex', 'Devansh Shah', date '2024-04-02', date '2024-09-30', 4100000, 1800000),
    ('Lotus Banquet Hall', 'Hospitality', 'Lucknow', 'Planning', 25, '15 May 2024 - 15 Jan 2025', 7, 28, 'lotusbanquethall', 'Ritika Agarwal', date '2024-05-15', date '2025-01-15', 8700000, 1450000),
    ('Urban Nest Studio', 'Residential', 'Chennai', 'Completed', 100, '01 Oct 2023 - 01 Mar 2024', 18, 18, 'urbanneststudio', 'Nikhil Menon', date '2023-10-01', date '2024-03-01', 1900000, 1880000),
    ('Summit Boardroom', 'Commercial', 'Noida', 'In Progress', 68, '20 Mar 2024 - 20 Jul 2024', 17, 25, 'summitboardroom', 'Priyanka Bansal', date '2024-03-20', date '2024-07-20', 2600000, 1710000),
    ('Maple Kids Store', 'Retail', 'Indore', 'On Hold', 35, '11 Apr 2024 - 11 Aug 2024', 7, 20, 'maplekidsstore', 'Tanvi Jain', date '2024-04-11', date '2024-08-11', 2200000, 780000),
    ('Bluebay Cafe', 'Hospitality', 'Kochi', 'Near Completion', 92, '05 Jan 2024 - 30 Jun 2024', 23, 25, 'bluebaycafe', 'Arjun Pillai', date '2024-01-05', date '2024-06-30', 3300000, 3020000),
    ('Hillcrest Farmhouse', 'Residential', 'Lonavala', 'Planning', 8, '01 Jun 2024 - 01 Feb 2025', 2, 26, 'hillcrestfarmhouse', 'Kabir Sethi', date '2024-06-01', date '2025-02-01', 7800000, 450000),
    ('Metro Salon Flagship', 'Retail', 'Kolkata', 'In Progress', 52, '25 Apr 2024 - 25 Sep 2024', 13, 25, 'metrosalonflagship', 'Aditi Bose', date '2024-04-25', date '2024-09-25', 3600000, 1650000)
) as seed(
  name,
  type,
  location,
  status,
  percentage,
  date,
  tasks_completed,
  total_tasks,
  avatar_seed,
  client_name,
  start_date,
  deadline,
  budget,
  spent
)
where not exists (select 1 from public.projects);

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

-- After creating your CRM admin account in Supabase Auth, run this from the
-- Supabase SQL Editor with your real admin email. Project/task/document writes
-- are protected by RLS and need public.profiles.role = 'ADMIN'.
--
-- select * from public.promote_admin_by_email('admin@bmginteriors.com');
--
-- Verify the active admin profile:
-- select
--   users.email,
--   profiles.full_name,
--   profiles.role,
--   profiles.requested_role
-- from public.profiles as profiles
-- join auth.users as users on users.id = profiles.id
-- order by profiles.created_at desc;
