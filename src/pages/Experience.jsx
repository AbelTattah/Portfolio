import { Link } from "react-router-dom";
import { cms, usePageTitle } from "../cms.js";

const icons = {
  briefcase: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  hat: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10 12 5 2 10l10 5 10-5zM6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
    </svg>
  ),
  spark: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.5-6.5-2 2m-7 7-2 2m11 0-2-2m-7-7-2-2" />
    </svg>
  ),
  shield: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  globe: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  mail: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  pin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
        {icon}
      </span>
      <h2 className="font-display text-xl font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}

export default function Experience() {
  usePageTitle("Experience");
  const xp = cms.experience;
  const c = xp.contact;

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

      {/* Header */}
      <div className="mt-6 border-b border-line pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {xp.heading}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-ink/70">
              Full-Stack Developer · TypeScript
            </span>
            <span className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-ink/70">
              {c.location}
            </span>
          </div>
        </div>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">{xp.intro}</p>
      </div>

      {/* Contact strip */}
      <div className="flex flex-wrap gap-3 pt-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium">
          <span className="text-accent">{icons.pin}</span>
          {c.location}
        </span>
        <a
          href={`mailto:${c.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          <span className="text-accent">{icons.mail}</span>
          {c.email}
        </a>
        <a
          href={c.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          <span className="text-accent">{icons.linkedin}</span>
          {c.linkedinLabel}
        </a>
      </div>

      {/* Summary + credentials */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
          <SectionHeader icon={icons.spark} title="Summary" />
          <p className="mt-4 leading-relaxed text-ink/85">{xp.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {xp.topSkills.map((s) => (
              <span
                key={s}
                className="rounded-md bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            <SectionHeader icon={icons.shield} title="Certifications" />
            <ul className="mt-4 space-y-2.5">
              {xp.certifications.map((c) => (
                <li key={c} className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-600">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink/85">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            <SectionHeader icon={icons.globe} title="Languages" />
            <div className="mt-4 flex flex-wrap gap-2">
              {xp.languages.map((l) => (
                <span
                  key={l}
                  className="rounded-md bg-paper px-2.5 py-1 text-xs font-semibold text-ink/70"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <section className="mt-12">
        <SectionHeader icon={icons.briefcase} title="Work history" />
        <div className="relative mt-8 space-y-8 border-l border-line pl-6 sm:pl-8">
          {xp.roles.map((role) => (
            <article key={role.company + role.period} className="relative">
              <span className="absolute -left-[30px] top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-accent-soft sm:-left-[37px]" />
              <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {role.title}
                    </h3>
                    <p className="mt-0.5 text-sm font-semibold text-accent">
                      {role.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-ink">{role.period}</p>
                    <p className="text-xs text-muted">
                      {role.duration} · {role.location}
                    </p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {role.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/85"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted/60" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                  {role.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-paper px-2.5 py-1 text-[11px] font-semibold text-ink/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-12">
        <SectionHeader icon={icons.hat} title="Education" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {xp.education.map((e) => (
            <div
              key={e.school + e.period}
              className="rounded-2xl border border-line bg-surface p-6 shadow-card"
            >
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {e.school}
              </h3>
              <p className="mt-1 text-sm font-medium text-ink/80">{e.degree}</p>
              <p className="mt-2 text-xs font-medium text-muted">{e.period}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}