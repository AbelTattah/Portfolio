import { cms } from "../cms.js";

const TRUST_POINTS = [
  {
    title: "Secure payments",
    text: "Your payment is processed through Upwork rather than sent directly to me.",
  },
  {
    title: "Milestone-based work",
    text: "For larger projects, payments can be divided into milestones tied to agreed deliverables.",
  },
  {
    title: "Payment protection",
    text: "Upwork provides payment protection for eligible contracts when its requirements are followed.",
  },
  {
    title: "Clear scope",
    text: "Deliverables, timelines, and project terms are documented on Upwork before work begins.",
  },
  {
    title: "Dispute support",
    text: "If a disagreement arises, Upwork provides a formal process for resolving eligible payment and contract disputes.",
  },
  {
    title: "Verified work history",
    text: "You can review my Upwork profile, previous work, client feedback, and ratings before engaging me.",
  },
];

export const upworkUrl = () => cms.site.upwork;

export function UpworkLink({ className = "", label = "Upwork" }) {
  const url = upworkUrl();
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      {label}
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </svg>
    </a>
  );
}

// "Acquire through Upwork" button + (i) icon. `acquireUrl` is the product's
// own Upwork posting (job link) when set, otherwise it falls back to the
// Upwork profile URL. The (i) icon always opens the profile so buyers can
// verify work history, feedback and ratings.
export function UpworkAcquire({ acquireUrl, className = "" }) {
  const profile = upworkUrl();
  const buyUrl = acquireUrl || profile;
  const infoUrl = profile || acquireUrl;
  if (!buyUrl && !infoUrl) return null;
  return (
    <div className={"flex items-center gap-2 " + className}>
      <a
        href={buyUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-card transition-colors hover:bg-emerald-700"
      >
        Acquire through Upwork
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        </svg>
      </a>
      <a
        href={infoUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Verify my Upwork profile, feedback and ratings"
        title="Verify my Upwork profile, feedback and ratings"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      </a>
    </div>
  );
}

// The "Work With Confidence" disclosure used at acquisition points.
export function WorkWithConfidence({ className = "" }) {
  const url = upworkUrl();
  return (
    <details
      className={
        "group rounded-l border border-line bg-surface shadow-card " + className
      }
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-5 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </span>
          <span className="font-display text-base font-semibold">
            Work With Confidence
          </span>
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted transition-transform group-open:rotate-180"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>

      <div className="border-t border-line px-6 pb-6">
        <p className="mt-5 text-sm leading-relaxed text-ink/85">
          Your project is handled through{" "}
          <strong className="font-semibold">Upwork</strong>, giving you an
          additional layer of protection throughout the engagement.
        </p>

        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TRUST_POINTS.map((point) => (
            <li key={point.title} className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-emerald-600">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span className="text-sm leading-relaxed text-ink/85">
                <strong className="font-semibold">{point.title}:</strong>{" "}
                {point.text}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-sm font-medium leading-relaxed text-ink">
          You get the flexibility of working with an independent developer with
          the added confidence of Upwork's platform.
        </p>

        {url && (
          <div className="mt-5">
            <UpworkLink
              label="Review my Upwork profile — rates, feedback & ratings"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold transition-colors hover:border-emerald-600 hover:text-emerald-700"
            />
          </div>
        )}
      </div>
    </details>
  );
}