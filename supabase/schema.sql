-- DevOps Learning Path — Supabase schema
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).
-- It creates per-user progress storage, certificates, row-level security,
-- and a public verification function.

-- ─────────────────────────────────────────────────────────────────────────
-- Progress: one JSONB blob per user (the client's ProgressMap).
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.user_progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

drop policy if exists "own progress select" on public.user_progress;
create policy "own progress select" on public.user_progress
  for select using (auth.uid() = user_id);

drop policy if exists "own progress insert" on public.user_progress;
create policy "own progress insert" on public.user_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "own progress update" on public.user_progress;
create policy "own progress update" on public.user_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────
-- Certificates: one row per (user, project).
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.certificates (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  project_id   text not null,
  learner_name text not null default 'Anonymous',
  code         text not null unique,
  issued_at    timestamptz not null default now(),
  unique (user_id, project_id)
);

alter table public.certificates enable row level security;

drop policy if exists "own certs select" on public.certificates;
create policy "own certs select" on public.certificates
  for select using (auth.uid() = user_id);

drop policy if exists "own certs insert" on public.certificates;
create policy "own certs insert" on public.certificates
  for insert with check (auth.uid() = user_id);

drop policy if exists "own certs update" on public.certificates;
create policy "own certs update" on public.certificates
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────
-- Public verification: look up a certificate by code WITHOUT exposing the
-- whole table. SECURITY DEFINER bypasses RLS for this narrow, read-only query.
-- ─────────────────────────────────────────────────────────────────────────
create or replace function public.verify_certificate(lookup_code text)
returns table (
  project_id   text,
  learner_name text,
  code         text,
  issued_at    timestamptz
)
language sql
security definer
set search_path = public
as $$
  select project_id, learner_name, code, issued_at
  from public.certificates
  where code = lookup_code
  limit 1;
$$;

grant execute on function public.verify_certificate(text) to anon, authenticated;
