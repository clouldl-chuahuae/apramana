/**
 * 점으로 이어진 물결선 (·.·˙·.·˙)
 * 피그마에서 SVG로 export해서 /public/wave.svg 로 넣으면 그걸로 교체 가능.
 */
export default function Wave({
  width = 340,
  period = 14,   // 물결 한 번의 길이(px)
  amp = 2,       // 물결 높이(px)
  step = 2.3,    // 점 간격(px)
  r = 0.55,      // 점 크기
  color = "#555",
  className,
  style,
}: {
  width?: number;
  period?: number;
  amp?: number;
  step?: number;
  r?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const h = amp * 2 + r * 4;
  const dots: { x: number; y: number }[] = [];
  for (let x = r; x <= width - r; x += step) {
    dots.push({ x, y: h / 2 - amp * Math.sin((2 * Math.PI * x) / period) });
  }
  return (
    <svg
      className={className}
      style={{ display: "block", margin: "0 auto", ...style }}
      width={width}
      height={h}
      viewBox={`0 0 ${width} ${h}`}
      aria-hidden
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x.toFixed(2)} cy={d.y.toFixed(2)} r={r} fill={color} />
      ))}
    </svg>
  );
}
