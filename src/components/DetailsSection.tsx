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
      <div className="absolute top-4 left-4 z-50 bg-rose-gold/20 border border-rose-gold/40 rounded-full w-8 h-8 flex items-center justify-center">
        <span className="font-cinzel text-xs text-rose-gold font-bold">3</span>
      </div>

      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-sea-glow/[0.03] rounded-full blur-[150px] pointer-events-none animate-golden-shimmer" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-rose-gold/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[50%] max-w-md">
        <div className="ornament-line h-px">
          <div className="ornament-diamond" />
        </div>
      </div>

      <div className="absolute inset-8 border border-rose-gold/8 pointer-events-none rounded-sm" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 z-10"
      >
        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-rose-gold font-semibold mb-2 block">
          Coordenadas de la Magia
        </span>
        <h2 className="font-cinzel text-3xl md:text-4xl text-slate-100 font-bold tracking-wide">
          Fecha y Lugar
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-rose-gold to-transparent my-4 mx-auto" />
      </motion.div>

      <div className="w-full max-w-lg mb-12 z-10">
        {mounted && timeLeft ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-4 gap-2 md:gap-3 text-center"
          >
            {[
              { label: "Días", value: timeLeft.days },
              { label: "Horas", value: timeLeft.hours },
              { label: "Mins", value: timeLeft.minutes },
              { label: "Segs", value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-xl p-3 md:p-5 backdrop-blur-md shadow-2xl flex flex-col justify-center items-center transition-all duration-300 glow-dramatic relative overflow-hidden"
              >
                <span className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold text-rose-gold-light tracking-normal drop-shadow-[0_2px_12px_rgba(212,163,115,0.3)] relative">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 mt-1.5 font-medium relative">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="grid grid-cols-4 gap-2 md:gap-3 text-center opacity-50">
            {["Días", "Horas", "Mins", "Segs"].map((label, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-xl p-3 md:p-5 backdrop-blur-md animate-pulse flex flex-col justify-center items-center"
              >
                <span className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold text-rose-gold">
                  --
                </span>
                <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 mt-1.5 font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="w-full max-w-md glass-panel rounded-2xl p-6 md:p-8 shadow-2xl relative z-10 hover:border-rose-gold/25 transition-colors duration-300 texture-velvet"
      >
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-rose-gold/40" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-rose-gold/40" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-rose-gold/40" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-rose-gold/40" />

        <div className="space-y-7">
          <div className="flex items-start gap-4 group">
            <div className="p-3 rounded-xl bg-navy-dark/60 border border-rose-gold/15 text-rose-gold shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(212,163,115,0.1)]">
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

          <div className="flex items-start gap-4 group">
            <div className="p-3 rounded-xl bg-navy-dark/60 border border-rose-gold/15 text-rose-gold shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(212,163,115,0.1)]">
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

          <div className="flex items-start gap-4 group">
            <div className="p-3 rounded-xl bg-navy-dark/60 border border-rose-gold/15 text-rose-gold shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(212,163,115,0.1)]">
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

        <div className="grid grid-cols-2 gap-4 mt-10">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 h-12 bg-navy-medium/60 hover:bg-navy-medium border border-rose-gold/15 hover:border-rose-gold/30 rounded-xl text-xs md:text-sm font-medium text-slate-200 transition-all active:scale-[0.98] outline-none min-h-[44px] glow-dramatic"
          >
            <Map className="w-4 h-4 text-sea-glow" />
            Google Maps
          </a>
          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 h-12 bg-rose-gold/10 hover:bg-rose-gold/20 border border-rose-gold/20 hover:border-rose-gold/35 rounded-xl text-xs md:text-sm font-medium text-rose-gold transition-all active:scale-[0.98] outline-none min-h-[44px] glow-dramatic"
          >
            <span className="font-bold text-xs">W</span>
            Ir con Waze
          </a>
        </div>
      </motion.div>
    </section>
  );
}