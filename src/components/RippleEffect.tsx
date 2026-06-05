"use client";

import { useEffect, useRef, useCallback } from "react";

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

const MAX_BUBBLES_DESKTOP = 40;
const MAX_BUBBLES_MOBILE = 20;

export default function RippleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number | null>(null);
  const frameCountRef = useRef(0);
  const isActiveRef = useRef(false);

  const createBubble = useCallback((x: number, y: number, isMobile: boolean): Bubble => {
    return {
      x: x + (Math.random() - 0.5) * 60,
      y: y + (Math.random() - 0.5) * 40,
      radius: (isMobile ? 3 : 4) + Math.random() * (isMobile ? 8 : 12),
      opacity: 0.6 + Math.random() * 0.4,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: -1.5 - Math.random() * 2,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.03 + Math.random() * 0.04,
    };
  }, []);

  const drawBubble = useCallback((ctx: CanvasRenderingContext2D, bubble: Bubble) => {
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
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
    ctx.lineWidth = 1.5;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
    ctx.arc(x - radius * 0.35, y - radius * 0.35, radius * 0.25, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
    ctx.arc(x + radius * 0.2, y + radius * 0.2, radius * 0.1, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let resizeTimer: ReturnType<typeof setTimeout>;

    const getSettings = () => {
      const isMobile = width < 768;
      return {
        isMobile,
        frameSkip: isMobile ? 2 : 1,
        maxBubbles: isMobile ? MAX_BUBBLES_MOBILE : MAX_BUBBLES_DESKTOP,
        baseCount: isMobile ? 2 : 5,
        randCount: isMobile ? 2 : 5,
      };
    };

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      if (bubblesRef.current.length === 0) {
        ctx.clearRect(0, 0, width, height);
        isActiveRef.current = false;
        animationRef.current = null;
        return;
      }

      frameCountRef.current++;
      const settings = getSettings();
      const shouldDraw = settings.frameSkip === 1 || frameCountRef.current % settings.frameSkip === 0;

      if (shouldDraw) {
        ctx.clearRect(0, 0, width, height);
      }

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
          drawBubble(ctx, bubble);
        }
        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (!isActiveRef.current) {
        isActiveRef.current = true;
        frameCountRef.current = 0;
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const settings = getSettings();
      const bubbleCount = settings.baseCount + Math.floor(Math.random() * settings.randCount);

      for (let i = 0; i < bubbleCount; i++) {
        bubblesRef.current.push(createBubble(e.clientX, e.clientY, settings.isMobile));
      }

      if (bubblesRef.current.length > settings.maxBubbles) {
        bubblesRef.current = bubblesRef.current.slice(-settings.maxBubbles);
      }

      startLoop();
    };

    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [createBubble, drawBubble]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-30"
    />
  );
}