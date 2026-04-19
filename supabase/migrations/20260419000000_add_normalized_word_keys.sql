alter table public.review_cards
  add column if not exists normalized_word_key text;

update public.review_cards
set normalized_word_key = lower(trim(coalesce(word_key, '')))
where normalized_word_key is null;

alter table public.review_cards
  alter column normalized_word_key set not null;

with ranked_review_cards as (
  select
    ctid,
    row_number() over (
      partition by user_id, normalized_word_key
      order by updated_at desc nulls last, ctid desc
    ) as row_num
  from public.review_cards
)
delete from public.review_cards
where ctid in (
  select ctid
  from ranked_review_cards
  where row_num > 1
);

create unique index if not exists review_cards_user_normalized_word_key_key
  on public.review_cards (user_id, normalized_word_key);

create index if not exists review_cards_user_normalized_word_key_idx
  on public.review_cards (user_id, normalized_word_key);

alter table public.review_logs
  add column if not exists normalized_word_key text;

update public.review_logs
set normalized_word_key = lower(trim(coalesce(word_key, '')))
where normalized_word_key is null;

alter table public.review_logs
  alter column normalized_word_key set not null;

with ranked_review_logs as (
  select
    ctid,
    row_number() over (
      partition by user_id, normalized_word_key, reviewed_at
      order by updated_at desc nulls last, ctid desc
    ) as row_num
  from public.review_logs
)
delete from public.review_logs
where ctid in (
  select ctid
  from ranked_review_logs
  where row_num > 1
);

create unique index if not exists review_logs_user_normalized_word_reviewed_at_key
  on public.review_logs (user_id, normalized_word_key, reviewed_at);

create index if not exists review_logs_user_normalized_word_reviewed_at_idx
  on public.review_logs (user_id, normalized_word_key, reviewed_at desc);

alter table public.word_associations
  add column if not exists normalized_word_key text;

update public.word_associations
set normalized_word_key = lower(trim(coalesce(word_key, '')))
where normalized_word_key is null;

alter table public.word_associations
  alter column normalized_word_key set not null;

with ranked_word_associations as (
  select
    ctid,
    row_number() over (
      partition by user_id, normalized_word_key
      order by updated_at desc nulls last, ctid desc
    ) as row_num
  from public.word_associations
)
delete from public.word_associations
where ctid in (
  select ctid
  from ranked_word_associations
  where row_num > 1
);

create unique index if not exists word_associations_user_normalized_word_key_key
  on public.word_associations (user_id, normalized_word_key);

create index if not exists word_associations_user_normalized_word_key_idx
  on public.word_associations (user_id, normalized_word_key);

alter table public.custom_words
  add column if not exists normalized_word_key text;

update public.custom_words
set normalized_word_key = lower(trim(coalesce(word_key, '')))
where normalized_word_key is null;

alter table public.custom_words
  alter column normalized_word_key set not null;

with ranked_custom_words as (
  select
    ctid,
    row_number() over (
      partition by user_id, normalized_word_key
      order by updated_at desc nulls last, created_at desc nulls last, ctid desc
    ) as row_num
  from public.custom_words
)
delete from public.custom_words
where ctid in (
  select ctid
  from ranked_custom_words
  where row_num > 1
);

create unique index if not exists custom_words_user_normalized_word_key_key
  on public.custom_words (user_id, normalized_word_key);

create index if not exists custom_words_user_normalized_word_key_idx
  on public.custom_words (user_id, normalized_word_key);

alter table public.word_tot_captures
  add column if not exists normalized_word_key text,
  add column if not exists event_ids jsonb;

update public.word_tot_captures
set normalized_word_key = lower(trim(coalesce(word_key, '')))
where normalized_word_key is null;

update public.word_tot_captures
set event_ids = (
  select coalesce(jsonb_agg(format('legacy:%s:%s:%s', normalized_word_key, coalesce(updated_at, captured_at), index - 1)), '[]'::jsonb)
  from generate_series(1, greatest(count, 0)) as index
)
where event_ids is null;

alter table public.word_tot_captures
  alter column normalized_word_key set not null;

with ranked_word_tot_captures as (
  select
    ctid,
    row_number() over (
      partition by user_id, normalized_word_key
      order by updated_at desc nulls last, captured_at desc nulls last, ctid desc
    ) as row_num
  from public.word_tot_captures
)
delete from public.word_tot_captures
where ctid in (
  select ctid
  from ranked_word_tot_captures
  where row_num > 1
);

create unique index if not exists word_tot_captures_user_normalized_word_key_key
  on public.word_tot_captures (user_id, normalized_word_key);

create index if not exists word_tot_captures_user_normalized_word_key_idx
  on public.word_tot_captures (user_id, normalized_word_key);