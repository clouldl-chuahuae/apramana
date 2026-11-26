-- Apramāṇa 방명록 테이블
-- Supabase 대시보드 → SQL Editor → 이 내용 전체 붙여넣고 Run

create table if not exists public.guestbook (
  id          bigint generated always as identity primary key,
  message     text        not null check (char_length(btrim(message)) between 1 and 800),
  hidden      boolean     not null default false,   -- 지우고 싶은 글은 Table Editor에서 true로
  created_at  timestamptz not null default now()
);

alter table public.guestbook enable row level security;

-- 누구나 숨김 아닌 글 읽기
drop policy if exists "read visible" on public.guestbook;
create policy "read visible" on public.guestbook
  for select to anon, authenticated
  using (hidden = false);

-- 누구나 글쓰기 (숨김 상태로는 못 씀)
drop policy if exists "anyone can write" on public.guestbook;
create policy "anyone can write" on public.guestbook
  for insert to anon, authenticated
  with check (hidden = false);

-- 수정/삭제 정책은 일부러 없음 → 방문자는 못 고치고 못 지움
create index if not exists guestbook_created_at_idx on public.guestbook (created_at desc);
