import { STATUS_META } from "../cms.js";

export function StatusBadge({ project }) {
  const label = project.statusLabel || STATUS_META[project.status]?.label;
  if (!label) return null;
  return (
    <span className="theme-chip">
      <span className="theme-chip-dot" />
      {label}
    </span>
  );
}
