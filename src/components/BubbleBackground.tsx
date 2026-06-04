"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  alphaSpeed: number;
  phase: number;
  twinkleSpeed: number;
}

export default function BubbleBackground({ showMoon = true, excludeSection1 = false }: { showMoon?: boolean; excludeSection1?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (excludeSection1) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let stars: Star[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const starCount = isMobile ? 18 : 180;
    /*
     * On mobile, render every other frame (~30fps). Imperceptible for
     * stars/reflections; halves canvas CPU on phones.
     */
    const frameSkip = isMobile ? 2 : 1;
    let frameCount = 0;
    let isVisible = true;

    const createStar = (): Star => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      alphaSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.025 + 0.008,
    });

    const init = () => {
      stars = Array.from({ length: starCount }, createStar);
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        baseGrad = createBaseGradient();
        init();
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    init();

    let baseGrad: CanvasGradient;
    const createBaseGradient = () => {
      const g = ctx.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, "#00040a");
      g.addColorStop(0.35, "#020614");
      g.addColorStop(0.65, "#060E1E");
      g.addColorStop(0.88, "#001220");
      g.addColorStop(1, "#000810");
      return g;
    };
    baseGrad = createBaseGradient();

    const drawMoon = () => {
      if (isMobile) return; // Moon is rendered in the hero; skip on mobile to save cost.
      const moonX = width * 0.82;
      const moonY = height * 0.1;
      const moonRadius = 60;

      const moonGlow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, moonRadius * 4);
      moonGlow.addColorStop(0, "rgba(245, 235, 210, 0.15)");
      moonGlow.addColorStop(0.2, "rgba(245, 235, 210, 0.08)");
      moonGlow.addColorStop(0.5, "rgba(14, 165, 233, 0.02)");
      moonGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = moonGlow;
      ctx.fillRect(0, 0, width, height);

      ctx.beginPath();
      const moonGradient = ctx.createRadialGradient(
        moonX - moonRadius * 0.3,
        moonY - moonRadius * 0.3,
        moonRadius * 0.1,
        moonX,
        moonY,
        moonRadius
      );
      moonGradient.addColorStop(0, "#FFFEF5");
      moonGradient.addColorStop(0.5, "#F5EBD9");
      moonGradient.addColorStop(1, "#D4C4A4");
      ctx.fillStyle = moonGradient;
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "rgba(200, 180, 150, 0.25)";
      ctx.arc(moonX + moonRadius * 0.2, moonY - moonRadius * 0.1, moonRadius * 0.18, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(moonX - moonRadius * 0.25, moonY + moonRadius * 0.15, moonRadius * 0.12, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawWaterReflection = () => {
      if (isMobile) return; // Water reflection is desktop-only — biggest single-frame cost in the loop.
      const reflectionY = height * 0.88;
      const reflectionGradient = ctx.createLinearGradient(0, reflectionY, 0, height);
      reflectionGradient.addColorStop(0, "rgba(245, 235, 210, 0.02)");
      reflectionGradient.addColorStop(0.4, "rgba(0, 245, 255, 0.015)");
      reflectionGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = reflectionGradient;
      ctx.fillRect(0, reflectionY, width, height - reflectionY);

      const step = 5;
      ctx.strokeStyle = "rgba(245, 235, 210, 0.03)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const waveOffset = timeRef.current * 0.0004;
        ctx.beginPath();
        ctx.moveTo(0, reflectionY + i * 14);
        for (let x = 0; x < width; x += step) {
          const y = reflectionY + i * 14 + Math.sin((x * 0.01) + waveOffset + i * 0.5) * 3;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    const animate = () => {
      // Off-screen: do not draw and do not schedule the next frame.
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      frameCount++;
      const drawThisFrame = frameSkip === 1 || frameCount % frameSkip === 0;

      if (drawThisFrame) {
        timeRef.current += 16;

        ctx.fillStyle = baseGrad;
        ctx.fillRect(0, 0, width, height);

        drawWaterReflection();
        if (showMoon) drawMoon();

        stars.forEach((star) => {
          star.phase += star.alphaSpeed;
          const twinkle = Math.sin(star.phase * star.twinkleSpeed * 100) * 0.45;
          const currentAlpha = Math.max(0.1, Math.min(1, star.alpha + twinkle));

          ctx.beginPath();
          ctx.fillStyle = `rgba(248, 246, 240, ${currentAlpha})`;
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();

          if (star.size > 1.4 && currentAlpha > 0.6) {
            ctx.strokeStyle = `rgba(248, 246, 240, ${currentAlpha * 0.35})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(star.x - star.size * 2.5, star.y);
            ctx.lineTo(star.x + star.size * 2.5, star.y);
            ctx.moveTo(star.x, star.y - star.size * 2.5);
            ctx.lineTo(star.x, star.y + star.size * 2.5);
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    /*
     * Pause the rAF while the canvas is off-screen. Re-entry restarts
     * the loop with a fresh frame counter so frame-skip stays in sync.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (isVisible && !wasVisible) {
            frameCount = 0;
            animationFrameId = requestAnimationFrame(animate);
          } else if (!isVisible && animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  if (excludeSection1) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none block will-change-transform"
    />
  );
}
