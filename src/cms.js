import { useEffect } from "react";
import data from "../content/cms.json";

// Single source of truth for every piece of site content.
// Editing content/cms.json (via the /admin editor, or by hand) is
// hot-reloaded by Vite here and flows straight into the public view.
export const cms = data;

export const STATUS_META = {
  live: { label: "Live" },
  development: { label: "In Development" },
  client: { label: "Client Project" },
  experiment: { label: "Experiment" },
};

export const STATUS_OPTIONS = Object.entries(STATUS_META).map(
  ([id, meta]) => ({ id, label: meta.label })
);

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${cms.site.shortName}` : cms.site.name;
  }, [title]);
}