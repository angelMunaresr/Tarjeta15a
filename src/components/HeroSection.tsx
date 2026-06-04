"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type BubbleVars = {
  "--bg-c1": string;
  "--bg-c2": string;
  "--bg-c3"?: string;
  "--bubble-shadow": string;
};

type GlassBubble = { pos: string; size: string; delay: string; cssVars: BubbleVars };
type Sparkle = { pos: string; size: string; delay: string; cssVars: Omit<BubbleVars, "--bg-c3"> };
type Particle = { pos: string; size: string; delay: string; opacity: string };
type LineConfig = { pos: string; width: string; gradient: string; rotation: string; delay: string };

const BIG_BUBBLES: GlassBubble[] = [
  { pos: "top-[10%] left-[5%]", size: "w-16 h-16", delay: "0s", cssVars: { "--bg-c1": "rgba(173, 216, 255, 0.6)", "--bg-c2": "rgba(100, 149, 237, 0.25)", "--bg-c3": "rgba(30, 60, 114, 0.08)", "--bubble-shadow": "inset -3px -3px 8px rgba(173, 216, 255, 0.3), inset 2px 2px 6px rgba(255, 255, 255, 0.15), 0 0 20px rgba(100, 149, 237, 0.2)" } },
  { pos: "top-[15%] right-[8%]", size: "w-12 h-12", delay: "0.5s", cssVars: { "--bg-c1": "rgba(255, 255, 255, 0.7)", "--bg-c2": "rgba(200, 220, 255, 0.3)", "--bg-c3": "rgba(180, 200, 230, 0.08)", "--bubble-shadow": "inset -2px -2px 6px rgba(255, 255, 255, 0.25), inset 1px 1px 4px rgba(255, 255, 255, 0.1), 0 0 15px rgba(200, 220, 255, 0.25)" } },
  { pos: "top-[25%] left-[12%]", size: "w-8 h-8", delay: "1s", cssVars: { "--bg-c1": "rgba(135, 180, 220, 0.55)", "--bg-c2": "rgba(70, 130, 180, 0.25)", "--bg-c3": "rgba(30, 60, 100, 0.08)", "--bubble-shadow": "inset -2px -2px 5px rgba(135, 180, 220, 0.25), inset 1px 1px 3px rgba(255, 255, 255, 0.12), 0 0 12px rgba(100, 149, 237, 0.18)" } },
  { pos: "top-[30%] right-[15%]", size: "w-14 h-14", delay: "1.5s", cssVars: { "--bg-c1": "rgba(176, 196, 222, 0.5)", "--bg-c2": "rgba(100, 149, 237, 0.2)", "--bg-c3": "rgba(40, 80, 140, 0.06)", "--bubble-shadow": "inset -3px -3px 7px rgba(176, 196, 222, 0.2), inset 2px 2px 5px rgba(255, 255, 255, 0.1), 0 0 16px rgba(100, 149, 237, 0.15)" } },
  { pos: "top-[45%] left-[8%]", size: "w-10 h-10", delay: "2s", cssVars: { "--bg-c1": "rgba(200, 220, 255, 0.65)", "--bg-c2": "rgba(150, 180, 230, 0.3)", "--bg-c3": "rgba(50, 80, 130, 0.08)", "--bubble-shadow": "inset -2px -2px 5px rgba(200, 220, 255, 0.3), inset 1px 1px 4px rgba(255, 255, 255, 0.15), 0 0 14px rgba(150, 180, 230, 0.2)" } },
  { pos: "top-[55%] right-[10%]", size: "w-20 h-20", delay: "2.5s", cssVars: { "--bg-c1": "rgba(65, 105, 175, 0.4)", "--bg-c2": "rgba(30, 60, 120, 0.15)", "--bg-c3": "rgba(20, 40, 80, 0.05)", "--bubble-shadow": "inset -4px -4px 10px rgba(65, 105, 175, 0.2), inset 2px 2px 6px rgba(255, 255, 255, 0.08), 0 0 20px rgba(65, 105, 175, 0.15)" } },
  { pos: "top-[65%] left-[15%]", size: "w-6 h-6", delay: "0.3s", cssVars: { "--bg-c1": "rgba(255, 255, 255, 0.8)", "--bg-c2": "rgba(210, 230, 255, 0.35)", "--bg-c3": "rgba(160, 190, 230, 0.1)", "--bubble-shadow": "inset -1px -1px 3px rgba(255, 255, 255, 0.35), inset 1px 1px 2px rgba(255, 255, 255, 0.2), 0 0 10px rgba(210, 230, 255, 0.3)" } },
  { pos: "top-[75%] right-[20%]", size: "w-18 h-18", delay: "0.8s", cssVars: { "--bg-c1": "rgba(100, 149, 237, 0.45)", "--bg-c2": "rgba(50, 90, 160, 0.18)", "--bg-c3": "rgba(30, 50, 100, 0.05)", "--bubble-shadow": "inset -3px -3px 8px rgba(100, 149, 237, 0.22), inset 2px 2px 5px rgba(255, 255, 255, 0.1), 0 0 18px rgba(100, 149, 237, 0.18)" } },
  { pos: "bottom-[30%] left-[10%]", size: "w-24 h-24", delay: "1.3s", cssVars: { "--bg-c1": "rgba(70, 110, 180, 0.35)", "--bg-c2": "rgba(40, 70, 130, 0.12)", "--bg-c3": "rgba(20, 40, 80, 0.04)", "--bubble-shadow": "inset -4px -4px 12px rgba(70, 110, 180, 0.18), inset 2px 2px 8px rgba(255, 255, 255, 0.06), 0 0 25px rgba(70, 110, 180, 0.12)" } },
  { pos: "bottom-[20%] right-[8%]", size: "w-11 h-11", delay: "1.8s", cssVars: { "--bg-c1": "rgba(220, 235, 255, 0.6)", "--bg-c2": "rgba(160, 190, 230, 0.25)", "--bg-c3": "rgba(60, 100, 160, 0.08)", "--bubble-shadow": "inset -2px -2px 6px rgba(220, 235, 255, 0.28), inset 1px 1px 4px rgba(255, 255, 255, 0.14), 0 0 15px rgba(160, 190, 230, 0.2)" } },
  { pos: "top-[85%] left-[25%]", size: "w-9 h-9", delay: "2.2s", cssVars: { "--bg-c1": "rgba(180, 210, 240, 0.5)", "--bg-c2": "rgba(100, 150, 200, 0.22)", "--bg-c3": "rgba(50, 80, 140, 0.06)", "--bubble-shadow": "inset -2px -2px 5px rgba(180, 210, 240, 0.22), inset 1px 1px 3px rgba(255, 255, 255, 0.1), 0 0 12px rgba(100, 150, 200, 0.18)" } },
  { pos: "top-[40%] right-[25%]", size: "w-7 h-7", delay: "0.6s", cssVars: { "--bg-c1": "rgba(200, 225, 255, 0.65)", "--bg-c2": "rgba(140, 175, 220, 0.28)", "--bg-c3": "rgba(60, 90, 140, 0.08)", "--bubble-shadow": "inset -1px -1px 4px rgba(200, 225, 255, 0.3), inset 1px 1px 3px rgba(255, 255, 255, 0.15), 0 0 11px rgba(140, 175, 220, 0.22)" } },
];

