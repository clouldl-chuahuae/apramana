"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Wave from "./Wave";

/**
 * 피그마 헤더
 *  - 홈: 제목 위, 메뉴 아래로 세로 배치 (구분선 없음)
 *  - 과정/방명록: 제목 옆에 메뉴 + 아래 물결 구분선
 */
export default function Header({ variant = "page" }: { variant?: "home" | "page" }) {
  const path = usePathname();
  const on = (p: string) => (path.startsWith(p) ? "u" : "");

  if (variant === "home") {
    return (
      <header className="hh">
        <Link href="/home" className="hh-title u">Apramāṇa</Link>
        <nav className="hh-menu">
          <Link href="/process/1">과정</Link>
          <Link href="/guestbook">방명록</Link>
        </nav>
        <style>{`
          .hh { padding: 57px 29px 0; display: flex; flex-direction: column; gap: 16px; }
          .hh-title { display: block; height: 20px; margin: 2.5px 0; font-family: var(--font-title); font-size: 26px; line-height: 14px; letter-spacing: -0.52px; align-self: flex-start; }
          .hh-menu { display: flex; flex-direction: column; gap: 10px; font-size: 18px; line-height: 20px; }
        `}</style>
      </header>
    );
  }

  return (
    <header className="hd">
      <div className="hd-row">
        <Link href="/home" className="hd-title">Apramāṇa</Link>
        <nav className="hd-menu">
          <Link href="/process/1" className={on("/process")}>과정</Link>
          <Link href="/guestbook" className={on("/guestbook")}>방명록</Link>
        </nav>
      </div>
      <Wave />
      <style>{`
        .hd { padding: 57px 20px 0; display: flex; flex-direction: column; gap: 16px; }
        .hd-row { display: flex; gap: 14px; padding: 0 10px; align-items: flex-start; }
        .hd-title { display: block; width: 89px; height: 20px; margin-top: 2.5px; font-family: var(--font-title); font-size: 20px; line-height: 14px; letter-spacing: -0.4px; white-space: nowrap; }
        .hd-menu { display: flex; flex-direction: column; gap: 8px; font-size: 17px; line-height: 20px; }
        .hd .u, .hh .u { text-underline-offset: auto; text-underline-position: from-font; text-decoration-thickness: from-font; }
      `}</style>
    </header>
  );
}
