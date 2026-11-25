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
        {/* Alegreya(제목) + 고운돋움(산돌 연결 전 임시 한글) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Alegreya&family=Gowun+Dodum&display=swap"
        />
        {/* 물결선 ⋱⋰ 글자용 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        {/* ▼ 산돌구름 웹폰트 코드는 여기에 붙임 */}
      </head>
      <body>
        <div className="frame">{children}</div>
      </body>
    </html>
  );
}
