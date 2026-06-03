"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── Card data ──────────────────────────────────────────────── */

interface StackingCardData {
  id: number;
  numeral: string;
  title: string;
  caption: string;
  bgGradient: string;
  numeralColor: string;
  accentGlow: string;
}

const CARDS: StackingCardData[] = [
  {
    id: 1,
    numeral: "I",
    title: "El Comienzo",
    caption: "Mis primeros sueños.",
    bgGradient:
      "linear-gradient(135deg, #00e5ff 0%, #00b0d4 40%, #007c91 100%)",
    numeralColor: "rgba(0, 30, 50, 0.18)",
    accentGlow: "rgba(0, 229, 255, 0.15)",
  },
  {
    id: 2,
    numeral: "II",
    title: "Familia",
    caption: "Mi mayor tesoro.",
    bgGradient:
      "linear-gradient(135deg, #0ea5e9 0%, #0284c7 40%, #0369a1 100%)",
    numeralColor: "rgba(0, 20, 60, 0.18)",
    accentGlow: "rgba(14, 165, 233, 0.15)",
  },
  {
    id: 3,
    numeral: "III",
    title: "Amistad",
    caption: "Las que siempre están.",
    bgGradient:
      "linear-gradient(135deg, #D4A373 0%, #c4956a 40%, #A6734E 100%)",
    numeralColor: "rgba(50, 20, 0, 0.18)",
    accentGlow: "rgba(212, 163, 115, 0.15)",
  },
  {
    id: 4,
    numeral: "IV",
    title: "Mar",
    caption: "La costa que me inspira.",
    bgGradient:
      "linear-gradient(135deg, #C9A961 0%, #b89a55 40%, #a08840 100%)",
    numeralColor: "rgba(40, 30, 0, 0.2)",
    accentGlow: "rgba(201, 169, 97, 0.15)",
  },
  {
    id: 5,
    numeral: "V",
    title: "La Gran Noche",
    caption: "Casi estamos…",
    bgGradient:
      "linear-gradient(135deg, #E8E8F0 0%, #d0d0e0 40%, #b8b8c8 100%)",
    numeralColor: "rgba(20, 20, 40, 0.15)",
    accentGlow: "rgba(232, 232, 240, 0.15)",
  },
];

/*
 * Offset (px) between each stacked card's sticky-top.
 * Kept small so they don't eat into the limited mobile viewport.
 */
const CARD_TOP_OFFSET = 12;

/* ─── Section root ───────────────────────────────────────────── */

export default function SectionFourStackingCards() {
  return (
    <section className="relative w-full bg-gradient-to-b from-navy-dark via-navy-abyss to-navy-dark">
      {/* Badge de sección "4" */}
      <div className="absolute top-4 left-4 z-50 bg-rose-gold/20 border border-rose-gold/40 rounded-full w-8 h-8 flex items-center justify-center">
        <span className="font-cinzel text-xs text-rose-gold font-bold">4</span>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 pt-20 pb-4 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="font-cinzel text-3xl md:text-5xl font-bold tracking-wide silver-shimmer-text"
            style={{
              textShadow:
                "0 0 12px rgba(232,232,240,0.5), 0 0 24px rgba(232,232,240,0.3), 0 0 40px rgba(255,255,255,0.15)",
            }}
          >
            Mis Recuerdos
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-silver-bright/60 to-transparent my-4 mx-auto" />
          <p className="font-montserrat text-xs md:text-sm text-slate-400 font-light leading-relaxed mt-2 px-2 max-w-md mx-auto">
            Cinco instantes guardados con el corazón. Deslizá para descubrirlos
            uno a uno, como olas que llegan a la orilla.
          </p>
        </motion.div>
      </div>

      {/* ── Stacking cards ─────────────────────────────────────────
          Each card wrapper provides scroll-height.
          The card itself is position:sticky with increasing top,
          so cards pile up as the user scrolls.
      ─────────────────────────────────────────────────────────── */}
      <div className="stacking-cards-container relative w-full">
        {CARDS.map((card, index) => (
          <StackingCardWrapper
            key={card.id}
            card={card}
            index={index}
            total={CARDS.length}
          />
        ))}
      </div>

      {/* Footer / Cierre */}
      <div className="relative z-10 px-6 py-16 md:py-20 text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="font-pinyon text-4xl md:text-5xl silver-shimmer-text mb-3"
            style={{
              textShadow:
                "0 0 30px rgba(232,232,240,0.3), 0 0 60px rgba(212,163,115,0.15)",
            }}
          >
            Tu presencia
          </p>
          <p className="font-montserrat text-xs text-slate-400 font-light leading-relaxed">
            será el recuerdo más hermoso de esta historia.
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-silver-bright/60 to-transparent mx-auto my-6" />
          <p className="font-cinzel text-[10px] text-rose-gold tracking-[0.25em] uppercase font-bold">
            Marina • 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Per-card wrapper ─────────────────────────────────────────── */

function StackingCardWrapper({
  card,
  index,
  total,
}: {
  card: StackingCardData;
  index: number;
  total: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  /*
   * scrollYProgress goes 0 → 1 as the wrapper scrolls from
   * "its top hits the viewport top" to "its bottom hits the viewport top".
   * This drives the scale-down + dim of the current card while the
   * next card slides over it.
   */
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  /* Scale: 1 → 0.93 as the next card covers this one */
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);

  /* Opacity dims so buried cards look further away (GPU-compositable) */
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);

  const stickyTop = index * CARD_TOP_OFFSET;
  const isLast = index === total - 1;

  return (
    <div
      ref={wrapperRef}
      className="stacking-card-wrapper relative w-full"
      style={{
        /*
         * Use dynamic viewport height (dvh) so mobile browsers with
         * collapsible URL bars are handled properly.
         * The last card doesn't need extra scroll runway.
         */
        height: isLast ? "auto" : "100dvh",
      }}
    >
      <motion.div
        className="sticky w-full flex flex-col items-center"
        style={{
          top: stickyTop,
          zIndex: 10 + index,
          scale,
          opacity,
          transformOrigin: "center top",
        }}
      >
        {/*
         * Card + text are wrapped in a single flex column that is
         * sized to fit inside the real visible viewport minus the
         * accumulated sticky offset of stacked cards below it.
         *
         * On mobile: card uses aspect-ratio via max-height so it
         * never overflows the screen. Title/caption overlay the
         * card bottom to save vertical space.
         */}
        <div className="stacking-card-content w-full flex flex-col items-center justify-center px-4 py-3">
          {/* ── The card rectangle ── */}
          <div
            className="stacking-card-visual relative rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center"
            style={{
              background: card.bgGradient,
              boxShadow: `0 8px 40px ${card.accentGlow}, 0 2px 20px rgba(0,0,0,0.4)`,
            }}
          >
            {/* Large numeral watermark */}
            <span
              className="stacking-card-numeral font-cinzel font-bold leading-none select-none"
              style={{ color: card.numeralColor }}
              aria-hidden="true"
            >
              {card.numeral}
            </span>

            {/* Subtle inner light reflection */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 60%)",
              }}
            />

            {/* ── Title + caption: overlaid at the card bottom ── */}
            <div className="absolute bottom-0 inset-x-0 px-4 pb-4 pt-12 text-center bg-gradient-to-t from-black/40 via-black/15 to-transparent">
              <h3
                className="font-pinyon text-2xl md:text-3xl text-white leading-none mb-1 drop-shadow-lg"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
              >
                {card.title}
              </h3>
              <p
                className="font-montserrat text-[11px] md:text-xs text-white/80 font-light leading-tight"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
              >
                {card.caption}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}