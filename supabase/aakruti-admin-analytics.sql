create table public.admin_analytics_snapshots (
  day date not null,
  channel text not null check (channel in ('website', 'instagram', 'facebook', 'linkedin', 'youtube')),
  views integer not null check (views >= 0),
  interactions integer check (interactions >= 0),
  audience integer check (audience >= 0),
  updated_at timestamptz not null default now(),
  primary key (day, channel)
);

alter table public.admin_analytics_snapshots enable row level security;
revoke all on public.admin_analytics_snapshots from public, anon, authenticated;
grant select, insert, update on public.admin_analytics_snapshots to authenticated;

create policy "Admins read analytics snapshots"
on public.admin_analytics_snapshots for select to authenticated
using ((select private.is_admin()));

create policy "Admins add analytics snapshots"
on public.admin_analytics_snapshots for insert to authenticated
with check ((select private.is_admin()));

create policy "Admins update analytics snapshots"
on public.admin_analytics_snapshots for update to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));
