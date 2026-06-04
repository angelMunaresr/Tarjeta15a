"use client";

import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speedX: number;
  speedY: number;
  wobble: number;
  wobbleSpeed: number;
}

export default function RippleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);
  const isVisibleRef = useRef(true);
  /*
   * Frame skipping for mobile: render every other frame (~30fps).
   * Halves CPU on the canvas; imperceptible for short-lived bubbles.
   */
  const frameSkipRef = useRef(1);
  const frameCountRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    frameSkipRef.current = width < 768 ? 2 : 1;

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        frameSkipRef.current = width < 768 ? 2 : 1;
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    const drawBubble = (bubble: Bubble) => {
      const { x, y, radius, opacity, wobble } = bubble;

      const gradient = ctx.createRadialGradient(
        x - radius * 0.3,
        y - radius * 0.3,
        0,
        x,
        y,
        radius
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.9})`);
      gradient.addColorStop(0.3, `rgba(200, 235, 255, ${opacity * 0.6})`);
      gradient.addColorStop(0.6, `rgba(150, 210, 255, ${opacity * 0.4})`);
      gradient.addColorStop(1, `rgba(100, 180, 255, ${opacity * 0.15})`);

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
      ctx.lineWidth = 1.5;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();

      const highlightX = x - radius * 0.35;
      const highlightY = y - radius * 0.35;
      const highlightRadius = radius * 0.25;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
      ctx.arc(highlightX, highlightY, highlightRadius, 0, Math.PI * 2);
      ctx.fill();

      const highlight2X = x + radius * 0.2;
      const highlight2Y = y + radius * 0.2;
      const highlight2Radius = radius * 0.1;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
      ctx.arc(highlight2X, highlight2Y, highlight2Radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      if (!isVisibleRef.current) {
        isRunningRef.current = false;
        animationRef.current = null;
        return;
      }

      if (bubblesRef.current.length === 0) {
        ctx.clearRect(0, 0, width, height);
        isRunningRef.current = false;
        animationRef.current = null;
        return;
      }

      frameCountRef.current++;
      const skip = frameSkipRef.current;
      const shouldDraw = skip === 1 || frameCountRef.current % skip === 0;

      bubblesRef.current = bubblesRef.current.filter((bubble) => {
        bubble.wobble += bubble.wobbleSpeed;
        bubble.x += bubble.speedX + Math.sin(bubble.wobble) * 0.5;
        bubble.y += bubble.speedY;
        bubble.speedY += 0.02;
        bubble.opacity -= 0.012;
        bubble.radius -= 0.08;

        if (bubble.opacity <= 0 || bubble.radius <= 0 || bubble.y < -50) {
          return false;
        }

        if (shouldDraw) {
          drawBubble(bubble);
        }
        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (!isRunningRef.current && isVisibleRef.current) {
        isRunningRef.current = true;
        frameCountRef.current = 0;
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    const handleInteraction = (e: MouseEvent) => {
      const isMobile = window.innerWidth < 768;
      const baseCount = isMobile ? 2 : 6;
      const randCount = isMobile ? 2 : 4;
      const bubbleCount = baseCount + Math.floor(Math.random() * randCount);

      for (let i = 0; i < bubbleCount; i++) {
        const offsetX = (Math.random() - 0.5) * 60;
        const offsetY = (Math.random() - 0.5) * 40;

        bubblesRef.current.push({
          x: e.clientX + offsetX,
          y: e.clientY + offsetY,
          radius: (isMobile ? 3 : 4) + Math.random() * (isMobile ? 8 : 12),
          opacity: 0.6 + Math.random() * 0.4,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: -1.5 - Math.random() * 2,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.03 + Math.random() * 0.04,
        });
      }

      const maxBubbles = isMobile ? 12 : 50;
      if (bubblesRef.current.length > maxBubbles) {
        bubblesRef.current = bubblesRef.current.slice(-maxBubbles);
      }

      startLoop();
    };

    /*
     * Pause the rAF while the canvas is off-screen. Re-entry wakes the
     * loop on the next user click.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisibleRef.current = entry.isIntersecting;
          if (!isVisibleRef.current && animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
            isRunningRef.current = false;
          }
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    window.addEventListener("click", handleInteraction);

    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleInteraction);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-30"
    />
  );
}
