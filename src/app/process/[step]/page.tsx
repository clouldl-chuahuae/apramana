import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Wave from "@/components/Wave";
import Photo from "@/components/Photo";
import { processPages, type Block, type Img } from "@/content/process";

export function generateStaticParams() {
  return processPages.map((_, i) => ({ step: String(i + 1) }));
}

/** [[밑줄]] + \n 줄바꿈 */
function rich(s: string) {
  return s.split("\n").map((line, li) => (
    <span key={li}>
      {li > 0 && <br />}
      {line.split(/(\[\[.+?\]\])/g).map((p, pi) => (p.startsWith("[[") ? <u key={pi}>{p.slice(2, -2)}</u> : p))}
    </span>
  ));
}

const src = (i: Img) => `/img/process/${i.id.replace(":", "-")}.jpg`;
const DEFAULT_MT: Partial<Record<Block["type"], number>> = { note: 2, small: 8, sub: 8 };
const justify = { left: "flex-start", center: "center", right: "flex-end" } as const;

function render(b: Block, i: number) {
  switch (b.type) {
    case "step":
      return b.size === 16 ? (
        <p key={i} className="st16"><span>{b.no}.</span><span>{rich(b.title)}</span></p>
      ) : (
        <h2 key={i} className="st"><span>{b.no}.</span><span>{rich(b.title)}</span></h2>
      );
    case "note":
      return <p key={i} className="note" style={{ paddingLeft: b.indent ?? 30 }}>{rich(b.text)}</p>;
    case "img":
      return (
        <div key={i} className="imgs" style={{ justifyContent: justify[b.align ?? "left"] }}>
          <Photo src={src(b.img)} w={b.img.w} h={b.img.h} />
        </div>
      );
    case "row":
      return (
        <div key={i} className="imgs" style={{ gap: b.gap ?? 8, justifyContent: justify[b.align ?? "left"] }}>
          {b.imgs.map((im) => <Photo key={im.id} src={src(im)} w={im.w} h={im.h} />)}
        </div>
      );
    case "text":
      return (
        <div key={i} className="tx" style={{ fontSize: b.size ?? 16, paddingLeft: b.indent ?? 0 }}>
          {b.text.split("\n\n").map((para, pi) =>
            para.startsWith(">>")
              ? <p key={pi} className="accent">{rich(para.slice(2))}</p>
              : <p key={pi}>{rich(para)}</p>
          )}
        </div>
      );
    case "small":
      return (
        <p key={i} className="small" style={b.size === 15 ? { fontSize: 15, lineHeight: "24px" } : undefined}>
          {rich(b.text)}
        </p>
      );
    case "sub":
      return (
        <ul key={i} className="sub">
          {b.items.map(([k, t]) => <li key={k}><span>{k}</span><span>{t}</span></li>)}
        </ul>
      );
    case "contra":
      return (
        <div key={i} className="contra">
          <span className="cut">˗ˋˏ✄ -----------</span>
          <p className="ct">{b.title}</p>
          <p className="cx">{b.text}</p>
          <Wave style={{ alignSelf: "stretch" }} />
        </div>
      );
    case "caption":
      return <p key={i} className="cap">{rich(b.text)}</p>;
  }
}

export default async function ProcessPage({ params }: { params: Promise<{ step: string }> }) {
  const { step } = await params;
  const n = Number(step);
  const sections = processPages[n - 1];
  if (!sections) notFound();
  const last = n === processPages.length;

  return (
    <main>
      <Header />
      <article className="pc">
        {sections.map((s, si) => (
          <section key={si} className="sec" style={s.gap ? { marginTop: s.gap } : undefined}>
            {s.blocks.map((b, bi) => {
              const inner = s.inner ?? 14;
              const mt = bi === 0 ? 0 : b.mt ?? DEFAULT_MT[b.type] ?? inner;
              return <div key={bi} style={{ marginTop: mt }}>{render(b, bi)}</div>;
            })}
          </section>
        ))}

        <footer className="pc-foot">
          {last && <Wave style={{ marginBottom: 16, alignSelf: "stretch" }} />}
          <Link href={last ? "/guestbook" : `/process/${n + 1}`} className="u">
            {last ? "방명록 →" : "이어서 →"}
          </Link>
        </footer>
      </article>

      <style>{`
        .pc { padding: 16px 20px 80px; }
        .sec { display: flex; flex-direction: column; }
        .sec + .sec { margin-top: 40px; }

        .st { display: flex; gap: 10px; font-weight: 400; font-size: 18px; line-height: 26px; }
        .st > span:first-child { min-width: 17.5px; }
        .st16 { display: flex; gap: 8px; font-size: 16px; line-height: 24px; text-align: justify; padding-right: 50px; }
        .st16 > span:first-child { min-width: 16px; }
        .note { font-size: 15px; line-height: 24px; opacity: .4; text-align: justify; }

        .imgs { display: flex; }
        .tx { line-height: 24px; text-align: justify; opacity: .8; }
        .tx p + p { margin-top: 24px; }
        .tx .accent { color: var(--accent); }
        .small { font-size: 12px; line-height: 20px; opacity: .4; }

        .sub { list-style: none; padding: 0 74px 0 30px; display: flex; flex-direction: column; gap: 6px;
               font-size: 12px; line-height: 20px; opacity: .4; text-align: justify; }
        .sub li { display: flex; gap: 10px; }
        .sub li span:first-child { white-space: nowrap; }

        .contra { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; text-align: right; }
        .contra .cut { font-size: 14px; line-height: 17px; opacity: .6; white-space: nowrap; }
        .contra .ct { font-size: 20px; line-height: 20px; }
        .contra .cx { width: 285px; font-size: 15px; line-height: 24px; opacity: .8; }

        .cap { font-size: 12px; line-height: 20px; text-align: center; padding-top: 50px; }

        .pc-foot { margin-top: 80px; display: flex; flex-direction: column; align-items: flex-end; font-size: 16px; line-height: 24px; }
      `}</style>
    </main>
  );
}
