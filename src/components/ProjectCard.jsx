import { StatusBadge } from "./StatusBadge.jsx";
import PreviewPlayer from "./PreviewPlayer.jsx";
import { parseYoutubeId } from "../lib/youtube.js";

export default function ProjectCard({ project }) {
  const featured = project.featured;
  const hasVideo = !!parseYoutubeId(project.previewVideo || project.video);
  return (
    <article
      className={
        "group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift " +
        (featured ? "sm:col-span-2" : "")
      }
    >
      <a href={`#/products/${project.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-night-soft">
          <PreviewPlayer project={project} />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
          {project.statusLabel && (
            <div className="pointer-events-none absolute left-3 top-3">
              <StatusBadge project={project} />
            </div>
          )}
          {hasVideo && (
            <div
              className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white ring-1 ring-white/30 backdrop-blur-sm transition-colors duration-300 group-hover:bg-black/70"
              aria-hidden="true"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold tracking-tight">
              {project.name}
            </h3>
            <span className="mt-0.5 text-xs font-medium text-muted">
              {project.year}
            </span>
          </div>
          <p className="mt-1 text-sm leading-snug text-muted line-clamp-2">
            {project.tagline}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3.5">
            <span className="rounded-md bg-paper px-2 py-1 text-[11px] font-semibold text-ink/70">
              {project.type}
            </span>
            <span className="rounded-md bg-paper px-2 py-1 text-[11px] font-semibold text-ink/70">
              {project.category}
            </span>
            <span className="ml-auto translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </article>
  );
}