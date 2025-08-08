alter table public.users enable row level security;
alter table public.fasts enable row level security;
alter table public.supplements enable row level security;
alter table public.supplement_logs enable row level security;
alter table public.user_badges enable row level security;

create policy "users self" on public.users
  for select using (auth.uid() = id);

create policy "fasts self" on public.fasts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "supplements self" on public.supplements
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "supplement_logs self" on public.supplement_logs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "user_badges self" on public.user_badges
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.set_auth_user_id() returns trigger as $$
begin
  new.user_id := auth.uid();
  return new;
end; $$ language plpgsql;

create trigger set_user_id_fasts before insert on public.fasts
  for each row execute function public.set_auth_user_id();
create trigger set_user_id_supp before insert on public.supplements
  for each row execute function public.set_auth_user_id();
create trigger set_user_id_logs before insert on public.supplement_logs
  for each row execute function public.set_auth_user_id();
create trigger set_user_id_user_badges before insert on public.user_badges
  for each row execute function public.set_auth_user_id();