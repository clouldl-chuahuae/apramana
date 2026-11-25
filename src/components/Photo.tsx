"use client";

import { useState } from "react";

/** 사진 칸: 파일이 아직 없으면 회색 칸으로 보임 */
export default function Photo({ src, w, h, style }: { src: string; w: number; h: number; style?: React.CSSProperties }) {
  const [ok, setOk] = useState(true);
  return (
    <div style={{ width: w, height: h, maxWidth: "100%", background: ok ? undefined : "#eeede9", flexShrink: 0, ...style }}>
      {ok && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" loading="lazy" decoding="async" onError={() => setOk(false)}
             style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      )}
    </div>
  );
}
