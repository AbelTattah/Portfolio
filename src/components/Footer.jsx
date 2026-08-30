import { cms, phoneHref } from "../cms.js";
import { upworkUrl } from "./Upwork.jsx";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src={cms.site.logo}
                alt={cms.site.shortName}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="font-display text-base font-semibold">
                {cms.site.name}
              </span>
            </div>
            <p className="mt-2 text-sm text-white/50">
              {cms.footer.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {cms.site.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                {s.label}
              </a>
            ))}
            {phoneHref() && (
              <a
                href={phoneHref()}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                {cms.site.phoneLabel || cms.site.phone}
              </a>
            )}
            {upworkUrl() && (
              <a
                href={upworkUrl()}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                Upwork
              </a>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>{cms.footer.rights.replace("2026", String(year))}</p>
        </div>
      </div>
    </footer>
  );
}