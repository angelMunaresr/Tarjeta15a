"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Compass, Map, Navigation, Anchor } from "lucide-react";

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

  const mapQuery = "Mar+del+Plata,+Buenos+Aires,+Argentina";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const wazeUrl = `https://waze.com/ul?q=${mapQuery}&navigate=yes`;

  return (
    <section
      id="details-section"
      className="relative min-h-screen w-full bg-navy-light flex flex-col items-center justify-center px-6 py-24 select-none overflow-hidden"
    >
      {/* Número de sección */}
      <div className="absolute top-4 left-4 z-50 bg-rose-gold/20 border border-rose-gold/40 rounded-full w-8 h-8 flex items-center justify-center">
        <span className="font-cinzel text-xs text-rose-gold font-bold">3</span>
      </div>

      {/* Luces radiales del fondo */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-sea-glow/[0.03] rounded-full blur-[150px] pointer-events-none animate-golden-shimmer" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-rose-gold/[0.04] rounded-full blur-[150px] pointer-events-none" />

      {/* Brújula decorativa girando lentamente */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute top-[8%] right-[6%] w-32 h-32 md:w-44 md:h-44 opacity-[0.06] pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-rose-gold">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <g stroke="currentColor" strokeWidth="0.5">
            <line x1="50" y1="2" x2="50" y2="14" />
            <line x1="50" y1="86" x2="50" y2="98" />
            <line x1="2" y1="50" x2="14" y2="50" />
            <line x1="86" y1="50" x2="98" y2="50" />
            <line x1="18" y1="18" x2="26" y2="26" />
            <line x1="74" y1="18" x2="82" y2="26" />
            <line x1="18" y1="82" x2="26" y2="74" />
            <line x1="74" y1="82" x2="82" y2="74" />
          </g>
          <polygon points="50,8 54,50 50,46 46,50" fill="currentColor" />
          <polygon points="50,92 46,50 50,54 54,50" fill="currentColor" opacity="0.5" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Ancla decorativa sutil */}
      <div className="absolute bottom-[10%] left-[5%] w-20 h-20 md:w-28 md:h-28 opacity-[0.05] pointer-events-none" aria-hidden="true">
        <Anchor className="w-full h-full text-rose-gold" strokeWidth={1} />
      </div>

      {/* Marco decorativo exterior */}
      <div className="absolute inset-8 border border-rose-gold/8 pointer-events-none rounded-sm" />

      {/* Título de la Sección */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 z-10"
      >
        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-rose-gold font-semibold mb-2 block">
          Bitácora del Viaje
        </span>
        <h2 className="font-cinzel text-3xl md:text-4xl text-slate-100 font-bold tracking-wide">
          Carta de Embarque
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-rose-gold to-transparent my-4 mx-auto" />
        <p className="font-montserrat text-xs text-slate-400 font-light max-w-sm mx-auto leading-relaxed mt-2 px-2">
          Presentá este pasaje en la dársena de la fiesta. Tu butaca ya está reservada bajo las estrellas.
        </p>
      </motion.div>

      {/* Carta de Embarque - Boarding Pass */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md z-10"
        style={{ perspective: "1000px" }}
      >
        <div className="relative">
          {/* Sombra suave del boleto */}
          <div className="absolute inset-0 bg-rose-gold/10 blur-2xl rounded-3xl -m-2" />

          {/* Tarjeta principal del boarding pass */}
          <div className="relative glass-panel rounded-3xl overflow-hidden shadow-2xl texture-velvet">
            {/* Línea perforada central (efecto boarding pass) */}
            <div className="absolute left-0 right-0 top-[58%] z-20 pointer-events-none">
              <div className="relative h-px">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-gold/30 to-transparent" />
                <div className="absolute -left-3 -top-2 w-6 h-6 rounded-full bg-navy-light border border-rose-gold/20" />
                <div className="absolute -right-3 -top-2 w-6 h-6 rounded-full bg-navy-light border border-rose-gold/20" />
              </div>
            </div>

            {/* Esquina superior - Cabecera del boarding pass */}
            <div className="relative px-6 pt-6 pb-5 bg-gradient-to-b from-navy-dark/40 to-transparent">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Anchor className="w-4 h-4 text-rose-gold" />
                  <span className="font-cinzel text-[9px] uppercase tracking-[0.3em] text-rose-gold font-bold">
                    Quinceañera Line
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-gold animate-pulse" />
                  <span className="font-cinzel text-[9px] uppercase tracking-[0.2em] text-rose-gold-light font-semibold">
                    Activo
                  </span>
                </div>
              </div>

              {/* Título principal del embarque */}
              <div className="text-center py-2">
                <p className="font-cinzel text-[9px] uppercase tracking-[0.4em] text-slate-400 mb-1.5">
                  Pasaje N°
                </p>
                <p className="font-pinyon text-6xl md:text-7xl text-rose-gold-light leading-none" style={{ textShadow: "0 0 30px rgba(243,229,216,0.35), 0 0 60px rgba(212,163,115,0.15)" }}>
                  XV
                </p>
                <p className="font-montserrat text-[10px] uppercase tracking-[0.25em] text-rose-gold mt-2 font-semibold">
                  Zarpe a mis 15 años
                </p>
              </div>
            </div>

            {/* Cuerpo del boarding pass - Datos del viaje */}
            <div className="px-6 py-5 space-y-4">
              {/* Fila: Pasajera / Embarcación */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-cinzel text-[8px] uppercase tracking-[0.25em] text-slate-500 mb-1 font-semibold">
                    Pasajera
                  </p>
                  <p className="font-pinyon text-2xl text-slate-100 leading-none">
                    Marina
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-cinzel text-[8px] uppercase tracking-[0.25em] text-slate-500 mb-1 font-semibold">
                    Embarcación
                  </p>
                  <p className="font-montserrat text-sm text-rose-gold-light font-semibold">
                    Sueños M15
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-rose-gold/15 to-transparent" />

              {/* Fila: Origen / Destino (con flecha) */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div>
                  <p className="font-cinzel text-[8px] uppercase tracking-[0.25em] text-slate-500 mb-1 font-semibold">
                    Origen
                  </p>
                  <p className="font-montserrat text-sm text-slate-200 font-medium">
                    Tu Corazón
                  </p>
                </div>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center"
                >
                  <Navigation className="w-4 h-4 text-rose-gold rotate-45" />
                  <span className="text-rose-gold/40 text-[8px] mt-0.5">━━━━━</span>
                </motion.div>
                <div className="text-right">
                  <p className="font-cinzel text-[8px] uppercase tracking-[0.25em] text-slate-500 mb-1 font-semibold">
                    Destino
                  </p>
                  <p className="font-montserrat text-sm text-rose-gold-light font-semibold">
                    Mar del Plata
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-rose-gold/15 to-transparent" />

              {/* Fila: Fecha / Hora */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-navy-dark/60 border border-rose-gold/15 text-rose-gold shrink-0 mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-cinzel text-[8px] uppercase tracking-[0.25em] text-slate-500 mb-0.5 font-semibold">
                      Fecha
                    </p>
                    <p className="font-montserrat text-xs text-slate-100 font-semibold leading-tight">
                      14 NOV 2026
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-navy-dark/60 border border-rose-gold/15 text-rose-gold shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-cinzel text-[8px] uppercase tracking-[0.25em] text-slate-500 mb-0.5 font-semibold">
                      Zarpe
                    </p>
                    <p className="font-montserrat text-xs text-slate-100 font-semibold leading-tight">
                      21:00 hs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección inferior - Cuenta regresiva estilo "tiempo de viaje" */}
            <div className="relative px-6 py-5 bg-gradient-to-b from-navy-dark/30 to-navy-dark/50">
              <p className="font-cinzel text-[8px] uppercase tracking-[0.3em] text-rose-gold/80 mb-3 text-center font-semibold">
                Tiempo Restante para el Zarpe
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
                      <div className="font-cinzel text-2xl md:text-3xl font-bold text-rose-gold-light tracking-tight drop-shadow-[0_2px_8px_rgba(212,163,115,0.25)]">
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

            {/* Pie del boarding pass - coordenadas y sello */}
            <div className="relative px-6 py-4 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-cinzel text-[7px] uppercase tracking-[0.25em] text-slate-500 mb-1 font-semibold">
                  Coordenadas
                </p>
                <p className="font-mono text-[10px] text-rose-gold/80 tracking-wider truncate">
                  38°00′08″S · 57°33′27″O
                </p>
              </div>

              {/* Sello de cera animado */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 12 }}
                className="relative shrink-0"
              >
                <div className="absolute inset-0 bg-rose-gold/30 rounded-full blur-md" />
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-rose-gold via-rose-gold-dark to-rose-gold-dark flex items-center justify-center shadow-lg">
                  <div className="absolute inset-1 rounded-full border border-dashed border-navy-dark/40" />
                  <div className="text-center">
                    <Compass className="w-4 h-4 text-navy-dark mx-auto" strokeWidth={2.5} />
                    <p className="font-cinzel text-[5px] uppercase tracking-wider text-navy-dark font-bold leading-none mt-0.5">
                      XV
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Adornos en esquinas del boarding pass */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-rose-gold/30" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-rose-gold/30" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-rose-gold/30" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-rose-gold/30" />
          </div>
        </div>
      </motion.div>

      {/* Mini Carta Náutica decorativa + Botones */}
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
              <p className="font-cinzel text-[9px] uppercase tracking-[0.3em] text-rose-gold font-bold">
                Puerto de Destino
              </p>
              <p className="font-montserrat text-sm text-slate-100 font-medium mt-0.5">
                Salón en Mar del Plata
              </p>
            </div>

            {/* Mini carta náutica SVG */}
            <div className="relative w-14 h-14 shrink-0">
              <svg viewBox="0 0 60 60" className="w-full h-full text-rose-gold/50">
                <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="30" cy="30" r="22" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" />
                <path d="M 5 38 Q 15 35, 25 38 T 55 36 L 55 55 L 5 55 Z" fill="currentColor" opacity="0.15" />
                <path d="M 5 42 Q 15 39, 25 42 T 55 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                <path d="M 5 46 Q 15 43, 25 46 T 55 44" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                <motion.g
                  animate={{ x: [0, 2, 0, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <text x="30" y="25" textAnchor="middle" fontSize="6" fill="currentColor" fontFamily="serif">★</text>
                </motion.g>
                <circle cx="30" cy="22" r="1.5" fill="currentColor" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-11 bg-navy-medium/60 hover:bg-navy-medium border border-rose-gold/15 hover:border-rose-gold/30 rounded-xl text-xs font-medium text-slate-200 transition-all active:scale-[0.98] outline-none min-h-[44px]"
            >
              <Map className="w-4 h-4 text-sea-glow" />
              Google Maps
            </a>
            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-11 bg-rose-gold/10 hover:bg-rose-gold/20 border border-rose-gold/20 hover:border-rose-gold/35 rounded-xl text-xs font-medium text-rose-gold transition-all active:scale-[0.98] outline-none min-h-[44px]"
            >
              <span className="font-bold text-xs">W</span>
              Ir con Waze
            </a>
          </div>
        </div>
      </motion.div>

      {/* Burbujas que emergen del fondo */}
      <div className="absolute bottom-[5%] left-[8%] w-3 h-3 rounded-full animate-bubble-rise pointer-events-none" style={{ background: "radial-gradient(circle at 30% 30%, rgba(200, 220, 255, 0.65) 0%, rgba(100, 149, 237, 0.3) 50%, rgba(60, 90, 150, 0.08) 100%)", boxShadow: "inset -1px -1px 3px rgba(255,255,255,0.3), inset 1px 1px 2px rgba(255,255,255,0.15), 0 0 8px rgba(100, 149, 237, 0.35)" }} />
      <div className="absolute bottom-[10%] right-[12%] w-4 h-4 rounded-full animate-bubble-rise pointer-events-none" style={{ animationDelay: "0.7s", background: "radial-gradient(circle at 30% 30%, rgba(150, 180, 220, 0.6) 0%, rgba(80, 120, 180, 0.28) 50%, rgba(40, 70, 130, 0.08) 100%)", boxShadow: "inset -1px -1px 3px rgba(150, 180, 220, 0.28), inset 1px 1px 2px rgba(255,255,255,0.14), 0 0 10px rgba(80, 120, 180, 0.3)" }} />
      <div className="absolute bottom-[15%] left-[40%] w-2.5 h-2.5 rounded-full animate-bubble-rise pointer-events-none" style={{ animationDelay: "1.4s", background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.7) 0%, rgba(210, 230, 255, 0.35) 50%, rgba(160, 190, 230, 0.1) 100%)", boxShadow: "inset -1px -1px 2px rgba(255,255,255,0.32), inset 1px 1px 1px rgba(255,255,255,0.16), 0 0 7px rgba(210, 230, 255, 0.32)" }} />
    </section>
  );
}
