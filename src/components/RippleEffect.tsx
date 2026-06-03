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

export default function RippleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number>(0);
  const isRunningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Debounced resize handler
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
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
      // If no bubbles left, stop the loop and clear canvas once
      if (bubblesRef.current.length === 0) {
        ctx.clearRect(0, 0, width, height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, width, height);

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

        drawBubble(bubble);
        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the animation loop only if not already running
    const startLoop = () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const bubbleCount = 6 + Math.floor(Math.random() * 4);

      for (let i = 0; i < bubbleCount; i++) {
        const offsetX = (Math.random() - 0.5) * 60;
        const offsetY = (Math.random() - 0.5) * 40;

        bubblesRef.current.push({
          x: e.clientX + offsetX,
          y: e.clientY + offsetY,
          radius: 4 + Math.random() * 12,
          opacity: 0.6 + Math.random() * 0.4,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: -1.5 - Math.random() * 2,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.03 + Math.random() * 0.04,
        });
      }

      if (bubblesRef.current.length > 50) {
        bubblesRef.current = bubblesRef.current.slice(-50);
      }

      // Wake up the animation loop
      startLoop();
    };

    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-30"
    />
  );
}