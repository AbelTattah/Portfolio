import { Link } from "react-router-dom";
import { cms, phoneHref } from "../cms.js";

const NAV = [
  { label: "Work", to: { pathname: "/", hash: "gallery" } },
  { label: "Experience", to: { pathname: "/experience" } },
  { label: "Contact", to: { pathname: "/", hash: "contact" } },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-lg transition-opacity hover:opacity-80"
        >
          <img
            src={cms.site.logo}
            alt={cms.site.shortName}
            className="h-9 w-9 rounded-full object-cover ring-1 ring-line"
          />
          <span className="font-display text-[15px] font-semibold tracking-tight">
            {cms.site.shortName}
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-6">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          {cms.site.socials
            .filter((s) => s.label === "GitHub")
            .map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-full border border-line px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent sm:block"
              >
                {s.label}
              </a>
            ))}
          {phoneHref() && (
            <a
              href={phoneHref()}
              className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-accent/90"
            >
              {cms.site.phoneLabel || "Call me"}
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}