const SHIMMER_BUBBLES: GlassBubble[] = [
  { pos: "top-[12%] left-[30%]", size: "w-4 h-4", delay: "0.2s", cssVars: { "--bg-c1": "rgba(200, 220, 255, 0.75)", "--bg-c2": "rgba(100, 149, 237, 0.35)", "--bg-c3": "rgba(60, 90, 150, 0.1)", "--bubble-shadow": "inset -1px -1px 3px rgba(200, 220, 255, 0.35), inset 1px 1px 2px rgba(255, 255, 255, 0.2), 0 0 8px rgba(100, 149, 237, 0.3)" } },
  { pos: "top-[22%] right-[25%]", size: "w-3 h-3", delay: "0.7s", cssVars: { "--bg-c1": "rgba(255, 255, 255, 0.85)", "--bg-c2": "rgba(220, 235, 255, 0.4)", "--bg-c3": "rgba(180, 200, 240, 0.12)", "--bubble-shadow": "inset -1px -1px 2px rgba(255, 255, 255, 0.4), inset 0.5px 0.5px 1px rgba(255, 255, 255, 0.2), 0 0 6px rgba(220, 235, 255, 0.35)" } },
  { pos: "top-[38%] left-[5%]", size: "w-5 h-5", delay: "1.2s", cssVars: { "--bg-c1": "rgba(150, 180, 220, 0.65)", "--bg-c2": "rgba(80, 120, 180, 0.3)", "--bg-c3": "rgba(40, 70, 130, 0.08)", "--bubble-shadow": "inset -1px -1px 3px rgba(150, 180, 220, 0.3), inset 1px 1px 2px rgba(255, 255, 255, 0.15), 0 0 10px rgba(80, 120, 180, 0.25)" } },
  { pos: "top-[50%] right-[5%]", size: "w-3 h-3", delay: "1.7s", cssVars: { "--bg-c1": "rgba(220, 240, 255, 0.7)", "--bg-c2": "rgba(130, 170, 220, 0.32)", "--bg-c3": "rgba(70, 100, 160, 0.1)", "--bubble-shadow": "inset -1px -1px 2px rgba(220, 240, 255, 0.32), inset 0.5px 0.5px 1px rgba(255, 255, 255, 0.16), 0 0 7px rgba(130, 170, 220, 0.28)" } },
  { pos: "top-[60%] left-[25%]", size: "w-4 h-4", delay: "2.2s", cssVars: { "--bg-c1": "rgba(180, 210, 245, 0.68)", "--bg-c2": "rgba(110, 150, 200, 0.3)", "--bg-c3": "rgba(60, 90, 150, 0.08)", "--bubble-shadow": "inset -1px -1px 3px rgba(180, 210, 245, 0.32), inset 1px 1px 2px rgba(255, 255, 255, 0.16), 0 0 8px rgba(110, 150, 200, 0.26)" } },
  { pos: "top-[70%] right-[30%]", size: "w-5 h-5", delay: "0.4s", cssVars: { "--bg-c1": "rgba(70, 105, 175, 0.6)", "--bg-c2": "rgba(50, 80, 140, 0.28)", "--bg-c3": "rgba(30, 50, 100, 0.08)", "--bubble-shadow": "inset -1px -1px 3px rgba(70, 105, 175, 0.28), inset 1px 1px 2px rgba(255, 255, 255, 0.14), 0 0 10px rgba(50, 80, 140, 0.24)" } },
  { pos: "bottom-[35%] left-[20%]", size: "w-3 h-3", delay: "0.9s", cssVars: { "--bg-c1": "rgba(200, 225, 255, 0.72)", "--bg-c2": "rgba(120, 160, 210, 0.33)", "--bg-c3": "rgba(60, 90, 150, 0.1)", "--bubble-shadow": "inset -1px -1px 2px rgba(200, 225, 255, 0.34), inset 0.5px 0.5px 1px rgba(255, 255, 255, 0.17), 0 0 7px rgba(120, 160, 210, 0.29)" } },
  { pos: "bottom-[25%] right-[25%]", size: "w-4 h-4", delay: "1.4s", cssVars: { "--bg-c1": "rgba(160, 195, 235, 0.66)", "--bg-c2": "rgba(90, 130, 190, 0.3)", "--bg-c3": "rgba(50, 80, 140, 0.08)", "--bubble-shadow": "inset -1px -1px 3px rgba(160, 195, 235, 0.31), inset 1px 1px 2px rgba(255, 255, 255, 0.15), 0 0 9px rgba(90, 130, 190, 0.25)" } },
];

