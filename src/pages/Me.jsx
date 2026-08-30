import { useState } from "react";
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

function MeItem({ item }) {
  return (
    <figure className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      {item.type === "video" ? (
        <video
          src={item.src}
          controls
          preload="metadata"
          playsInline
          className="aspect-video w-full bg-night-soft"
        />
      ) : (
        <MeImage src={item.src} alt={item.caption || "Photo"} />
      )}
      {(item.caption || item.date) && (
        <figcaption className="px-4 py-3.5">
          {item.caption && (
            <p className="text-sm font-medium leading-snug text-ink">{item.caption}</p>
          )}
          {item.date && (
            <p className="mt-1 text-xs text-muted">{item.date}</p>
          )}
        </figcaption>
      )}
    </figure>
  );
}

export default function Me() {
  const me = cms.me;
  usePageMeta({
    title: "Me — Abel Tattah",
    description: "A gallery of pictures and clips.",
    image: (me.items && me.items[0] && me.items[0].src) || "/images/banner.png",
    url: "https://abeltattah.vercel.app/#/me",
  });

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

      {me.items && me.items.length > 0 ? (
        <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {me.items.map((item, i) => (
            <MeItem key={i} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center">
          <p className="text-sm text-muted">
            No pictures or clips yet — add them from{" "}
            <Link to="/admin" className="font-medium text-accent hover:underline">
              /admin → Me
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}