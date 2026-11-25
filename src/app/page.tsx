"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Wave, { WAVE_ONBOARD, WAVE_SHORT } from "@/components/Wave";

/**
 * 온보딩
 *  0: 가운데 물결선 하나가 천천히 나타남
 *  1: 그 물결선이 위아래로 갈라지며 펼쳐지고, 사이로 Apramāṇa 가 떠오름
 *  2: 제목 + 짧은 물결 + 뜻 (한 줄씩 천천히)
 *  3: 작업 의도 ("쌓아올리다."부터 위로 0.12초 간격, 흐릿하게 번지며 빠르게 쌓이고, 다 쌓인 뒤 읽을 시간을 줌)
 *  → 홈
 * 화면을 탭하면 다음 단계로 넘어감.
 */
const HOLD = [1600, 3200, 4900, 4800]; // 각 단계 머무는 시간(ms) — 늘리면 더 천천히
const FADE_OUT = 650;                  // 장면이 사라지는 시간(ms)
const FADE_HOME = 1100;                // 마지막 장면 → 홈으로 넘어갈 때 (더 천천히)

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const router = useRouter();

  useEffect(() => { router.prefetch("/home"); }, [router]);

  useEffect(() => {
    const t = setTimeout(next, HOLD[step]);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  function next() {
    if (leaving) return;
    // 0 → 1 은 같은 장면 안에서 물결이 펼쳐지는 것이라 사라지지 않음
    if (step === 0) return setStep(1);
    setLeaving(true);
    setTimeout(() => {
      if (step < 3) { setLeaving(false); setStep(step + 1); }
      else router.replace("/home");
    }, step === 3 ? FADE_HOME : FADE_OUT);
  }

  return (
    <main className="ob" onClick={next}>
      <div className={`ob-stage ${leaving ? (step === 3 ? "out home" : "out") : ""}`}>
        {step <= 1 && (
          <div className={`split ${step === 1 ? "open" : ""}`}>
            <div className="w top"><Wave text={WAVE_ONBOARD} opacity={0.8} /></div>
            <div className="w bottom"><Wave text={WAVE_ONBOARD} opacity={0.8} /></div>
            <h1 className="ob-title t">Apramāṇa</h1>
          </div>
        )}

        {step === 2 && (
          <div className="col">
            <h1 className="ob-title rise" style={{ animationDelay: "0s" }}>Apramāṇa</h1>
            <div className="rise" style={{ margin: "15px 0 14px", animationDelay: ".4s" }}>
              <Wave text={WAVE_SHORT} opacity={0.8} />
            </div>
            <p className="ob-text">
              <span className="line rise" style={{ fontSize: 14, letterSpacing: "-0.28px", animationDelay: ".9s" }}>
                산스크리트어에서 유래한 불교 용어로,
              </span>
              <span className="line rise" style={{ animationDelay: "1.5s" }}>어떠한 기준이나 한계로도</span>
              <span className="line rise" style={{ animationDelay: "2.1s" }}>가늠할 수 없는 무한함을 뜻한다.</span>
            </p>
          </div>
        )}

        {step === 3 && (
          <p className="ob-text stack">
            <span className="line rise" style={{ animationDelay: ".36s" }}>유한한 형태 안에 무한한 가능성을 믿으며,</span>
            <span className="line rise" style={{ animationDelay: ".24s" }}>결과를 확신할 수 없더라도</span>
            <span className="line rise" style={{ animationDelay: ".12s" }}>희망을 담아서</span>
            <span className="line rise" style={{ animationDelay: "0s" }}>쌓아올리다.</span>
          </p>
        )}
      </div>

      <style>{`
        .ob { min-height: 100dvh; background: var(--cream); display: flex;
              align-items: center; justify-content: center; text-align: center;
              cursor: pointer; user-select: none; overflow: hidden; }
        .ob-stage { width: 100%; display: flex; justify-content: center;
                    transition: opacity ${FADE_OUT}ms ease; }
        .ob-stage.out { opacity: 0; }
        .ob-stage.out.home { transition-duration: ${FADE_HOME}ms; }

        .ob-title { font-family: var(--font-title); font-weight: 400; font-size: 30px;
                    line-height: 47px; letter-spacing: -0.6px; }
        .ob-text { font-size: 16px; line-height: 30px; letter-spacing: -0.32px; }
        .line { display: block; white-space: nowrap; }

        /* 한 줄씩 천천히 떠오르기 */
        .rise { opacity: 0; animation: rise 1.1s ease forwards; }
        @keyframes rise { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
        /* 마지막 장면: 아래 줄부터 쌓여 올라가듯 */
        .stack .rise { animation-name: dream; animation-duration: 1.1s; animation-timing-function: cubic-bezier(.16,1,.3,1); }
        @keyframes dream {
          0%   { opacity: 0; transform: translateY(22px) scale(1.04); filter: blur(10px); letter-spacing: .18em; }
          55%  { opacity: .85; filter: blur(2px); }
          100% { opacity: 1; transform: none; filter: blur(0); letter-spacing: -0.32px; }
        }

        /* 물결선 갈라지기: 처음엔 두 줄이 가운데 겹쳐 있다가 위아래로 */
        .split { position: relative; width: 100%; height: 160px; }
        .split .w { position: absolute; left: 0; right: 0; top: 50%; margin-top: -8px;
                    animation: fadeIn 1.1s ease both;
                    transition: transform 1.6s cubic-bezier(.65,0,.35,1); }
        .split.open .top    { transform: translateY(-42px); }
        .split.open .bottom { transform: translateY(42px); }
        .split .t { position: absolute; left: 0; right: 0; top: 50%; margin-top: -23.5px;
                    opacity: 0; transform: scaleY(.6); filter: blur(2px);
                    transition: opacity 1.4s ease .5s, transform 1.6s cubic-bezier(.65,0,.35,1), filter 1.4s ease .5s; }
        .split.open .t { opacity: 1; transform: none; filter: none; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </main>
  );
}