const SPARKLES: Sparkle[] = [
  { pos: "top-[8%] left-[18%]", size: "w-2 h-2", delay: "0s", cssVars: { "--bg-c1": "rgba(255,255,255,0.7)", "--bg-c2": "rgba(255,255,255,0.1)", "--bubble-shadow": "0 0 6px rgba(255,255,255,0.3)" } },
  { pos: "top-[18%] right-[12%]", size: "w-1.5 h-1.5", delay: "0.5s", cssVars: { "--bg-c1": "rgba(255,255,255,0.6)", "--bg-c2": "rgba(255,255,255,0.1)", "--bubble-shadow": "0 0 5px rgba(255,255,255,0.25)" } },
  { pos: "top-[35%] left-[3%]", size: "w-2.5 h-2.5", delay: "1s", cssVars: { "--bg-c1": "rgba(255,255,255,0.5)", "--bg-c2": "rgba(255,255,255,0.08)", "--bubble-shadow": "0 0 7px rgba(255,255,255,0.2)" } },
  { pos: "top-[48%] right-[18%]", size: "w-1 h-1", delay: "1.5s", cssVars: { "--bg-c1": "rgba(255,255,255,0.65)", "--bg-c2": "rgba(255,255,255,0.1)", "--bubble-shadow": "0 0 4px rgba(255,255,255,0.3)" } },
  { pos: "top-[58%] left-[20%]", size: "w-1.5 h-1.5", delay: "2s", cssVars: { "--bg-c1": "rgba(255,255,255,0.55)", "--bg-c2": "rgba(255,255,255,0.08)", "--bubble-shadow": "0 0 5px rgba(255,255,255,0.22)" } },
  { pos: "top-[72%] right-[15%]", size: "w-2 h-2", delay: "0.3s", cssVars: { "--bg-c1": "rgba(255,255,255,0.6)", "--bg-c2": "rgba(255,255,255,0.1)", "--bubble-shadow": "0 0 6px rgba(255,255,255,0.28)" } },
  { pos: "bottom-[28%] left-[8%]", size: "w-1 h-1", delay: "0.8s", cssVars: { "--bg-c1": "rgba(255,255,255,0.7)", "--bg-c2": "rgba(255,255,255,0.1)", "--bubble-shadow": "0 0 4px rgba(255,255,255,0.32)" } },
  { pos: "bottom-[18%] right-[22%]", size: "w-2.5 h-2.5", delay: "1.3s", cssVars: { "--bg-c1": "rgba(255,255,255,0.45)", "--bg-c2": "rgba(255,255,255,0.06)", "--bubble-shadow": "0 0 7px rgba(255,255,255,0.18)" } },
  { pos: "top-[82%] left-[15%]", size: "w-1.5 h-1.5", delay: "1.8s", cssVars: { "--bg-c1": "rgba(255,255,255,0.58)", "--bg-c2": "rgba(255,255,255,0.08)", "--bubble-shadow": "0 0 5px rgba(255,255,255,0.25)" } },
  { pos: "top-[28%] left-[35%]", size: "w-1 h-1", delay: "2.3s", cssVars: { "--bg-c1": "rgba(255,255,255,0.62)", "--bg-c2": "rgba(255,255,255,0.1)", "--bubble-shadow": "0 0 4px rgba(255,255,255,0.28)" } },
];

