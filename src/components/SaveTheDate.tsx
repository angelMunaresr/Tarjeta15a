"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Download, Sparkles, MapPin, Check } from "lucide-react";

// Interfaces
interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  duration: number;
}

interface Bubble {
  x: number;
  y: number;
  baseX: number;
  radius: number;
  speed: number;
  opacity: number;
  swingSpeed: number;
  swingRange: number;
  swingOffset: number;
}

export default function SaveTheDate() {
  const [status, setStatus] = useState<"mystery" | "popping" | "revealed">("mystery");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [saved, setSaved] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // 1. Web Audio API pop sound generator (self-contained, no external file needed)
  const playPopSound = () => {
    if (typeof window === "undefined") return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Primer oscilador para el "pop" (frecuencia ascendente rápida)
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(200, audioCtx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.08);
      
      gain1.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start();
      osc1.stop(audioCtx.currentTime + 0.1);

      // Segundo oscilador para el "click" sutil (frecuencia alta)
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(1500, audioCtx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.03);
      
      gain2.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
      
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start();
      osc2.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      console.warn("Audio Context not supported or allowed yet", e);
    }
  };

  // 2. Fondo de Canvas con Burbujas Lentas y Sutiles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let bubbles: Bubble[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const bubbleCount = isMobile ? 12 : 25; // Burbujas lentas y sutiles de fondo

    const createBubble = (initY = false): Bubble => {
      const radius = Math.random() * (isMobile ? 5 : 8) + 2;
      const x = Math.random() * width;
      const y = initY ? Math.random() * height : height + radius + 10;
      return {
        x,
        y,
        baseX: x,
        radius,
        speed: Math.random() * 0.3 + 0.15, // Muy lento para no distraer
        opacity: Math.random() * 0.15 + 0.03, // Muy sutiles
        swingSpeed: Math.random() * 0.003 + 0.001,
        swingRange: Math.random() * 10 + 3,
        swingOffset: Math.random() * Math.PI * 2,
      };
    };

    const init = () => {
      bubbles = Array.from({ length: bubbleCount }, () => createBubble(true));
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", handleResize);
    init();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      bubbles.forEach((bubble) => {
        bubble.y -= bubble.speed;
        bubble.x = bubble.baseX + Math.sin(bubble.y * bubble.swingSpeed + bubble.swingOffset) * bubble.swingRange;

        // Dibujar burbuja suave
        ctx.beginPath();
        const bubbleGrad = ctx.createRadialGradient(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          bubble.radius * 0.1,
          bubble.x,
          bubble.y,
          bubble.radius
        );
        bubbleGrad.addColorStop(0, `rgba(255, 255, 255, ${bubble.opacity + 0.1})`);
        bubbleGrad.addColorStop(0.5, `rgba(32, 178, 170, ${bubble.opacity})`);
        bubbleGrad.addColorStop(1, `rgba(5, 12, 26, 0.02)`);

        ctx.fillStyle = bubbleGrad;
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.8})`;
        ctx.lineWidth = 0.3;
        ctx.stroke();

        if (bubble.y < -bubble.radius) {
          Object.assign(bubble, createBubble(false));
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

  // 3. Manejo de la Interacción Lúdica (Pop y Partículas)
  const handlePop = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (status !== "mystery") return;
    
    // Obtener coordenadas de la interacción
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

    // Cambiar estado a popping
    setStatus("popping");
    playPopSound();

    // Generar partículas concéntricas
    const particleCount = 24;
    const tempParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2 + (Math.random() * 0.3 - 0.15);
      const distance = Math.random() * 120 + 60; // Distancia de vuelo
      const size = Math.random() * 8 + 3;
      const duration = Math.random() * 0.4 + 0.4; // Segundos

      tempParticles.push({
        id: i,
        x: clientX,
        y: clientY,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        size,
        duration,
      });
    }

    setParticles(tempParticles);

    // Revelar la tarjeta formal después de la animación de las partículas
    setTimeout(() => {
      setStatus("revealed");
    }, 700);
  };

  // 4. Lógica de Calendarios (.ics y Google Calendar)
  const handleDownloadICS = () => {
    const title = "Mis 15 Años - Marina";
    const description = "¡Guarda la fecha para celebrar mis 15 años! Próximamente recibirás la invitación formal con todos los detalles.";
    const location = "Por confirmar";
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

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mis+15+A%C3%B1os+-+Marina&dates=20261114T210000/20261115T050000&details=%C2%A1Guarda+la+fecha+para+celebrar+mis+15+a%C3%B1os%21+Pr%C3%B3ximamente+recibir%C3%A1s+la+invitaci%C3%B3n+formal+con+todos+los+detalles.&location=Por+confirmar`;

  return (
    <div className="w-full h-[100dvh] overflow-hidden relative bg-gradient-to-b from-[#050C1A] via-[#030814] to-[#010307] select-none flex flex-col justify-between items-center py-12 px-6">
      
      {/* 2.1 Canvas de burbujas decorativas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none -z-10" />

      {/* 2.2 Luz ambiental superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Cabecera superior sutil */}
      <div className="z-10 text-center mt-2">
        <span className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-semibold block mb-1">
          Save the Date
        </span>
        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mx-auto" />
      </div>

      {/* CONTENEDOR CENTRAL DE INTERACCIÓN / REVELACIÓN */}
      <div className="relative flex items-center justify-center flex-grow w-full max-w-sm z-20">
        
        {/* ================= ESTADO A: EL MISTERIO ================= */}
        <AnimatePresence mode="wait">
          {status === "mystery" && (
            <motion.div
              key="mystery-state"
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              {/* Burbuja Principal */}
              <motion.div
                onClick={handlePop}
                onTouchStart={handlePop}
                animate={{
                  y: [0, -14, 0],
                  scale: [1, 1.02, 0.98, 1],
                  rotate: [0, 1.5, -1.5, 0]
                }}
                transition={{
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                  scale: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                className="relative w-44 h-44 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,245,255,0.25)] border border-white/20 select-none touch-none"
                style={{
                  background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.15) 30%, rgba(32, 178, 170, 0.1) 60%, rgba(212, 175, 55, 0.15) 100%)",
                  boxShadow: "inset 0 0 25px rgba(255,255,255,0.5), inset 10px -15px 30px rgba(0,245,255,0.2), inset -10px 15px 30px rgba(212,175,55,0.15), 0 10px 30px rgba(0,0,0,0.3)"
                }}
              >
                {/* Reflejos brillantes de la burbuja */}
                <div className="absolute top-4 left-6 w-8 h-4 rounded-full bg-white/60 rotate-[-25deg] filter blur-[0.5px]" />
                <div className="absolute bottom-5 right-6 w-4 h-2 rounded-full bg-white/20 rotate-[35deg] filter blur-[0.5px]" />
                
                {/* Halo de luz que pulsa */}
                <div className="absolute inset-0 rounded-full animate-ping opacity-25 border border-cyan-400/30 pointer-events-none" style={{ animationDuration: '3s' }} />

                {/* Sobre estilizado y estrella flotando en el interior */}
                <div className="flex flex-col items-center pointer-events-none">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="absolute -top-1 -right-1 text-yellow-300/40"
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  
                  {/* Sobre flotante */}
                  <svg className="w-16 h-16 text-[#D4AF37] drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  
                  {/* El "15" en el centro de la burbuja en tono dorado elegante */}
                  <span className="font-cinzel text-xs font-bold tracking-[0.2em] text-[#F3E5AB] mt-1 drop-shadow-md">
                    MIS 15
                  </span>
                </div>
              </motion.div>

              {/* Texto de llamado a la acción CTA */}
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4], y: [0, 4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="mt-8 text-center"
              >
                <p className="font-montserrat text-xs uppercase tracking-[0.25em] text-white/70">
                  Toca para sumergirte
                </p>
                <p className="text-[10px] text-cyan-400/50 mt-1 uppercase tracking-widest">
                  y descubrir el misterio
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= ANIMACIÓN DE POPEO (PARTÍCULAS) ================= */}
        {status === "popping" && (
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: p.x - window.innerWidth / 2, y: p.y - window.innerHeight / 2, scale: 1, opacity: 0.9 }}
                animate={{
                  x: (p.x - window.innerWidth / 2) + p.dx,
                  y: (p.y - window.innerHeight / 2) + p.dy,
                  scale: [1, 0.8, 0],
                  opacity: 0
                }}
                transition={{ duration: p.duration, ease: "easeOut" }}
                className="absolute rounded-full border border-white/40"
                style={{
                  width: p.size,
                  height: p.size,
                  left: "50%",
                  top: "50%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(0,245,255,0.4) 60%, rgba(255,255,255,0) 100%)",
                  boxShadow: "0 0 8px rgba(0,245,255,0.6)"
                }}
              />
            ))}
          </div>
        )}

        {/* ================= ESTADO B: LA REVELACIÓN ================= */}
        <AnimatePresence>
          {status === "revealed" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative"
            >
              {/* Tarjeta de Placa de Cristal de Vidrio (Glassmorphism) */}
              <div 
                className="w-full rounded-2xl p-7 relative overflow-hidden border border-white/10"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.05)"
                }}
              >
                {/* Borde interno dorado decorativo muy fino */}
                <div className="absolute inset-2 border border-[#D4AF37]/15 rounded-xl pointer-events-none" />
                
                {/* Esquinas doradas de adorno */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#D4AF37]/40 pointer-events-none" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#D4AF37]/40 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#D4AF37]/40 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#D4AF37]/40 pointer-events-none" />

                {/* Contenido principal */}
                <div className="text-center flex flex-col items-center select-text relative z-10">
                  {/* Cabecera */}
                  <span className="text-[10px] font-montserrat uppercase tracking-[0.25em] text-[#F3E5AB] font-medium flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]/80" />
                    ¡Guarda la fecha!
                    <Sparkles className="w-3 h-3 text-[#D4AF37]/80" />
                  </span>
                  <span className="text-[8px] font-montserrat uppercase tracking-[0.3em] text-white/50 font-light block mb-4">
                    Save the Date
                  </span>

                  {/* Nombre Quinceañera */}
                  <h2 className="font-cinzel text-4xl md:text-5xl font-bold tracking-wider text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
                    Marina
                  </h2>
                  
                  {/* Divisor */}
                  <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-3.5" />
                  
                  {/* Título de los 15 Años */}
                  <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-6">
                    Mis 15 Años
                  </span>

                  {/* Mensaje de Fechas */}
                  <div className="space-y-3.5 mb-7 font-montserrat font-light text-slate-300 leading-relaxed text-xs max-w-[270px]">
                    <p className="text-slate-300/90">
                      Mi cumpleaños es el <span className="text-white font-medium">Sábado 23 de Mayo</span>,
                    </p>
                    <p className="text-[10px] text-white/40 italic font-serif">
                      pero te espero para celebrarlo a lo grande el
                    </p>
                    
                    {/* Fecha de la fiesta destacada */}
                    <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl py-3 px-2 mt-1 relative overflow-hidden">
                      {/* Brillo de fondo para la fecha */}
                      <div className="absolute -inset-4 bg-[#D4AF37]/3 rounded-full blur-md pointer-events-none" />
                      <p className="font-cinzel text-[#F3E5AB] text-sm tracking-[0.15em] font-bold relative z-10">
                        SÁBADO 14 DE NOVIEMBRE
                      </p>
                      <p className="text-[9px] uppercase tracking-widest text-slate-400 font-normal mt-0.5 relative z-10 flex items-center justify-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-[#D4AF37]/60" />
                        Fecha de la Fiesta
                      </p>
                    </div>
                  </div>

                  {/* Cierre */}
                  <p className="font-montserrat text-[10px] text-slate-400/80 leading-normal max-w-[240px] mx-auto mb-7">
                    Próximamente recibirás la invitación formal con todos los detalles del evento.
                  </p>

                  {/* Botón de Calendario Acordeón */}
                  <div className="w-full max-w-[220px]">
                    <button
                      onClick={() => setShowOptions(!showOptions)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-[11px] font-montserrat font-medium tracking-wider uppercase bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#050C1A] hover:brightness-110 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-gold-accent/10"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Agendar Fecha
                    </button>

                    {/* Opciones de calendario con animación */}
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
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[10px] font-montserrat font-medium tracking-wide bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:text-white transition-colors duration-200"
                          >
                            Google Calendar
                          </a>
                          
                          <button
                            onClick={handleDownloadICS}
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[10px] font-montserrat font-medium tracking-wide bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:text-white transition-colors duration-200"
                          >
                            <Download className="w-3 h-3 text-slate-400" />
                            Apple / Outlook (.ics)
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Toast de guardado */}
                  <AnimatePresence>
                    {saved && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-2 flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-300 text-[9px] uppercase tracking-wider py-1 px-2.5 rounded-full"
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

      {/* Olas SVG Animadas en la Base de la Pantalla */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none overflow-hidden -z-10 select-none">
        
        {/* Ola trasera */}
        <svg 
          className="absolute bottom-0 left-0 w-[200%] h-24 opacity-30 fill-[#0b132b]"
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{
            animation: "wave-slide-slow 15s linear infinite"
          }}
        >
          <path d="M0,60 C150,90 350,30 500,60 C650,90 850,30 1000,60 C1150,90 1350,30 1500,60 C1650,90 1850,30 2000,60 L2000,120 L0,120 Z" />
        </svg>

        {/* Ola delantera */}
        <svg 
          className="absolute bottom-0 left-0 w-[200%] h-20 opacity-40 fill-[#050c1a]"
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{
            animation: "wave-slide-fast 10s linear infinite"
          }}
        >
          <path d="M0,50 C100,70 250,30 400,50 C550,70 700,30 850,50 C1000,70 1150,30 1300,50 C1450,70 1600,30 1750,50 L1750,120 L0,120 Z" />
        </svg>

        {/* Olas CSS Keyframes integrados */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes wave-slide-slow {
            0% { transform: translateX(0); }
            50% { transform: translateX(-25%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes wave-slide-fast {
            0% { transform: translateX(-50%); }
            50% { transform: translateX(-25%); }
            100% { transform: translateX(0); }
          }
        `}} />
      </div>

      {/* Pie de pantalla / Derechos Reservados o indicación sutil */}
      <div className="z-10 text-center text-[8px] text-white/20 tracking-wider font-light uppercase">
        © 2026 Marina. Todos los derechos reservados.
      </div>
    </div>
  );
}
