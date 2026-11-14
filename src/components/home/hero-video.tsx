"use client";

import { Volume2, VolumeX } from "lucide-react";
import dynamic from "next/dynamic";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export type HeroMode = "apps" | "docker" | "terminal";

// Where each tab's part of the product film starts, in seconds. The light and
// dark films share one timeline.
const chapters: Record<HeroMode, number> = {
  apps: 46, // "Apps finds what's running." / "All in one list."
  docker: 58, // "Containers and images."
  terminal: 96, // "When you want a shell, it's a real one."
};

// The product film is hosted on Mux (one asset per theme). Mux streams it as
// HLS in 1080p, 720p, 480p and 270p and picks the rendition for the viewer's
// connection.
const playbackIds = {
  light: "JR6mFhk5QfvuJEpbVlbf22AhVFnaddzRqsYMoBP00ii8",
  dark: "cZFnbVkARaFucYU02wGmqkFXQujAGxXwDi00Ld1hRTkBY",
};

// The Mux element brings an HLS engine, so it is loaded in its own chunk after
// the page is interactive instead of being part of the first bundle.
const MuxVideo = dynamic(() => import("@mux/mux-video-react"), { ssr: false });

// Theme comes from the "dark" class on <html> (set before paint and by the
// theme toggle). On the server there is no theme, so no video is rendered and
// the poster images stand in until the page hydrates.
function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function useTheme() {
  return useSyncExternalStore(
    subscribeTheme,
    () => (document.documentElement.classList.contains("dark") ? "dark" : "light"),
    () => null,
  );
}

function subscribeReducedMotion(onChange: () => void) {
  const query = matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
}

// Product window under the hero text (Figma "Hero-Video-Window"): the product
// film, muted and looping, playing only while it is on screen. The poster
// images are server rendered and show until the film has a frame to paint.
// Choosing a tab jumps the film to that part. With reduced motion the poster
// is shown on its own.
export function HeroVideo({
  mode,
  poster,
  labels,
}: {
  mode: HeroMode;
  poster: ReactNode;
  labels: { mute: string; unmute: string };
}) {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  // The Mux element mounts after its chunk loads, so the play/pause effect keys
  // off this state (set by a callback ref) instead of reading a ref on mount.
  // The ref is used where the element is changed (seeking, sound).
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeRef = useRef(0);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const showVideo = theme !== null && !reducedMotion;

  // A new source (theme change) starts hidden until its first frame is ready.
  const [readyFor, setReadyFor] = useState(theme);
  if (readyFor !== theme) {
    setReadyFor(theme);
    setReady(false);
  }

  // Play once a tenth of the window is on screen (on a laptop the top of it
  // already shows under the hero text), pause when it scrolls away.
  useEffect(() => {
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [video]);

  // Jump to the chosen tab's chapter. Skipped on mount so the film starts
  // from the beginning.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const element = videoRef.current;
    if (!element) return;
    const seek = () => {
      element.currentTime = chapters[mode];
    };
    if (element.readyState >= HTMLMediaElement.HAVE_METADATA) seek();
    else element.addEventListener("loadedmetadata", seek, { once: true });
  }, [mode]);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
    if (video.paused) video.play().catch(() => {});
  }

  return (
    <div className="relative aspect-[1100/619] w-full max-w-275 overflow-hidden rounded-xl border border-line-media bg-media">
      {poster}

      {showVideo && (
        <>
          <MuxVideo
            key={theme}
            ref={(node) => {
              videoRef.current = node ?? null;
              setVideo(node ?? null);
            }}
            playbackId={playbackIds[theme]}
            // No Mux Data cookie on visitors; view analytics still work.
            disableCookies
            muted={muted}
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            // The light and dark films share a timeline: after a theme switch
            // the new one continues where the old one was.
            onLoadedMetadata={(event) => {
              event.currentTarget.currentTime = timeRef.current;
            }}
            onTimeUpdate={(event) => {
              timeRef.current = event.currentTarget.currentTime;
            }}
            onLoadedData={() => setReady(true)}
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-500",
              ready ? "opacity-100" : "opacity-0",
            )}
          />

          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={!muted}
            aria-label={muted ? labels.unmute : labels.mute}
            className="absolute right-5 bottom-5 inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white transition-colors hover:bg-black/70 max-md:right-3 max-md:bottom-3 max-md:size-9"
          >
            {muted ? (
              <VolumeX aria-hidden="true" className="size-5 max-md:size-4" />
            ) : (
              <Volume2 aria-hidden="true" className="size-5 max-md:size-4" />
            )}
          </button>
        </>
      )}
    </div>
  );
}
