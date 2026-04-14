alter table public.custom_words
  add column if not exists word_key text,
  add column if not exists pronunciation text,
  add column if not exists updated_at timestamptz;

update public.custom_words
set word_key = coalesce(word_key, word)
where word_key is null;

update public.custom_words
set examples = coalesce(examples, '[]'::jsonb)
where examples is null;

update public.custom_words
set synonyms = coalesce(synonyms, '[]'::jsonb)
where synonyms is null;

update public.custom_words
set created_at = coalesce(created_at, timezone('utc', now()))
where created_at is null;

update public.custom_words
set updated_at = coalesce(updated_at, created_at, timezone('utc', now()))
where updated_at is null;

alter table public.custom_words
  alter column word_key set not null,
  alter column examples set default '[]'::jsonb,
  alter column examples set not null,
  alter column synonyms set default '[]'::jsonb,
  alter column synonyms set not null,
  alter column created_at set default timezone('utc', now()),
  alter column created_at set not null,
  alter column updated_at set default timezone('utc', now()),
  alter column updated_at set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.custom_words'::regclass
      and conname = 'custom_words_examples_array_check'
  ) then
    alter table public.custom_words
      add constraint custom_words_examples_array_check
      check (jsonb_typeof(examples) = 'array');
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.custom_words'::regclass
      and conname = 'custom_words_synonyms_array_check'
  ) then
    alter table public.custom_words
      add constraint custom_words_synonyms_array_check
      check (jsonb_typeof(synonyms) = 'array');
  end if;
end
$$;

create unique index if not exists custom_words_user_word_key_key
  on public.custom_words (user_id, word_key);

create index if not exists custom_words_user_updated_at_idx
  on public.custom_words (user_id, updated_at desc);

alter table public.custom_words enable row level security;

drop policy if exists "Users can read own custom words" on public.custom_words;
drop policy if exists "Users can insert own custom words" on public.custom_words;
drop policy if exists "Users can update own custom words" on public.custom_words;

create policy "Users can read own custom words"
  on public.custom_words
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own custom words"
  on public.custom_words
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own custom words"
  on public.custom_words
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.word_tot_captures (
  user_id uuid not null references auth.users (id) on delete cascade,
  word_key text not null
);

alter table public.word_tot_captures
  add column if not exists source text,
  add column if not exists weak_substitute text,
  add column if not exists context text,
  add column if not exists captured_at timestamptz,
  add column if not exists count integer,
  add column if not exists updated_at timestamptz;

update public.word_tot_captures
set source = coalesce(source, 'other')
where source is null;

update public.word_tot_captures
set captured_at = coalesce(captured_at, timezone('utc', now()))
where captured_at is null;

update public.word_tot_captures
set count = coalesce(count, 1)
where count is null;

update public.word_tot_captures
set updated_at = coalesce(updated_at, captured_at, timezone('utc', now()))
where updated_at is null;

alter table public.word_tot_captures
  alter column source set not null,
  alter column captured_at set not null,
  alter column count set not null,
  alter column updated_at set default timezone('utc', now()),
  alter column updated_at set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.word_tot_captures'::regclass
      and conname = 'word_tot_captures_source_check'
  ) then
    alter table public.word_tot_captures
      add constraint word_tot_captures_source_check
      check (source in ('speech', 'writing', 'reading', 'meeting', 'other'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.word_tot_captures'::regclass
      and conname = 'word_tot_captures_count_check'
  ) then
    alter table public.word_tot_captures
      add constraint word_tot_captures_count_check
      check (count >= 1);
  end if;
end
$$;

create unique index if not exists word_tot_captures_user_word_key_key
  on public.word_tot_captures (user_id, word_key);

create index if not exists word_tot_captures_user_updated_at_idx
  on public.word_tot_captures (user_id, updated_at desc);

alter table public.word_tot_captures enable row level security;

drop policy if exists "Users can read own TOT captures" on public.word_tot_captures;
drop policy if exists "Users can insert own TOT captures" on public.word_tot_captures;
drop policy if exists "Users can update own TOT captures" on public.word_tot_captures;

create policy "Users can read own TOT captures"
  on public.word_tot_captures
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own TOT captures"
  on public.word_tot_captures
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own TOT captures"
  on public.word_tot_captures
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
