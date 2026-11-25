"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import { supabase, type Entry } from "@/lib/supabase";
import { useSquareText } from "@/components/useSquareText";

const MAX_LINES = 8;   // 한 칸 최대 줄 수 (넘으면 …)
const MAX_CHARS = 300; // 한 사람이 쓸 수 있는 최대 글자 수

/* Supabase 연결 전 미리보기용 예시 글 */
const DEMO: Entry[] = [30, 70, 80, 72, 40, 70, 30, 75, 70, 80, 22, 70].map((n, i) => ({
  id: -i - 1,
  message: "예영아 전시 축하해".repeat(10).slice(0, n),
  created_at: "",
}));

export default function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [writing, setWriting] = useState(false);
  const [reading, setReading] = useState<Entry | null>(null);

  const load = useCallback(async () => {
    if (!supabase) return setEntries(DEMO);
    const { data, error } = await supabase
      .from("guestbook")
      .select("id, message, created_at")
      .order("created_at", { ascending: false })
      .limit(500);
    if (!error && data) setEntries(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const texts = useMemo(() => entries.map((e) => e.message), [entries]);
  const { measurer, out, ready } = useSquareText(texts, MAX_LINES);

  return (
    <main className={`gb ${writing || reading ? "blur" : ""}`}>
      <div className="gb-page">
        <Header />

        <section className="gb-intro">
          <p>기존의 안정적인 캐스팅 방식 대신, 새로운 제작 기법을 직접 연구하고 발전시켰습니다. 하나의 틀에서 하루에 한 개의 기물만 제작할 수 있었으며, 그마저도 절반 이상이 균열로 인해 완성되지 못했습니다.</p>
          <p>그럼에도 다음에는 조금이라도 더 나은 결과가 나오기를 기대하며 같은 과정을 수없이 반복했습니다.</p>
          <p>이 전시를 보러 와주신 분들도 무언가를 이루기 위해 애쓰고 있는 순간이 있으리라 생각합니다. 그 시간이 비록 기대했던 결과로 이어지지 않더라도, 애써온 마음과 노력만큼은 헛되지 않았으면 좋겠습니다.</p>
          <p>귀한 시간을 내어 작품을 보러 와주셔서 감사합니다.</p>
        </section>

        <section className="gb-grid" style={{ opacity: ready ? 1 : 0 }}>
          {entries.map((e, i) => (
            <button key={e.id} className="cell" onClick={() => setReading(e)}>
              <p className="sq">{out[i] ?? e.message}</p>
            </button>
          ))}
          {/* 마지막 줄이 3칸이 안 되면 빈 칸으로 채워서 격자 유지 */}
          {Array.from({ length: (3 - (entries.length % 3)) % 3 }, (_, i) => (
            <div key={`e${i}`} className="cell" />
          ))}
        </section>

        {/* 줄 수 재는 용도. 화면에는 안 보임 */}
        <div className="cell measure" aria-hidden><p ref={measurer} className="sq" /></div>
      </div>

      {!writing && !reading && (
        <button className="gb-btn" onClick={() => setWriting(true)}>
          ⋆. ˚‧ 마음 남기기 ‧˚ .⋆
        </button>
      )}

      {writing && (
        <WriteSheet
          onClose={() => setWriting(false)}
          onSent={(e) => { setEntries((prev) => [e, ...prev]); setWriting(false); }}
        />
      )}

      {reading && (
        <div className="sheet" onClick={() => setReading(null)}>
          <div className="sheet-box read" onClick={(ev) => ev.stopPropagation()}>
            <p>{reading.message}</p>
          </div>
          <button className="gb-btn" onClick={() => setReading(null)}>닫기</button>
        </div>
      )}

      <style>{`
        .gb { min-height: 100dvh; padding-bottom: 140px; }
        .gb.blur .gb-page { filter: blur(3px); opacity: .45; transition: .25s; pointer-events: none; }

        .gb-intro { padding: 26px 25px 60px; font-size: 14px; line-height: 1.75;
                    text-align: justify; letter-spacing: .02em; }
        .gb-intro p + p { margin-top: 20px; }

        .gb-grid { display: grid; grid-template-columns: repeat(3, 1fr);
                   gap: 3px; background: var(--cell-line);
                   border-top: 3px solid var(--cell-line); transition: opacity .2s; }
        .cell { background: var(--cell-bg); height: 184px; display: flex;
                align-items: center; justify-content: center; padding: 0 18px; text-align: left; }
        .sq { width: 100%; font-size: 12px; line-height: 16px; letter-spacing: .06em;
              text-align: justify; text-align-last: justify;
              word-break: break-all; overflow-wrap: anywhere; white-space: normal; }
        .measure { position: absolute; left: 0; top: 0; visibility: hidden; pointer-events: none;
                   width: calc((min(100vw, var(--w)) - 6px) / 3); height: auto; }

        .gb-btn { position: fixed; left: 50%; bottom: 60px; transform: translateX(-50%);
                  width: min(340px, calc(100vw - 50px)); height: 50px; z-index: 20;
                  background: var(--button); border: 1px solid #000; font-size: 17px; }
        .gb-btn:disabled { opacity: .5; }

        .sheet { position: fixed; inset: 0; z-index: 10; display: flex; justify-content: center; }
        .sheet-box { position: absolute; top: 200px; width: min(352px, calc(100vw - 38px));
                     height: 342px; background: var(--cell-bg); border: 1px solid #333; }
        .sheet-box textarea { width: 100%; height: 100%; resize: none; border: 0; outline: 0;
                     background: transparent; padding: 22px 30px; font: inherit;
                     font-size: 14px; line-height: 22px; letter-spacing: .04em; color: var(--ink); }
        .sheet-box .count { position: absolute; right: 12px; bottom: 8px; font-size: 11px; color: var(--sub); }
        .sheet-box.read { overflow-y: auto; padding: 22px 30px; font-size: 14px; line-height: 22px;
                          letter-spacing: .04em; white-space: pre-wrap; word-break: break-all; }
        .err { position: absolute; top: 552px; font-size: 12px; color: #b33; }
      `}</style>
    </main>
  );
}

function WriteSheet({ onClose, onSent }: { onClose: () => void; onSent: (e: Entry) => void }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  async function send() {
    const message = text.trim();
    if (!message || sending) return;
    setSending(true);
    setErr("");
    if (!supabase) {
      // 미리보기 모드: 저장 없이 화면에만 추가
      onSent({ id: Date.now(), message, created_at: new Date().toISOString() });
      return;
    }
    const { data, error } = await supabase
      .from("guestbook")
      .insert({ message })
      .select("id, message, created_at")
      .single();
    setSending(false);
    if (error || !data) return setErr("전송에 실패했어요. 잠시 후 다시 시도해 주세요.");
    onSent(data);
  }

  return (
    <div className="sheet" onClick={onClose}>
      <div className="sheet-box" onClick={(e) => e.stopPropagation()}>
        <textarea
          autoFocus
          maxLength={MAX_CHARS}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="마음을 남겨주세요"
        />
        <span className="count">{text.length}/{MAX_CHARS}</span>
      </div>
      {err && <p className="err">{err}</p>}
      <button
        className="gb-btn"
        disabled={!text.trim() || sending}
        onClick={(e) => { e.stopPropagation(); send(); }}
      >
        {sending ? "보내는 중…" : "보내기"}
      </button>
    </div>
  );
}
