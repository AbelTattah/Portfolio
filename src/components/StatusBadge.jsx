import { STATUS_META } from "../cms.js";

export function StatusBadge({ project }) {
  const meta = STATUS_META[project.status] || STATUS_META.experiment;
  return (
    <span className="theme-chip">
      <span className="theme-chip-dot" />
      {project.statusLabel || meta.label}
    </span>
  );
}
