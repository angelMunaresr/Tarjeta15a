"use client";

import { useEffect, useState } from "react";

/*
 * LoadingScreen: full-viewport navy overlay with a few rising bubbles.
 * Pure CSS animations (no canvas) — costs ~0 once mounted. Fades out
 * when the document is ready AND the hero image has loaded (with a
 * 1200ms minimum so it never flashes on fast connections).
 */
export default function LoadingScreen() {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const MIN_DISPLAY_MS = 1200;
    const start = performance.now();

    const tryFinish = () => {
      if (cancelled) return;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(() => {
        if (!cancelled) setLoaded(true);
      }, wait);
    };

    if (document.readyState === "complete") {
      tryFinish();
    } else {
      const onLoad = () => {
        window.removeEventListener("load", onLoad);
        tryFinish();
      };
      window.addEventListener("load", onLoad);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    // Remove from DOM after the fade-out transition completes.
    const t = setTimeout(() => setHidden(true), 600);
    return () => clearTimeout(t);
  }, [loaded]);

  if (hidden) return null;

  return (
    <div
      aria-hidden={loaded}
      className={`fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center transition-opacity duration-500 ${
        loaded ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "linear-gradient(180deg, #00040a 0%, #020614 30%, #060E1E 60%, #001220 100%)",
      }}
    >
      {/* Rising bubbles — 5, each with its own delay and position */}
      <div
        className="absolute bottom-[6%] left-[18%] w-1.5 h-1.5 rounded-full animate-bubble-rise"
        style={{
          animationDelay: "0s",
          background:
            "radial-gradient(circle at 30% 30%, rgba(200,220,255,0.7) 0%, rgba(100,149,237,0.3) 50%, transparent 100%)",
          boxShadow: "0 0 6px rgba(100,149,237,0.4)",
        }}
      />
      <div
        className="absolute bottom-[10%] left-[42%] w-2 h-2 rounded-full animate-bubble-rise"
        style={{
          animationDelay: "0.6s",
          background:
            "radial-gradient(circle at 30% 30%, rgba(232,232,240,0.7) 0%, rgba(200,200,220,0.28) 50%, transparent 100%)",
          boxShadow: "0 0 8px rgba(232,232,240,0.35)",
        }}
      />
      <div
        className="absolute bottom-[4%] right-[20%] w-1 h-1 rounded-full animate-bubble-rise"
        style={{
          animationDelay: "1.1s",
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.75) 0%, rgba(210,230,255,0.3) 50%, transparent 100%)",
          boxShadow: "0 0 5px rgba(255,255,255,0.4)",
        }}
      />
      <div
        className="absolute bottom-[14%] right-[35%] w-1.5 h-1.5 rounded-full animate-bubble-rise"
        style={{
          animationDelay: "1.7s",
          background:
            "radial-gradient(circle at 30% 30%, rgba(150,180,220,0.65) 0%, rgba(80,120,180,0.25) 50%, transparent 100%)",
          boxShadow: "0 0 7px rgba(150,180,220,0.3)",
        }}
      />
      <div
        className="absolute bottom-[2%] right-[8%] w-2.5 h-2.5 rounded-full animate-bubble-rise"
        style={{
          animationDelay: "2.2s",
          background:
            "radial-gradient(circle at 30% 30%, rgba(232,223,194,0.7) 0%, rgba(200,180,150,0.25) 50%, transparent 100%)",
          boxShadow: "0 0 9px rgba(232,223,194,0.35)",
        }}
      />

      {/* Centered text — small, subtle */}
      <p
        className="font-cinzel text-[10px] uppercase tracking-[0.35em] text-rose-gold/60"
        style={{ textShadow: "0 0 8px rgba(212,163,115,0.25)" }}
      >
        Cargando
      </p>
    </div>
  );
}
