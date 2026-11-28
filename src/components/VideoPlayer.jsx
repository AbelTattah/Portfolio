import { embedUrl } from "../lib/youtube.js";

// The main embeddable player used as the hero of a product page.
// Falls back to the cover image (letterboxed) when no video is set.
export default function VideoPlayer({ project }) {
  const src = embedUrl(project.video);
  return (
    <div className="pp-media">
      {src ? (
        <iframe
          src={`${src}?rel=0&playsinline=1&color=white&autoplay=1&mute=1`}
          title={`${project.name} — video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <img src={project.image} alt={project.name} />
      )}
    </div>
  );
}
