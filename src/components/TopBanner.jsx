import { useEffect, useState } from "react";
import { cms } from "../cms.js";

const SHOW_DELAY = 30_000; // stay hidden 30s after the visitor arrives
const AUTO_HIDE = 90_000; // show for 1 minute, then auto-hide

export default function TopBanner() {
  const banner = cms.site.banner;
  const [visible, setVisible] = useState(false);
  const dismissed = sessionStorage.getItem("banner-dismissed") === "1";

  useEffect(() => {
    if (!banner || !banner.text) return;
    if (dismissed) return;
    const showTimer = setTimeout(() => setVisible(true), SHOW_DELAY);
    const hideTimer = setTimeout(() => setVisible(false), SHOW_DELAY + AUTO_HIDE);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [banner, dismissed]);

  if (!banner || !banner.text || dismissed || !visible) return null;

  const inner = (
    <span className="inline-flex items-center justify-center gap-2 text-center text-xs font-semibold sm:text-sm">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
      {banner.text}
    </span>
  );

  return (
    <div className="relative bg-orange-500 text-white">
      <a
        href={banner.href || undefined}
        target={banner.href ? "_blank" : undefined}
        rel={banner.href ? "noreferrer" : undefined}
        className={
          "block px-12 py-2.5 text-center transition-colors " +
          (banner.href ? "hover:bg-orange-600" : "cursor-default")
        }
      >
        <div className="mx-auto flex max-w-6xl items-center justify-center px-2">
          {inner}
        </div>
      </a>
      <button
        type="button"
        onClick={() => {
          sessionStorage.setItem("banner-dismissed", "1");
          setVisible(false);
        }}
        aria-label="Dismiss notice"
        className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}