const FOAM_PARTICLES: Particle[] = [
  { pos: "top-[5%] left-[15%]", size: "w-1 h-1", delay: "0.2s", opacity: "bg-white/30" },
  { pos: "top-[12%] right-[30%]", size: "w-0.5 h-0.5", delay: "0.7s", opacity: "bg-white/25" },
  { pos: "top-[33%] left-[40%]", size: "w-1 h-1", delay: "1.1s", opacity: "bg-white/20" },
  { pos: "top-[42%] right-[35%]", size: "w-0.5 h-0.5", delay: "1.5s", opacity: "bg-white/35" },
  { pos: "top-[53%] left-[45%]", size: "w-1 h-1", delay: "1.9s", opacity: "bg-white/22" },
  { pos: "top-[68%] right-[40%]", size: "w-0.5 h-0.5", delay: "2.3s", opacity: "bg-white/28" },
  { pos: "bottom-[40%] left-[35%]", size: "w-1 h-1", delay: "0.5s", opacity: "bg-white/18" },
  { pos: "bottom-[15%] right-[30%]", size: "w-0.5 h-0.5", delay: "1.3s", opacity: "bg-white/32" },
  { pos: "top-[78%] left-[8%]", size: "w-1 h-1", delay: "0.9s", opacity: "bg-white/25" },
  { pos: "top-[88%] right-[12%]", size: "w-0.5 h-0.5", delay: "1.7s", opacity: "bg-white/20" },
  { pos: "top-[25%] left-[55%]", size: "w-0.5 h-0.5", delay: "2.1s", opacity: "bg-white/28" },
  { pos: "top-[62%] left-[3%]", size: "w-1 h-1", delay: "0.3s", opacity: "bg-white/15" },
];

