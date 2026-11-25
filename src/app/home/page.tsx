import Header from "@/components/Header";
import { works, COLUMNS, RATIO } from "@/content/works";

export default function Home() {
  const list = works.length ? works : Array.from({ length: 64 }, () => "");

  return (
    <main>
      <Header wave={false} />
      <section className="grid">
        {list.map((f, i) =>
          f ? (
            // 애니메이션 없이 그냥 차례로 로드
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={`/works/${f}`} alt="" loading={i < 16 ? "eager" : "lazy"} decoding="async" />
          ) : (
            <div key={i} className="ph" />
          )
        )}
      </section>

      <style>{`
        .grid { display: grid; grid-template-columns: repeat(${COLUMNS}, 1fr);
                gap: 2px; padding: 0 9px 40px; }
        .grid img, .grid .ph { width: 100%; aspect-ratio: ${RATIO}; object-fit: cover; background: #e9e8e4; }
      `}</style>
    </main>
  );
}
