import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apramāṇa",
  description: "유한한 형태 안에 무한한 가능성을 믿으며, 결과를 확신할 수 없더라도 희망을 담아서 쌓아올리다.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fffef5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* 폰트는 피그마에서 확인 후 바꿔도 됨 → globals.css의 --font-* 변수만 수정 */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500&family=Gowun+Batang&family=Gowun+Dodum&display=swap"
        />
      </head>
      <body>
        <div className="frame">{children}</div>
      </body>
    </html>
  );
}
