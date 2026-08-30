import { useEffect } from "react";

export const BASE_URL = "https://abeltattah.vercel.app";

export const siteUrl = (path = "/") => BASE_URL + path;

export function absoluteAsset(src) {
  if (!src) return `${BASE_URL}/images/banner.png`;
  if (/^https?:\/\//i.test(src)) return src;
  return BASE_URL + (src.startsWith("/") ? src : `/${src}`);
}

function setMeta(attr, key, value) {
  const el = document.head.querySelector(`${attr}="${key}"`);
  if (!el) {
    const created = document.createElement("meta");
    created.setAttribute(attr, key);
    created.setAttribute("content", value);
    document.head.appendChild(created);
  } else {
    el.setAttribute("content", value);
  }
}

export function applyMeta(meta = {}) {
  const title = meta.title || "Abel Mawunyo Tattah — Software Products";
  const desc =
    meta.description ||
    "I design, build, deploy and ship software products.";
  const image = absoluteAsset(meta.image || "/images/banner.png");
  const url = meta.url || `${BASE_URL}/`;

  document.title = title;
  setMeta("name", "description", desc);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", desc);
  setMeta("property", "og:image", image);
  setMeta("property", "og:url", url);
  setMeta("property", "og:type", meta.type || "website");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", desc);
  setMeta("name", "twitter:image", image);
}

export function usePageMeta(meta = {}) {
  useEffect(() => {
    applyMeta(meta);
  }, [JSON.stringify(meta)]);
}