"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  alphaSpeed: number;
  phase: number;
}

interface Bubble {
  x: number;
  y: number;
  baseX: number;
  radius: number;
  speed: number;
  opacity: number;
  swingSpeed: number;
  swingRange: number;
  swingOffset: number;
  type: "cyan" | "gold" | "rose";
}

export default function BubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const interactionRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null,
    y: null,
    radius: 150, // Radio de interacción
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let bubbles: Bubble[] = [];
    let stars: Star[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const bubbleCount = isMobile ? 20 : 45;
    const starCount = isMobile ? 40 : 100;

    // Crear estrella
    const createStar = (): Star => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.8, // Principalmente en la parte superior
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.7 + 0.1,
      alphaSpeed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
    });

    // Crear burbuja/plankton
    const createBubble = (initY = false): Bubble => {
      const radius = Math.random() * (isMobile ? 5 : 8) + 1.5;
      const x = Math.random() * width;
      const y = initY ? Math.random() * height : height + radius + 10;
      const rand = Math.random();
      const type = rand > 0.6 ? "cyan" : rand > 0.3 ? "gold" : "rose";
      
      return {
        x,
        y,
        baseX: x,
        radius,
        speed: Math.random() * 0.4 + 0.15, // Velocidad de ascenso lenta y elegante
        opacity: Math.random() * 0.22 + 0.05,
        swingSpeed: Math.random() * 0.004 + 0.001,
        swingRange: Math.random() * 12 + 4,
        swingOffset: Math.random() * Math.PI * 2,
        type,
      };
    };

    // Inicializar elementos
    const init = () => {
      bubbles = Array.from({ length: bubbleCount }, () => createBubble(true));
      stars = Array.from({ length: starCount }, createStar);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", handleResize);
    init();

    // Animación
    const animate = () => {
      // 1. Dibujar el fondo base (Azul noche profundo casi negro)
      const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
      baseGrad.addColorStop(0, "#020614");   // Azul noche profundo
      baseGrad.addColorStop(0.5, "#040b1a"); // Azul noche medio
      baseGrad.addColorStop(1, "#010309");   // Negro abyss en la base
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Destello de luna o halo de luz superior (Champán/Dorado suave y Turquesa)
      const moonGlow = ctx.createRadialGradient(
        width / 2,
        0,
        20,
        width / 2,
        0,
        Math.max(width, height) * 0.65
      );
      moonGlow.addColorStop(0, "rgba(243, 229, 216, 0.09)"); // Brillo de luna champán
      moonGlow.addColorStop(0.3, "rgba(14, 165, 233, 0.04)"); // Shimmer marino
      moonGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = moonGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. Dibujar Estrellas Titilantes
      stars.forEach((star) => {
        // Actualizar opacidad (titileo sinusoidal)
        star.phase += star.alphaSpeed;
        const currentAlpha = Math.max(0.1, Math.min(0.9, star.alpha + Math.sin(star.phase) * 0.25));

        ctx.beginPath();
        // Las estrellas son de color blanco/champán suave
        ctx.fillStyle = `rgba(243, 229, 216, ${currentAlpha})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Destello de 4 puntos para estrellas más grandes
        if (star.size > 1.3 && currentAlpha > 0.6) {
          ctx.strokeStyle = `rgba(243, 229, 216, ${currentAlpha * 0.4})`;
          ctx.lineWidth = 0.3;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2.5, star.y);
          ctx.lineTo(star.x + star.size * 2.5, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2.5);
          ctx.lineTo(star.x, star.y + star.size * 2.5);
          ctx.stroke();
        }
      });

      // 4. Dibujar Burbujas Bioluminiscentes (Plankton)
      const interaction = interactionRef.current;

      bubbles.forEach((bubble) => {
        // Ascender
        bubble.y -= bubble.speed;
        // Balanceo horizontal
        bubble.x = bubble.baseX + Math.sin(bubble.y * bubble.swingSpeed + bubble.swingOffset) * bubble.swingRange;

        // Repulsión suave con el cursor o toque
        if (interaction.x !== null && interaction.y !== null) {
          const dx = bubble.x - interaction.x;
          const dy = bubble.y - interaction.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < interaction.radius) {
            const force = (interaction.radius - dist) / interaction.radius;
            const angle = Math.atan2(dy, dx);
            bubble.x += Math.cos(angle) * force * 4;
            bubble.y += Math.sin(angle) * force * 4;
            bubble.baseX += Math.cos(angle) * force * 1.5;
          }
        }

        // Determinar gradiente según el tipo de burbuja
        ctx.beginPath();
        const bubbleGrad = ctx.createRadialGradient(
          bubble.x - bubble.radius * 0.25,
          bubble.y - bubble.radius * 0.25,
          bubble.radius * 0.1,
          bubble.x,
          bubble.y,
          bubble.radius
        );

        let colorGlow = "0, 245, 255"; // Cyan por defecto
        if (bubble.type === "rose") {
          colorGlow = "212, 163, 115"; // Oro rosa
        } else if (bubble.type === "gold") {
          colorGlow = "230, 197, 135"; // Dorado champán
        }

        bubbleGrad.addColorStop(0, `rgba(255, 255, 255, ${bubble.opacity + 0.15})`);
        bubbleGrad.addColorStop(0.4, `rgba(${colorGlow}, ${bubble.opacity})`);
        bubbleGrad.addColorStop(1, `rgba(2, 6, 20, 0.05)`);

        ctx.fillStyle = bubbleGrad;
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fill();

        // Borde fino brillante
        ctx.strokeStyle = `rgba(${colorGlow}, ${bubble.opacity * 1.3})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();

        // Destello superior
        ctx.beginPath();
        ctx.arc(
          bubble.x - bubble.radius * 0.35,
          bubble.y - bubble.radius * 0.35,
          bubble.radius * 0.15,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity + 0.3})`;
        ctx.fill();

        // Reiniciar abajo si sale por arriba
        if (bubble.y < -bubble.radius) {
          Object.assign(bubble, createBubble(false));
        }

        // Limitar baseX a los bordes
        if (bubble.baseX < -40) bubble.baseX = width + 40;
        if (bubble.baseX > width + 40) bubble.baseX = -40;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Eventos
    const handleMouseMove = (e: MouseEvent) => {
      interactionRef.current.x = e.clientX;
      interactionRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      interactionRef.current.x = null;
      interactionRef.current.y = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        interactionRef.current.x = e.touches[0].clientX;
        interactionRef.current.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      interactionRef.current.x = null;
      interactionRef.current.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none block will-change-transform"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
