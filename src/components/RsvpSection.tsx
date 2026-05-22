"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const motionFramer = motion;
import { CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

export default function RsvpSection() {
  const [name, setName] = useState("");
  const [attends, setAttends] = useState<string | null>(null);
  const [diet, setDiet] = useState("Ninguna");
  const [dietCustom, setDietCustom] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const phoneNumber = "5491123456789"; // Reemplazar con el número real de la quinceañera

  const triggerConfetti = () => {
    // Confeti oro rosa, azul noche, turquesa glow y blanco perlado
    const colors = ["#D4A373", "#F3E5D8", "#00F5FF", "#0ea5e9", "#FFFFFF"];
    
    const end = Date.now() + (1 * 1000); // 1 segundo de confeti

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Por favor, ingresa tu nombre y apellido.");
      return;
    }
    if (!attends) {
      setError("Por favor, selecciona si asistirás.");
      return;
    }

    const isAttending = attends === "si";
    const selectedDiet = diet === "Otra" ? dietCustom.trim() : diet;
    
    // Crear mensaje estructurado para WhatsApp
    let messageText = `¡Hola Marina! 🌊\n\n`;
    if (isAttending) {
      messageText += `*Confirmo mi asistencia* a tu gran fiesta de 15 años el 14 de Noviembre. 🎉✨\n\n`;
    } else {
      messageText += `Lamentablemente *no podré asistir* a tu fiesta de 15 años. Te deseo una noche espectacular y llena de alegría. 💖\n\n`;
    }
    
    messageText += `*Nombre:* ${name.trim()}\n`;
    if (isAttending) {
      messageText += `*Restricción alimentaria/Menú:* ${selectedDiet || "Ninguna"}`;
    }

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(messageText)}`;

    // Lanzar confeti si confirma que asiste
    if (isAttending) {
      triggerConfetti();
    }

    setSubmitted(true);

    // Redirigir a WhatsApp después de un pequeño retraso para permitir ver el feedback
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1200);
  };

  return (
    <section
      id="rsvp-section"
      className="relative min-h-screen w-full bg-navy-dark flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Luz radial del fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-sea-glow/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] bg-rose-gold/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Título de la Sección */}
      <motionFramer.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 z-10 select-none"
      >
        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-rose-gold font-semibold mb-2 block">
          ¿Nos acompañás?
        </span>
        <h2 className="font-cinzel text-3xl md:text-4xl text-slate-100 font-bold tracking-wide">
          Confirmación de Asistencia
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-rose-gold to-transparent my-4 mx-auto" />
        <p className="font-montserrat text-xs text-slate-400 font-light max-w-sm mx-auto leading-relaxed mt-2 px-2">
          Por favor, confirma tu asistencia antes del 15 de Octubre para una mejor organización.
        </p>
      </motionFramer.div>

      {/* Formulario en Tarjeta de Vidrio */}
      <motionFramer.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-md glass-panel rounded-2xl p-6 md:p-8 shadow-2xl relative z-10 hover:border-rose-gold/25 transition-colors duration-300"
      >
        {/* Adornos en esquinas */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-rose-gold/20" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-rose-gold/20" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-rose-gold/20" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-rose-gold/20" />

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input de Nombre */}
            <div className="flex flex-col">
              <label
                htmlFor="fullname"
                className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-2.5 select-none"
              >
                Nombre y Apellido
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="Ej. Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 w-full px-4 rounded-xl bg-navy-dark/70 border border-white/10 hover:border-rose-gold/30 focus:border-rose-gold text-slate-100 font-montserrat text-[16px] placeholder:text-slate-600 focus:outline-none focus:shadow-[0_0_15px_rgba(212,163,115,0.12)] transition-all shadow-inner outline-none min-h-[44px] selectable-text"
                required
              />
            </div>

            {/* Selector de Asistencia */}
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-3.5 select-none">
                ¿Asistirás al evento?
              </span>
              <div className="grid grid-cols-2 gap-4">
                {/* Botón Sí */}
                <button
                  type="button"
                  onClick={() => setAttends("si")}
                  className={`h-12 flex items-center justify-center gap-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98] outline-none min-h-[44px] cursor-pointer ${
                    attends === "si"
                      ? "bg-rose-gold/15 border-2 border-rose-gold text-slate-100 shadow-[0_0_15px_rgba(212,163,115,0.2)]"
                      : "bg-navy-dark/70 border border-white/10 text-slate-400 hover:text-slate-200 hover:border-rose-gold/25"
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${attends === "si" ? "border-rose-gold" : "border-slate-500"}`}>
                    {attends === "si" && <span className="w-1.5 h-1.5 bg-rose-gold rounded-full" />}
                  </span>
                  ¡Sí, voy!
                </button>

                {/* Botón No */}
                <button
                  type="button"
                  onClick={() => setAttends("no")}
                  className={`h-12 flex items-center justify-center gap-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98] outline-none min-h-[44px] cursor-pointer ${
                    attends === "no"
                      ? "bg-red-500/10 border-2 border-red-500/50 text-red-200"
                      : "bg-navy-dark/70 border border-white/10 text-slate-400 hover:text-slate-200 hover:border-rose-gold/25"
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${attends === "no" ? "border-red-500/50" : "border-slate-500"}`}>
                    {attends === "no" && <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />}
                  </span>
                  No podré ir
                </button>
              </div>
            </div>

            {/* Restricciones Alimentarias (Solo si asiste) */}
            <AnimatePresence>
              {attends === "si" && (
                <motionFramer.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="flex flex-col">
                    <label
                      htmlFor="diet-select"
                      className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-2.5 select-none"
                    >
                      Menú Especial / Restricción
                    </label>
                    <select
                      id="diet-select"
                      value={diet}
                      onChange={(e) => setDiet(e.target.value)}
                      className="h-12 w-full px-4 rounded-xl bg-navy-dark/70 border border-white/10 hover:border-rose-gold/30 focus:border-rose-gold text-slate-100 font-montserrat text-[16px] focus:outline-none focus:shadow-[0_0_15px_rgba(212,163,115,0.12)] transition-all outline-none min-h-[44px] select-none"
                    >
                      <option value="Ninguna">Ninguna (Menú Común)</option>
                      <option value="Vegetariano">Menú Vegetariano</option>
                      <option value="Vegano">Menú Vegano</option>
                      <option value="Celíaco">Menú Celíaco (Sin TACC)</option>
                      <option value="Otra">Otra alergia / restricción</option>
                    </select>
                  </div>

                  {diet === "Otra" && (
                    <motionFramer.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col"
                    >
                      <input
                        type="text"
                        placeholder="Detalla tu alergia o restricción"
                        value={dietCustom}
                        onChange={(e) => setDietCustom(e.target.value)}
                        className="h-12 w-full px-4 rounded-xl bg-navy-dark/70 border border-white/10 hover:border-rose-gold/30 focus:border-rose-gold text-slate-100 font-montserrat text-[16px] placeholder:text-slate-600 focus:outline-none focus:shadow-[0_0_15px_rgba(212,163,115,0.12)] transition-all outline-none min-h-[44px] selectable-text"
                        required
                      />
                    </motionFramer.div>
                  )}
                </motionFramer.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2.5 text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-xs select-none">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Botón Enviar */}
            <button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-rose-gold-dark to-rose-gold hover:brightness-110 text-navy-dark font-montserrat text-xs uppercase tracking-[0.2em] font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] outline-none shadow-lg shadow-rose-gold/15 min-h-[44px] cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Confirmar por WhatsApp
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4 select-none">
            <div className="inline-flex p-3.5 rounded-full bg-rose-gold/10 border border-rose-gold/30 text-rose-gold mb-2 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-cinzel text-xl text-slate-100 font-semibold tracking-wide">
              ¡Confirmación Preparada!
            </h3>
            <p className="font-montserrat text-xs text-slate-400 font-light max-w-xs mx-auto leading-relaxed">
              Te estamos redirigiendo a WhatsApp para enviar el mensaje de confirmación a Marina...
            </p>
            <div className="w-24 h-1 bg-slate-800 rounded-full mx-auto overflow-hidden mt-6">
              <div className="h-full bg-rose-gold animate-[shimmer_1.5s_infinite]" style={{ width: "100%" }} />
            </div>
          </div>
        )}
      </motionFramer.div>
    </section>
  );
}
