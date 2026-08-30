// Small YouTube helpers: accept a watch/short/embed/youtu.be URL or a raw
// video ID, and (a) resolve it to an embeddable URL and (b) load the IFrame
// Player API exactly once for hover-preview playback.

const ID_RE = /^[\w-]{11}$/;

export function parseYoutubeId(input) {
  if (!input || typeof input !== "string") return null;
  const value = input.trim();
  if (!value) return null;

  let m =
    value.match(
      /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
    ) || value.match(/youtube\.com\/(?:v|watch)\/([\w-]{11})/);
  if (m) return m[1];
  if (ID_RE.test(value)) return value;
  return null;
}

export function embedUrl(video) {
  const id = parseYoutubeId(video);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}

let apiPromise = null;

export function loadYouTubeAPI() {
  if (typeof window !== "undefined" && window.YT && window.YT.Player) {
    return Promise.resolve(window.YT);
  }
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previous) previous();
      resolve(window.YT);
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });

  return apiPromise;
}