import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** 환경변수가 없으면 null → 방명록이 미리보기용 예시 글로 동작 */
export const supabase = url && key ? createClient(url, key) : null;

export type Entry = { id: number; message: string; created_at: string };
