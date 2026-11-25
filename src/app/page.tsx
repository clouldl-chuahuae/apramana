"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Wave from "@/components/Wave";

/* 온보딩 4장면. 화면을 탭하면 바로 다음으로, 가만히 두면 자동으로 넘어감 */
const DURATION = [1600, 2200, 3800, 3800]; // 각 장면 머무는 시간(ms)

export default function Onboarding() {
  const [scene, setScene] = useState(0);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/home");
  }, [router]);

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
        {scene === 0 && <Wave width={370} />}

        {scene === 1 && (
          <>
            <Wave width={370} />
            <h1 className="ob-title" style={{ margin: "26px 0 30px" }}>Apramāṇa</h1>
            <Wave width={370} />
          </>
        )}

        {scene === 2 && (
          <>
            <h1 className="ob-title">Apramāṇa</h1>
            <Wave width={260} style={{ margin: "22px auto 26px" }} />
            <p className="ob-text">
              산스크리트어에서 유래한 불교 용어로,
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
              cursor: pointer; user-select: none; padding-bottom: 6dvh; }
        .ob-scene { animation: obFade 0.9s ease both; }
        .ob-title { font-family: var(--font-title); font-weight: 400; font-size: 34px; line-height: 1; }
        .ob-text { font-family: var(--font-body); font-size: 15px; line-height: 2; }
        @keyframes obFade { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </main>
  );
}
