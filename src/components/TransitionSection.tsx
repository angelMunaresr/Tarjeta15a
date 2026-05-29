"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import WaveDivider from "./WaveDivider";

export default function TransitionSection() {
  return (
    <section
      id="transition-section"
      className="relative min-h-[85vh] w-full flex flex-col justify-between bg-navy-medium overflow-hidden select-none py-20"
    >
      {/* Número de sección */}
      <div className="absolute top-4 left-4 z-50 bg-rose-gold/20 border border-rose-gold/40 rounded-full w-8 h-8 flex items-center justify-center">
        <span className="font-cinzel text-xs text-rose-gold font-bold">2</span>
      </div>

      {/* Luces de fondo sutiles */}
      <div className="absolute top-1/3 right-0 w-[280px] h-[280px] bg-rose-gold/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[240px] h-[240px] bg-sea-soft/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Onda superior para conectar desde HeroSection (que tiene fondo transparente sobre canvas) */}
      <WaveDivider className="-mt-20 z-10" fillColor="text-navy-medium" />

      {/* Tarjeta de Placa de Vidrio (Glassmorphic) de la Narrativa */}
      <div className="max-w-xl mx-auto px-6 w-full flex-grow flex items-center justify-center z-10">
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
              <span className="inline-block font-cinzel text-2xl md:text-3xl text-rose-gold-light tracking-widest font-semibold drop-shadow-[0_2px_10px_rgba(243,229,216,0.25)]">
                SÁBADO 14 DE NOVIEMBRE
              </span>
            </div>
            
            <p className="text-slate-400 italic text-[11px] md:text-xs pt-4 leading-relaxed border-t border-white/5 max-w-sm mx-auto">
              Prepara tu mejor atuendo, tu sonrisa más brillante y tus ganas de bailar bajo la luna marina. ¡Esta noche quedará grabada en nuestros corazones para siempre!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Onda inferior que transiciona a DetailsSection */}
      <WaveDivider className="-mb-20 z-10" fillColor="text-navy-light" flip={true} />
    </section>
  );
}
