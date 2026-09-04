import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cms } from "../cms.js";
import { usePageMeta } from "../lib/meta.js";

function MeImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full bg-night-soft">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={
          "w-full transition-opacity duration-500 " +
          (loaded ? "opacity-100" : "opacity-0")
        }
      />
      {!loaded && <div className="img-shimmer absolute inset-0" aria-hidden="true" />}
    </div>
  );
}

function MeItem({ item, onClick }) {
  const caption = (item.caption || item.date) && (
    <figcaption className="px-4 py-3.5">
      {item.caption && (
        <p className="text-sm font-medium leading-snug text-ink">
          {item.caption}
        </p>
      )}
      {item.date && <p className="mt-1 text-xs text-muted">{item.date}</p>}
    </figcaption>
  );

  if (item.type === "video") {
    return (
      <figure className="mb-5 break-inside-avoid overflow-hidden rounded-l border border-line bg-surface shadow-card">
        <video
          src={item.src}
          controls
          preload="metadata"
          playsInline
          className="aspect-video w-full bg-night-soft"
        />
        {caption}
      </figure>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="group mb-5 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-l border border-line bg-surface text-left shadow-card transition-shadow hover:shadow-lift"
    >
      <MeImage src={item.src} alt={item.caption || "Photo"} />
      {caption}
    </button>
  );
}

function Lightbox({ items, active, onClose, onNav }) {
  if (active === null) return null;
  const item = items[active];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption || "Gallery preview"}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
        aria-label="Previous"
        className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
        aria-label="Next"
        className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <figure
        className="max-h-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" ? (
          <video
            src={item.src}
            controls
            autoPlay
            playsInline
            className="max-h-[78vh] w-full rounded-xl bg-night-soft"
          />
        ) : (
          <img
            src={item.src}
            alt={item.caption || "Photo"}
            className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain bg-night-soft"
          />
        )}
        {item.caption && (
          <figcaption className="mt-3 text-center text-sm font-medium text-white/90">
            {item.caption}
            {item.date && <span className="text-white/60"> · {item.date}</span>}
          </figcaption>
        )}
      </figure>
    </div>
  );
}

export default function Me() {
  const me = cms.me;
  const items = me.items || [];
  const [active, setActive] = useState(null);

  usePageMeta({
    title: "Me — Abel Tattah",
    description: "A gallery of pictures and clips.",
    image: (items[0] && items[0].src) || "/images/banner.png",
    url: "https://abeltattah.vercel.app/#/me",
  });

  const open = active !== null;

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft")
        setActive((i) => (i - 1 + items.length) % items.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items.length]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5m6 6-6-6 6-6" />
        </svg>
        Back to gallery
      </Link>

      <div className="mt-6 border-b border-line pb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {me.heading}
        </h1>
      </div>

      {items.length > 0 ? (
        <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((item, i) => (
            <MeItem key={i} item={item} onClick={() => setActive(i)} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-l border border-dashed border-line p-10 text-center">
          <p className="text-sm text-muted">
            No pictures or clips yet — add them from{" "}
            <Link to="/admin" className="font-medium text-accent hover:underline">
              /admin → Me
            </Link>
            .
          </p>
        </div>
      )}

      <Lightbox
        items={items}
        active={active}
        onClose={() => setActive(null)}
        onNav={(dir) =>
          setActive((i) => (i + dir + items.length) % items.length)
        }
      />
    </div>
  );
}