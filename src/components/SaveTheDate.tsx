"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Download, Sparkles, MapPin, Check } from "lucide-react";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  alphaSpeed: number;
  phase: number;
  twinkleSpeed: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  duration: number;
  color: string;
}

export default function SaveTheDate() {
  const [status, setStatus] = useState<"mystery" | "popping" | "revealed">("mystery");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [saved, setSaved] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const starCount = isMobile ? 100 : 180;

    const createStar = (): Star => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      alphaSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.025 + 0.008,
    });

    const init = () => {
      stars = Array.from({ length: starCount }, createStar);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", handleResize);
    init();

    const animate = () => {
      timeRef.current += 16;
      ctx.clearRect(0, 0, width, height);

      const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
      baseGrad.addColorStop(0, "#00040a");
      baseGrad.addColorStop(0.4, "#020614");
      baseGrad.addColorStop(1, "#001220");
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        star.phase += star.alphaSpeed;
        const twinkle = Math.sin(star.phase * star.twinkleSpeed * 100) * 0.45;
        const currentAlpha = Math.max(0.1, Math.min(1, star.alpha + twinkle));

        ctx.beginPath();
        ctx.fillStyle = `rgba(248, 246, 240, ${currentAlpha})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (star.size > 1.4 && currentAlpha > 0.6) {
          ctx.strokeStyle = `rgba(248, 246, 240, ${currentAlpha * 0.35})`;
          ctx.lineWidth = 0.3;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2.5, star.y);
          ctx.lineTo(star.x + star.size * 2.5, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2.5);
          ctx.lineTo(star.x, star.y + star.size * 2.5);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMoonClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (status !== "mystery") return;
    
    let clientX = window.innerWidth / 2;
    let clientY = window.innerHeight / 2;

    if ("touches" in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    setStatus("popping");

    const particleCount = 24;
    const tempParticles: Particle[] = [];
    const colors = ["#F5E6C8", "#E8D4A8", "#FFF8E8", "#DCC896", "#F0E2C4"];

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2 + (Math.random() * 0.15 - 0.075);
      const distance = Math.random() * 130 + 70;
      const size = Math.random() * 6 + 3;
      const duration = Math.random() * 0.5 + 0.4;

      tempParticles.push({
        id: i,
        x: clientX,
        y: clientY,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        size,
        duration,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setParticles(tempParticles);

    setTimeout(() => {
      setStatus("revealed");
    }, 800);
  };

  const handleDownloadICS = () => {
    const title = "Mis 15 Años - Marina";
    const description = "¡Guarda la fecha para celebrar mis 15 años en Mar del Plata! Próximamente recibirás la invitación formal con todos los detalles.";
    const location = "Mar del Plata, Buenos Aires, Argentina";
    const startDate = "20261114T210000";
    const endDate = "20261115T050000";
    
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Marina 15 Anos//Save The Date//ES",
      "BEGIN:VEVENT",
      "UID:marina-15-anos-save-the-date",
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Save_the_Date_Marina.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mis+15+A%C3%B1os+-+Marina&dates=20261114T210000/20261115T050000&details=%C2%A1Guarda+la+fecha+para+celebrar+mis+15+a%C3%B1os+en+Mar+del+Plata%21+Pr%C3%B3ximamente+recibir%C3%A1s+la+invitaci%C3%B3n+formal+con+todos+los+detalles.&location=Mar+del+Plata%2C+Buenos+Aires%2C+Argentina`;

  return (
    <div className="w-full h-[100dvh] overflow-hidden relative select-none flex flex-col justify-between items-center py-12 px-6">
      
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none -z-10" />

      <div className="relative flex items-center justify-center flex-grow w-full max-w-sm z-20">
        
        <AnimatePresence mode="wait">
          {status === "mystery" && (
            <motion.div
              key="mystery-state"
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <motion.div
                onClick={handleMoonClick}
                onTouchStart={handleMoonClick}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full cursor-pointer select-none touch-none"
              >
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(circle at 40% 38%, #FFFEF5 0%, #F5EBD9 25%, #E8DCC4 50%, #D4C4A4 75%, #C9B896 100%)",
                    boxShadow: `
                      0 0 80px rgba(245, 235, 210, 0.35),
                      0 0 140px rgba(245, 235, 210, 0.15),
                      inset -12px -12px 40px rgba(180, 160, 130, 0.4),
                      inset 8px 8px 20px rgba(255, 252, 240, 0.3)
                    `
                  }}
                />
                
                <div 
                  className="absolute rounded-full" 
                  style={{
                    top: '22%', left: '28%',
                    width: '18%', height: '14%',
                    background: 'radial-gradient(circle, #D4C4A0 0%, #C9B896 60%, transparent 100%)',
                    filter: 'blur(3px)',
                    transform: 'rotate(-15deg)'
                  }}
                />
                <div 
                  className="absolute rounded-full" 
                  style={{
                    top: '38%', left: '58%',
                    width: '12%', height: '10%',
                    background: 'radial-gradient(circle, #C9B896 0%, #BFB08A 60%, transparent 100%)',
                    filter: 'blur(2px)',
                    transform: 'rotate(-10deg)'
                  }}
                />
                <div 
                  className="absolute rounded-full" 
                  style={{
                    top: '55%', left: '32%',
                    width: '14%', height: '11%',
                    background: 'radial-gradient(circle, #D0C09C 0%, #C4B48A 60%, transparent 100%)',
                    filter: 'blur(2.5px)',
                    transform: 'rotate(-20deg)'
                  }}
                />
                <div 
                  className="absolute rounded-full" 
                  style={{
                    top: '68%', left: '55%',
                    width: '10%', height: '8%',
                    background: 'radial-gradient(circle, #C9B896 0%, #BFB08A 60%, transparent 100%)',
                    filter: 'blur(1.5px)',
                    transform: 'rotate(-8deg)'
                  }}
                />
                <div 
                  className="absolute rounded-full" 
                  style={{
                    top: '30%', left: '18%',
                    width: '8%', height: '6%',
                    background: 'radial-gradient(circle, #D8C8A8 0%, #CCBC90 60%, transparent 100%)',
                    filter: 'blur(1.5px)',
                    transform: 'rotate(-25deg)'
                  }}
                />
                <div 
                  className="absolute rounded-full" 
                  style={{
                    top: '75%', left: '35%',
                    width: '7%', height: '5%',
                    background: 'radial-gradient(circle, #C9B896 0%, #BFB08A 60%, transparent 100%)',
                    filter: 'blur(1px)',
                    transform: 'rotate(-12deg)'
                  }}
                />
                
                <div className="absolute inset-0 rounded-full animate-pulse opacity-15 pointer-events-none" style={{ animationDuration: '5s' }} />
              </motion.div>

              <motion.div 
                animate={{ opacity: [0.35, 0.85, 0.35] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="mt-10 text-center"
              >
                <p className="font-montserrat text-xs uppercase tracking-[0.25em] text-slate-200/80">
                  Toca la luna
                </p>
                <p className="text-[10px] text-rose-gold/50 mt-1 uppercase tracking-widest">
                  para descubrir
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {status === "popping" && (
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: p.x - window.innerWidth / 2, y: p.y - window.innerHeight / 2, scale: 1, opacity: 1 }}
                animate={{
                  x: (p.x - window.innerWidth / 2) + p.dx,
                  y: (p.y - window.innerHeight / 2) + p.dy,
                  scale: [1, 0.5, 0],
                  opacity: 0
                }}
                transition={{ duration: p.duration, ease: "easeOut" }}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  left: "50%",
                  top: "50%",
                  background: `radial-gradient(circle, ${p.color} 0%, rgba(245,235,210,0) 70%)`,
                  boxShadow: `0 0 10px ${p.color}`
                }}
              />
            ))}
          </div>
        )}

        <AnimatePresence>
          {status === "revealed" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative"
            >
              <div 
                className="w-full rounded-2xl p-7 relative overflow-hidden border border-rose-gold/15 glass-panel"
              >
                <div className="absolute inset-2 border border-rose-gold/15 rounded-xl pointer-events-none" />
                
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-rose-gold/40 pointer-events-none" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-rose-gold/40 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-rose-gold/40 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-rose-gold/40 pointer-events-none" />

                <div className="text-center flex flex-col items-center select-text relative z-10">
                  <span className="text-[10px] font-montserrat uppercase tracking-[0.25em] text-rose-gold-light font-medium flex items-center gap-1.5 mb-4">
                    <Sparkles className="w-3 h-3 text-rose-gold/80" />
                    ¡Guarda la fecha!
                    <Sparkles className="w-3 h-3 text-rose-gold/80" />
                  </span>

                  <h2 className="font-pinyon text-5xl md:text-6xl font-bold tracking-wider text-rose-gold-light drop-shadow-[0_2px_15px_rgba(212,163,115,0.25)]">
                    Marina
                  </h2>
                  
                  <div className="w-14 h-[1px] bg-gradient-to-r from-transparent via-rose-gold to-transparent my-4" />
                  
                  <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-rose-gold font-semibold mb-6">
                    Mis 15 Años
                  </span>

                  <div className="space-y-3.5 mb-7 font-montserrat font-light text-slate-300 leading-relaxed text-xs max-w-[270px]">
                    <p className="text-slate-300/90">
                      Bajo la luna de <span className="text-rose-gold-light font-medium">Mar del Plata</span>,
                    </p>
                    <p className="text-[10px] text-slate-400 italic">
                      donde el mar abraza la noche, celebramos el comienzo de un nuevo sueño.
                    </p>
                    
                    <div className="bg-rose-gold/8 border border-rose-gold/20 rounded-xl py-3.5 px-2.5 mt-1.5 relative overflow-hidden">
                      <div className="absolute -inset-4 bg-sea-glow/5 rounded-full blur-md pointer-events-none" />
                      <p className="font-cinzel text-rose-gold-light text-sm tracking-[0.15em] font-bold relative z-10">
                        SÁBADO 14 DE NOVIEMBRE
                      </p>
                      <p className="text-[9px] uppercase tracking-widest text-slate-400 font-normal mt-0.5 relative z-10 flex items-center justify-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-rose-gold/60" />
                        Mar del Plata, Argentina
                      </p>
                    </div>
                  </div>

                  <p className="font-montserrat text-[10px] text-slate-400/80 leading-normal max-w-[240px] mx-auto mb-7">
                    Próximamente recibirás la invitación formal con todos los detalles del evento en la costa.
                  </p>

                  <div className="w-full max-w-[220px]">
                    <button
                      onClick={() => setShowOptions(!showOptions)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-[11px] font-montserrat font-medium tracking-wider uppercase bg-gradient-to-r from-rose-gold-dark to-rose-gold text-navy-dark hover:brightness-110 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-rose-gold/15"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Agendar Fecha
                    </button>

                    <AnimatePresence>
                      {showOptions && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden flex flex-col gap-1.5 w-full"
                        >
                          <a
                            href={googleCalendarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[10px] font-montserrat font-medium tracking-wide bg-navy-dark/60 border border-rose-gold/15 text-slate-200 hover:bg-navy-dark hover:text-white hover:border-rose-gold/30 transition-all duration-200"
                          >
                            Google Calendar
                          </a>
                          
                          <button
                            onClick={handleDownloadICS}
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[10px] font-montserrat font-medium tracking-wide bg-navy-dark/60 border border-rose-gold/15 text-slate-200 hover:bg-navy-dark hover:text-white hover:border-rose-gold/30 transition-all duration-200"
                          >
                            <Download className="w-3 h-3 text-slate-400" />
                            Apple / Outlook (.ics)
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <AnimatePresence>
                    {saved && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-2 flex items-center gap-1.5 bg-sea-glow/10 border border-sea-glow/20 text-sea-glow text-[9px] uppercase tracking-wider py-1 px-2.5 rounded-full"
                      >
                        <Check className="w-2.5 h-2.5" />
                        ¡Guardado en descargas!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <div className="z-10 text-center text-[8px] text-slate-500 tracking-wider font-light uppercase">
        © 2026 Marina. Todos los derechos reservados.
      </div>
    </div>
  );
}