const THIN_LINES: LineConfig[] = [
  { pos: "top-[15%] left-[20%]", width: "w-8", gradient: "bg-gradient-to-r from-white/20 to-transparent", rotation: "rotate-45", delay: "0.4s" },
  { pos: "top-[30%] right-[25%]", width: "w-6", gradient: "bg-gradient-to-l from-white/15 to-transparent", rotation: "rotate-12", delay: "0.9s" },
  { pos: "top-[55%] left-[15%]", width: "w-10", gradient: "bg-gradient-to-r from-white/12 to-transparent", rotation: "-rotate-12", delay: "1.4s" },
  { pos: "bottom-[35%] right-[20%]", width: "w-7", gradient: "bg-gradient-to-l from-white/18 to-transparent", rotation: "rotate-45", delay: "1.9s" },
  { pos: "top-[70%] left-[30%]", width: "w-5", gradient: "bg-gradient-to-r from-white/10 to-transparent", rotation: "-rotate-30", delay: "2.4s" },
  { pos: "top-[42%] right-[8%]", width: "w-9", gradient: "bg-gradient-to-l from-white/14 to-transparent", rotation: "rotate-30", delay: "0.6s" },
];

const GLOW_DOTS: Particle[] = [
  { pos: "top-[20%] left-[8%]", size: "w-0.5 h-0.5", delay: "0.3s", opacity: "bg-white/25" },
  { pos: "top-[48%] right-[12%]", size: "w-1 h-1", delay: "0.8s", opacity: "bg-white/15" },
  { pos: "bottom-[30%] left-[25%]", size: "w-0.5 h-0.5", delay: "1.3s", opacity: "bg-white/20" },
  { pos: "top-[80%] right-[28%]", size: "w-1 h-1", delay: "1.8s", opacity: "bg-white/12" },
];

/*
 * On mobile, render fewer decorative elements to reduce compositing cost.
 * Only the first N items from each group are shown.
 */
const MOBILE_BIG_BUBBLE_COUNT = 6;
const MOBILE_SHIMMER_COUNT = 4;
const MOBILE_SPARKLE_COUNT = 5;
const MOBILE_FOAM_COUNT = 6;
const MOBILE_LINE_COUNT = 3;

