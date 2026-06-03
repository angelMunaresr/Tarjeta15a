"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Música de fondo elegante: Gymnopedie No. 1 de Erik Satie (Dominio Público)
  const audioUrl = "https://upload.wikimedia.org/wikipedia/commons/d/dd/Erik_Satie_-_Gymnopedie_No._1.mp3";

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setShowTooltip(false);
      }).catch((err) => {
        console.log("Error al reproducir audio:", err);
      });
    }
  };

  // Ocultar tooltip después de unos segundos si no interactúan
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none pointer-events-auto">
      {/* Tooltip flotante informativo */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            className="bg-navy-dark/90 text-gold-accent border border-rose-gold/20 text-[11px] font-montserrat font-medium py-2.5 px-4 rounded-xl shadow-xl shadow-black/40 whitespace-nowrap backdrop-blur-md pointer-events-none"
          >
            🎵 Activar música de fondo
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón de control flotante */}
      <button
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-navy-light/65 backdrop-blur-md border border-rose-gold/30 text-rose-gold flex items-center justify-center shadow-lg shadow-black/40 active:scale-95 focus:outline-none hover:border-rose-gold hover:text-rose-gold-light hover:shadow-rose-gold/10 transition-all cursor-pointer relative"
        aria-label={isPlaying ? "Silenciar música" : "Reproducir música"}
      >
        {/* Anillos de animación de pulso si está apagado para llamar la atención */}
        {!isPlaying && (
          <span className="absolute inset-0 rounded-full border border-rose-gold/40 animate-ping opacity-50" />
        )}

        <div className="relative w-5 h-5 flex items-center justify-center">
          {isPlaying ? (
            // Icono ecualizador animado simple
            <div className="flex gap-[2.5px] items-end h-3.5 w-4 justify-center">
              <span className="w-[3px] h-4 bg-rose-gold rounded-full origin-bottom animate-[equalizer_0.8s_infinite_ease-in-out_alternate]" style={{ animationDelay: "0.1s" }} />
              <span className="w-[3px] h-4 bg-rose-gold rounded-full origin-bottom animate-[equalizer_0.6s_infinite_ease-in-out_alternate]" style={{ animationDelay: "0.3s" }} />
              <span className="w-[3px] h-4 bg-rose-gold rounded-full origin-bottom animate-[equalizer_0.9s_infinite_ease-in-out_alternate]" style={{ animationDelay: "0.5s" }} />
            </div>
          ) : (
            <Music className="w-5 h-5" />
          )}
        </div>
      </button>

      {/* Elemento HTML5 Audio */}
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="none"
      />

      {/* Estilo CSS inyectado localmente para el ecualizador */}
      <style jsx global>{`
        @keyframes equalizer {
          0% { transform: scaleY(0.25); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
