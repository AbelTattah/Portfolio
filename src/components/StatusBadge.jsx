import { STATUS_META } from "../cms.js";

export function StatusBadge({ project }) {
  const meta = STATUS_META[project.status] || STATUS_META.experiment;
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset backdrop-blur-sm " +
        meta.chip
      }
    >
      <span className={"h-1.5 w-1.5 rounded-full " + meta.dot} />
      {project.statusLabel || meta.label}
    </span>
  );
}