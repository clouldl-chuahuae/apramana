"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * 방명록 칸 '네모' 만들기
 *  - 글이 짧으면: 마지막 줄 남는 자리를 ------- 로 채움
 *  - 글이 길면: MAX_LINES 줄에서 자르고 ⋯ 붙임
 * 화면에 안 보이는 측정용 칸 하나(measurer)에 실제로 글을 넣어보며 줄 수를 셈.
 */
export function useSquareText(texts: string[], maxLines: number) {
  const measurer = useRef<HTMLParagraphElement>(null);
  const [out, setOut] = useState<string[]>(texts);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const el = measurer.current;
    if (!el) return;
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      const lh = parseFloat(getComputedStyle(el).lineHeight);
      const lines = (s: string) => {
        el.textContent = s;
        return Math.round(el.getBoundingClientRect().height / lh);
      };

      const result = texts.map((raw) => {
        const text = raw.replace(/\s+/g, " ").trim();
        if (!text) return "-".repeat(10);

        // 너무 길면 → … 로 자르기 (이진 탐색)
        if (lines(text) > maxLines) {
          let lo = 0, hi = text.length;
          while (lo < hi) {
            const mid = Math.ceil((lo + hi) / 2);
            if (lines(text.slice(0, mid).trimEnd() + "⋯") <= maxLines) lo = mid;
            else hi = mid - 1;
          }
          return text.slice(0, lo).trimEnd() + "⋯";
        }

        // 남는 자리 → ------- 로 채우기 (줄 수가 늘지 않는 최대 개수)
        const base = lines(text);
        let lo = 0, hi = 80;
        while (lo < hi) {
          const mid = Math.ceil((lo + hi) / 2);
          if (lines(text + "-".repeat(mid)) === base) lo = mid;
          else hi = mid - 1;
        }
        return text + "-".repeat(lo);
      });

      el.textContent = "";
      setOut(result);
      setReady(true);
    };

    // 웹폰트가 다 로드된 뒤에 재야 정확함
    (document.fonts?.ready ?? Promise.resolve()).then(run);
    return () => { cancelled = true; };
  }, [texts, maxLines]);

  return { measurer, out, ready };
}
