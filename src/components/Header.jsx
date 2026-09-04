import { useState } from "react";
import { Link } from "react-router-dom";
import { cms, phoneHref } from "../cms.js";

const NAV = [
  { label: "Work", to: { pathname: "/", hash: "gallery" } },
  { label: "Experience", to: { pathname: "/experience" } },
  { label: "Contact", to: { pathname: "/", hash: "contact" } },
  { label: "Me", to: { pathname: "/me" } },
];

const githubSocial = cms.site.socials.find((s) => s.label === "GitHub");

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex items-center justify-between px-5 py-3 sm:px-8">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5 rounded-lg transition-opacity hover:opacity-80"
        >
          <img
            src={cms.site.logo}
            alt={cms.site.shortName}
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-line"
          />
          <span className="truncate font-display text-[15px] font-semibold tracking-tight">
            {cms.site.shortName}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 sm:flex sm:gap-6">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            {githubSocial && (
              <a
                href={githubSocial.url}
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-full border border-line px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent lg:block"
              >
                {githubSocial.label}
              </a>
            )}
            {phoneHref() && (
              <a
                href={phoneHref()}
                className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-accent/90"
              >
                {cms.site.phoneLabel || "Call me"}
              </a>
            )}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-accent-soft sm:hidden"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line/80 bg-paper pb-4 pt-2 sm:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-accent-soft hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            {githubSocial && (
              <a
                href={githubSocial.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-accent-soft hover:text-accent"
              >
                {githubSocial.label}
              </a>
            )}
            {phoneHref() && (
              <a
                href={phoneHref()}
                className="mt-2 rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-white shadow-card transition-colors hover:bg-accent/90"
              >
                {cms.site.phoneLabel || "Call me"}
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}