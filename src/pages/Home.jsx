import { useMemo, useState } from "react";
import { cms, phoneHref } from "../cms.js";
import { usePageMeta } from "../lib/meta.js";
import ProjectCard from "../components/ProjectCard.jsx";
import {
  upworkUrl,
  UpworkAcquire,
  WorkWithConfidence,
} from "../components/Upwork.jsx";

function matchFilter(project, filter) {
  switch (filter) {
    case "all":
      return true;
    case "acquisition":
      return project.acquirable;
    case "development":
      return project.status === "development";
    case "live":
      return project.status === "live";
    case "client":
      return project.status === "client";
    case "experiment":
      return project.status === "experiment";
    default:
      return true;
  }
}

export default function Home() {
  const [filter, setFilter] = useState("all");

  usePageMeta({
    title: "Abel Mawunyo Tattah — Software Products",
    description:
      "I design, build, deploy and ship software products. Explore the gallery, watch the builds live, or acquire a product through Upwork.",
    url: "https://abeltattah.vercel.app/",
  });

  const counts = useMemo(() => {
    const map = { all: cms.projects.length };
    for (const p of cms.projects) {
      if (p.acquirable) map.acquisition = (map.acquisition || 0) + 1;
      if (p.status) map[p.status] = (map[p.status] || 0) + 1;
    }
    return map;
  }, []);

  const visible = useMemo(() => {
    const list = cms.projects.filter((p) => matchFilter(p, filter));
    // featured first when browsing all
    if (filter === "all") {
      return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [cms, filter]);

  const h = cms.home;
  const s = cms.site;

  return (
    <div>
      {/* The gallery — the dominant element */}
      <section id="gallery" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {h.galleryTitle}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                {h.galleryNote}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {h.filters.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    className={
                      "rounded-full px-4 py-2 text-sm font-medium transition-all " +
                      (active
                        ? "bg-accent text-white shadow-card"
                        : "border border-line bg-surface text-muted hover:border-accent/40 hover:text-ink")
                    }
                  >
                    {f.label}
                    <span
                      className={
                        "ml-1.5 text-xs " +
                        (active ? "text-white/70" : "text-muted/60")
                      }
                    >
                      {counts[f.id] || 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          {visible.length === 0 && (
            <p className="mt-16 text-center text-muted">
              Nothing here yet — check another category.
            </p>
          )}
        </div>
      </section>

      {/* Process / positioning */}
      <section id="process" className="scroll-mt-20 bg-night text-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {h.howTitle}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {h.howSteps.map((step) => (
              <div key={step.step} className="border-t border-white/15 pt-5">
                <span className="font-display text-sm font-semibold text-accent">
                  {step.step}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section id="contact" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-24">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {h.closingTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{h.closingText}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {phoneHref() && (
              <a
                href={phoneHref()}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-accent/90"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {s.phoneLabel || "Call me"}
                <span className="hidden font-medium text-white/80 sm:inline">· {s.phone}</span>
              </a>
            )}
            {upworkUrl() && (
              <UpworkAcquire className="w-auto" />
            )}
          </div>
          <p className="mt-6 text-xs text-muted">
            {s.location} · {s.availability}
          </p>
          <div className="mx-auto mt-8 max-w-3xl text-left">
            <WorkWithConfidence />
          </div>
        </div>
      </section>
    </div>
  );
}