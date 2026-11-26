import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apramāṇa",
  description: "유한한 형태 안에 무한한 가능성을 믿으며, 결과를 확신할 수 없더라도 희망을 담아서 쌓아올리다.",
};

/**
 * 디자인이 390px 고정이라, 화면을 항상 390px 폭으로 잡고 기기 폭에 맞춰 통째로 확대/축소.
 * → 갤럭시(360~384px)에서 옆으로 밀리거나 잘리지 않고, 큰 아이폰에서도 꽉 차게 보임.
 */
export const viewport: Viewport = {
  width: 390,
  initialScale: undefined,
  themeColor: "#fffef5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* 390px보다 좁은 폰(갤럭시 등)은 화면 폭에 맞춰 전체를 살짝 축소 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
var w=Math.min(screen.width||390,(window.outerWidth||9999));
if(!(w&&w<390))return;
var m=document.querySelector('meta[name="viewport"]');
if(m){var s=(w/390).toFixed(4);m.setAttribute('content','width=390, initial-scale='+s+', minimum-scale='+s);}
function fb(){var vv=window.visualViewport;if(!vv)return;
 if(document.documentElement.clientWidth>vv.width*vv.scale+2&&vv.scale>0.99){document.documentElement.style.zoom=(vv.width/390).toFixed(4);}}
window.addEventListener('load',fb);
})();`,
          }}
        />
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
        {/* 산돌구름 웹폰트 (SD 단편선 돋움) — 등록 도메인: apramana.vercel.app */}
        <link rel="preconnect" href="https://o6cdhdutve.execute-api.ap-northeast-2.amazonaws.com" />
        <link
          rel="stylesheet"
          href="https://o6cdhdutve.execute-api.ap-northeast-2.amazonaws.com/v1/api/css/drop_fontstream_css/?sid=gAAAAABrBoiHbABGuO0WZp1TYHphq5HUBQORODLA5aBmGN9hTaxNhMUEKh5cNyer_64oXCOBJisJetfeyINsmbycLKSRBD_-xhT_ebJuNnfxq2jJB25sAspTa3rhSNgANDBozxaZi14Lhuspp1r9c0NOXZXkTsvkYRqJ1J3bvXuRinWv6WijrRiQGyGt5dz35i6jpo5v4kaTSFvR6DKW-DNxiHpaJcisJ9WcQQLX95rpFWCSDi9RRfVXHeV_FqB9eIm7KuxFHzUE"
          charSet="utf-8"
          referrerPolicy="origin"
        />
      </head>
      <body>
        <div className="frame">{children}</div>
      </body>
    </html>
  );
}
