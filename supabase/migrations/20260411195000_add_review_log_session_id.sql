alter table public.review_logs
  add column if not exists session_id text;

create index if not exists review_logs_user_session_id_idx
  on public.review_logs (user_id, session_id)
  where session_id is not null;
