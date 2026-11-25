"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Wave, { WAVE_ONBOARD, WAVE_SHORT } from "@/components/Wave";

/* 온보딩 4장면 (피그마 16 → 10 → 11 → 12). 탭하면 다음, 가만히 두면 자동 */
const DURATION = [1600, 2200, 3800, 3800];

export default function Onboarding() {
  const [scene, setScene] = useState(0);
  const router = useRouter();

  useEffect(() => { router.prefetch("/home"); }, [router]);

  useEffect(() => {
    const t = setTimeout(next, DURATION[scene]);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  function next() {
    if (scene < 3) setScene(scene + 1);
    else router.replace("/home");
  }

  return (
    <main className="ob" onClick={next}>
      <div key={scene} className="ob-scene">
        {scene === 0 && <Wave text={WAVE_ONBOARD} opacity={0.8} />}

        {scene === 1 && (
          <>
            <Wave text={WAVE_ONBOARD} opacity={0.8} />
            <h1 className="ob-title" style={{ margin: "-6px 0 22px" }}>Apramāṇa</h1>
            <Wave text={WAVE_ONBOARD} opacity={0.8} />
          </>
        )}

        {scene === 2 && (
          <>
            <h1 className="ob-title">Apramāṇa</h1>
            <Wave text={WAVE_SHORT} opacity={0.8} style={{ margin: "15px 0 14px" }} />
            <p className="ob-text">
              <span style={{ fontSize: 14, letterSpacing: "-0.28px" }}>산스크리트어에서 유래한 불교 용어로,</span>
              <br />어떠한 기준이나 한계로도
              <br />가늠할 수 없는 무한함을 뜻한다.
            </p>
          </>
        )}

        {scene === 3 && (
          <p className="ob-text">
            유한한 형태 안에 무한한 가능성을 믿으며,
            <br />결과를 확신할 수 없더라도
            <br />희망을 담아서
            <br />쌓아올리다.
          </p>
        )}
      </div>

      <style>{`
        .ob { min-height: 100dvh; background: var(--cream); display: flex;
              align-items: center; justify-content: center; text-align: center;
              cursor: pointer; user-select: none; }
        .ob-scene { animation: obFade 0.9s ease both; }
        .ob-title { font-family: var(--font-title); font-weight: 400; font-size: 34px;
                    line-height: 47px; letter-spacing: -0.68px; }
        .ob-text { font-size: 16px; line-height: 30px; letter-spacing: -0.32px; }
        @keyframes obFade { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </main>
  );
}
