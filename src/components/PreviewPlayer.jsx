import { useEffect, useRef, useState } from "react";
import { loadYouTubeAPI, parseYoutubeId } from "../lib/youtube.js";

// A "hover to play" preview, like YouTube's gallery previews.
// While the mouse is over the thumbnail the video (muted, looping) plays;
// on mouse-leave it fades back to the thumbnail. The player instance is
// created on first hover and reused afterwards, so previews are instant.
export default function PreviewPlayer({ project, imgClassName = "" }) {
  const videoId = parseYoutubeId(project.previewVideo || project.video);
  const [hovered, setHovered] = useState(false);
  const [failed, setFailed] = useState(false);
  const playerRef = useRef(null);
  const slotRef = useRef(null);

  async function startPreview() {
    setHovered(true);
    if (!videoId || failed) return;
    if (playerRef.current) {
      playerRef.current.playVideo();
      return;
    }
    try {
      const YT = await loadYouTubeAPI();
      const player = new YT.Player(slotRef.current, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: 1,
          mute: 1,
          playsinline: 1,
          controls: 0,
          rel: 0,
          loop: 1,
          playlist: videoId,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            const iframe = e.target.getIframe();
            if (iframe) iframe.style.pointerEvents = "none";
            try {
              e.target.playVideo();
            } catch {
              /* autoplay can be rejected — silently retry on next hover */
            }
          },
          onError: () => {
            setFailed(true);
            setHovered(false);
          },
        },
      });
      playerRef.current = player;
    } catch {
      setFailed(true);
      setHovered(false);
    }
  }

  function stopPreview() {
    setHovered(false);
    if (playerRef.current) playerRef.current.pauseVideo();
  }

  useEffect(() => {
    return () => {
      try {
        if (playerRef.current && playerRef.current.destroy) {
          playerRef.current.destroy();
        }
      } catch {
        /* already gone */
      }
    };
  }, []);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
    >
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        className={
          "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" +
          (imgClassName ? ` ${imgClassName}` : "")
        }
      />
      {videoId && (
        <div
          className={
            "pointer-events-none absolute inset-0 transition-opacity duration-300 " +
            (hovered && !failed ? "opacity-100" : "opacity-0")
          }
          aria-hidden="true"
        >
          <div ref={slotRef} className="h-full w-full" />
        </div>
      )}
    </div>
  );
}