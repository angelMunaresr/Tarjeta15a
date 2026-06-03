"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Map, Star, Shell } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function DetailsSection() {
  const targetDate = "2026-11-14T21:00:00";
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeftTemp: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeftTemp = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeftTemp;
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect -- Necesario para evitar hydration mismatch: la fecha objetivo se compara con la hora actual del cliente, que solo está disponible después del mount.
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const mapQuery = "Milennium+Eventos+Mar+del+Plata";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <section
      id="details-section"
      className="relative min-h-screen w-full bg-navy-light flex flex-col items-center justify-center px-6 py-24 select-none overflow-hidden"
    >
      {/* Número de sección */}
      <div className="absolute top-4 left-4 z-50 bg-rose-gold/20 border border-rose-gold/40 rounded-full w-8 h-8 flex items-center justify-center">
        <span className="font-cinzel text-xs text-rose-gold font-bold">2</span>
      </div>

      {/* Luces radiales del fondo */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-sea-glow/[0.03] rounded-full blur-[150px] pointer-events-none animate-golden-shimmer" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-rose-gold/[0.04] rounded-full blur-[150px] pointer-events-none" />

      {/* Luna grande decorativa con halo plateado - esquina superior derecha */}
      <div className="absolute top-[5%] right-[6%] z-[1] pointer-events-none" aria-hidden="true">
        <div className="relative">
          {/* Halo exterior plateado */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-silver-bright/[0.04] rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[320px] md:h-[320px] bg-silver-shine/[0.06] rounded-full blur-[60px]" />

          {/* Luna propiamente dicha */}
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-24 h-24 md:w-32 md:h-32"
          >
            {/* Halo de luna */}
            <div className="absolute inset-0 rounded-full bg-silver-bright/20 blur-2xl" />
            {/* Cuerpo de la luna */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, #FAFAFF 0%, #E8E8F0 50%, #C8C8D0 100%)",
                boxShadow: "inset -8px -8px 20px rgba(168,168,184,0.4), 0 0 60px rgba(232,232,240,0.25), 0 0 120px rgba(232,232,240,0.1)",
              }}
            />
            {/* Cráteres sutiles */}
            <div className="absolute top-[30%] left-[25%] w-3 h-3 rounded-full bg-silver-deep/15 blur-[2px]" />
            <div className="absolute top-[55%] left-[55%] w-2 h-2 rounded-full bg-silver-deep/15 blur-[1px]" />
            <div className="absolute top-[40%] left-[60%] w-1.5 h-1.5 rounded-full bg-silver-deep/10 blur-[1px]" />
          </motion.div>
        </div>
      </div>

      {/* Estrellas reflejadas (mitad inferior) */}
      <div className="absolute bottom-[20%] left-[10%] w-1 h-1 rounded-full bg-silver-shine/60 animate-silver-twinkle pointer-events-none" />
      <div className="absolute bottom-[35%] left-[25%] w-1.5 h-1.5 rounded-full bg-silver-bright/50 animate-silver-twinkle pointer-events-none" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-[45%] right-[15%] w-1 h-1 rounded-full bg-silver-shine/70 animate-silver-twinkle pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-[30%] right-[30%] w-1.5 h-1.5 rounded-full bg-silver-bright/40 animate-silver-twinkle pointer-events-none" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-[15%] left-[45%] w-1 h-1 rounded-full bg-silver-shine/60 animate-silver-twinkle pointer-events-none" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-[50%] right-[8%] w-1 h-1 rounded-full bg-silver-bright/50 animate-silver-twinkle pointer-events-none" style={{ animationDelay: "2.5s" }} />

      {/* Concha marina decorativa sutil - esquina superior izquierda */}
      <div className="absolute top-[15%] left-[5%] w-16 h-16 opacity-[0.06] pointer-events-none" aria-hidden="true">
        <Shell className="w-full h-full text-rose-gold" strokeWidth={0.8} />
      </div>

      {/* Estrella de mar decorativa - esquina inferior derecha */}
      <div className="absolute bottom-[15%] right-[5%] w-14 h-14 opacity-[0.06] pointer-events-none" aria-hidden="true">
        <Star className="w-full h-full text-rose-gold" strokeWidth={0.8} />
      </div>

      {/* Marco decorativo exterior */}
      <div className="absolute inset-8 border border-rose-gold/8 pointer-events-none rounded-sm" />

      {/* Partículas plateadas orbitando el título - se posicionan con absolute */}
      <div className="absolute top-[28%] left-[15%] w-1.5 h-1.5 rounded-full bg-silver-shine animate-silver-sparkle pointer-events-none z-[2]" style={{ animationDelay: "0s" }} />
      <div className="absolute top-[26%] right-[18%] w-1 h-1 rounded-full bg-silver-bright animate-silver-sparkle pointer-events-none z-[2]" style={{ animationDelay: "0.8s" }} />
      <div className="absolute top-[32%] left-[22%] w-0.5 h-0.5 rounded-full bg-silver-shine animate-silver-sparkle pointer-events-none z-[2]" style={{ animationDelay: "1.6s" }} />
      <div className="absolute top-[30%] right-[22%] w-1 h-1 rounded-full bg-silver-bright animate-silver-sparkle pointer-events-none z-[2]" style={{ animationDelay: "2.4s" }} />
      <div className="absolute top-[34%] left-[10%] w-0.5 h-0.5 rounded-full bg-silver-shine animate-silver-twinkle pointer-events-none z-[2]" style={{ animationDelay: "0.4s" }} />
      <div className="absolute top-[24%] right-[10%] w-0.5 h-0.5 rounded-full bg-silver-bright animate-silver-twinkle pointer-events-none z-[2]" style={{ animationDelay: "1.2s" }} />

      {/* Título de la Sección */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 z-10"
      >
        {/* H2 con color naranja (rose-gold) */}
        <h2
          className="font-cinzel text-3xl md:text-5xl font-bold tracking-wide text-rose-gold"
          style={{
            textShadow: "0 0 20px rgba(212,163,115,0.4), 0 0 40px rgba(212,163,115,0.2)",
          }}
        >
          Lugar y Fecha
        </h2>

        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-rose-gold/60 to-transparent my-4 mx-auto" />
        <p className="font-montserrat text-xs text-slate-400 font-light max-w-md mx-auto leading-relaxed mt-2 px-2">
          La noche del 14 de noviembre el mar nos espera en Mar del Plata para una velada que quedará en la memoria.
        </p>
      </motion.div>

      {/* Tarjeta principal - Superficie del mar de noche */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md z-10"
      >
        <div className="relative">
          {/* Sombra suave de la tarjeta */}
          <div className="absolute inset-0 bg-silver-bright/8 blur-2xl rounded-3xl -m-2" />

          {/* Tarjeta principal - superficie de agua nocturna */}
          <div className="relative glass-panel rounded-3xl overflow-hidden shadow-2xl texture-velvet">
            {/* Header - pequeña luna + título */}
            <div className="relative px-6 pt-7 pb-5 z-[2]">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 8, 0, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Star className="w-3.5 h-3.5 text-silver-bright" fill="currentColor" />
                  </motion.div>
                  <span
                    className="font-cinzel text-[9px] uppercase tracking-[0.3em] font-bold"
                    style={{ color: "rgba(232,232,240,0.7)", textShadow: "0 0 6px rgba(232,232,240,0.3)" }}
                  >
                    Noche de Luna Llena
                  </span>
                </div>
              </div>

              {/* Fecha destacada con shimmer plateado */}
              <div className="text-center py-2 relative">
                <p
                  className="font-cinzel text-[9px] uppercase tracking-[0.4em] text-slate-400 mb-1.5"
                  style={{ textShadow: "0 0 6px rgba(232,232,240,0.2)" }}
                >
                  La Marea Sube el
                </p>
                <p
                  className="font-pinyon text-5xl md:text-6xl text-silver-shine leading-none silver-shimmer-text"
                  style={{
                    textShadow: "0 0 20px rgba(250,250,255,0.5), 0 0 40px rgba(232,232,240,0.3), 0 0 60px rgba(212,163,115,0.15)",
                  }}
                >
                  14 de Noviembre
                </p>
                <p className="font-montserrat text-[10px] uppercase tracking-[0.25em] text-rose-gold mt-2 font-semibold">
                  Sábado · 2026
                </p>
              </div>
            </div>

            {/* Cuerpo de la tarjeta - datos del evento */}
            <div className="px-6 py-5 space-y-4 relative z-[2]">
              {/* Fila: Destino */}
              <div>
                <p className="font-cinzel text-[8px] uppercase tracking-[0.25em] text-slate-500 mb-1 font-semibold text-center">
                  Costa
                </p>
                <p
                  className="font-montserrat text-base font-semibold text-center silver-shimmer-text"
                  style={{ textShadow: "0 0 8px rgba(232,232,240,0.3)" }}
                >
                  Mar del Plata
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-rose-gold/15 to-transparent" />

              {/* Fila: Iconos de Hora y Ubicación */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-navy-dark/60 border border-rose-gold/15 text-rose-gold shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-cinzel text-[8px] uppercase tracking-[0.25em] text-slate-500 mb-0.5 font-semibold">
                      Recepción
                    </p>
                    <p className="font-montserrat text-xs text-slate-100 font-semibold leading-tight">
                      21:00 hs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-navy-dark/60 border border-rose-gold/15 text-rose-gold shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-cinzel text-[8px] uppercase tracking-[0.25em] text-slate-500 mb-0.5 font-semibold">
                      Ubicación
                    </p>
                    <p className="font-montserrat text-xs text-slate-100 font-semibold leading-tight">
                      Milennium Eventos
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección inferior - Cuenta regresiva "tiempo para que suba la marea" */}
            <div className="relative px-6 py-5 bg-gradient-to-b from-navy-dark/30 to-navy-dark/50 z-[2]">
              <p
                className="font-cinzel text-[8px] uppercase tracking-[0.3em] mb-3 text-center font-semibold"
                style={{ color: "rgba(232,232,240,0.8)", textShadow: "0 0 6px rgba(232,232,240,0.3)" }}
              >
                Tiempo para que suba la marea
              </p>
              {mounted && timeLeft ? (
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Días", value: timeLeft.days },
                    { label: "Hs", value: timeLeft.hours },
                    { label: "Min", value: timeLeft.minutes },
                    { label: "Seg", value: timeLeft.seconds },
                  ].map((item, idx) => (
                    <div key={idx} className="text-center relative">
                      {/* Diamante plateado sobre cada número */}
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.4 }}
                        className="absolute top-[-6px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-silver-shine pointer-events-none"
                        style={{ boxShadow: "0 0 6px rgba(250,250,255,0.7)" }}
                      />
                      <div
                        className="font-cinzel text-2xl md:text-3xl font-bold tracking-tight silver-shimmer-text"
                        style={{ textShadow: "0 0 10px rgba(232,232,240,0.5), 0 0 20px rgba(232,232,240,0.25), 0 2px 4px rgba(0,0,0,0.4)" }}
                      >
                        {String(item.value).padStart(2, "0")}
                      </div>
                      <div className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-slate-400 mt-1 font-medium">
                        {item.label}
                      </div>
                      {idx < 3 && (
                        <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-px h-6 bg-rose-gold/15" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 opacity-50">
                  {["Días", "Hs", "Min", "Seg"].map((label, idx) => (
                    <div key={idx} className="text-center">
                      <div className="font-cinzel text-2xl md:text-3xl font-bold text-rose-gold animate-pulse">
                        --
                      </div>
                      <div className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-slate-400 mt-1 font-medium">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Adornos en esquinas de la tarjeta */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-rose-gold/30" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-rose-gold/30" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-rose-gold/30" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-rose-gold/30" />
          </div>
        </div>
      </motion.div>

      {/* Tarjeta secundaria - Costa (botones de mapa) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-md mt-8 z-10"
      >
        <div className="glass-panel rounded-2xl p-5 relative shadow-xl texture-velvet">
          <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-rose-gold/25" />
          <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-rose-gold/25" />
          <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-rose-gold/25" />
          <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-rose-gold/25" />

          <div className="flex items-center justify-between mb-4">
            <div>
              <p
                className="font-cinzel text-[9px] uppercase tracking-[0.3em] font-bold"
                style={{ color: "rgba(232,232,240,0.75)", textShadow: "0 0 6px rgba(232,232,240,0.25)" }}
              >
                El Salón
              </p>
              <p
                className="font-montserrat text-sm font-medium mt-0.5"
                style={{ color: "rgba(232,232,240,0.9)", textShadow: "0 0 6px rgba(232,232,240,0.2)" }}
              >
                Milennium Eventos · Mar del Plata
              </p>
            </div>

            {/* Mini reflejo lunar */}
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-silver-bright/10 blur-md" />
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-7 h-7 rounded-full"
                style={{
                  background: "radial-gradient(circle at 35% 35%, #FAFAFF 0%, #E8E8F0 60%, #C8C8D0 100%)",
                  boxShadow: "0 0 12px rgba(232,232,240,0.4)",
                }}
              />
              {/* Mini reflejo debajo */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-3"
                style={{
                  background: "linear-gradient(to bottom, rgba(232,232,240,0.4), transparent)",
                  filter: "blur(1px)",
                }}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full max-w-xs h-11 bg-navy-medium/60 hover:bg-navy-medium border border-rose-gold/15 hover:border-rose-gold/30 rounded-xl text-xs font-medium text-slate-200 transition-all active:scale-[0.98] outline-none min-h-[44px]"
            >
              <Map className="w-4 h-4 text-sea-glow" />
              Google Maps
            </a>
          </div>
        </div>
      </motion.div>

      {/* Burbujas que emergen del fondo - aumentado para reforzar tema */}
      <div className="absolute bottom-[5%] left-[8%] w-3 h-3 rounded-full animate-bubble-rise pointer-events-none" style={{ background: "radial-gradient(circle at 30% 30%, rgba(232,232,240,0.65) 0%, rgba(200,220,240,0.3) 50%, rgba(60, 90, 150, 0.08) 100%)", boxShadow: "inset -1px -1px 3px rgba(255,255,255,0.3), inset 1px 1px 2px rgba(255,255,255,0.15), 0 0 8px rgba(232,232,240,0.4)" }} />
      <div className="absolute bottom-[10%] right-[12%] w-4 h-4 rounded-full animate-bubble-rise pointer-events-none" style={{ animationDelay: "0.7s", background: "radial-gradient(circle at 30% 30%, rgba(150, 180, 220, 0.6) 0%, rgba(80, 120, 180, 0.28) 50%, rgba(40, 70, 130, 0.08) 100%)", boxShadow: "inset -1px -1px 3px rgba(150, 180, 220, 0.28), inset 1px 1px 2px rgba(255,255,255,0.14), 0 0 10px rgba(150, 180, 220, 0.3)" }} />
      <div className="absolute bottom-[15%] left-[40%] w-2.5 h-2.5 rounded-full animate-bubble-rise pointer-events-none" style={{ animationDelay: "1.4s", background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.7) 0%, rgba(210, 230, 255, 0.35) 50%, rgba(160, 190, 230, 0.1) 100%)", boxShadow: "inset -1px -1px 2px rgba(255,255,255,0.32), inset 1px 1px 1px rgba(255,255,255,0.16), 0 0 7px rgba(210, 230, 255, 0.32)" }} />
      <div className="absolute bottom-[8%] right-[35%] w-2 h-2 rounded-full animate-bubble-rise pointer-events-none" style={{ animationDelay: "2s", background: "radial-gradient(circle at 30% 30%, rgba(232,232,240,0.6) 0%, rgba(192,192,200,0.25) 50%, rgba(80, 80, 120, 0.05) 100%)", boxShadow: "inset -1px -1px 2px rgba(255,255,255,0.28), inset 1px 1px 1px rgba(255,255,255,0.14), 0 0 6px rgba(232,232,240,0.28)" }} />
      <div className="absolute bottom-[20%] left-[20%] w-1.5 h-1.5 rounded-full animate-bubble-rise pointer-events-none" style={{ animationDelay: "1s", background: "radial-gradient(circle at 30% 30%, rgba(232,232,240,0.5) 0%, rgba(180,200,230,0.2) 50%, transparent 100%)", boxShadow: "0 0 5px rgba(232,232,240,0.3)" }} />
    </section>
  );
}
