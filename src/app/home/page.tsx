import Header from "@/components/Header";
import { works } from "@/content/works";

/* 피그마: 350폭 안에 84×90 사진 4장씩, 간격 4 */
export default function Home() {
  const list = works.length ? works : Array.from({ length: 172 }, () => "");

  return (
    <main>
      <Header variant="home" />
      <section className="grid">
        {list.map((f, i) =>
          f ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={`/works/${f}`} alt="" loading={i < 24 ? "eager" : "lazy"} decoding="async" />
          ) : (
            <div key={i} className="ph" />
          )
        )}
      </section>

      <style>{`
        .grid { display: grid; grid-template-columns: repeat(4, 84px); justify-content: center;
                gap: 4px; padding: 38px 0 60px; }
        .grid img, .grid .ph { width: 84px; height: 90px; object-fit: cover; object-position: bottom; background: #eeede9; }
      `}</style>
    </main>
  );
}
