"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Map } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function DetailsSection() {
  const targetDate = "2026-11-14T21:00:00"; // Sábado 14 de Noviembre de 2026 a las 21:00hs
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
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
      {/* Luces de profundidad */}
      <div className="absolute top-1/4 left-0 w-[320px] h-[320px] bg-sea-glow/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[320px] h-[320px] bg-rose-gold/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Título de la Sección */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 z-10"
      >
        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-rose-gold font-semibold mb-2 block">
          Coordenadas de la Magia
        </span>
        <h2 className="font-cinzel text-3xl md:text-4xl text-slate-100 font-bold tracking-wide">
          Fecha y Lugar
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-rose-gold to-transparent my-4 mx-auto" />
      </motion.div>

      {/* Contador Regresivo */}
      <div className="w-full max-w-lg mb-16 z-10">
        {mounted && timeLeft ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-4 gap-3 text-center"
          >
            {[
              { label: "Días", value: timeLeft.days },
              { label: "Horas", value: timeLeft.hours },
              { label: "Mins", value: timeLeft.minutes },
              { label: "Segs", value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-panel hover:border-rose-gold/35 hover:shadow-rose-gold/5 rounded-2xl p-4 md:p-6 backdrop-blur-md shadow-2xl flex flex-col justify-center items-center transition-all duration-300"
              >
                <span className="font-cinzel text-2xl md:text-4xl font-bold text-rose-gold-light tracking-normal drop-shadow-[0_2px_12px_rgba(212,163,115,0.25)]">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-[9px] md:text-xs uppercase tracking-widest text-slate-400 mt-1.5 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="grid grid-cols-4 gap-3 text-center opacity-50">
            {["Días", "Horas", "Mins", "Segs"].map((label, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-4 md:p-6 backdrop-blur-md animate-pulse flex flex-col justify-center items-center"
              >
                <span className="font-cinzel text-2xl md:text-4xl font-bold text-rose-gold">
                  --
                </span>
                <span className="text-[9px] md:text-xs uppercase tracking-widest text-slate-400 mt-1.5 font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tarjeta de Información del Salón */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="w-full max-w-md glass-panel rounded-2xl p-7 md:p-9 shadow-2xl relative z-10 hover:border-rose-gold/25 transition-colors duration-300"
      >
        {/* Adornos en esquinas */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-rose-gold/30" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-rose-gold/30" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-rose-gold/30" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-rose-gold/30" />

        <div className="space-y-8">
          {/* Fila Fecha */}
          <div className="flex items-start gap-4 group">
            <div className="p-3 rounded-xl bg-navy-dark/60 border border-rose-gold/15 text-rose-gold shrink-0 group-hover:scale-105 transition-transform duration-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-cinzel text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                Fecha de Celebración
              </h4>
              <p className="font-montserrat text-sm md:text-base font-medium text-slate-100 mt-1">
                Sábado 14 de Noviembre, 2026
              </p>
            </div>
          </div>

          {/* Fila Horario */}
          <div className="flex items-start gap-4 group">
            <div className="p-3 rounded-xl bg-navy-dark/60 border border-rose-gold/15 text-rose-gold shrink-0 group-hover:scale-105 transition-transform duration-300">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-cinzel text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                Horario de Inicio
              </h4>
              <p className="font-montserrat text-sm md:text-base font-medium text-slate-100 mt-1">
                21:00 hs - Recepción
              </p>
            </div>
          </div>

          {/* Fila Dirección */}
          <div className="flex items-start gap-4 group">
            <div className="p-3 rounded-xl bg-navy-dark/60 border border-rose-gold/15 text-rose-gold shrink-0 group-hover:scale-105 transition-transform duration-300">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-cinzel text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                Ubicación
              </h4>
              <p className="font-montserrat text-sm md:text-base font-medium text-slate-100 mt-1">
                Salón en Mar del Plata
              </p>
              <p className="font-montserrat text-xs text-slate-400 mt-0.5 leading-relaxed font-light">
                Costa Atlántica, Buenos Aires, Argentina
              </p>
            </div>
          </div>
        </div>

        {/* Botones de Navegación */}
        <div className="grid grid-cols-2 gap-4 mt-10">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 h-12 bg-navy-medium/60 hover:bg-navy-medium border border-rose-gold/15 hover:border-rose-gold/30 rounded-xl text-xs md:text-sm font-medium text-slate-200 transition-all active:scale-[0.98] outline-none min-h-[44px]"
          >
            <Map className="w-4 h-4 text-sea-glow" />
            Google Maps
          </a>
          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 h-12 bg-rose-gold/10 hover:bg-rose-gold/20 border border-rose-gold/20 hover:border-rose-gold/35 rounded-xl text-xs md:text-sm font-medium text-rose-gold transition-all active:scale-[0.98] outline-none min-h-[44px]"
          >
            <span className="font-bold text-xs">W</span>
            Ir con Waze
          </a>
        </div>
      </motion.div>
    </section>
  );
}
