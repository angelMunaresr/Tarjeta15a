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
      {/* Luz central en el fondo (destello azul y oro rosa) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-sea-glow/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-rose-gold/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Margen Decorativo de Alta Gama */}
      <div className="absolute inset-5 border border-rose-gold/15 pointer-events-none rounded-sm">
        <div className="absolute inset-1.5 border border-rose-gold/5 pointer-events-none rounded-sm" />
      </div>

      {/* Esquinas ornamentales estilo invitación clásica */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-rose-gold/40 pointer-events-none" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-rose-gold/40 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-rose-gold/40 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-rose-gold/40 pointer-events-none" />

      {/* Cabecera / Bienvenida */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mt-10 z-10"
      >
        <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-rose-gold/80 font-medium">
          Te Invito a Celebrar
        </span>
      </motion.div>

      {/* Nombre y Título Principal */}
      <div className="flex flex-col items-center justify-center flex-grow z-10 max-w-lg mt-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          {/* Nombre caligráfico gigante en Pinyon Script */}
          <h1 className="font-pinyon text-7xl md:text-9xl text-rose-gold-light tracking-wide drop-shadow-[0_2px_20px_rgba(212,163,115,0.2)]">
            Marina
          </h1>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-rose-gold to-transparent my-5 mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: "easeOut", delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="font-cinzel text-base md:text-xl uppercase tracking-[0.3em] text-gold-accent">
            Mis 15 Años
          </h2>
          <p className="font-montserrat text-xs md:text-sm text-slate-300 font-light max-w-xs md:max-w-sm mx-auto leading-relaxed italic px-4">
            "El susurro del viento sobre las olas marca el compás de un nuevo camino. Hoy el mar se viste de gala para celebrar la magia de la juventud."
          </p>
        </motion.div>
      </div>

      {/* Fecha Real / Pie de la Portada */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="flex flex-col items-center z-10 w-full mb-2"
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="w-6 h-[1px] bg-rose-gold/30" />
          <span className="font-cinzel text-xs md:text-sm tracking-[0.2em] text-slate-200 uppercase">
            Sábado 23 de Mayo
          </span>
          <div className="w-6 h-[1px] bg-rose-gold/30" />
        </div>
        <p className="text-[9px] uppercase tracking-widest text-slate-500 font-light mb-6">
          Fecha de Nacimiento
        </p>

        {/* Flecha de Scroll */}
        <motion.button
          onClick={handleScrollDown}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-white/5 active:scale-95 focus:outline-none transition-colors"
          aria-label="Desplazarse hacia abajo"
        >
          <ChevronDown className="w-5 h-5 text-rose-gold/80 hover:text-rose-gold" />
        </motion.button>
      </motion.div>
    </section>
  );
}
