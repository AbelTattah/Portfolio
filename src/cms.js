import { useEffect } from "react";
import data from "../content/cms.json";

// Single source of truth for every piece of site content.
// Editing content/cms.json (via the /admin editor, or by hand) is
// hot-reloaded by Vite here and flows straight into the public view.
export const cms = data;

export const STATUS_META = {
  acquisition: {
    label: "Available for Acquisition",
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    chip: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  },
  live: {
    label: "Live",
    dot: "bg-blue-500",
    text: "text-blue-700",
    chip: "bg-blue-50 text-blue-700 ring-blue-600/15",
  },
  development: {
    label: "In Development",
    dot: "bg-amber-500",
    text: "text-amber-700",
    chip: "bg-amber-50 text-amber-700 ring-amber-600/20",
  },
  client: {
    label: "Client Project",
    dot: "bg-violet-500",
    text: "text-violet-700",
    chip: "bg-violet-50 text-violet-700 ring-violet-600/15",
  },
  experiment: {
    label: "Experiment",
    dot: "bg-slate-400",
    text: "text-slate-600",
    chip: "bg-slate-100 text-slate-600 ring-slate-500/15",
  },
};

export const STATUS_OPTIONS = Object.entries(STATUS_META).map(
  ([id, meta]) => ({ id, label: meta.label })
);

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${cms.site.shortName}` : cms.site.name;
  }, [title]);
}