import { embedUrl } from "../lib/youtube.js";

// The main embeddable player used as the hero of a product page.
// Falls back to the cover image (letterboxed) when no video is set.
export default function VideoPlayer({ project, className = "" }) {
  const src = embedUrl(project.video);
  return (
    <div
      className={
        "relative aspect-video w-full overflow-hidden rounded-l bg-night ring-1 ring-line shadow-card " +
        className
      }
    >
      {src ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`${src}?rel=0&playsinline=1&color=white&autoplay=1&mute=1`}
          title={`${project.name} — video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <img
          src={project.image}
          alt={project.name}
          className="mx-auto h-full w-full object-contain px-8 py-4"
        />
      )}
    </div>
  );
}