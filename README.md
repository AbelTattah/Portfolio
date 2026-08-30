# Abel Mawunyo Tattah — Portfolio / Product Gallery

A modern, gallery-first software-product portfolio with a **local file CMS**.
Built with Vite + React + Tailwind CSS v4. Deploys as a static site.

Visit the live site: https://portfolio-lp8h.onrender.com/

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

Deploy `dist/` to any static host (Render static site, Netlify, Vercel, etc.).

## The CMS — edit content, no code, no redeploy

All site content lives in one file: **`content/cms.json`**.

Two ways to edit it:

1. **The built-in editor** — open **`/#/admin`** on the running site.
   Edit site details, home-page copy, contact/footer text, and every product
   (copy, media, status, tech stack, acquisition info). Hit **Save changes**
   and it writes straight back to `content/cms.json`.

2. **By hand** — edit the JSON directly.

Either way, because the public view imports `cms.json`:

- While running `npm run dev`, changes appear **instantly** in the browser
  (hot reload, no restart, no rebuild).
- On the next `npm run build` / deploy, the latest content ships **automatically**.

> Note: `Save changes` in `/admin` writes to disk only when running the dev
> server. On a production build there is no write endpoint — use the
> **Export** button there (or edit the JSON) and commit the file.

### What's editable

- **Site** — name, short name, role, logo, email, location, availability, social links
- **Home page** — masthead, gallery title/note, filter labels, process steps, closing CTA
- **Projects** — every product: slug, name, tagline, category, type, status,
  badge text, cover image, gallery, overview, problem, features, tech stack,
  demo/repo links, acquisition flag + price note, ordering, `featured` (wide card)
- **Contact** and **Footer** copy

### Project statuses

`status` drives the badge color and gallery filters:

| id            | Badge color | Used for                        |
| ------------- | ----------- | ------------------------------- |
| `acquisition` | green       | Available for Acquisition       |
| `live`        | blue        | Live products                   |
| `development` | amber       | In development                  |
| `client`      | violet      | Client projects                 |
| `experiment`  | gray        | Side projects / UI experiments  |

## Project structure

```
content/cms.json      ← the CMS database (everything editable)
public/images/        ← static images served at /images/...
src/
  App.jsx             ← routes
  cms.js              ← content import + status/helpers
  pages/              ← Home, ProjectDetail, Admin, NotFound
  components/         ← Header, Footer, ProjectCard, StatusBadge, stats
vite.config.js        ← build config + dev-only CMS write middleware
```

## Deploying to Render

- **Build command:** `npm run build`
- **Publish directory:** `dist`

Rendering is client-side with hash routing, so no SPA redirect/rewrite rule is
needed — deep links and refreshes just work on any static host.