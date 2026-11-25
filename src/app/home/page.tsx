import Link from "next/link";
import Header from "@/components/Header";
import { works } from "@/content/works";

/* 피그마: 350폭 안에 84×90 사진 4장씩, 간격 4. 첫 사진부터 한 장씩 차례로 나타남 */
const STEP = 0.07; // 사진 사이 간격(초) — 늘리면 더 천천히

export default function Home() {
  return (
    <main>
      <Header variant="home" />
      <section className="grid">
        {works.map((f, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={f} src={`/img/works/${f}`} alt="" decoding="async" style={{ animationDelay: `${0.3 + i * STEP}s` }} />
        ))}
      </section>

      <footer className="hf">
        <Link href="/home" className="hf-title u">Apramāṇa</Link>
        <a href="mailto:yeyoung.ici@gmail.com" className="hf-mail">yeyoung.ici@gmail.com</a>
      </footer>

      <style>{`
        .grid { display: grid; grid-template-columns: repeat(4, 84px); justify-content: center;
                gap: 4px; padding-top: 28px; }
        .grid img { width: 84px; height: 90px; object-fit: cover; background: #f3f2ee;
                    opacity: 0; animation: appear .6s ease forwards; }
        @keyframes appear { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }

        .hf { display: flex; justify-content: space-between; align-items: center;
              width: 349px; margin: 18px auto 0; padding-bottom: 34px; font-family: var(--font-title); }
        .hf-title { font-size: 23px; line-height: 25px; letter-spacing: -0.46px; }
        .hf-mail { font-size: 14px; line-height: 14px; letter-spacing: -0.28px; }
      `}</style>
    </main>
  );
}
