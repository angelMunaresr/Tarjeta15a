"use client";

import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  color: string;
  alpha: number;
  wobble: number;
  wobbleSpeed: number;
  wobbleAmount: number;
}

// Colores del tema: rose-gold, sea-glow, moonlight, gold-accent, sea-foam, rose-gold-light
const THEME_COLORS = [
  "212, 163, 115",   // rose-gold
  "0, 245, 255",     // sea-glow (turquesa bioluminiscente)
  "232, 223, 194",   // moonlight
  "230, 197, 135",   // gold-accent
  "152, 216, 200",   // sea-foam
  "243, 229, 216",   // rose-gold-light
  "14, 165, 233",    // sea-soft (azul cielo)
];

export default function BubbleRise() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let bubbles: Bubble[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const bubbleCount = isMobile ? 28 : 48;

    const randomColor = () => THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];

    const createBubble = (atBottom = false): Bubble => {
      const radius = Math.random() * (isMobile ? 22 : 32) + 4;
      return {
        x: Math.random() * width,
        y: atBottom ? height + radius + Math.random() * 100 : Math.random() * height,
        radius,
        speed: Math.random() * 0.7 + 0.25,
        color: randomColor(),
        alpha: Math.random() * 0.22 + 0.06,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.018 + 0.004,
        wobbleAmount: Math.random() * 1.8 + 0.4,
      };
    };

    const init = () => {
      bubbles = Array.from({ length: bubbleCount }, () => createBubble(false));
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", handleResize);
    init();

    const drawBubble = (b: Bubble) => {
      // Contorno de la burbuja
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${b.color}, ${b.alpha + 0.12})`;
      ctx.lineWidth = b.radius > 15 ? 1.2 : 0.8;
      ctx.stroke();

      // Relleno con gradiente radial translúcido
      const fillGrad = ctx.createRadialGradient(
        b.x - b.radius * 0.28, b.y - b.radius * 0.28, 0,
        b.x, b.y, b.radius
      );
      fillGrad.addColorStop(0, `rgba(${b.color}, ${b.alpha * 0.55})`);
      fillGrad.addColorStop(0.55, `rgba(${b.color}, ${b.alpha * 0.18})`);
      fillGrad.addColorStop(1, `rgba(${b.color}, 0)`);
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Reflejo / highlight interno (parte superior izquierda)
      const highlightRadius = b.radius * 0.28;
      ctx.beginPath();
      ctx.arc(
        b.x - b.radius * 0.32,
        b.y - b.radius * 0.32,
        highlightRadius,
        0,
        Math.PI * 2
      );
      const hlGrad = ctx.createRadialGradient(
        b.x - b.radius * 0.38, b.y - b.radius * 0.38, 0,
        b.x - b.radius * 0.32, b.y - b.radius * 0.32, highlightRadius
      );
      hlGrad.addColorStop(0, `rgba(255, 255, 255, ${b.alpha * 2.2})`);
      hlGrad.addColorStop(1, `rgba(255, 255, 255, 0)`);
      ctx.fillStyle = hlGrad;
      ctx.fill();

      // Brillo secundario pequeño (parte inferior derecha)
      ctx.beginPath();
      ctx.arc(
        b.x + b.radius * 0.38,
        b.y + b.radius * 0.3,
        b.radius * 0.1,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.8})`;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Gradiente de fondo noche marina
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0,    "#00040a");
      bg.addColorStop(0.35, "#020614");
      bg.addColorStop(0.65, "#060E1E");
      bg.addColorStop(0.88, "#001220");
      bg.addColorStop(1,    "#000810");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      bubbles.forEach((b, i) => {
        // Movimiento ondulado horizontal
        b.wobble += b.wobbleSpeed;
        b.x += Math.sin(b.wobble) * b.wobbleAmount;
        b.y -= b.speed;

        // Mantener x dentro de los límites
        if (b.x < -b.radius) b.x = width + b.radius;
        if (b.x > width + b.radius) b.x = -b.radius;

        // Reciclar burbuja cuando sale por arriba
        if (b.y < -b.radius * 2) {
          bubbles[i] = createBubble(true);
        }

        drawBubble(b);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none block will-change-transform"
    />
  );
}
