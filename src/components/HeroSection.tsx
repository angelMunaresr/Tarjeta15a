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

      {/* Imagen de fondo de la quinceañera - menos opaca */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/img/quinceañera.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.65,
        }}
      />

      {/* Overlay oscuro para legibilidad del texto */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-abyss/70 via-navy-dark/40 to-navy-abyss/80 pointer-events-none" />

      {/* Burbujas plateadas grandes con brillo */}
      <div className="absolute top-[10%] left-[5%] w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/15 animate-bubble-float z-[3]" style={{ animationDelay: "0s" }} />
      <div className="absolute top-[15%] right-[8%] w-12 h-12 rounded-full bg-gradient-to-br from-white/15 to-transparent border border-white/10 animate-bubble-float z-[3]" style={{ animationDelay: "0.5s" }} />
      <div className="absolute top-[25%] left-[12%] w-8 h-8 rounded-full bg-gradient-to-br from-white/25 to-white/5 border border-white/20 animate-bubble-float z-[3]" style={{ animationDelay: "1s" }} />
      <div className="absolute top-[30%] right-[15%] w-14 h-14 rounded-full bg-gradient-to-br from-white/18 to-white/5 border border-white/12 animate-bubble-float z-[3]" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[45%] left-[8%] w-10 h-10 rounded-full bg-gradient-to-br from-white/22 to-white/8 border border-white/18 animate-bubble-float z-[3]" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[55%] right-[10%] w-20 h-20 rounded-full bg-gradient-to-br from-white/12 to-white/3 border border-white/8 animate-bubble-float z-[3]" style={{ animationDelay: "2.5s" }} />
      <div className="absolute top-[65%] left-[15%] w-6 h-6 rounded-full bg-gradient-to-br from-white/30 to-white/10 border border-white/25 animate-bubble-float z-[3]" style={{ animationDelay: "0.3s" }} />
      <div className="absolute top-[75%] right-[20%] w-18 h-18 rounded-full bg-gradient-to-br from-white/15 to-white/5 border border-white/10 animate-bubble-float z-[3]" style={{ animationDelay: "0.8s" }} />
      <div className="absolute bottom-[30%] left-[10%] w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-white/3 border border-white/8 animate-bubble-float z-[3]" style={{ animationDelay: "1.3s" }} />
      <div className="absolute bottom-[20%] right-[8%] w-11 h-11 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/15 animate-bubble-float z-[3]" style={{ animationDelay: "1.8s" }} />
      <div className="absolute top-[85%] left-[25%] w-9 h-9 rounded-full bg-gradient-to-br from-white/18 to-white/5 border border-white/12 animate-bubble-float z-[3]" style={{ animationDelay: "2.2s" }} />
      <div className="absolute top-[40%] right-[25%] w-7 h-7 rounded-full bg-gradient-to-br from-white/25 to-white/8 border border-white/20 animate-bubble-float z-[3]" style={{ animationDelay: "0.6s" }} />

      {/* Burbujas pequenas con shimmer */}
      <div className="absolute top-[12%] left-[30%] w-4 h-4 rounded-full bg-white/20 border border-white/15 animate-bubble-shimmer z-[3]" style={{ animationDelay: "0.2s" }} />
      <div className="absolute top-[22%] right-[25%] w-3 h-3 rounded-full bg-white/25 border border-white/20 animate-bubble-shimmer z-[3]" style={{ animationDelay: "0.7s" }} />
      <div className="absolute top-[38%] left-[5%] w-5 h-5 rounded-full bg-white/15 border border-white/10 animate-bubble-shimmer z-[3]" style={{ animationDelay: "1.2s" }} />
      <div className="absolute top-[50%] right-[5%] w-3 h-3 rounded-full bg-white/22 border border-white/18 animate-bubble-shimmer z-[3]" style={{ animationDelay: "1.7s" }} />
      <div className="absolute top-[60%] left-[25%] w-4 h-4 rounded-full bg-white/18 border border-white/12 animate-bubble-shimmer z-[3]" style={{ animationDelay: "2.2s" }} />
      <div className="absolute top-[70%] right-[30%] w-5 h-5 rounded-full bg-white/20 border border-white/15 animate-bubble-shimmer z-[3]" style={{ animationDelay: "0.4s" }} />
      <div className="absolute bottom-[35%] left-[20%] w-3 h-3 rounded-full bg-white/25 border border-white/20 animate-bubble-shimmer z-[3]" style={{ animationDelay: "0.9s" }} />
      <div className="absolute bottom-[25%] right-[25%] w-4 h-4 rounded-full bg-white/15 border border-white/10 animate-bubble-shimmer z-[3]" style={{ animationDelay: "1.4s" }} />

      {/* Destellos plateados flotantes */}
      <div className="absolute top-[8%] left-[18%] w-2 h-2 bg-white/60 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "0s" }} />
      <div className="absolute top-[18%] right-[12%] w-1.5 h-1.5 bg-white/50 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "0.5s" }} />
      <div className="absolute top-[35%] left-[3%] w-2.5 h-2.5 bg-white/40 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "1s" }} />
      <div className="absolute top-[48%] right-[18%] w-1 h-1 bg-white/55 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[58%] left-[20%] w-1.5 h-1.5 bg-white/45 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[72%] right-[15%] w-2 h-2 bg-white/50 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "0.3s" }} />
      <div className="absolute bottom-[28%] left-[8%] w-1 h-1 bg-white/60 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "0.8s" }} />
      <div className="absolute bottom-[18%] right-[22%] w-2.5 h-2.5 bg-white/35 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "1.3s" }} />
      <div className="absolute top-[82%] left-[15%] w-1.5 h-1.5 bg-white/55 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "1.8s" }} />
      <div className="absolute top-[28%] left-[35%] w-1 h-1 bg-white/50 rounded-full animate-sparkle-float z-[3]" style={{ animationDelay: "2.3s" }} />

      {/* Resplandores plateados suaves */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] animate-moon-glow-soft pointer-events-none z-[2]" />
      <div className="absolute top-1/2 right-1/4 w-[250px] h-[250px] bg-white/4 rounded-full blur-[80px] animate-moon-glow-soft pointer-events-none z-[2]" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/3 left-1/3 w-[200px] h-[200px] bg-white/3 rounded-full blur-[60px] animate-moon-glow-soft pointer-events-none z-[2]" style={{ animationDelay: "2s" }} />

      {/* Brillo central detrás del nombre */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-br from-white/[0.08] via-transparent to-transparent rounded-full blur-[100px] pointer-events-none animate-soft-glow z-[2]" />

      {/* Marco decorativo sutil */}
      <div className="absolute inset-5 border border-white/8 pointer-events-none rounded-sm z-[2]">
        <div className="absolute inset-1.5 border border-white/4 pointer-events-none rounded-sm" />
      </div>

      {/* Esquinas ornamentales discretas */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-white/20 pointer-events-none z-[2]" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-white/20 pointer-events-none z-[2]" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-white/20 pointer-events-none z-[2]" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-white/20 pointer-events-none z-[2]" />

      {/* Cabecera / Bienvenida */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mt-10 z-10 relative"
      >
        <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-rose-gold/70 font-medium">
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
          {/* Resplandor suave y plateado detrás del nombre */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-full blur-[100px] scale-125 -translate-y-2 animate-soft-glow" />

          {/* Nombre caligráfico gigante */}
          <h1 className="font-pinyon text-7xl md:text-9xl text-rose-gold-light tracking-wide drop-shadow-[0_2px_30px_rgba(243,229,216,0.4)] relative">
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
        <ChevronDown className="w-5 h-5 text-rose-gold/70 hover:text-rose-gold" />
      </motion.button>
    </section>
  );
}
