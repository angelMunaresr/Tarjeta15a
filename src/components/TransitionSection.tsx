"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import WaveDivider from "./WaveDivider";
import { useRef } from "react";

export default function TransitionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);

  return (
    <section
      ref={sectionRef}
      id="transition-section"
      className="relative min-h-[85vh] w-full flex flex-col justify-between bg-navy-medium select-none py-20"
      style={{ overflow: "visible" }}
    >
      {/* Parallax background layer - cubre toda la sección */}
      <motion.div
        className="absolute inset-0 z-[0]"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-medium to-navy-light" />
        <div className="absolute inset-0 bg-navy-medium" />
      </motion.div>

      {/* Número de sección */}
      <div className="absolute top-4 left-4 z-50 bg-rose-gold/20 border border-rose-gold/40 rounded-full w-8 h-8 flex items-center justify-center">
        <span className="font-cinzel text-xs text-rose-gold font-bold">2</span>
      </div>

      {/* Burbujas continuas desde sección 1 - z-index alto para estar sobre el panel */}
      <div className="absolute top-[5%] left-[5%] w-12 h-12 rounded-full animate-bubble-float z-[11] backdrop-blur-sm" style={{ animationDelay: "0s", background: "radial-gradient(circle at 30% 30%, rgba(173, 216, 255, 0.5) 0%, rgba(100, 149, 237, 0.2) 50%, rgba(30, 60, 114, 0.06) 100%)", boxShadow: "inset -2px -2px 6px rgba(173, 216, 255, 0.25), inset 1px 1px 4px rgba(255, 255, 255, 0.12), 0 0 15px rgba(100, 149, 237, 0.18)" }} />
      <div className="absolute top-[8%] right-[10%] w-8 h-8 rounded-full animate-bubble-float z-[11] backdrop-blur-sm" style={{ animationDelay: "0.3s", background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6) 0%, rgba(200, 220, 255, 0.25) 50%, rgba(180, 200, 230, 0.06) 100%)", boxShadow: "inset -2px -2px 5px rgba(255, 255, 255, 0.2), inset 1px 1px 3px rgba(255, 255, 255, 0.1), 0 0 12px rgba(200, 220, 255, 0.2)" }} />
      <div className="absolute top-[12%] left-[15%] w-6 h-6 rounded-full animate-bubble-float z-[11] backdrop-blur-sm" style={{ animationDelay: "0.6s", background: "radial-gradient(circle at 30% 30%, rgba(135, 180, 220, 0.45) 0%, rgba(70, 130, 180, 0.2) 50%, rgba(30, 60, 100, 0.05) 100%)", boxShadow: "inset -1px -1px 4px rgba(135, 180, 220, 0.2), inset 1px 1px 2px rgba(255, 255, 255, 0.1), 0 0 10px rgba(100, 149, 237, 0.15)" }} />
      <div className="absolute top-[3%] right-[25%] w-10 h-10 rounded-full animate-bubble-float z-[11] backdrop-blur-sm" style={{ animationDelay: "0.9s", background: "radial-gradient(circle at 30% 30%, rgba(200, 220, 255, 0.55) 0%, rgba(150, 180, 230, 0.22) 50%, rgba(50, 80, 130, 0.06) 100%)", boxShadow: "inset -2px -2px 5px rgba(200, 220, 255, 0.25), inset 1px 1px 3px rgba(255, 255, 255, 0.12), 0 0 12px rgba(150, 180, 230, 0.18)" }} />
      <div className="absolute top-[15%] left-[8%] w-5 h-5 rounded-full animate-bubble-float z-[11] backdrop-blur-sm" style={{ animationDelay: "1.2s", background: "radial-gradient(circle at 30% 30%, rgba(176, 196, 222, 0.4) 0%, rgba(100, 149, 237, 0.18) 50%, rgba(40, 80, 140, 0.05) 100%)", boxShadow: "inset -1px -1px 3px rgba(176, 196, 222, 0.18), inset 1px 1px 2px rgba(255, 255, 255, 0.08), 0 0 10px rgba(100, 149, 237, 0.12)" }} />

      {/* Burbujas pequeñas con shimmer */}
      <div className="absolute top-[10%] left-[25%] w-3 h-3 rounded-full animate-bubble-shimmer z-[11] backdrop-blur-sm" style={{ animationDelay: "0.2s", background: "radial-gradient(circle at 30% 30%, rgba(200, 220, 255, 0.65) 0%, rgba(100, 149, 237, 0.3) 50%, rgba(60, 90, 150, 0.08) 100%)", boxShadow: "inset -1px -1px 2px rgba(200, 220, 255, 0.3), inset 1px 1px 1px rgba(255, 255, 255, 0.15), 0 0 6px rgba(100, 149, 237, 0.25)" }} />
      <div className="absolute top-[6%] right-[35%] w-4 h-4 rounded-full animate-bubble-shimmer z-[11] backdrop-blur-sm" style={{ animationDelay: "0.5s", background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.75) 0%, rgba(220, 235, 255, 0.35) 50%, rgba(180, 200, 240, 0.1) 100%)", boxShadow: "inset -1px -1px 2px rgba(255, 255, 255, 0.35), inset 1px 1px 1px rgba(255, 255, 255, 0.18), 0 0 8px rgba(220, 235, 255, 0.3)" }} />
      <div className="absolute top-[18%] left-[35%] w-2.5 h-2.5 rounded-full animate-bubble-shimmer z-[11] backdrop-blur-sm" style={{ animationDelay: "0.8s", background: "radial-gradient(circle at 30% 30%, rgba(150, 180, 220, 0.55) 0%, rgba(80, 120, 180, 0.25) 50%, rgba(40, 70, 130, 0.06) 100%)", boxShadow: "inset -1px -1px 2px rgba(150, 180, 220, 0.25), inset 1px 1px 1px rgba(255, 255, 255, 0.12), 0 0 7px rgba(80, 120, 180, 0.2)" }} />

      {/* Destellos flotantes */}
      <div className="absolute top-[8%] left-[40%] w-1.5 h-1.5 rounded-full animate-sparkle-float z-[11]" style={{ animationDelay: "0s", background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)", boxShadow: "0 0 5px rgba(255,255,255,0.25)" }} />
      <div className="absolute top-[12%] right-[15%] w-1 h-1 rounded-full animate-sparkle-float z-[11]" style={{ animationDelay: "0.4s", background: "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 70%, transparent 100%)", boxShadow: "0 0 4px rgba(255,255,255,0.22)" }} />
      <div className="absolute top-[15%] left-[20%] w-2 h-2 rounded-full animate-sparkle-float z-[11]" style={{ animationDelay: "0.8s", background: "radial-gradient(circle, rgba(200, 220, 255, 0.5) 0%, rgba(200, 220, 255, 0.08) 70%, transparent 100%)", boxShadow: "0 0 6px rgba(200, 220, 255, 0.2)" }} />

{/* Micro-partículas de espuma */}
      <div className="absolute top-[10%] right-[30%] w-0.5 h-0.5 bg-white/15 rounded-full animate-sparkle-float z-[11]" style={{ animationDelay: "0.7s" }} />
      <div className="absolute top-[15%] left-[45%] w-0.5 h-0.5 bg-white/18 rounded-full animate-sparkle-float z-[11]" style={{ animationDelay: "1.1s" }} />

      {/* Contenido con parallax */}
<motion.div
        className="max-w-xl mx-auto px-6 w-full flex-grow flex items-center justify-center z-10"
        style={{ y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full glass-panel p-8 md:p-12 rounded-2xl relative shadow-2xl flex flex-col items-center text-center"
        >
          {/* Esquinas ornamentales del panel */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-rose-gold/30 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-rose-gold/30 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-rose-gold/30 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-rose-gold/30 pointer-events-none" />

          {/* Sparkles Icon */}
          <div className="mb-6 p-3.5 rounded-full bg-navy-light/50 border border-rose-gold/20 text-rose-gold shadow-[0_0_15px_rgba(212,163,115,0.15)] animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>

          {/* Título de la Sección */}
          <h3 className="font-cinzel text-lg md:text-2xl text-rose-gold font-bold tracking-wide leading-relaxed mb-6">
            El Anuncio de la Gran Noche
          </h3>

          {/* Contenido Narrativo */}
          <div className="space-y-4 font-montserrat text-xs md:text-sm leading-relaxed text-slate-300 font-light">
            <p>
              El calendario marca que mi verdadero día es el{" "}
              <strong className="text-rose-gold-light font-medium">Sábado 23 de Mayo</strong>,
              el instante en que la vida me dio la bienvenida.
            </p>

            <div className="flex items-center justify-center my-6 gap-3">
              <span className="h-[1px] w-6 bg-rose-gold/20" />
              <span className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-gold-accent">
                Pero la magia no se detiene...
              </span>
              <span className="h-[1px] w-6 bg-rose-gold/20" />
            </div>

            <p className="text-slate-100 font-normal">
              ¡La verdadera magia y mi gran fiesta de celebración nos esperan en el salón el
            </p>

            {/* Destacado de fecha de fiesta */}
            <div className="py-2">
              <span className="inline-block font-cinzel text-2xl md:text-3xl text-rose-gold-light tracking-widest font-semibold" style={{ textShadow: "0 0 30px rgba(243,229,216,0.4), 0 0 60px rgba(212,163,115,0.2)" }}>
                SÁBADO 14 DE NOVIEMBRE
              </span>
            </div>

            <p className="text-slate-400 italic text-[11px] md:text-xs pt-4 leading-relaxed border-t border-white/5 max-w-sm mx-auto">
              Prepara tu mejor atuendo, tu sonrisa más brillante y tus ganas de bailar bajo la luna marina. ¡Esta noche quedará grabada en nuestros corazones para siempre!
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Onda inferior animada que transiciona a DetailsSection */}
      <WaveDivider className="-mb-16 z-10" fillColor="text-navy-light" flip={true} animated={true} height="h-[100px] md:h-[150px]" />

      {/* Burbujas que emergen del agua - efecto innovador */}
      <div className="absolute bottom-[8%] left-[10%] w-4 h-4 rounded-full animate-bubble-rise z-[11] backdrop-blur-sm" style={{ animationDelay: "0s", background: "radial-gradient(circle at 30% 30%, rgba(200, 220, 255, 0.7) 0%, rgba(100, 149, 237, 0.35) 50%, rgba(60, 90, 150, 0.1) 100%)", boxShadow: "inset -1px -1px 3px rgba(255,255,255,0.3), inset 1px 1px 2px rgba(255,255,255,0.15), 0 0 10px rgba(100, 149, 237, 0.4)" }} />
      <div className="absolute bottom-[12%] left-[25%] w-3 h-3 rounded-full animate-bubble-rise z-[11] backdrop-blur-sm" style={{ animationDelay: "0.5s", background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(220, 235, 255, 0.4) 50%, rgba(180, 200, 240, 0.1) 100%)", boxShadow: "inset -1px -1px 2px rgba(255,255,255,0.35), inset 1px 1px 1px rgba(255,255,255,0.2), 0 0 8px rgba(220, 235, 255, 0.35)" }} />
      <div className="absolute bottom-[6%] right-[15%] w-5 h-5 rounded-full animate-bubble-rise z-[11] backdrop-blur-sm" style={{ animationDelay: "1s", background: "radial-gradient(circle at 30% 30%, rgba(150, 180, 220, 0.65) 0%, rgba(80, 120, 180, 0.3) 50%, rgba(40, 70, 130, 0.08) 100%)", boxShadow: "inset -1px -1px 3px rgba(150, 180, 220, 0.3), inset 1px 1px 2px rgba(255,255,255,0.15), 0 0 12px rgba(80, 120, 180, 0.3)" }} />
      <div className="absolute bottom-[10%] right-[35%] w-2.5 h-2.5 rounded-full animate-bubble-rise z-[11] backdrop-blur-sm" style={{ animationDelay: "1.5s", background: "radial-gradient(circle at 30% 30%, rgba(200, 220, 255, 0.75) 0%, rgba(100, 149, 237, 0.35) 50%, rgba(60, 90, 150, 0.1) 100%)", boxShadow: "inset -1px -1px 2px rgba(200, 220, 255, 0.35), inset 1px 1px 1px rgba(255,255,255,0.18), 0 0 7px rgba(100, 149, 237, 0.32)" }} />
      <div className="absolute bottom-[14%] left-[45%] w-3.5 h-3.5 rounded-full animate-bubble-rise z-[11] backdrop-blur-sm" style={{ animationDelay: "2s", background: "radial-gradient(circle at 30% 30%, rgba(176, 196, 222, 0.6) 0%, rgba(100, 149, 237, 0.28) 50%, rgba(40, 80, 140, 0.08) 100%)", boxShadow: "inset -1px -1px 2px rgba(176, 196, 222, 0.28), inset 1px 1px 1px rgba(255,255,255,0.14), 0 0 9px rgba(100, 149, 237, 0.28)" }} />
      <div className="absolute bottom-[5%] left-[60%] w-2 h-2 rounded-full animate-bubble-rise z-[11] backdrop-blur-sm" style={{ animationDelay: "0.3s", background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.7) 0%, rgba(210, 230, 255, 0.35) 50%, rgba(160, 190, 230, 0.1) 100%)", boxShadow: "inset -1px -1px 2px rgba(255,255,255,0.32), inset 1px 1px 1px rgba(255,255,255,0.16), 0 0 6px rgba(210, 230, 255, 0.32)" }} />
    </section>
  );
}