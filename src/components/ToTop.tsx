"use client";

/** 누르면 페이지 맨 위로 부드럽게 올라감 */
export default function ToTop({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="맨 위로"
    >
      {children}
    </button>
  );
}