export default function HeroSection() {
  const handleScrollDown = () => {
    const nextSection = document.getElementById("transition-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-dvh w-full flex flex-col justify-between items-center text-center px-6 py-12 overflow-hidden select-none">
      {/* Número de sección */}
      <div className="absolute top-4 left-4 z-50 bg-rose-gold/20 border border-rose-gold/40 rounded-full w-8 h-8 flex items-center justify-center">
        <span className="font-cinzel text-xs text-rose-gold font-bold">1</span>
      </div>

      {/* Imagen de fondo de la quinceañera - con filtro de saturación */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/img/quinceañera.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.65,
          filter: "saturate(1.15)",
        }}
      />

      {/* Overlay oscuro para legibilidad del texto + viñeta */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-abyss/70 via-navy-dark/40 to-navy-abyss/80 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy-abyss/40 via-transparent to-navy-abyss/40 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy-abyss/60 via-transparent to-navy-abyss/40 pointer-events-none" />

      {/* Burbujas grandes - azul brillante con brillo — NO backdrop-blur on mobile */}
      {BIG_BUBBLES.map((b, i) => (
        <div
          key={`big-${i}`}
          className={`absolute rounded-full animate-bubble-float z-[3] bubble-glass ${b.size} ${b.pos} hidden md:block`}
          style={{ animationDelay: b.delay, ...b.cssVars } as React.CSSProperties}
        />
      ))}
      {/* Mobile: fewer big bubbles, no backdrop-blur */}
      {BIG_BUBBLES.slice(0, MOBILE_BIG_BUBBLE_COUNT).map((b, i) => (
        <div
          key={`big-m-${i}`}
          className={`absolute rounded-full animate-bubble-float z-[3] bubble-glass ${b.size} ${b.pos} md:hidden`}
          style={{ animationDelay: b.delay, ...b.cssVars } as React.CSSProperties}
        />
      ))}

      {/* Burbujas pequenas con shimmer — NO backdrop-blur */}
      {SHIMMER_BUBBLES.map((b, i) => (
        <div
          key={`shim-${i}`}
          className={`absolute rounded-full animate-bubble-shimmer z-[3] bubble-glass ${b.size} ${b.pos} hidden md:block`}
          style={{ animationDelay: b.delay, ...b.cssVars } as React.CSSProperties}
        />
      ))}
      {SHIMMER_BUBBLES.slice(0, MOBILE_SHIMMER_COUNT).map((b, i) => (
        <div
          key={`shim-m-${i}`}
          className={`absolute rounded-full animate-bubble-shimmer z-[3] bubble-glass ${b.size} ${b.pos} md:hidden`}
          style={{ animationDelay: b.delay, ...b.cssVars } as React.CSSProperties}
        />
      ))}

      {/* Destellos flotantes más sutiles */}
      {SPARKLES.map((b, i) => (
        <div
          key={`spark-${i}`}
          className={`absolute rounded-full animate-sparkle-float z-[3] sparkle-glow ${b.size} ${b.pos} hidden md:block`}
          style={{ animationDelay: b.delay, ...b.cssVars } as React.CSSProperties}
        />
      ))}
      {SPARKLES.slice(0, MOBILE_SPARKLE_COUNT).map((b, i) => (
        <div
          key={`spark-m-${i}`}
          className={`absolute rounded-full animate-sparkle-float z-[3] sparkle-glow ${b.size} ${b.pos} md:hidden`}
          style={{ animationDelay: b.delay, ...b.cssVars } as React.CSSProperties}
        />
      ))}

      {/* Resplandores plateados muy suaves (radial-gradient estático = sin filter:blur, 0 costo de compositing) */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full animate-moon-glow-soft pointer-events-none z-[2] hidden md:block" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 right-1/4 w-[250px] h-[250px] rounded-full animate-moon-glow-soft pointer-events-none z-[2] hidden md:block" style={{ animationDelay: "1s", background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/3 left-1/3 w-[200px] h-[200px] rounded-full animate-moon-glow-soft pointer-events-none z-[2] hidden md:block" style={{ animationDelay: "2s", background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)" }} />
      {/* Mobile: single smaller glow */}
      <div className="absolute top-1/3 left-1/4 w-[200px] h-[200px] rounded-full animate-moon-glow-soft pointer-events-none z-[2] md:hidden" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)" }} />

      {/* Micro-partículas de espuma flotando */}
      {FOAM_PARTICLES.map((p, i) => (
        <div
          key={`foam-${i}`}
          className={`absolute rounded-full animate-sparkle-float z-[2] ${p.size} ${p.pos} ${p.opacity} hidden md:block`}
          style={{ animationDelay: p.delay }}
        />
      ))}
      {FOAM_PARTICLES.slice(0, MOBILE_FOAM_COUNT).map((p, i) => (
        <div
          key={`foam-m-${i}`}
          className={`absolute rounded-full animate-sparkle-float z-[2] ${p.size} ${p.pos} ${p.opacity} md:hidden`}
          style={{ animationDelay: p.delay }}
        />
      ))}

      {/* Brillo central detrás del nombre (gradiente estático = 0 filter:blur) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full pointer-events-none animate-soft-glow z-[2] hidden md:block" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.10) 0%, transparent 65%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full pointer-events-none animate-soft-glow z-[2] md:hidden" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.10) 0%, transparent 65%)" }} />

      {/* Marco decorativo sutil */}
      <div className="absolute inset-5 border border-white/5 pointer-events-none rounded-sm z-[2]">
        <div className="absolute inset-1.5 border border-white/3 pointer-events-none rounded-sm" />
      </div>

      {/* Esquinas ornamentales discretas */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-white/15 pointer-events-none z-[2]" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-white/15 pointer-events-none z-[2]" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-white/15 pointer-events-none z-[2]" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-white/15 pointer-events-none z-[2]" />

      {/* Líneas decorativas finas flotando */}
      {THIN_LINES.map((l, i) => (
        <div
          key={`line-${i}`}
          className={`absolute h-px animate-sparkle-float z-[2] ${l.pos} ${l.width} ${l.gradient} ${l.rotation} hidden md:block`}
          style={{ animationDelay: l.delay }}
        />
      ))}
      {THIN_LINES.slice(0, MOBILE_LINE_COUNT).map((l, i) => (
        <div
          key={`line-m-${i}`}
          className={`absolute h-px animate-sparkle-float z-[2] ${l.pos} ${l.width} ${l.gradient} ${l.rotation} md:hidden`}
          style={{ animationDelay: l.delay }}
        />
      ))}

      {/* Puntos decorativos flotando */}
      {GLOW_DOTS.map((d, i) => (
        <div
          key={`dot-${i}`}
          className={`absolute rounded-full animate-moon-glow-soft z-[2] ${d.size} ${d.pos} ${d.opacity}`}
          style={{ animationDelay: d.delay }}
        />
      ))}

      {/* Cabecera / Bienvenida */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mt-10 z-10 relative"
      >
        <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-rose-gold/80 font-medium">
          Te Invito a Celebrar
        </span>
      </motion.div>

      {/* Nombre y Título Principal */}
      <div className="flex flex-col items-center justify-center flex-grow z-10 max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.1 }}
          className="relative flex flex-col items-center"
        >
          {/* Glow plateado más pronunciado detrás del nombre (gradiente estático = 0 filter:blur) */}
          <div className="absolute inset-0 rounded-full scale-130 -translate-y-3 animate-soft-glow" style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.20) 0%, rgba(243,229,216,0.08) 40%, transparent 70%)" }} />

          {/* Segunda capa de glow */}
          <div className="absolute inset-0 rounded-full scale-110 -translate-y-1 animate-moon-glow-soft" style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(0,245,255,0.10) 0%, transparent 65%)" }} />

          {/* Nombre caligráfico gigante en rose-gold con glow */}
          <h1 className="font-pinyon text-7xl md:text-9xl text-rose-gold-light tracking-wide relative" style={{ textShadow: "0 0 40px rgba(243,229,216,0.5), 0 0 80px rgba(243,229,216,0.25), 0 0 120px rgba(212,163,115,0.15)" }}>
            Marina
          </h1>

          {/* Línea decorativa sutil */}
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-rose-gold/60 to-transparent my-5 mx-auto" />

          <h2 className="font-cinzel text-base md:text-xl uppercase tracking-[0.3em] text-gold-accent/90 relative">
            Mis 15 Años
          </h2>
        </motion.div>
      </div>

      {/* Flecha de Scroll */}
      <motion.button
        onClick={handleScrollDown}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-white/5 active:scale-95 focus:outline-none transition-colors mb-8 z-10"
        aria-label="Desplazarse hacia abajo"
      >
        <ChevronDown className="w-5 h-5 text-rose-gold/80 hover:text-rose-gold" />
      </motion.button>
    </section>
  );
}
