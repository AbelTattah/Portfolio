import { Link, useParams } from "react-router-dom";
import { cms, phoneHref, usePageTitle } from "../cms.js";
import { StatusBadge } from "../components/StatusBadge.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";
import PreviewPlayer from "../components/PreviewPlayer.jsx";
import { UpworkAcquire, upworkUrl, WorkWithConfidence } from "../components/Upwork.jsx";
import NotFound from "./NotFound.jsx";

const icons = {
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  box: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
    </svg>
  ),
  target: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  spark: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.5-6.5-2 2m-7 7-2 2m11 0-2-2m-7-7-2-2" />
    </svg>
  ),
  github: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.13-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.66.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.55A10.98 10.98 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  ),
  mail: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  ),
  phone: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  external: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  ),
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = cms.projects.find((p) => p.slug === slug);

  usePageTitle(project ? project.name : "Not found");

  if (!project) return <NotFound />;

  const upNext = cms.projects
    .filter((p) => p.slug !== project.slug)
    .filter(
      (p) => p.category === project.category || p.status === project.status
    )
    .slice(0, 4);

  const stackGroups = Object.entries(project.stack || {}).filter(
    ([, v]) => v && v.length
  );

  const extraGallery = (project.gallery || []).filter(
    (src) => src !== project.image
  );

  const emailHref = `mailto:${cms.site.email}?subject=${encodeURIComponent(
    project.acquirable ? `Acquire ${project.name}` : `Discuss ${project.name}`
  )}`;

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5m6 6-6-6 6-6" />
        </svg>
        Back to gallery
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        {/* Main column — like the YouTube watch view */}
        <main className="min-w-0">
          <VideoPlayer project={project} />

          {/* Title + action row */}
          <div className="mt-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <StatusBadge project={project} />
              <span className="text-xs font-medium text-muted">
                {project.type} · {project.category} · {project.year}
              </span>
            </div>
            <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {project.name}
            </h1>
            <p className="mt-2 max-w-2xl leading-relaxed text-muted">
              {project.tagline}
            </p>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {phoneHref() ? (
                <a
                  href={phoneHref()}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-accent/90"
                >
                  {icons.phone}
                  Call me
                </a>
              ) : project.acquirable ? (
                <a
                  href={emailHref}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-emerald-700"
                >
                  {icons.mail}
                  Acquire this product
                </a>
              ) : (
                <a
                  href={emailHref}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-accent/90"
                >
                  {icons.mail}
                  Discuss project
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  {icons.external}
                  Visit live product
                </a>
              )}
              {project.repo && project.repo !== project.demo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  {icons.github}
                  Source
                </a>
              )}
            </div>
          </div>

          {/* Description box */}
          <div className="mt-6 rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
            <h2 className="flex items-center gap-2.5 font-display text-base font-semibold tracking-tight">
              <span className="text-accent">{icons.box}</span>
              Overview
            </h2>
            <p className="mt-3 leading-relaxed text-ink/85">{project.overview}</p>

            {project.acquirable && (
              <div className="mt-4 rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-600/15">
                <p className="text-sm font-semibold text-emerald-800">
                  Available for acquisition
                </p>
                {project.priceNote && (
                  <p className="mt-1 text-xs leading-relaxed text-emerald-800/75">
                    {project.priceNote}
                  </p>
                )}
              </div>
            )}
          </div>

          <WorkWithConfidence className="mt-5" />

          {/* Problem */}
          <section className="mt-10">
            <h2 className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
              <span className="text-accent">{icons.target}</span>
              The problem it solves
            </h2>
            <p className="mt-3 leading-relaxed text-ink/85">{project.problem}</p>
          </section>

          {/* Features */}
          <section className="mt-10">
            <h2 className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
              <span className="text-accent">{icons.spark}</span>
              Key features
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 rounded-xl border border-line bg-surface px-4 py-3.5"
                >
                  <span className="mt-0.5 text-accent">{icons.check}</span>
                  <span className="text-sm leading-relaxed text-ink/85">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tech */}
          <section className="mt-10">
            <h2 className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
              <span className="text-accent">{icons.box}</span>
              Technology stack
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {stackGroups.map(([group, items]) => (
                <div
                  key={group}
                  className="rounded-2xl border border-line bg-surface p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {group}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {items.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {project.tech && project.tech.length > 0 && (
                <div className="rounded-2xl border border-line bg-surface p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Highlights
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-paper px-2.5 py-1 text-xs font-semibold text-ink/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Extra gallery */}
          {extraGallery.length > 0 && (
            <section className="mt-10">
              <h2 className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
                <span className="text-accent">{icons.external}</span>
                Gallery
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {extraGallery.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${project.name} screenshot`}
                    loading="lazy"
                    className="aspect-[16/10] w-full rounded-xl border border-line object-cover shadow-card"
                  />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Sidebar — the "Up next" column */}
        <aside className="lg:sticky lg:top-20 lg:h-fit lg:self-start">
          <div className="space-y-6">
            {/* About card */}
            <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-sm font-semibold">
                    About this product
                  </p>
                </div>
              </div>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Status</dt>
                  <dd className="font-medium">{project.statusLabel}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Type</dt>
                  <dd className="font-medium">{project.type}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Category</dt>
                  <dd className="font-medium">{project.category}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Year</dt>
                  <dd className="font-medium">{project.year}</dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
                {(project.tech || []).slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-paper px-2 py-1 text-[11px] font-semibold text-ink/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {phoneHref() ? (
                <a
                  href={phoneHref()}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  {icons.phone}
                  Call {cms.site.phone}
                </a>
              ) : (
                <a
                  href={emailHref}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  {icons.mail}
                  Contact / discuss
                </a>
              )}
              {project.acquirable && (project.upwork || upworkUrl()) && (
                <div className="mt-3">
                  <UpworkAcquire
                    acquireUrl={project.upwork}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Up next */}
            <div>
              <div className="flex items-center justify-between px-1">
                <h2 className="font-display text-base font-semibold tracking-tight">
                  Up next
                </h2>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
              <div className="mt-3 space-y-3">
                {upNext.map((p) => (
                  <UpNextItem key={p.slug} project={p} />
                ))}
                {upNext.length === 0 && (
                  <p className="text-sm text-muted">
                    More products coming soon.
                  </p>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function UpNextItem({ project }) {
  return (
    <a
      href={`#/products/${project.slug}`}
      className="group flex gap-3 rounded-xl transition-colors hover:bg-accent-soft/50"
    >
      <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg bg-night-soft">
        <PreviewPlayer project={project} />
      </div>
      <div className="min-w-0 py-0.5">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
          {project.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
          {project.tagline}
        </p>
        <p className="mt-1.5 text-[11px] font-medium text-muted/80">
          {project.type} · {project.year}
        </p>
      </div>
    </a>
  );
}