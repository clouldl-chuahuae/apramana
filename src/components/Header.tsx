"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Wave from "./Wave";

export default function Header({ wave = true }: { wave?: boolean }) {
  const path = usePathname();
  const on = (p: string) => (path.startsWith(p) ? "on" : "");

  return (
    <header className="hd">
      <nav className="hd-row">
        <Link href="/home" className={`hd-title ${on("/home")}`}>Apramāṇa</Link>
        <div className="hd-menu">
          <Link href="/process/1" className={on("/process")}>과정</Link>
          <Link href="/guestbook" className={on("/guestbook")}>방명록</Link>
        </div>
      </nav>
      {wave && <Wave width={340} />}

      <style>{`
        .hd { padding: 46px 25px 0; background: var(--bg); }
        .hd-row { display: flex; gap: 26px; margin-bottom: 22px; }
        .hd-title { font-family: var(--font-title); font-size: 17px; line-height: 1; padding-top: 1px; }
        .hd-menu { display: flex; flex-direction: column; gap: 6px;
                   font-family: var(--font-serif); font-size: 14px; line-height: 1.2; }
        .hd .on { text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
      `}</style>
    </header>
  );
}
