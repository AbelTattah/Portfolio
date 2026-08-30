import { Link } from "react-router-dom";
import { usePageTitle } from "../cms.js";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-5 py-24 text-center">
      <p className="font-display text-6xl font-semibold text-line sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 font-display text-2xl font-semibold">
        This page isn't in the gallery
      </h1>
      <p className="mt-2 max-w-sm text-muted">
        The link may be stale, or the product may have been moved.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-card transition-colors hover:bg-accent/90"
      >
        Back to gallery
      </Link>
    </div>
  );
}