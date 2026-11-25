/**
 * 과정 탭 내용 (3페이지).
 * 피그마 텍스트/이미지를 이 형식으로 채우면 화면이 자동으로 만들어짐.
 *
 *  step    : 단계 제목. 줄바꿈은 \n, 밑줄 용어는 [[슬립]] 처럼 감싸기
 *  note    : 제목 아래 회색 'ㄴ' 설명
 *  images  : /public/process 안 파일 이름. 1장=꽉 차게, 2장=반반, 3장=3등분. "" 은 회색 칸
 *  text    : 본문 (tone: "accent"=초록 강조, "sub"=회색 작은 글씨)
 *  list    : 7-1), 7-2) 같은 세부 단계
 *
 * ⚠ 지금 들어간 문장은 스크린샷에서 읽은 임시본. 피그마 원문으로 확인/교체 필요.
 */
export type Block =
  | { type: "step"; no: string; title: string; note?: string }
  | { type: "images"; src: string[] }
  | { type: "text"; text: string; tone?: "body" | "accent" | "sub" }
  | { type: "list"; items: string[] };

const TODO = "(본문 — 피그마에서 채우기)";

export const processPages: Block[][] = [
  // ───────── 과정 1 ─────────
  [
    { type: "step", no: "1.", title: "[[슬립]]*을 준비한다.", note: "점토를 물에 풀어 만든 고운 흙물" },
    { type: "images", src: [""] },
    {
      type: "text",
      text: "흙덩이를 가래떡처럼 길고 가늘게 여러 갈래로 자른다. 흙이 잠길 정도로 물을 붓고 하루 동안 수비한다. 위에 고인 물을 따라 버리고, 드릴을 이용해 흙물을 고르게 섞는다. 마지막으로 해교제(규산소다)를 조금씩 넣어가며 원하는 정도로 조절한다.",
    },
    { type: "step", no: "2.", title: "흙물에\n[[세라믹 안료]]*를\n열심히 섞는다." },
    { type: "images", src: [""] },
    { type: "step", no: "3.", title: "안료를 섞은 흙물을\n석고판에 붓는다." },
    { type: "images", src: [""] },
    { type: "step", no: "4.", title: "색슬립들을 쌓고 자른다." },
    { type: "images", src: ["", ""] },
    { type: "text", text: TODO },
    { type: "step", no: "5.", title: "다양한 패턴으로 배치하고\n재단하면서 패치를 만든다." },
    { type: "images", src: [""] },
  ],

  // ───────── 과정 2 ─────────
  [
    { type: "step", no: "6.", title: "공기를 차단하기 위해\n비닐봉지에 보관한다." },
    { type: "images", src: [""] },
    { type: "text", text: TODO },
    { type: "text", text: TODO, tone: "accent" },
    { type: "step", no: "6.", title: "[[석고틀]]*을 위한 틀을 만든다." },
    { type: "images", src: ["", "", ""] },
    { type: "step", no: "7.", title: "석고틀을 만든다." },
    { type: "list", items: ["7-1) " + TODO, "7-2) " + TODO] },
    { type: "step", no: "8.", title: "석고틀에\n만들어둔 패치를 붙인다." },
    { type: "images", src: ["", ""] },
    { type: "step", no: "9.", title: "[[압착]]¹한다." },
    { type: "images", src: [""] },
  ],

  // ───────── 과정 3 ─────────
  [
    { type: "step", no: "17.", title: "굽칼을 이용해서\n벽을 매끄럽게 다듬는다." },
    { type: "images", src: [""] },
    { type: "step", no: "18.", title: "완전히 건조시킨다." },
    { type: "step", no: "19.", title: "가마 온도 800~900℃ 에서\n1차 소성을 한다." },
    { type: "images", src: [""] },
    { type: "step", no: "20.", title: "[[시유]]* 준비를 한다.", note: "초벌을 마친 도자기 표면에 유리질의 액체인 유약을 입히는 과정" },
    { type: "text", text: TODO, tone: "accent" },
    { type: "step", no: "21.", title: "2차 소성을 한다." },
    { type: "text", text: "유약을 바른 기물을 가마에서 다시 1250~1280℃로 구운다." },
    { type: "step", no: "22.", title: "다듬는다." },
    { type: "text", text: "가마에서 나온 기물을 사포로 간다." },
    { type: "step", no: "23.", title: "완성" },
  ],
];
