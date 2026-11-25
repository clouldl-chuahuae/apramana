"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Wave, { WAVE_ONBOARD, WAVE_SHORT } from "@/components/Wave";

/**
 * 온보딩
 *  0: 가운데 물결선 하나가 천천히 나타남
 *  1: 그 물결선이 위아래로 갈라지며 펼쳐지고, 사이로 Apramāṇa 가 떠오름
 *  2: 제목 + 짧은 물결 + 뜻 (한 줄씩 천천히)
 *  3: 작업 의도 (한 줄씩 천천히)
 *  → 홈
 * 화면을 탭하면 다음 단계로 넘어감.
 */
const HOLD = [2600, 4600, 7200, 7400]; // 각 단계 머무는 시간(ms) — 늘리면 더 천천히
const FADE_OUT = 1100;                 // 장면이 사라지는 시간(ms)

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
      setLeaving(false);
      if (step < 3) setStep(step + 1);
      else router.replace("/home");
    }, FADE_OUT);
  }

  return (
    <main className="ob" onClick={next}>
      <div className={`ob-stage ${leaving ? "out" : ""}`}>
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
            <div className="rise" style={{ margin: "15px 0 14px", animationDelay: ".6s" }}>
              <Wave text={WAVE_SHORT} opacity={0.8} />
            </div>
            <p className="ob-text">
              <span className="line rise" style={{ fontSize: 14, letterSpacing: "-0.28px", animationDelay: "1.4s" }}>
                산스크리트어에서 유래한 불교 용어로,
              </span>
              <span className="line rise" style={{ animationDelay: "2.3s" }}>어떠한 기준이나 한계로도</span>
              <span className="line rise" style={{ animationDelay: "3.2s" }}>가늠할 수 없는 무한함을 뜻한다.</span>
            </p>
          </div>
        )}

        {step === 3 && (
          <p className="ob-text">
            <span className="line rise" style={{ animationDelay: ".2s" }}>유한한 형태 안에 무한한 가능성을 믿으며,</span>
            <span className="line rise" style={{ animationDelay: "1.2s" }}>결과를 확신할 수 없더라도</span>
            <span className="line rise" style={{ animationDelay: "2.2s" }}>희망을 담아서</span>
            <span className="line rise" style={{ animationDelay: "3.2s" }}>쌓아올리다.</span>
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

        .ob-title { font-family: var(--font-title); font-weight: 400; font-size: 34px;
                    line-height: 47px; letter-spacing: -0.68px; }
        .ob-text { font-size: 16px; line-height: 30px; letter-spacing: -0.32px; }
        .line { display: block; }

        /* 한 줄씩 천천히 떠오르기 */
        .rise { opacity: 0; animation: rise 1.6s ease forwards; }
        @keyframes rise { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }

        /* 물결선 갈라지기: 처음엔 두 줄이 가운데 겹쳐 있다가 위아래로 */
        .split { position: relative; width: 100%; height: 160px; }
        .split .w { position: absolute; left: 0; right: 0; top: 50%; margin-top: -8px;
                    animation: fadeIn 1.6s ease both;
                    transition: transform 2.2s cubic-bezier(.65,0,.35,1); }
        .split.open .top    { transform: translateY(-42px); }
        .split.open .bottom { transform: translateY(42px); }
        .split .t { position: absolute; left: 0; right: 0; top: 50%; margin-top: -41px;
                    opacity: 0; transform: scaleY(.6); filter: blur(2px);
                    transition: opacity 2s ease .7s, transform 2.2s cubic-bezier(.65,0,.35,1), filter 2s ease .7s; }
        .split.open .t { opacity: 1; transform: none; filter: none; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </main>
  );
}
