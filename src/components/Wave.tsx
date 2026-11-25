/** 피그마 물결 구분선: Pretendard 10px 글자 ⋱⋰ 를 위아래 뒤집은 것 */
export const WAVE_LONG = "⋰ ⋱⋰⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰⋱⋰ ⋱";
export const WAVE_ONBOARD = "⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰⋱⋰ ⋱⋰";
export const WAVE_SHORT = "⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰ ⋱⋰⋱⋰";

export default function Wave({
  text = WAVE_LONG,
  opacity = 1,
  style,
}: {
  text?: string;
  opacity?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      style={{
        display: "flex",
        justifyContent: "center",
        height: 16,
        fontFamily: "var(--font-wave)",
        fontSize: 10,
        lineHeight: "16px",
        color: "#1e1e1e",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: "100%",
        opacity,
        transform: "scaleY(-1)",
        ...style,
      }}
    >
      {text}
    </div>
  );
}
