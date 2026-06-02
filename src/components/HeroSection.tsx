"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
          backgroundImage: "url('/img/quinceañera.webp'), url('/img/quinceañera.jpg')",
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

      {/* Burbujas grandes - azul brillante con brillo */}
      <div className="absolute top-[10%] left-[5%] w-16 h-16 rounded-full animate-bubble-float z-[3] backdrop-blur-sm" style={{ animationDelay: "0s", background: "radial-gradient(circle at 30% 30%, rgba(173, 216, 255, 0.6) 0%, rgba(100, 149, 237, 0.25) 50%, rgba(30, 60, 114, 0.08) 100%)", boxShadow: "inset -3px -3px 8px rgba(173, 216, 255, 0.3), inset 2px 2px 6px rgba(255, 255, 255, 0.15), 0 0 20px rgba(100, 149, 237, 0.2)" }} />
      <div className="absolute top-[15%] right-[8%] w-12 h-12 rounded-full animate-bubble-float z-[3] backdrop-blur-sm" style={{ animationDelay: "0.5s", background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.7) 0%, rgba(200, 220, 255, 0.3) 50%, rgba(180, 200, 230, 0.08) 100%)", boxShadow: "inset -2px -2px 6px rgba(255, 255, 255, 0.25), inset 1px 1px 4px rgba(255, 255, 255, 0.1), 0 0 15px rgba(200, 220, 255, 0.25)" }} />
      <div className="absolute top-[25%] left-[12%] w-8 h-8 rounded-full animate-bubble-float z-[3] backdrop-blur-sm" style={{ animationDelay: "1s", background: "radial-gradient(circle at 30% 30%, rgba(135, 180, 220, 0.55) 0%, rgba(70, 130, 180, 0.25) 50%, rgba(30, 60, 100, 0.08) 100%)", boxShadow: "inset -2px -2px 5px rgba(135, 180, 220, 0.25), inset 1px 1px 3px rgba(255, 255, 255, 0.12), 0 0 12px rgba(100, 149, 237, 0.18)" }} />
      <div className="absolute top-[30%] right-[15%] w-14 h-14 rounded-full animate-bubble-float z-[3] backdrop-blur-sm" style={{ animationDelay: "1.5s", background: "radial-gradient(circle at 30% 30%, rgba(176, 196, 222, 0.5) 0%, rgba(100, 149, 237, 0.2) 50%, rgba(40, 80, 140, 0.06) 100%)", boxShadow: "inset -3px -3px 7px rgba(176, 196, 222, 0.2), inset 2px 2px 5px rgba(255, 255, 255, 0.1), 0 0 16px rgba(100, 149, 237, 0.15)" }} />
      <div className="absolute top-[45%] left-[8%] w-10 h-10 rounded-full animate-bubble-float z-[3] backdrop-blur-sm" style={{ animationDelay: "2s", background: "radial-gradient(circle at 30% 30%, rgba(200, 220, 255, 0.65) 0%, rgba(150, 180, 230, 0.3) 50%, rgba(50, 80, 130, 0.08) 100%)", boxShadow: "inset -2px -2px 5px rgba(200, 220, 255, 0.3), inset 1px 1px 4px rgba(255, 255, 255, 0.15), 0 0 14px rgba(150, 180, 230, 0.2)" }} />
      <div className="absolute top-[55%] right-[10%] w-20 h-20 rounded-full animate-bubble-float z-[3] backdrop-blur-sm" style={{ animationDelay: "2.5s", background: "radial-gradient(circle at 30% 30%, rgba(65, 105, 175, 0.4) 0%, rgba(30, 60, 120, 0.15) 50%, rgba(20, 40, 80, 0.05) 100%)", boxShadow: "inset -4px -4px 10px rgba(65, 105, 175, 0.2), inset 2px 2px 6px rgba(255, 255, 255, 0.08), 0 0 20px rgba(65, 105, 175, 0.15)" }} />
      <div className="absolute top-[65%] left-[15%] w-6 h-6 rounded-full animate-bubble-float z-[3] backdrop-blur-sm" style={{ animationDelay: "0.3s", background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(210, 230, 255, 0.35) 50%, rgba(160, 190, 230, 0.1) 100%)", boxShadow: "inset -1px -1px 3px rgba(255, 255, 255, 0.35), inset 1px 1px 2px rgba(255, 255, 255, 0.2), 0 0 10px rgba(210, 230, 255, 0.3)" }} />
      <div className="absolute top-[75%] right-[20%] w-18 h-18 rounded-full animate-bubble-float z-[3] backdrop-blur-sm" style={{ animationDelay: "0.8s", background: "radial-gradient(circle at 30% 30%, rgba(100, 149, 237, 0.45) 0%, rgba(50, 90, 160, 0.18) 50%, rgba(30, 50, 100, 0.05) 100%)", boxShadow: "inset -3px -3px 8px rgba(100, 149, 237, 0.22), inset 2px 2px 5px rgba(255, 255, 255, 0.1), 0 0 18px rgba(100, 149, 237, 0.18)" }} />
      <div className="absolute bottom-[30%] left-[10%] w-24 h-24 rounded-full animate-bubble-float z-[3] backdrop-blur-sm" style={{ animationDelay: "1.3s", background: "radial-gradient(circle at 30% 30%, rgba(70, 110, 180, 0.35) 0%, rgba(40, 70, 130, 0.12) 50%, rgba(20, 40, 80, 0.04) 100%)", boxShadow: "inset -4px -4px 12px rgba(70, 110, 180, 0.18), inset 2px 2px 8px rgba(255, 255, 255, 0.06), 0 0 25px rgba(70, 110, 180, 0.12)" }} />
      <div className="absolute bottom-[20%] right-[8%] w-11 h-11 rounded-full animate-bubble-float z-[3] backdrop-blur-sm" style={{ animationDelay: "1.8s", background: "radial-gradient(circle at 30% 30%, rgba(220, 235, 255, 0.6) 0%, rgba(160, 190, 230, 0.25) 50%, rgba(60, 100, 160, 0.08) 100%)", boxShadow: "inset -2px -2px 6px rgba(220, 235, 255, 0.28), inset 1px 1px 4px rgba(255, 255, 255, 0.14), 0 0 15px rgba(160, 190, 230, 0.2)" }} />
      <div className="absolute top-[85%] left-[25%] w-9 h-9 rounded-full animate-bubble-float z-[3] backdrop-blur-sm" style={{ animationDelay: "2.2s", background: "radial-gradient(circle at 30% 30%, rgba(180, 210, 240, 0.5) 0%, rgba(100, 150, 200, 0.22) 50%, rgba(50, 80, 140, 0.06) 100%)", boxShadow: "inset -2px -2px 5px rgba(180, 210, 240, 0.22), inset 1px 1px 3px rgba(255, 255, 255, 0.1), 0 0 12px rgba(100, 150, 200, 0.18)" }} />
      <div className="absolute top-[40%] right-[25%] w-7 h-7 rounded-full animate-bubble-float z-[3] backdrop-blur-sm" style={{ animationDelay: "0.6s", background: "radial-gradient(circle at 30% 30%, rgba(200, 225, 255, 0.65) 0%, rgba(140, 175, 220, 0.28) 50%, rgba(60, 90, 140, 0.08) 100%)", boxShadow: "inset -1px -1px 4px rgba(200, 225, 255, 0.3), inset 1px 1px 3px rgba(255, 255, 255, 0.15), 0 0 11px rgba(140, 175, 220, 0.22)" }} />

      {/* Burbujas pequenas con shimmer - azul y plateado brillante */}
      <div className="absolute top-[12%] left-[30%] w-4 h-4 rounded-full animate-bubble-shimmer z-[3] backdrop-blur-sm" style={{ animationDelay: "0.2s", background: "radial-gradient(circle at 30% 30%, rgba(200, 220, 255, 0.75) 0%, rgba(100, 149, 237, 0.35) 50%, rgba(60, 90, 150, 0.1) 100%)", boxShadow: "inset -1px -1px 3px rgba(200, 220, 255, 0.35), inset 1px 1px 2px rgba(255, 255, 255, 0.2), 0 0 8px rgba(100, 149, 237, 0.3)" }} />
      <div className="absolute top-[22%] right-[25%] w-3 h-3 rounded-full animate-bubble-shimmer z-[3] backdrop-blur-sm" style={{ animationDelay: "0.7s", background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.85) 0%, rgba(220, 235, 255, 0.4) 50%, rgba(180, 200, 240, 0.12) 100%)", boxShadow: "inset -1px -1px 2px rgba(255, 255, 255, 0.4), inset 0.5px 0.5px 1px rgba(255, 255, 255, 0.2), 0 0 6px rgba(220, 235, 255, 0.35)" }} />
      <div className="absolute top-[38%] left-[5%] w-5 h-5 rounded-full animate-bubble-shimmer z-[3] backdrop-blur-sm" style={{ animationDelay: "1.2s", background: "radial-gradient(circle at 30% 30%, rgba(150, 180, 220, 0.65) 0%, rgba(80, 120, 180, 0.3) 50%, rgba(40, 70, 130, 0.08) 100%)", boxShadow: "inset -1px -1px 3px rgba(150, 180, 220, 0.3), inset 1px 1px 2px rgba(255, 255, 255, 0.15), 0 0 10px rgba(80, 120, 180, 0.25)" }} />
      <div className="absolute top-[50%] right-[5%] w-3 h-3 rounded-full animate-bubble-shimmer z-[3] backdrop-blur-sm" style={{ animationDelay: "1.7s", background: "radial-gradient(circle at 30% 30%, rgba(220, 240, 255, 0.7) 0%, rgba(130, 170, 220, 0.32) 50%, rgba(70, 100, 160, 0.1) 100%)", boxShadow: "inset -1px -1px 2px rgba(220, 240, 255, 0.32), inset 0.5px 0.5px 1px rgba(255, 255, 255, 0.16), 0 0 7px rgba(130, 170, 220, 0.28)" }} />
      <div className="absolute top-[60%] left-[25%] w-4 h-4 rounded-full animate-bubble-shimmer z-[3] backdrop-blur-sm" style={{ animationDelay: "2.2s", background: "radial-gradient(circle at 30% 30%, rgba(180, 210, 245, 0.68) 0%, rgba(110, 150, 200, 0.3) 50%, rgba(60, 90, 150, 0.08) 100%)", boxShadow: "inset -1px -1px 3px rgba(180, 210, 245, 0.32), inset 1px 1px 2px rgba(255, 255, 255, 0.16), 0 0 8px rgba(110, 150, 200, 0.26)" }} />
      <div className="absolute top-[70%] right-[30%] w-5 h-5 rounded-full animate-bubble-shimmer z-[3] backdrop-blur-sm" style={{ animationDelay: "0.4s", background: "radial-gradient(circle at 30% 30%, rgba(70, 105, 175, 0.6) 0%, rgba(50, 80, 140, 0.28) 50%, rgba(30, 50, 100, 0.08) 100%)", boxShadow: "inset -1px -1px 3px rgba(70, 105, 175, 0.28), inset 1px 1px 2px rgba(255, 255, 255, 0.14), 0 0 10px rgba(50, 80, 140, 0.24)" }} />
      <div className="absolute bottom-[35%] left-[20%] w-3 h-3 rounded-full animate-bubble-shimmer z-[3] backdrop-blur-sm" style={{ animationDelay: "0.9s", background: "radial-gradient(circle at 30% 30%, rgba(200, 225, 255, 0.72) 0%, rgba(120, 160, 210, 0.33) 50%, rgba(60, 90, 150, 0.1) 100%)", boxShadow: "inset -1px -1px 2px rgba(200, 225, 255, 0.34), inset 0.5px 0.5px 1px rgba(255, 255, 255, 0.17), 0 0 7px rgba(120, 160, 210, 0.29)" }} />
      <div className="absolute bottom-[25%] right-[25%] w-4 h-4 rounded-full animate-bubble-shimmer z-[3] backdrop-blur-sm" style={{ animationDelay: "1.4s", background: "radial-gradient(circle at 30% 30%, rgba(160, 195, 235, 0.66) 0%, rgba(90, 130, 190, 0.3) 50%, rgba(50, 80, 140, 0.08) 100%)", boxShadow: "inset -1px -1px 3px rgba(160, 195, 235, 0.31), inset 1px 1px 2px rgba(255, 255, 255, 0.15), 0 0 9px rgba(90, 130, 190, 0.25)" }} />

      {/* Destellos flotantes más sutiles */}
      <div className="absolute top-[8%] left-[18%] w-2 h-2 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "0s", background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)", boxShadow: "0 0 6px rgba(255,255,255,0.3)" }} />
      <div className="absolute top-[18%] right-[12%] w-1.5 h-1.5 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "0.5s", background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)", boxShadow: "0 0 5px rgba(255,255,255,0.25)" }} />
      <div className="absolute top-[35%] left-[3%] w-2.5 h-2.5 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "1s", background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 70%, transparent 100%)", boxShadow: "0 0 7px rgba(255,255,255,0.2)" }} />
      <div className="absolute top-[48%] right-[18%] w-1 h-1 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "1.5s", background: "radial-gradient(circle, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)", boxShadow: "0 0 4px rgba(255,255,255,0.3)" }} />
      <div className="absolute top-[58%] left-[20%] w-1.5 h-1.5 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "2s", background: "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 70%, transparent 100%)", boxShadow: "0 0 5px rgba(255,255,255,0.22)" }} />
      <div className="absolute top-[72%] right-[15%] w-2 h-2 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "0.3s", background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)", boxShadow: "0 0 6px rgba(255,255,255,0.28)" }} />
      <div className="absolute bottom-[28%] left-[8%] w-1 h-1 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "0.8s", background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)", boxShadow: "0 0 4px rgba(255,255,255,0.32)" }} />
      <div className="absolute bottom-[18%] right-[22%] w-2.5 h-2.5 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "1.3s", background: "radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.06) 70%, transparent 100%)", boxShadow: "0 0 7px rgba(255,255,255,0.18)" }} />
      <div className="absolute top-[82%] left-[15%] w-1.5 h-1.5 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "1.8s", background: "radial-gradient(circle, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.08) 70%, transparent 100%)", boxShadow: "0 0 5px rgba(255,255,255,0.25)" }} />
      <div className="absolute top-[28%] left-[35%] w-1 h-1 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "2.3s", background: "radial-gradient(circle, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)", boxShadow: "0 0 4px rgba(255,255,255,0.28)" }} />

      {/* Resplandores plateados muy suaves */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-white/3 rounded-full blur-[100px] animate-moon-glow-soft pointer-events-none z-[2]" />
      <div className="absolute top-1/2 right-1/4 w-[250px] h-[250px] bg-white/2 rounded-full blur-[80px] animate-moon-glow-soft pointer-events-none z-[2]" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/3 left-1/3 w-[200px] h-[200px] bg-white/1.5 rounded-full blur-[60px] animate-moon-glow-soft pointer-events-none z-[2]" style={{ animationDelay: "2s" }} />

      {/* Micro-partículas de espuma flotando */}
      <div className="absolute top-[5%] left-[15%] w-1 h-1 bg-white/30 rounded-full animate-sparkle-float z-[2]" style={{ animationDelay: "0.2s" }} />
      <div className="absolute top-[12%] right-[30%] w-0.5 h-0.5 bg-white/25 rounded-full animate-sparkle-float z-[2]" style={{ animationDelay: "0.7s" }} />
      <div className="absolute top-[33%] left-[40%] w-1 h-1 bg-white/20 rounded-full animate-sparkle-float z-[2]" style={{ animationDelay: "1.1s" }} />
      <div className="absolute top-[42%] right-[35%] w-0.5 h-0.5 bg-white/35 rounded-full animate-sparkle-float z-[2]" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[53%] left-[45%] w-1 h-1 bg-white/22 rounded-full animate-sparkle-float z-[2]" style={{ animationDelay: "1.9s" }} />
      <div className="absolute top-[68%] right-[40%] w-0.5 h-0.5 bg-white/28 rounded-full animate-sparkle-float z-[2]" style={{ animationDelay: "2.3s" }} />
      <div className="absolute bottom-[40%] left-[35%] w-1 h-1 bg-white/18 rounded-full animate-sparkle-float z-[2]" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-[15%] right-[30%] w-0.5 h-0.5 bg-white/32 rounded-full animate-sparkle-float z-[2]" style={{ animationDelay: "1.3s" }} />
      <div className="absolute top-[78%] left-[8%] w-1 h-1 bg-white/25 rounded-full animate-sparkle-float z-[2]" style={{ animationDelay: "0.9s" }} />
      <div className="absolute top-[88%] right-[12%] w-0.5 h-0.5 bg-white/20 rounded-full animate-sparkle-float z-[2]" style={{ animationDelay: "1.7s" }} />
      <div className="absolute top-[25%] left-[55%] w-0.5 h-0.5 bg-white/28 rounded-full animate-sparkle-float z-[2]" style={{ animationDelay: "2.1s" }} />
      <div className="absolute top-[62%] left-[3%] w-1 h-1 bg-white/15 rounded-full animate-sparkle-float z-[2]" style={{ animationDelay: "0.3s" }} />

      {/* Brillo central detrás del nombre */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-br from-white/[0.06] via-transparent to-transparent rounded-full blur-[100px] pointer-events-none animate-soft-glow z-[2]" />

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
      <div className="absolute top-[15%] left-[20%] w-8 h-px bg-gradient-to-r from-white/20 to-transparent rotate-45 animate-sparkle-float z-[2]" style={{ animationDelay: "0.4s" }} />
      <div className="absolute top-[30%] right-[25%] w-6 h-px bg-gradient-to-l from-white/15 to-transparent rotate-12 animate-sparkle-float z-[2]" style={{ animationDelay: "0.9s" }} />
      <div className="absolute top-[55%] left-[15%] w-10 h-px bg-gradient-to-r from-white/12 to-transparent -rotate-12 animate-sparkle-float z-[2]" style={{ animationDelay: "1.4s" }} />
      <div className="absolute bottom-[35%] right-[20%] w-7 h-px bg-gradient-to-l from-white/18 to-transparent rotate-45 animate-sparkle-float z-[2]" style={{ animationDelay: "1.9s" }} />
      <div className="absolute top-[70%] left-[30%] w-5 h-px bg-gradient-to-r from-white/10 to-transparent -rotate-30 animate-sparkle-float z-[2]" style={{ animationDelay: "2.4s" }} />
      <div className="absolute top-[42%] right-[8%] w-9 h-px bg-gradient-to-l from-white/14 to-transparent rotate-30 animate-sparkle-float z-[2]" style={{ animationDelay: "0.6s" }} />

      {/* Puntos decorativos flotando */}
      <div className="absolute top-[20%] left-[8%] w-0.5 h-0.5 bg-white/25 rounded-full animate-moon-glow-soft z-[2]" style={{ animationDelay: "0.3s" }} />
      <div className="absolute top-[48%] right-[12%] w-1 h-1 bg-white/15 rounded-full animate-moon-glow-soft z-[2]" style={{ animationDelay: "0.8s" }} />
      <div className="absolute bottom-[30%] left-[25%] w-0.5 h-0.5 bg-white/20 rounded-full animate-moon-glow-soft z-[2]" style={{ animationDelay: "1.3s" }} />
      <div className="absolute top-[80%] right-[28%] w-1 h-1 bg-white/12 rounded-full animate-moon-glow-soft z-[2]" style={{ animationDelay: "1.8s" }} />

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
          {/* Glow plateado más pronunciado detrás del nombre */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-rose-gold-light/8 to-transparent rounded-full blur-[120px] scale-130 -translate-y-3 animate-soft-glow" />

          {/* Segunda capa de glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-sea-glow/10 via-transparent to-transparent rounded-full blur-[80px] scale-110 -translate-y-1 animate-moon-glow-soft" />

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