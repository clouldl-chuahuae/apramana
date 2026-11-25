# Apramāṇa — 졸업전시 웹사이트 (모바일 전용, 390px)

| 주소 | 화면 |
|---|---|
| `/` | 온보딩 4장면 (탭하면 다음, 가만히 두면 자동) → 홈으로 |
| `/home` | 작품 사진 4열 그리드 (애니메이션 없음) |
| `/process/1` ~ `/3` | 과정 3페이지 |
| `/guestbook` | 방명록 (Supabase 저장) |

## 내용 고치는 곳
- 홈 사진: 파일을 `public/works/` 에 넣고 `src/content/works.ts` 에 순서대로 이름 적기
- 과정 글·사진: `src/content/process.ts` (사진은 `public/process/`)
- 색·폰트: `src/app/globals.css` 맨 위 `:root`
- 방명록 한 칸 줄 수·글자 수 제한: `src/app/guestbook/page.tsx` 위쪽 `MAX_LINES`, `MAX_CHARS`

## 방명록 '네모' 규칙
3열, 양끝 정렬. 짧은 글은 마지막 줄 남는 자리를 `-------`로 채우고, 8줄을 넘으면 `…`로 자름.
칸을 탭하면 전체 글을 볼 수 있음.

## 처음 설정 (한 번만)
1. **Supabase**: 새 프로젝트 → SQL Editor → `supabase/schema.sql` 붙여넣고 Run
2. Project Settings → API 에서 `Project URL`, `anon public` 키 복사
3. **Vercel**: Add New → Project → 이 GitHub 저장소 Import →
   Environment Variables 에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 추가 → Deploy
4. 이상한 글이 올라오면: Supabase → Table Editor → guestbook → 해당 줄 `hidden` 을 `true`

환경변수가 없으면 방명록은 예시 글로 보이는 미리보기 모드로 동작함.

## 로컬에서 보기
```
npm install
npm run dev   # http://localhost:3000
```
