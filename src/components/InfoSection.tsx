"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shirt, Gift, Copy, Check, Info } from "lucide-react";
import WaveDivider from "./WaveDivider";

export default function InfoSection() {
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [copiedCbu, setCopiedCbu] = useState(false);

  const bankDetails = {
    banco: "Banco Galicia",
    cbu: "0070123456789012345678",
    alias: "marina.mis15.ok",
    titular: "Marina Rodríguez",
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

  return (
    <section
      id="info-section"
      className="relative min-h-screen w-full bg-navy-medium flex flex-col justify-between overflow-hidden select-none py-20"
    >
      {/* Luces radiales del fondo */}
      <div className="absolute top-1/4 right-0 w-[280px] h-[280px] bg-rose-gold/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[280px] h-[280px] bg-sea-glow/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Onda superior para transicionar desde RsvpSection (navy-dark) */}
      <WaveDivider className="-mt-20 z-10" fillColor="text-navy-medium" />

      <div className="max-w-4xl mx-auto px-6 w-full flex flex-col items-center justify-center flex-grow z-10 py-10 space-y-12">
        {/* Título de la Sección */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-rose-gold font-semibold mb-2 block">
            Información Útil
          </span>
          <h2 className="font-cinzel text-3xl md:text-4xl text-slate-100 font-bold tracking-wide">
            Detalles Adicionales
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-rose-gold to-transparent my-4 mx-auto" />
        </motion.div>

        {/* Tarjetas de Información: Dress Code y Regalos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
          
          {/* Card 1: Dress Code */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass-panel p-6 md:p-8 flex flex-col items-center text-center shadow-2xl hover:border-rose-gold/25 transition-all duration-300 relative group rounded-2xl"
          >
            {/* Adornos en esquinas */}
            <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-rose-gold/20" />
            <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-rose-gold/20" />
            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-rose-gold/20" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-rose-gold/20" />

            <div className="p-4 rounded-xl bg-navy-dark/60 border border-rose-gold/20 text-rose-gold mb-5 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(212,163,115,0.1)]">
              <Shirt className="w-6 h-6" />
            </div>
            
            <h3 className="font-cinzel text-lg md:text-xl text-slate-100 font-semibold tracking-wide mb-3">
              Código de Vestimenta
            </h3>
            
            <span className="text-[10px] font-semibold uppercase tracking-widest text-rose-gold bg-rose-gold/10 border border-rose-gold/25 px-4 py-1.5 rounded-full mb-4">
              Formal / Elegante
            </span>
            
            <p className="font-montserrat text-xs md:text-sm text-slate-400 font-light leading-relaxed px-2">
              Queremos que brilles con nosotros. Para esta noche especial, sugerimos vestimenta formal. (Varones: Traje/Saco y Camisa. Mujeres: Vestido elegante).
            </p>
          </motion.div>

          {/* Card 2: Regalos */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel p-6 md:p-8 flex flex-col items-center text-center shadow-2xl hover:border-rose-gold/25 transition-all duration-300 relative group rounded-2xl"
          >
            {/* Adornos en esquinas */}
            <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-rose-gold/20" />
            <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-rose-gold/20" />
            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-rose-gold/20" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-rose-gold/20" />

            <div className="p-4 rounded-xl bg-navy-dark/60 border border-rose-gold/20 text-rose-gold mb-5 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(212,163,115,0.1)]">
              <Gift className="w-6 h-6" />
            </div>
            
            <h3 className="font-cinzel text-lg md:text-xl text-slate-100 font-semibold tracking-wide mb-3">
              Mesa de Regalos
            </h3>
            
            <p className="font-montserrat text-xs md:text-sm text-slate-400 font-light leading-relaxed mb-6 px-2">
              El mejor regalo es tu presencia y tu cariño en esta gran noche. Pero si deseas hacerme un obsequio, puedes colaborar con mi viaje de quinceañera o realizar una transferencia.
            </p>

            {/* Datos de transferencia bancaria (estilo tarjeta de crédito) */}
            <div className="w-full bg-navy-dark/70 rounded-xl p-4 border border-white/5 space-y-3.5 text-left text-xs md:text-sm">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-slate-400 text-[9px] md:text-xs uppercase tracking-wider font-medium">Banco</span>
                <span className="text-slate-200 font-medium">{bankDetails.banco}</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <div>
                  <span className="text-slate-400 text-[9px] md:text-xs uppercase tracking-wider block font-medium">Alias</span>
                  <span className="text-slate-200 font-mono tracking-wider font-semibold select-all selectable-text">{bankDetails.alias}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.alias, "alias")}
                  className="p-2 bg-navy-medium/80 border border-rose-gold/15 hover:border-rose-gold/30 hover:bg-navy-medium rounded-lg text-rose-gold hover:text-rose-gold-light cursor-pointer active:scale-95 transition-all focus:outline-none flex items-center justify-center min-h-[32px] min-w-[32px]"
                  title="Copiar Alias"
                >
                  {copiedAlias ? <Check className="w-4 h-4 text-sea-glow animate-[scaleIn_0.2s_ease-out]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex justify-between items-center pb-1">
                <div>
                  <span className="text-slate-400 text-[9px] md:text-xs uppercase tracking-wider block font-medium">CBU</span>
                  <span className="text-slate-200 font-mono tracking-wider text-xs select-all selectable-text">{bankDetails.cbu}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.cbu, "cbu")}
                  className="p-2 bg-navy-medium/80 border border-rose-gold/15 hover:border-rose-gold/30 hover:bg-navy-medium rounded-lg text-rose-gold hover:text-rose-gold-light cursor-pointer active:scale-95 transition-all focus:outline-none flex items-center justify-center min-h-[32px] min-w-[32px]"
                  title="Copiar CBU"
                >
                  {copiedCbu ? <Check className="w-4 h-4 text-sea-glow animate-[scaleIn_0.2s_ease-out]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Mensaje de lluvia de sobres */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-3 bg-navy-dark/60 border border-rose-gold/15 px-5 py-3.5 rounded-full text-xs text-slate-300 max-w-sm text-center shadow-md"
        >
          <Info className="w-4 h-4 text-rose-gold shrink-0" />
          <span className="font-light">También habrá urna para lluvia de sobres en el salón.</span>
        </motion.div>
      </div>

      {/* Pie de página final */}
      <footer className="text-center py-8 border-t border-white/5 mt-12 z-10 select-none">
        <p className="font-cinzel text-xs md:text-sm text-rose-gold tracking-[0.25em] uppercase font-bold">
          ¡Te espero para celebrar juntos!
        </p>
        <p className="text-[9px] text-slate-600 tracking-widest uppercase mt-3">
          Marina • 2026
        </p>
      </footer>
    </section>
  );
}
