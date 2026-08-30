import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CMS_FILE = path.join(__dirname, "content", "cms.json");

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Local CMS writer — exposes a dev-only POST endpoint that the /admin
    // page uses to persist edits straight to content/cms.json. Because that
    // file is imported by src/cms.js, Vite hot-reloads the change into the
    // public view instantly. Bundled into static builds automatically.
    {
      name: "cms-writer",
      apply: "serve",
      configureServer(server) {
        server.middlewares.use("/__cms", (req, res, next) => {
          if (req.method !== "POST") return next();
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => {
            try {
              const data = JSON.parse(body);
              validateCms(data);
              fs.mkdirSync(path.dirname(CMS_FILE), { recursive: true });
              fs.writeFileSync(CMS_FILE, JSON.stringify(data, null, 2) + "\n", "utf8");
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true }));
            } catch (err) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: false, error: String((err && err.message) || err) }));
            }
          });
        });
      },
    },
  ],
  server: { port: 5173 },
});

function validateCms(data) {
  if (!data || typeof data !== "object") throw new Error("Content must be a JSON object.");
  if (!Array.isArray(data.projects)) throw new Error('Content must contain a "projects" array.');
}