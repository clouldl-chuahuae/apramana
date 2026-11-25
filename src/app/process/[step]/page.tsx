import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Wave from "@/components/Wave";
import { processPages, type Block } from "@/content/process";

export function generateStaticParams() {
  return processPages.map((_, i) => ({ step: String(i + 1) }));
}

/** [[용어]] → 밑줄, \n → 줄바꿈 */
function rich(s: string) {
  return s.split("\n").map((line, li) => (
    <span key={li}>
      {li > 0 && <br />}
      {line.split(/(\[\[.+?\]\])/g).map((part, pi) =>
        part.startsWith("[[") ? <u key={pi}>{part.slice(2, -2)}</u> : part
      )}
    </span>
  ));
}

function Img({ src }: { src: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return src ? <img src={`/process/${src}`} alt="" loading="lazy" /> : <div className="ph" />;
}

function render(b: Block, i: number) {
  switch (b.type) {
    case "step":
      return (
        <div key={i} className="st">
          <h2>
            <span className="no">{b.no}</span>
            <span>{rich(b.title)}</span>
          </h2>
          {b.note && <p className="note">ㄴ {b.note}</p>}
        </div>
      );
    case "images":
      return (
        <div key={i} className={`imgs n${b.src.length}`}>
          {b.src.map((s, j) => <Img key={j} src={s} />)}
        </div>
      );
    case "text":
      return <p key={i} className={`tx ${b.tone ?? "body"}`}>{rich(b.text)}</p>;
    case "list":
      return (
        <ul key={i} className="ls">
          {b.items.map((t, j) => <li key={j}>{t}</li>)}
        </ul>
      );
  }
}

export default async function ProcessPage({ params }: { params: Promise<{ step: string }> }) {
  const { step } = await params;
  const n = Number(step);
  const blocks = processPages[n - 1];
  if (!blocks) notFound();
  const last = n === processPages.length;

  return (
    <main>
      <Header />
      <article className="pc">
        {blocks.map(render)}

        <footer className="pc-foot">
          {last ? (
            <>
              <Wave width={340} style={{ marginBottom: 18 }} />
              <Link href="/guestbook">방명록 →</Link>
            </>
          ) : (
            <Link href={`/process/${n + 1}`}>다음 →</Link>
          )}
        </footer>
      </article>

      <style>{`
        .pc { padding: 24px 25px 60px; }
        .st { margin: 34px 0 12px; }
        .st:first-child { margin-top: 0; }
        .st h2 { display: flex; gap: 6px; font-family: var(--font-serif); font-weight: 400;
                 font-size: 17px; line-height: 1.5; }
        .st u { text-underline-offset: 3px; text-decoration-thickness: 1px; }
        .note { margin: 4px 0 0 22px; font-size: 11.5px; color: var(--sub); line-height: 1.6; }
        .imgs { display: grid; gap: 6px; margin: 12px 0; }
        .imgs.n2 { grid-template-columns: 1fr 1fr; }
        .imgs.n3 { grid-template-columns: 1fr 1fr 1fr; }
        .imgs img { width: 100%; height: auto; }
        .imgs .ph { width: 100%; aspect-ratio: 4/3; background: #e9e8e4; }
        .tx { font-size: 13px; line-height: 1.75; text-align: justify; margin: 12px 0; }
        .tx.accent { color: var(--accent); }
        .tx.sub { color: var(--sub); font-size: 11.5px; }
        .ls { list-style: none; font-size: 11.5px; color: var(--sub); line-height: 1.7; padding-left: 22px; }
        .ls li { margin-bottom: 6px; }
        .pc-foot { margin-top: 48px; text-align: right; font-family: var(--font-serif); font-size: 14px; }
        .pc-foot a { text-decoration: underline; text-underline-offset: 3px; }
      `}</style>
    </main>
  );
}
