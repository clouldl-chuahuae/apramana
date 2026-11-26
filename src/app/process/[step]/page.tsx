import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Wave from "@/components/Wave";
import Photo from "@/components/Photo";
import { processPages, type N } from "@/content/process";

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

/** 피그마 ○ (18×25 프레임 안의 글자) */
function Dot() {
  return (
    <svg width="18" height="25" viewBox="0 0 18 25" aria-hidden style={{ flexShrink: 0 }}>
      <path fill="#000" d="M9.012 16.952c-2.472 0-4.464-1.992-4.464-4.464 0-2.448 1.992-4.44 4.464-4.44 2.448 0 4.44 1.992 4.44 4.44 0 2.472-1.992 4.464-4.44 4.464Zm0-.516c2.16 0 3.924-1.764 3.924-3.948 0-2.16-1.764-3.924-3.924-3.924-2.184 0-3.948 1.764-3.948 3.924 0 2.184 1.764 3.948 3.948 3.948Z" />
    </svg>
  );
}

const flex = { start: "flex-start", center: "center", end: "flex-end" } as const;

function R({ n }: { n: N }): React.ReactNode {
  switch (n.t) {
    case "col":
      return (
        <div
          style={{
            display: "flex", flexDirection: "column", gap: n.gap ?? 0,
            alignItems: flex[n.align ?? "start"],
            justifyContent: n.justify === "center" ? "center" : "flex-start",
            padding: n.pad ? n.pad.map((v) => `${v}px`).join(" ") : undefined,
            minHeight: n.minH, height: n.h, width: "100%",
          }}
        >
          {n.items.map((c, i) => <R key={i} n={c} />)}
        </div>
      );
    case "row":
      return (
        <div style={{ display: "flex", gap: n.gap ?? 0, justifyContent: flex[n.align ?? "start"], width: "100%" }}>
          {n.items.map((c, i) => <R key={i} n={c} />)}
        </div>
      );
    case "step":
      return <h2 className="st"><span className="no">{n.no}.</span><span>{rich(n.title)}</span></h2>;
    case "note":
      return (
        <p className="note" style={{ paddingLeft: n.pl ?? 30, paddingRight: n.pr ?? 0, opacity: n.op ?? 0.4 }}>
          {rich(n.text)}
        </p>
      );
    case "img":
      return <Photo src={`/img/p2/${n.id.replace(":", "-")}.jpg`} w={n.w} h={n.h} />;
    case "dot": {
      const lh = n.lh ?? 26;
      return (
        <div className="dot" style={{ padding: `0 ${n.px ?? 0}px` }}>
          <Dot />
          <div className="dot-body">
            <div className="dot-tx" style={{ lineHeight: `${lh}px` }}>
              {n.paras.map((p, i) => {
                const own = p.startsWith("@24") ? 24 : undefined;
                const txt = p.replace(/^@24/, "");
                return (
                  <p key={i} className={txt.startsWith(">>") ? "accent" : undefined}
                     style={{ marginTop: i ? lh : undefined, lineHeight: own ? `${own}px` : undefined }}>
                    {rich(txt.replace(/^>>/, ""))}
                  </p>
                );
              })}
            </div>
            {n.extra && <p className="dot-extra">{n.extra}</p>}
          </div>
        </div>
      );
    }
    case "mark":
      return (
        <div className="mark" style={n.center ? { justifyContent: "center", width: "100%" } : undefined}>
          <span>※</span>
          <span style={n.center ? undefined : { width: 288 }}>{rich(n.text)}</span>
        </div>
      );
    case "small":
      return <p className="small">{rich(n.text)}</p>;
    case "sub":
      return (
        <ul className="sub">
          {n.items.map(([k, t]) => <li key={k}><span>{k}</span><span>{t}</span></li>)}
        </ul>
      );
    case "contra":
      return (
        <div className="contra">
          <span className="cut">˗ˋˏ✄ -----------</span>
          <p className="ct">{n.title}</p>
          <p className="cx">{n.text}</p>
          <Wave style={{ alignSelf: "stretch" }} />
        </div>
      );
    case "wave":
      return <div style={{ width: "100%" }}><Wave /></div>;
  }
}

export default async function ProcessPage({ params }: { params: Promise<{ step: string }> }) {
  const { step } = await params;
  const n = Number(step);
  const page = processPages[n - 1];
  if (!page) notFound();
  const last = n === processPages.length;

  return (
    <main>
      <Header />
      <article className="pc">
        <R n={page.body} />
        <div className="pc-link" style={{ marginTop: page.linkInside ? 80 : 16 }}>
          <Link href={last ? "/guestbook" : `/process/${n + 1}`} className="u">
            {last ? "방명록 →" : "이어서 →"}
          </Link>
        </div>
      </article>

      <style>{`
        .pc { padding: 16px 20px 240px; }

        .st { display: flex; font-weight: 400; font-size: 18px; line-height: 26px; }
        .st .no { flex: 0 0 27px; }
        .note { font-size: 15px; line-height: 24px; text-align: justify; width: 100%; }

        .dot { display: flex; gap: 10px; width: 100%; }
        .dot-body { flex: 1; min-width: 0; }
        .dot-tx { font-size: 16px; opacity: .8; text-align: justify; }
        .dot-tx .accent { color: var(--accent); }
        .dot-extra { margin-top: 10px; font-size: 14px; line-height: 23px; opacity: .5; text-align: justify; }

        .mark { display: flex; gap: 8px; font-size: 12px; line-height: 20px; }
        .mark span { opacity: .4; }
        .mark span:first-child { white-space: nowrap; }
        .small { font-size: 12px; line-height: 20px; opacity: .4; width: 100%; }

        .sub { list-style: none; padding: 0 74px 0 30px; display: flex; flex-direction: column; gap: 6px;
               font-size: 12px; line-height: 20px; opacity: .4; text-align: justify; width: 100%; }
        .sub li { display: flex; gap: 10px; }
        .sub li span:first-child { white-space: nowrap; }

        .contra { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; text-align: right; width: 100%; }
        .contra .cut { font-size: 14px; line-height: 17px; opacity: .6; white-space: nowrap; }
        .contra .ct { font-size: 20px; line-height: 20px; }
        .contra .cx { width: 285px; font-size: 15px; line-height: 24px; opacity: .8; }

        .pc-link { display: flex; justify-content: flex-end; font-size: 16px; line-height: 24px; }
      `}</style>
    </main>
  );
}
