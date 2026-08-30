import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { cms, STATUS_OPTIONS, usePageTitle } from "../cms.js";

const inputCls =
  "w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";
const labelCls =
  "mb-1 block text-xs font-semibold uppercase tracking-wider text-muted";

const clone = (v) => JSON.parse(JSON.stringify(v));

function Field({ label, value, onChange, textarea, hint, rows = 3, type }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {textarea ? (
        <textarea
          className={inputCls + " leading-relaxed"}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={inputCls}
          type={type || "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

function ListField({ label, value, onChange, hint }) {
  return (
    <Field
      label={label}
      textarea
      value={value.join("\n")}
      onChange={(text) =>
        onChange(text.split("\n").map((s) => s.trim()).filter(Boolean))
      }
      hint={hint || "One item per line"}
    />
  );
}

function Group({ title, children }) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
      <h2 className="font-display text-base font-semibold">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

const NAV = [
  { id: "site", label: "Site" },
  { id: "home", label: "Home page" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "me", label: "Me" },
  { id: "contact", label: "Contact" },
  { id: "footer", label: "Footer" },
];

export default function Admin() {
  usePageTitle("Content editor");
  const [active, setActive] = useState("site");
  const [draft, setDraft] = useState(() => clone(cms));
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "idle", msg: "" });

  const dirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(cms),
    [draft]
  );

  function commit(slice, value) {
    const next = clone(draft);
    next[slice] = value;
    setDraft(next);
  }

  async function save() {
    setSaving(true);
    setStatus({ type: "saving", msg: "Saving…" });
    try {
      const res = await fetch("/__cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Save failed");
      setStatus({
        type: "ok",
        msg: "Saved to content/cms.json. The public view has updated.",
      });
    } catch (err) {
      setStatus({
        type: "error",
        msg: `${err.message} — file writes only work in local dev (npm run dev). Use "Export" to grab the JSON and commit it instead.`,
      });
    } finally {
      setSaving(false);
    }
  }

  function download() {
    const blob = new Blob([JSON.stringify(draft, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cms.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copy() {
    await navigator.clipboard.writeText(JSON.stringify(draft, null, 2));
    setStatus({ type: "ok", msg: "Copied JSON to clipboard." });
  }

  const statusColor =
    status.type === "ok"
      ? "text-emerald-700 bg-emerald-50"
      : status.type === "error"
        ? "text-red-700 bg-red-50"
        : status.type === "saving"
          ? "text-amber-700 bg-amber-50"
          : "text-muted bg-paper";

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Local file CMS
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight">
            Content editor
          </h1>
          <p className="mt-1 text-sm text-muted">
            Every change writes straight to{" "}
            <code className="rounded bg-paper px-1.5 py-0.5 text-[12px]">
              content/cms.json
            </code>{" "}
            — instantly visible in the public view, shipped with every deploy.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/"
            className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            View site
          </Link>
          <button
            type="button"
            onClick={download}
            className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Export
          </button>
          <button
            type="button"
            onClick={copy}
            className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Copy JSON
          </button>
          <button
            type="button"
            onClick={() => {
              setDraft(clone(cms));
              setStatus({ type: "idle", msg: "Discarded local changes." });
            }}
            disabled={!dirty}
            className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-card transition-colors hover:bg-accent/90 disabled:opacity-60"
          >
            {saving ? "Saving…" : dirty ? "Save changes" : "Saved"}
          </button>
        </div>
      </div>

      {status.msg && (
        <div
          className={
            "mt-4 rounded-xl px-4 py-3 text-sm font-medium " + statusColor
          }
        >
          {status.msg}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        {/* Section nav */}
        <nav className="flex gap-2 lg:flex-col">
          {NAV.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setActive(n.id)}
              className={
                "rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors " +
                (active === n.id
                  ? "bg-accent text-white"
                  : "text-muted hover:bg-accent-soft hover:text-accent")
              }
            >
              {n.label}
              {n.id === "projects" && (
                <span
                  className={
                    "ml-2 text-xs " +
                    (active === n.id ? "text-white/70" : "text-muted/60")
                  }
                >
                  {draft.projects.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Panels */}
        <div className="min-w-0">
          {active === "site" && (
            <SitePanel
              value={draft.site}
              onChange={(v) => commit("site", v)}
            />
          )}
          {active === "home" && (
            <HomePanel value={draft.home} onChange={(v) => commit("home", v)} />
          )}
          {active === "projects" && (
            <ProjectsPanel
              value={draft.projects}
              onChange={(v) => commit("projects", v)}
            />
          )}
          {active === "experience" && (
            <ExperiencePanel
              value={draft.experience}
              onChange={(v) => commit("experience", v)}
            />
          )}
          {active === "me" && (
            <MePanel value={draft.me} onChange={(v) => commit("me", v)} />
          )}
          {active === "contact" && (
            <ContactPanel
              value={draft.contact}
              onChange={(v) => commit("contact", v)}
            />
          )}
          {active === "footer" && (
            <FooterPanel
              value={draft.footer}
              onChange={(v) => commit("footer", v)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Site ---------------- */

function SitePanel({ value, onChange }) {
  const set = (k) => (v) => onChange({ ...value, [k]: v });

  return (
    <div className="space-y-6">
      <Group title="Identity">
        <Field label="Name" value={value.name} onChange={set("name")} />
        <Field
          label="Short name (nav/footer)"
          value={value.shortName}
          onChange={set("shortName")}
        />
        <Field
          label="Role / headline role"
          value={value.role}
          onChange={set("role")}
        />
        <Field label="Logo path" value={value.logo} onChange={set("logo")} />
      </Group>
      <Group title="Contact">
        <Field
          label="Email"
          type="email"
          value={value.email}
          onChange={set("email")}
        />
        <Field
          label="Phone number"
          value={value.phone || ""}
          onChange={set("phone")}
          hint="Powers the Call buttons in the header, closing CTA and footer. Leave empty to hide them."
        />
        <Field
          label="Phone button label"
          value={value.phoneLabel || ""}
          onChange={set("phoneLabel")}
          hint="Defaults to the number itself."
        />
        <Field
          label="Upwork profile URL"
          value={value.upwork || ""}
          onChange={set("upwork")}
          hint="Powers the 'Acquire through Upwork' button and the (i) verify icon, plus the Work With Confidence panel. Leave empty to hide them."
        />
        <Field label="Location" value={value.location} onChange={set("location")} />
        <Field
          label="Availability"
          value={value.availability}
          onChange={set("availability")}
        />
      </Group>
      <Group title="Social links">
        {value.socials.map((s, i) => (
          <div
            key={i}
            className="grid grid-cols-1 gap-3 rounded-xl border border-line p-3 sm:grid-cols-[1fr_2fr_auto]"
          >
            <Field
              label="Label"
              value={s.label}
              onChange={(v) =>
                onChange({
                  ...value,
                  socials: value.socials.map((x, j) =>
                    j === i ? { ...x, label: v } : x
                  ),
                })
              }
            />
            <Field
              label="URL"
              value={s.url}
              onChange={(v) =>
                onChange({
                  ...value,
                  socials: value.socials.map((x, j) =>
                    j === i ? { ...x, url: v } : x
                  ),
                })
              }
            />
            <button
              type="button"
              onClick={() =>
                onChange({ ...value, socials: value.socials.filter((_, j) => j !== i) })
              }
              className="self-end rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange({ ...value, socials: [...value.socials, { label: "", url: "" }] })}
          className="rounded-full border border-dashed border-line px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
        >
          + Add social link
        </button>
      </Group>
    </div>
  );
}

/* ---------------- Home ---------------- */

function HomePanel({ value, onChange }) {
  const set = (k) => (v) => onChange({ ...value, [k]: v });
  const setMast = (k) => (v) =>
    onChange({ ...value, masthead: { ...value.masthead, [k]: v } });

  return (
    <div className="space-y-6">
      <Group title="Masthead (compact intro)">
        <Field
          label="Eyebrow"
          value={value.masthead.eyebrow}
          onChange={setMast("eyebrow")}
        />
        <Field
          label="Headline"
          textarea
          value={value.masthead.headline}
          onChange={setMast("headline")}
        />
        <Field
          label="Subhead"
          textarea
          value={value.masthead.subhead}
          onChange={setMast("subhead")}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Primary CTA label"
            value={value.masthead.primaryCta.label}
            onChange={(v) =>
              setMast("primaryCta")({ ...value.masthead.primaryCta, label: v })
            }
          />
          <Field
            label="Primary CTA anchor"
            value={value.masthead.primaryCta.url}
            onChange={(v) =>
              setMast("primaryCta")({ ...value.masthead.primaryCta, url: v })
            }
          />
          <Field
            label="Secondary CTA label"
            value={value.masthead.secondaryCta.label}
            onChange={(v) =>
              setMast("secondaryCta")({ ...value.masthead.secondaryCta, label: v })
            }
          />
          <Field
            label="Secondary CTA anchor"
            value={value.masthead.secondaryCta.url}
            onChange={(v) =>
              setMast("secondaryCta")({ ...value.masthead.secondaryCta, url: v })
            }
          />
        </div>
      </Group>

      <Group title="Gallery">
        <Field
          label="Section title"
          value={value.galleryTitle}
          onChange={set("galleryTitle")}
        />
        <Field
          label="Note under title"
          value={value.galleryNote}
          onChange={set("galleryNote")}
        />
      </Group>

      <Group title="Filters (category chips)">
        <p className="text-sm text-muted">
          Filters are matched by project fields:{" "}
          <code className="rounded bg-paper px-1 text-xs">acquirable</code>,{" "}
          <code className="rounded bg-paper px-1 text-xs">status</code>. Their
          labels live here.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {value.filters.map((f, i) => (
            <Field
              key={f.id}
              label={`Label — ${f.id}`}
              value={f.label}
              onChange={(v) =>
                onChange({
                  ...value,
                  filters: value.filters.map((x, j) =>
                    j === i ? { ...x, label: v } : x
                  ),
                })
              }
            />
          ))}
        </div>
      </Group>

      <Group title="Process strip">
        <Field
          label="Title"
          value={value.howTitle}
          onChange={set("howTitle")}
        />
        {value.howSteps.map((step, i) => (
          <div key={step.step} className="rounded-xl border border-line p-3">
            <p className="text-xs font-semibold text-muted">
              Step {i + 1} · {step.step}
            </p>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[120px_1fr]">
              <Field
                label="Numeral"
                value={step.step}
                onChange={(v) =>
                  onChange({
                    ...value,
                    howSteps: value.howSteps.map((x, j) =>
                      j === i ? { ...x, step: v } : x
                    ),
                  })
                }
              />
              <Field
                label="Title"
                value={step.title}
                onChange={(v) =>
                  onChange({
                    ...value,
                    howSteps: value.howSteps.map((x, j) =>
                      j === i ? { ...x, title: v } : x
                    ),
                  })
                }
              />
            </div>
            <div className="mt-3">
              <Field
                label="Text"
                textarea
                rows={2}
                value={step.text}
                onChange={(v) =>
                  onChange({
                    ...value,
                    howSteps: value.howSteps.map((x, j) =>
                      j === i ? { ...x, text: v } : x
                    ),
                  })
                }
              />
            </div>
          </div>
        ))}
      </Group>

      <Group title="Closing CTA">
        <Field
          label="Title"
          value={value.closingTitle}
          onChange={set("closingTitle")}
        />
        <Field
          label="Text"
          textarea
          value={value.closingText}
          onChange={set("closingText")}
        />
      </Group>
    </div>
  );
}

/* ---------------- Projects ---------------- */

const defaultProject = {
  slug: "new-project",
  name: "New product",
  tagline: "Describe the product in one line.",
  category: "Product",
  type: "Web App",
  status: "development",
  statusLabel: "In Development",
  featured: false,
  image: "/images/placeholder.svg",
  gallery: ["/images/placeholder.svg"],
  video: "",
  previewVideo: "",
  overview: "What is it?",
  problem: "What problem does it solve?",
  features: ["A feature"],
  tech: ["React"],
  stack: { Frontend: ["React"] },
  demo: "",
  repo: "",
  upwork: "",
  acquirable: false,
  priceNote: "",
  year: "2026",
};

function ProjectsPanel({ value, onChange }) {
  const update = (i, updater) =>
    onChange(value.map((p, j) => (j === i ? updater(p) : p)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          Order shown here is the order shown on the site. Featured products
          span two columns in the gallery.
        </p>
        <button
          type="button"
          onClick={() => onChange([...value, clone(defaultProject)])}
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-card transition-colors hover:bg-accent/90"
        >
          + New product
        </button>
      </div>

      {value.map((p, i) => (
        <ProjectEditor
          key={p.slug + i}
          index={i}
          project={p}
          count={value.length}
          onUpdate={(np) => update(i, () => np)}
          onMove={(dir) => {
            const next = [...value];
            const target = i + dir;
            if (target < 0 || target >= next.length) return;
            [next[i], next[target]] = [next[target], next[i]];
            onChange(next);
          }}
          onDelete={() => onChange(value.filter((_, j) => j !== i))}
        />
      ))}

      {value.length === 0 && (
        <p className="rounded-2xl border border-dashed border-line p-8 text-center text-muted">
          No products yet — add one to start the gallery.
        </p>
      )}
    </div>
  );
}

function ProjectEditor({ index, project, count, onUpdate, onMove, onDelete }) {
  const [open, setOpen] = useState(false);
  const set = (k) => (v) => onUpdate({ ...project, [k]: v });
  const stackGroups = Object.entries(project.stack || {});

  function setStackGroup(oldKey, newKey, items) {
    const stack = { ...project.stack };
    delete stack[oldKey];
    stack[newKey] = items;
    onUpdate({ ...project, stack });
  }

  function moveGroup(i, dir) {
    const keys = Object.keys(project.stack || {});
    const target = i + dir;
    if (target < 0 || target >= keys.length) return;
    const stack = {};
    for (let j = 0; j < keys.length; j++) {
      if (j === target) stack[keys[i]] = project.stack[keys[i]];
      if (j === i) stack[keys[target]] = project.stack[keys[target]];
      if (j !== i && j !== target) stack[keys[j]] = project.stack[keys[j]];
    }
    onUpdate({ ...project, stack });
  }

  return (
    <section className="rounded-2xl border border-line bg-surface shadow-card">
      <header className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-4">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2.5 text-left"
        >
          <span className="text-muted">{index + 1}.</span>
          <span className="font-display text-base font-semibold">{project.name || "Untitled"}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={"transition-transform " + (open ? "rotate-180" : "")}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <span className="ml-auto text-xs text-muted">#{project.slug}</span>
      </header>

      <div className="px-5 py-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-ink disabled:opacity-40"
          >
            ↑ Up
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={index === count - 1}
            className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-ink disabled:opacity-40"
          >
            ↓ Down
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            Delete
          </button>
          <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={!!project.featured}
              onChange={(e) => set("featured")(e.target.checked)}
              className="h-4 w-4 accent-accent"
            />
            Featured (wide card)
          </label>
        </div>
      </div>

      {open && (
        <div className="space-y-6 border-t border-line px-5 py-6 sm:px-6">
          {/* Identity */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Slug (URL)" value={project.slug} onChange={set("slug")} hint="Used in /#/products/<slug>" />
            <Field label="Name" value={project.name} onChange={set("name")} />
            <div className="sm:col-span-2">
              <Field
                label="Tagline"
                value={project.tagline}
                onChange={set("tagline")}
              />
            </div>
            <Field label="Category" value={project.category} onChange={set("category")} />
            <Field label="Type" value={project.type} onChange={set("type")} />
            <Field label="Year" value={project.year} onChange={set("year")} />
          </div>

          {/* Status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={labelCls}>Status (drives badge + filters)</span>
              <select
                className={inputCls}
                value={project.status}
                onChange={(e) => {
                  const id = e.target.value;
                  const def = STATUS_OPTIONS.find((o) => o.id === id);
                  onUpdate({
                    ...project,
                    status: id,
                    statusLabel: def ? def.label : project.statusLabel,
                  });
                }}
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <Field
              label="Badge text (overrides status label)"
              value={project.statusLabel}
              onChange={set("statusLabel")}
              hint="e.g. “Live on Google Play” or “In Development — Available for Acquisition”"
            />
          </div>

          {/* Acquisition */}
          <Group title="Acquisition">
            <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-line p-3.5">
              <input
                type="checkbox"
                checked={!!project.acquirable}
                onChange={(e) => set("acquirable")(e.target.checked)}
                className="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-semibold">
                {project.acquirable
                  ? "This product is for sale"
                  : "Not for sale"}
              </span>
            </label>
            {project.acquirable && (
              <>
                <Field
                  label="Upwork project link"
                  value={project.upwork || ""}
                  onChange={set("upwork")}
                  hint="Deep link to this product's Upwork posting — powers the 'Acquire through Upwork' button. Leave empty to fall back to your Upwork profile URL."
                />
                <Field
                  label="Price / what's included"
                  textarea
                  value={project.priceNote}
                  onChange={set("priceNote")}
                  hint="Shown in the acquire block on the product page."
                />
              </>
            )}
          </Group>

          {/* Copy */}
          <Group title="Copy">
            <Field
              label="Overview — what is it?"
              textarea
              value={project.overview}
              onChange={set("overview")}
            />
            <Field
              label="Problem it solves"
              textarea
              value={project.problem}
              onChange={set("problem")}
            />
            <ListField
              label="Key features"
              value={project.features}
              onChange={set("features")}
            />
          </Group>

          {/* Media */}
          <Group title="Media">
            <Field label="Cover image" value={project.image} onChange={set("image")} hint="Path under /images/ or a full URL" />
            <Field
              label="Main video (YouTube link or ID)"
              value={project.video}
              onChange={set("video")}
              hint="Shown as the big player on the project page. Paste a watch/shorts/embed/youtu.be link or a raw video ID. Leave empty to show the cover image instead."
            />
            <Field
              label="Preview video (hover) — optional"
              value={project.previewVideo}
              onChange={set("previewVideo")}
              hint="Played muted when hovering a gallery card, like YouTube. Leave empty to reuse the main video."
            />
            <ListField
              label="Gallery images"
              value={project.gallery}
              onChange={set("gallery")}
              hint="One path or URL per line (including the cover if you like)"
            />
          </Group>

          {/* Tech */}
          <Group title="Technology">
            <ListField label="Tech highlights" value={project.tech} onChange={set("tech")} />
            {stackGroups.map(([group, items], i) => (
              <div key={group} className="rounded-xl border border-line p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Stack group
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => moveGroup(i, -1)}
                      className="rounded-md px-2 py-1 text-xs text-muted hover:text-ink"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveGroup(i, 1)}
                      className="rounded-md px-2 py-1 text-xs text-muted hover:text-ink"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const stack = { ...project.stack };
                        delete stack[group];
                        onUpdate({ ...project, stack });
                      }}
                      className="rounded-md px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field
                    label="Group name"
                    value={group}
                    onChange={(v) => setStackGroup(group, v, items)}
                  />
                  <ListField
                    label="Items"
                    value={items}
                    onChange={(v) => setStackGroup(group, group, v)}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                onUpdate({
                  ...project,
                  stack: { ...project.stack, "New group": [] },
                })
              }
              className="rounded-full border border-dashed border-line px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
            >
              + Add stack group
            </button>
          </Group>

          {/* Links */}
          <Group title="Links">
            <Field label="Demo / live URL" value={project.demo} onChange={set("demo")} hint="Leave empty to hide the button" />
            <Field label="Source / repo URL" value={project.repo} onChange={set("repo")} />
          </Group>
        </div>
      )}
    </section>
  );
}

/* ---------------- Me ---------------- */

const defaultMeItem = {
  type: "image",
  src: "/images/me/photo.jpg",
  caption: "Caption this",
  date: "",
};

function MePanel({ value, onChange }) {
  const set = (k) => (v) => onChange({ ...value, [k]: v });
  const items = value.items || [];

  return (
    <div className="space-y-6">
      <Group title="Me page">
        <Field label="Heading" value={value.heading} onChange={set("heading")} />
      </Group>

      <Group title="Gallery items">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted">
            Drop media into{" "}
            <code className="rounded bg-paper px-1.5 py-0.5 text-[12px]">
              public/images/me/
            </code>{" "}
            (or use any URL), then add items below.
          </p>
          <button
            type="button"
            onClick={() => onChange({ ...value, items: [...items, clone(defaultMeItem)] })}
            className="shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-card transition-colors hover:bg-accent/90"
          >
            + Add photo / clip
          </button>
        </div>

        {items.map((item, i) => (
          <div key={i} className="rounded-xl border border-line p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Item {i + 1}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const next = [...items];
                    const t = i - 1;
                    if (t < 0) return;
                    [next[i], next[t]] = [next[t], next[i]];
                    onChange({ ...value, items: next });
                  }}
                  disabled={i === 0}
                  className="rounded-md border border-line px-2 py-1 text-xs text-muted disabled:opacity-40"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const next = [...items];
                    const t = i + 1;
                    if (t >= next.length) return;
                    [next[i], next[t]] = [next[t], next[i]];
                    onChange({ ...value, items: next });
                  }}
                  disabled={i === items.length - 1}
                  className="rounded-md border border-line px-2 py-1 text-xs text-muted disabled:opacity-40"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onChange({ ...value, items: items.filter((_, j) => j !== i) })
                  }
                  className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[140px_1fr]">
              <label className="block">
                <span className={labelCls}>Type</span>
                <select
                  className={inputCls}
                  value={item.type}
                  onChange={(v) =>
                    onChange({
                      ...value,
                      items: items.map((x, j) =>
                        j === i ? { ...x, type: v.target.value } : x
                      ),
                    })
                  }
                >
                  <option value="image">Picture</option>
                  <option value="video">Video clip</option>
                </select>
              </label>
              <Field
                label="File path or URL"
                value={item.src}
                onChange={(v) =>
                  onChange({
                    ...value,
                    items: items.map((x, j) =>
                      j === i ? { ...x, src: v } : x
                    ),
                  })
                }
                hint="e.g. /images/me/vacation.jpg or a full https:// URL"
              />
              <div className="sm:col-span-2">
                <Field
                  label="Caption"
                  value={item.caption}
                  onChange={(v) =>
                    onChange({
                      ...value,
                      items: items.map((x, j) =>
                        j === i ? { ...x, caption: v } : x
                      ),
                    })
                  }
                />
              </div>
              <Field
                label="Date (optional)"
                value={item.date}
                onChange={(v) =>
                  onChange({
                    ...value,
                    items: items.map((x, j) =>
                      j === i ? { ...x, date: v } : x
                    ),
                  })
                }
              />
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <p className="rounded-2xl border border-dashed border-line p-8 text-center text-muted">
            No pictures or clips yet — add one to start the gallery.
          </p>
        )}
      </Group>
    </div>
  );
}

/* ---------------- Contact & Footer ---------------- */

function ContactPanel({ value, onChange }) {
  const set = (k) => (v) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <Group title="Contact section">
        <Field label="Title" value={value.title} onChange={set("title")} />
        <Field
          label="Text"
          textarea
          value={value.text}
          onChange={set("text")}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Email button label"
            value={value.emailLabel}
            onChange={set("emailLabel")}
          />
          <Field
            label="Location label"
            value={value.locationLabel}
            onChange={set("locationLabel")}
          />
        </div>
      </Group>
    </div>
  );
}

function FooterPanel({ value, onChange }) {
  const set = (k) => (v) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <Group title="Footer">
        <Field
          label="Tagline"
          value={value.tagline}
          onChange={set("tagline")}
        />
        <Field
          label="Rights / credit line"
          value={value.rights}
          onChange={set("rights")}
        />
      </Group>
    </div>
  );
}

/* ---------------- Experience ---------------- */

const defaultRole = {
  company: "Company",
  title: "Role",
  period: "Month YYYY – Month YYYY",
  duration: "12 months",
  location: "Accra",
  bullets: ["Delivered…"],
  tech: ["React", "Nodejs"],
};

const defaultEducation = {
  school: "University",
  degree: "Degree",
  period: "2026",
};

function ExperiencePanel({ value, onChange }) {
  const set = (k) => (v) => onChange({ ...value, [k]: v });
  const setContact = (k) => (v) =>
    onChange({ ...value, contact: { ...value.contact, [k]: v } });
  const updateRole = (i, updater) =>
    onChange({
      ...value,
      roles: value.roles.map((r, j) => (j === i ? updater(r) : r)),
    });
  const updateEdu = (i, updater) =>
    onChange({
      ...value,
      education: value.education.map((e, j) => (j === i ? updater(e) : e)),
    });

  return (
    <div className="space-y-6">
      <Group title="Intro">
        <Field label="Heading" value={value.heading} onChange={set("heading")} />
        <Field
          label="Intro line"
          textarea
          value={value.intro}
          onChange={set("intro")}
        />
        <Field
          label="Summary"
          textarea
          rows={5}
          value={value.summary}
          onChange={set("summary")}
        />
      </Group>

      <Group title="Contact">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Location"
            value={value.contact.location}
            onChange={setContact("location")}
          />
          <Field
            label="Email"
            type="email"
            value={value.contact.email}
            onChange={setContact("email")}
          />
          <Field
            label="LinkedIn URL"
            value={value.contact.linkedin}
            onChange={setContact("linkedin")}
          />
          <Field
            label="LinkedIn label"
            value={value.contact.linkedinLabel}
            onChange={setContact("linkedinLabel")}
          />
        </div>
      </Group>

      <Group title="Credentials">
        <ListField label="Top skills" value={value.topSkills} onChange={set("topSkills")} />
        <ListField
          label="Certifications"
          value={value.certifications}
          onChange={set("certifications")}
        />
        <ListField
          label="Languages"
          value={value.languages}
          onChange={set("languages")}
        />
      </Group>

      <Group title="Work history">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted">
            Roles are listed most-recent first on the page.
          </p>
          <button
            type="button"
            onClick={() => onChange({ ...value, roles: [...value.roles, clone(defaultRole)] })}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-card transition-colors hover:bg-accent/90"
          >
            + Add role
          </button>
        </div>

        {value.roles.map((role, i) => (
          <div key={role.company + i} className="rounded-xl border border-line p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="text-sm font-semibold">
                {role.company || "Untitled"} — {role.title}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const next = [...value.roles];
                    const t = i - 1;
                    if (t < 0) return;
                    [next[i], next[t]] = [next[t], next[i]];
                    onChange({ ...value, roles: next });
                  }}
                  disabled={i === 0}
                  className="rounded-md border border-line px-2 py-1 text-xs text-muted disabled:opacity-40"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const next = [...value.roles];
                    const t = i + 1;
                    if (t >= next.length) return;
                    [next[i], next[t]] = [next[t], next[i]];
                    onChange({ ...value, roles: next });
                  }}
                  disabled={i === value.roles.length - 1}
                  className="rounded-md border border-line px-2 py-1 text-xs text-muted disabled:opacity-40"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...value,
                      roles: value.roles.filter((_, j) => j !== i),
                    })
                  }
                  className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field
                label="Company"
                value={role.company}
                onChange={(v) => updateRole(i, (r) => ({ ...r, company: v }))}
              />
              <Field
                label="Title"
                value={role.title}
                onChange={(v) => updateRole(i, (r) => ({ ...r, title: v }))}
              />
              <Field
                label="Period"
                value={role.period}
                onChange={(v) => updateRole(i, (r) => ({ ...r, period: v }))}
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[140px_1fr]">
                <Field
                  label="Duration"
                  value={role.duration}
                  onChange={(v) => updateRole(i, (r) => ({ ...r, duration: v }))}
                />
                <Field
                  label="Location"
                  value={role.location}
                  onChange={(v) => updateRole(i, (r) => ({ ...r, location: v }))}
                />
              </div>
              <div className="sm:col-span-2">
                <ListField
                  label="Highlights"
                  value={role.bullets}
                  onChange={(v) => updateRole(i, (r) => ({ ...r, bullets: v }))}
                />
              </div>
              <div className="sm:col-span-2">
                <ListField
                  label="Tech stack"
                  value={role.tech}
                  onChange={(v) => updateRole(i, (r) => ({ ...r, tech: v }))}
                />
              </div>
            </div>
          </div>
        ))}
      </Group>

      <Group title="Education">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted">Degrees / qualifications.</p>
          <button
            type="button"
            onClick={() =>
              onChange({
                ...value,
                education: [...value.education, clone(defaultEducation)],
              })
            }
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-card transition-colors hover:bg-accent/90"
          >
            + Add education
          </button>
        </div>

        {value.education.map((e, i) => (
          <div key={e.school + i} className="grid grid-cols-1 items-end gap-3 rounded-xl border border-line p-4 sm:grid-cols-[1fr_1fr_1fr_auto]">
            <Field
              label="School"
              value={e.school}
              onChange={(v) => updateEdu(i, (x) => ({ ...x, school: v }))}
            />
            <Field
              label="Degree"
              value={e.degree}
              onChange={(v) => updateEdu(i, (x) => ({ ...x, degree: v }))}
            />
            <Field
              label="Period"
              value={e.period}
              onChange={(v) => updateEdu(i, (x) => ({ ...x, period: v }))}
            />
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...value,
                  education: value.education.filter((_, j) => j !== i),
                })
              }
              className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        ))}
      </Group>
    </div>
  );
}