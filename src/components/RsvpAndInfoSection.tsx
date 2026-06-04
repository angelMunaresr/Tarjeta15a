"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, AlertCircle, Shirt, Gift, Copy, Check, Info, MessageCircle, Shell, Star, Waves } from "lucide-react";

export default function RsvpAndInfoSection() {
  const [name, setName] = useState("");
  const [attends, setAttends] = useState<string | null>(null);
  const [diet, setDiet] = useState("Ninguna");
  const [dietCustom, setDietCustom] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [copiedCbu, setCopiedCbu] = useState(false);

  const phoneNumber = "5491123456789";

  const bankDetails = {
    banco: "Banco Galicia",
    cbu: "0070123456789012345678",
    alias: "marina.mis15.ok",
    titular: "Marina Rodríguez",
  };

  const triggerConfetti = async () => {
    const { default: confetti } = await import("canvas-confetti");
    const colors = ["#D4A373", "#F3E5D8", "#00F5FF", "#0ea5e9", "#FFFFFF"];
    const end = Date.now() + 1000;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const copyToClipboard = (text: string, type: "alias" | "cbu") => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "alias") {
        setCopiedAlias(true);
        setTimeout(() => setCopiedAlias(false), 2000);
      } else {
        setCopiedCbu(true);
        setTimeout(() => setCopiedCbu(false), 2000);
      }
    });
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

    if (isAttending) triggerConfetti();
    setSubmitted(true);

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1200);
  };

  return (
    <section
      id="rsvp-section"
      className="relative min-h-screen w-full bg-navy-dark flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Número de sección */}
      <div className="absolute top-4 left-4 z-50 bg-rose-gold/20 border border-rose-gold/40 rounded-full w-8 h-8 flex items-center justify-center">
        <span className="font-cinzel text-xs text-rose-gold font-bold">3</span>
      </div>

      {/* Luces radiales del fondo (gradientes estáticos = 0 filter:blur) */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none animate-golden-shimmer" style={{ background: "radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,163,115,0.05) 0%, transparent 70%)" }} />

      {/* Marco decorativo */}
      <div className="absolute inset-8 border border-rose-gold/8 pointer-events-none rounded-sm" />

      {/* Decoración marina - conchas, estrellas de mar y burbujas (sin lunas) */}
      {/* Concha marina - esquina superior izquierda */}
      <div className="absolute top-[10%] left-[6%] w-14 h-14 md:w-20 md:h-20 opacity-[0.07] pointer-events-none" aria-hidden="true">
        <Shell className="w-full h-full text-rose-gold" strokeWidth={0.8} />
      </div>

      {/* Estrella de mar - esquina superior derecha */}
      <div className="absolute top-[14%] right-[5%] w-12 h-12 md:w-16 md:h-16 opacity-[0.07] pointer-events-none" aria-hidden="true">
        <Star className="w-full h-full text-rose-gold" strokeWidth={0.8} />
      </div>

      {/* Concha más pequeña - esquina inferior izquierda */}
      <div className="absolute bottom-[18%] left-[4%] w-10 h-10 md:w-14 md:h-14 opacity-[0.06] pointer-events-none" aria-hidden="true">
        <Shell className="w-full h-full text-rose-gold" strokeWidth={0.8} />
      </div>

      {/* Estrella de mar más pequeña - esquina inferior derecha */}
      <div className="absolute bottom-[12%] right-[6%] w-10 h-10 md:w-14 md:h-14 opacity-[0.07] pointer-events-none" aria-hidden="true">
        <Star className="w-full h-full text-rose-gold" strokeWidth={0.8} />
      </div>

      {/* Burbujas ascendentes decorativas en los costados */}
      <div className="absolute bottom-[5%] left-[12%] w-2.5 h-2.5 rounded-full animate-bubble-rise pointer-events-none" style={{ background: "radial-gradient(circle at 30% 30%, rgba(200,220,255,0.6) 0%, rgba(100,149,237,0.25) 50%, rgba(60,90,150,0.05) 100%)", boxShadow: "inset -1px -1px 3px rgba(255,255,255,0.3), 0 0 6px rgba(100,149,237,0.3)" }} />
      <div className="absolute bottom-[8%] left-[18%] w-1.5 h-1.5 rounded-full animate-bubble-rise pointer-events-none" style={{ animationDelay: "0.8s", background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7) 0%, rgba(210,230,255,0.3) 50%, transparent 100%)", boxShadow: "0 0 5px rgba(255,255,255,0.3)" }} />
      <div className="absolute bottom-[4%] right-[14%] w-2 h-2 rounded-full animate-bubble-rise pointer-events-none" style={{ animationDelay: "1.4s", background: "radial-gradient(circle at 30% 30%, rgba(150,180,220,0.55) 0%, rgba(80,120,180,0.22) 50%, transparent 100%)", boxShadow: "inset -1px -1px 2px rgba(255,255,255,0.2), 0 0 5px rgba(150,180,220,0.25)" }} />
      <div className="absolute bottom-[10%] right-[20%] w-1.5 h-1.5 rounded-full animate-bubble-rise pointer-events-none" style={{ animationDelay: "0.4s", background: "radial-gradient(circle at 30% 30%, rgba(232,232,240,0.6) 0%, rgba(192,192,200,0.2) 50%, transparent 100%)", boxShadow: "0 0 4px rgba(232,232,240,0.3)" }} />

      {/* Sparkles plateados sutiles para el shimmer del título */}
      <div className="absolute top-[24%] left-[14%] w-1 h-1 rounded-full bg-silver-shine/70 animate-silver-twinkle pointer-events-none" />
      <div className="absolute top-[22%] right-[16%] w-1.5 h-1.5 rounded-full bg-silver-bright/50 animate-silver-twinkle pointer-events-none" style={{ animationDelay: "0.7s" }} />
      <div className="absolute top-[28%] left-[20%] w-0.5 h-0.5 rounded-full bg-silver-shine/60 animate-silver-twinkle pointer-events-none" style={{ animationDelay: "1.4s" }} />
      <div className="absolute top-[26%] right-[22%] w-1 h-1 rounded-full bg-silver-bright/60 animate-silver-twinkle pointer-events-none" style={{ animationDelay: "2.1s" }} />

      {/* Título de la Sección */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 z-10 select-none max-w-lg"
      >
        <h2
          className="font-cinzel text-3xl md:text-4xl font-bold tracking-wide silver-shimmer-text"
          style={{
            textShadow: "0 0 12px rgba(232,232,240,0.5), 0 0 24px rgba(232,232,240,0.3), 0 0 40px rgba(255,255,255,0.15)",
          }}
        >
          Marea de Confirmación
        </h2>
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-silver-bright/60 to-transparent my-4 mx-auto" />
        <p className="font-montserrat text-xs text-slate-400 font-light max-w-md mx-auto leading-relaxed mt-2 px-2">
          Tu respuesta hace que la noche brille aún más. Confirmá tu lugar en la velada y descubrí los detalles del evento.
        </p>
      </motion.div>

      {/* Layout principal: RSVP + Info Práctica */}
      <div className="w-full max-w-5xl z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-7 items-start">
        {/* COLUMNA IZQUIERDA: RSVP */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass-panel rounded-2xl p-6 md:p-7 shadow-2xl relative hover:border-rose-gold/25 transition-colors duration-300 glow-dramatic texture-velvet"
        >
          {/* Adornos en esquinas */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-rose-gold/40" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-rose-gold/40" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-rose-gold/40" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-rose-gold/40" />

          {/* Header de la tarjeta RSVP */}
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-rose-gold/10">
            <div className="p-2.5 rounded-xl bg-rose-gold/10 border border-rose-gold/25 text-rose-gold shadow-[0_0_15px_rgba(212,163,115,0.15)]">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-base md:text-lg text-slate-100 font-bold tracking-wide">
                ¿Te sumás a la noche?
              </h3>
              <p className="font-montserrat text-[10px] text-slate-500 mt-0.5">
                Antes del 15 de Octubre
              </p>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input de Nombre */}
              <div className="flex flex-col">
                <label
                  htmlFor="fullname"
                  className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-2 select-none"
                >
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Ej. Juan Pérez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 w-full px-4 rounded-xl bg-navy-dark/70 border border-white/10 hover:border-rose-gold/30 focus:border-rose-gold text-slate-100 font-montserrat text-[15px] placeholder:text-slate-600 focus:outline-none focus:shadow-[0_0_15px_rgba(212,163,115,0.12)] transition-all shadow-inner outline-none min-h-[44px] selectable-text"
                  required
                />
              </div>

              {/* Selector de Asistencia */}
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-3 select-none">
                  ¿Asistirás al evento?
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttends("si")}
                    className={`h-11 flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all active:scale-[0.98] outline-none min-h-[44px] cursor-pointer ${
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

                  <button
                    type="button"
                    onClick={() => setAttends("no")}
                    className={`h-11 flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all active:scale-[0.98] outline-none min-h-[44px] cursor-pointer ${
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

              {/* Restricciones Alimentarias */}
              <AnimatePresence>
                {attends === "si" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 overflow-hidden"
                  >
                    <div className="flex flex-col">
                      <label
                        htmlFor="diet-select"
                        className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-2 select-none"
                      >
                        Menú Especial / Restricción
                      </label>
                      <select
                        id="diet-select"
                        value={diet}
                        onChange={(e) => setDiet(e.target.value)}
                        className="h-11 w-full px-4 rounded-xl bg-navy-dark/70 border border-white/10 hover:border-rose-gold/30 focus:border-rose-gold text-slate-100 font-montserrat text-[14px] focus:outline-none focus:shadow-[0_0_15px_rgba(212,163,115,0.12)] transition-all outline-none min-h-[44px] select-none"
                      >
                        <option value="Ninguna">Ninguna (Menú Común)</option>
                        <option value="Vegetariano">Menú Vegetariano</option>
                        <option value="Vegano">Menú Vegano</option>
                        <option value="Celíaco">Menú Celíaco (Sin TACC)</option>
                        <option value="Otra">Otra alergia / restricción</option>
                      </select>
                    </div>

                    {diet === "Otra" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col"
                      >
                        <input
                          type="text"
                          placeholder="Detalla tu alergia o restricción"
                          value={dietCustom}
                          onChange={(e) => setDietCustom(e.target.value)}
                          className="h-11 w-full px-4 rounded-xl bg-navy-dark/70 border border-white/10 hover:border-rose-gold/30 focus:border-rose-gold text-slate-100 font-montserrat text-[14px] placeholder:text-slate-600 focus:outline-none focus:shadow-[0_0_15px_rgba(212,163,115,0.12)] transition-all outline-none min-h-[44px] selectable-text"
                          required
                        />
                      </motion.div>
                    )}
                  </motion.div>
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
                className="w-full h-13 py-3.5 bg-gradient-to-r from-rose-gold-dark to-rose-gold hover:brightness-110 text-navy-dark font-montserrat text-xs uppercase tracking-[0.2em] font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] outline-none shadow-lg shadow-rose-gold/15 min-h-[44px] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Enviar mi Confirmación
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4 select-none relative">
              {/* Ondas expansivas del splash */}
              <div className="relative inline-flex items-center justify-center">
                <motion.div
                  className="absolute w-16 h-16 rounded-full border-2 border-rose-gold/30"
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute w-16 h-16 rounded-full border-2 border-sea-glow/30"
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                />
                <motion.div
                  className="absolute w-16 h-16 rounded-full border-2 border-silver-bright/20"
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                />
                <div className="relative inline-flex p-3.5 rounded-full bg-rose-gold/10 border border-rose-gold/30 text-rose-gold">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
              </div>

              {/* Burbujas que suben del splash */}
              <div className="absolute left-[20%] bottom-[35%] w-2 h-2 rounded-full animate-bubble-rise pointer-events-none" style={{ animationDelay: "0s", background: "radial-gradient(circle at 30% 30%, rgba(200,220,255,0.7) 0%, rgba(100,149,237,0.3) 50%, transparent 100%)", boxShadow: "0 0 5px rgba(100,149,237,0.4)" }} />
              <div className="absolute left-[25%] bottom-[40%] w-1.5 h-1.5 rounded-full animate-bubble-rise pointer-events-none" style={{ animationDelay: "0.4s", background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7) 0%, rgba(210,230,255,0.3) 50%, transparent 100%)", boxShadow: "0 0 4px rgba(255,255,255,0.3)" }} />
              <div className="absolute right-[22%] bottom-[38%] w-2 h-2 rounded-full animate-bubble-rise pointer-events-none" style={{ animationDelay: "0.7s", background: "radial-gradient(circle at 30% 30%, rgba(232,232,240,0.6) 0%, transparent 100%)", boxShadow: "0 0 5px rgba(232,232,240,0.3)" }} />
              <div className="absolute right-[28%] bottom-[42%] w-1.5 h-1.5 rounded-full animate-bubble-rise pointer-events-none" style={{ animationDelay: "1.1s", background: "radial-gradient(circle at 30% 30%, rgba(150,180,220,0.6) 0%, transparent 100%)", boxShadow: "0 0 4px rgba(150,180,220,0.3)" }} />

              <h3 className="font-cinzel text-xl text-slate-100 font-semibold tracking-wide relative z-10">
                ¡Tu mensaje navega hacia Marina!
              </h3>
              <p className="font-montserrat text-xs text-slate-400 font-light max-w-xs mx-auto leading-relaxed relative z-10">
                Te estamos redirigiendo a WhatsApp para enviar la confirmación...
              </p>
              <div className="w-24 h-1 bg-slate-800 rounded-full mx-auto overflow-hidden mt-6 relative z-10">
                <div className="h-full bg-gradient-to-r from-rose-gold via-sea-glow to-rose-gold animate-[shimmer_1.5s_infinite]" style={{ width: "100%" }} />
              </div>
            </div>
          )}
        </motion.div>

        {/* COLUMNA DERECHA: Dress Code + Mesa de Regalos */}
        <div className="flex flex-col gap-6">
          {/* Card: Dress Code */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel p-5 md:p-6 flex flex-col items-center text-center shadow-2xl hover:border-rose-gold/25 transition-all duration-300 relative group rounded-2xl texture-velvet glow-dramatic"
          >
            <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-rose-gold/20" />
            <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-rose-gold/20" />
            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-rose-gold/20" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-rose-gold/20" />

            {/* Concha decorativa en la esquina */}
            <div className="absolute top-2 right-2 w-7 h-7 opacity-[0.12] pointer-events-none" aria-hidden="true">
              <Shell className="w-full h-full text-rose-gold" strokeWidth={1.2} />
            </div>

            <div className="p-3 rounded-xl bg-navy-dark/60 border border-rose-gold/20 text-rose-gold mb-3 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(212,163,115,0.1)]">
              <Shirt className="w-5 h-5" />
            </div>

            <h3 className="font-cinzel text-base md:text-lg text-slate-100 font-semibold tracking-wide mb-2">
              Tu Atuendo
            </h3>

            <span className="text-[9px] font-semibold uppercase tracking-widest text-rose-gold bg-rose-gold/10 border border-rose-gold/25 px-3.5 py-1 rounded-full mb-3">
              Formal / Elegante
            </span>

            <p className="font-montserrat text-[11px] md:text-xs text-slate-400 font-light leading-relaxed px-1">
              Vamos a brillar bajo la luna. Sugerimos vestimenta formal. <span className="text-slate-300">Varones: traje y camisa. Mujeres: vestido elegante.</span>
            </p>
          </motion.div>

          {/* Card: Mesa de Regalos */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-panel p-5 md:p-6 flex flex-col shadow-2xl hover:border-rose-gold/25 transition-all duration-300 relative group rounded-2xl texture-velvet glow-dramatic"
          >
            <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-rose-gold/20" />
            <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-rose-gold/20" />
            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-rose-gold/20" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-rose-gold/20" />

            {/* Olas decorativas en la esquina */}
            <div className="absolute top-2 right-2 w-7 h-7 opacity-[0.18] pointer-events-none" aria-hidden="true">
              <Waves className="w-full h-full text-rose-gold" strokeWidth={1.2} />
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-navy-dark/60 border border-rose-gold/20 text-rose-gold shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(212,163,115,0.1)]">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-base md:text-lg text-slate-100 font-semibold tracking-wide">
                  Tu Obsequio
                </h3>
                <p className="font-montserrat text-[10px] text-slate-500 mt-0.5">
                  Tu cariño es lo más importante
                </p>
              </div>
            </div>

            <p className="font-montserrat text-[11px] md:text-xs text-slate-400 font-light leading-relaxed mb-4">
              Si deseás hacerme un obsequio, podés colaborar con mi viaje o realizar una transferencia.
            </p>

            {/* Datos bancarios */}
            <div className="w-full bg-navy-dark/70 rounded-xl p-3.5 border border-white/5 space-y-3 text-left text-[11px] md:text-xs">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-slate-400 text-[9px] uppercase tracking-wider font-medium">Banco</span>
                <span className="text-slate-200 font-medium">{bankDetails.banco}</span>
              </div>

              <div className="flex justify-between items-center border-b border-white/5 pb-2 gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-slate-400 text-[9px] uppercase tracking-wider block font-medium">Alias</span>
                  <span className="text-slate-200 font-mono tracking-wider font-semibold select-all selectable-text text-[11px] break-all">
                    {bankDetails.alias}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.alias, "alias")}
                  className="p-2 bg-navy-medium/80 border border-rose-gold/15 hover:border-rose-gold/30 hover:bg-navy-medium rounded-lg text-rose-gold hover:text-rose-gold-light cursor-pointer active:scale-95 transition-all focus:outline-none flex items-center justify-center min-h-[32px] min-w-[32px] shrink-0"
                  title="Copiar Alias"
                >
                  {copiedAlias ? <Check className="w-4 h-4 text-sea-glow" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex justify-between items-center gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-slate-400 text-[9px] uppercase tracking-wider block font-medium">CBU</span>
                  <span className="text-slate-200 font-mono tracking-wider text-[10px] select-all selectable-text break-all">
                    {bankDetails.cbu}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.cbu, "cbu")}
                  className="p-2 bg-navy-medium/80 border border-rose-gold/15 hover:border-rose-gold/30 hover:bg-navy-medium rounded-lg text-rose-gold hover:text-rose-gold-light cursor-pointer active:scale-95 transition-all focus:outline-none flex items-center justify-center min-h-[32px] min-w-[32px] shrink-0"
                  title="Copiar CBU"
                >
                  {copiedCbu ? <Check className="w-4 h-4 text-sea-glow" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Info adicional: urna */}
            <div className="flex items-center gap-2.5 mt-4 bg-navy-dark/40 border border-rose-gold/10 px-3.5 py-2.5 rounded-full text-[10px] text-slate-300 text-center shadow-sm">
              <Info className="w-3.5 h-3.5 text-rose-gold shrink-0" />
              <span className="font-light">También habrá urna para lluvia de sobres en el salón.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
