"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface StackingCardData {
  id: number;
  numeral: string;
  title: string;
  caption: string;
  bgClass: string;
  numeralColorClass: string;
}

const CARDS: StackingCardData[] = [
  {
    id: 1,
    numeral: "I",
    title: "El Comienzo",
    caption: "Mis primeros sueños.",
    bgClass: "bg-sea-glow",
    numeralColorClass: "text-navy-dark/25",
  },
  {
    id: 2,
    numeral: "II",
    title: "Familia",
    caption: "Mi mayor tesoro.",
    bgClass: "bg-sea-soft",
    numeralColorClass: "text-navy-dark/25",
  },
  {
    id: 3,
    numeral: "III",
    title: "Amistad",
    caption: "Las que siempre están.",
    bgClass: "bg-rose-gold",
    numeralColorClass: "text-navy-dark/25",
  },
  {
    id: 4,
    numeral: "IV",
    title: "Mar",
    caption: "La costa que me inspira.",
    bgClass: "bg-sand-gold",
    numeralColorClass: "text-navy-dark/30",
  },
  {
    id: 5,
    numeral: "V",
    title: "La Gran Noche",
    caption: "Casi estamos…",
    bgClass: "bg-silver-bright",
    numeralColorClass: "text-navy-dark/25",
  },
];

export default function SectionFourStackingCards() {
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackContainerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      className="relative w-full bg-gradient-to-b from-navy-dark via-navy-abyss to-navy-dark"
    >
      {/* Badge de sección "4" */}
      <div className="absolute top-4 left-4 z-50 bg-rose-gold/20 border border-rose-gold/40 rounded-full w-8 h-8 flex items-center justify-center">
        <span className="font-cinzel text-xs text-rose-gold font-bold">4</span>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 pt-20 pb-12 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="font-cinzel text-3xl md:text-5xl font-bold tracking-wide silver-shimmer-text"
            style={{
              textShadow: "0 0 12px rgba(232,232,240,0.5), 0 0 24px rgba(232,232,240,0.3), 0 0 40px rgba(255,255,255,0.15)",
            }}
          >
            Mis Recuerdos
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-silver-bright/60 to-transparent my-4 mx-auto" />
          <p className="font-montserrat text-xs md:text-sm text-slate-400 font-light leading-relaxed mt-2 px-2 max-w-md mx-auto">
            Cinco instantes guardados con el corazón. Deslizá para descubrirlos uno a uno, como olas que llegan a la orilla.
          </p>
        </motion.div>
      </div>

      {/* Contenedor de scroll-stacking: alto = 5 viewports (uno por card) */}
      <div
        ref={stackContainerRef}
        className="relative w-full"
        style={{ height: `${CARDS.length * 100}vh` }}
      >
        {/* Sticky único que sostiene las 5 cards; cada card anima su y desde 100vh hasta 0
            a medida que se scrollea, apilandose por z-index creciente. */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {CARDS.map((card, index) => (
            <StackingCard
              key={card.id}
              card={card}
              index={index}
              total={CARDS.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      {/* Footer / Cierre */}
      <div className="relative z-10 px-6 py-20 text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="font-pinyon text-4xl md:text-5xl silver-shimmer-text mb-3"
            style={{ textShadow: "0 0 30px rgba(232,232,240,0.3), 0 0 60px rgba(212,163,115,0.15)" }}
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

function StackingCard({
  card,
  index,
  total,
  scrollYProgress,
}: {
  card: StackingCardData;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const isBaseCard = index === 0;
  const scrollRange: [number, number] = isBaseCard ? [0, 0.0001] : [start, end];
  const yRange: [string, string] = isBaseCard ? ["0px", "0px"] : ["100vh", "0px"];
  const opacityRange: [number, number] = isBaseCard ? [1, 1] : [0, 1];

  const y = useTransform(scrollYProgress, scrollRange, yRange);
  const opacity = useTransform(scrollYProgress, scrollRange, opacityRange);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="relative flex flex-col items-center"
        style={{
          y,
          opacity,
          zIndex: 10 + index,
        }}
      >
        {/* Card: rectángulo limpio de color sólido con numeral grande */}
        <div
          className={`relative aspect-[3/4] w-[min(360px,88vw)] rounded-xl shadow-2xl ${card.bgClass} flex items-center justify-center overflow-hidden`}
        >
          <span
            className={`font-cinzel font-bold leading-none select-none ${card.numeralColorClass} text-[180px] md:text-[220px]`}
            aria-hidden="true"
          >
            {card.numeral}
          </span>
        </div>

        {/* Título + caption debajo */}
        <div className="mt-5 text-center max-w-[min(360px,88vw)]">
          <h3
            className="font-pinyon text-2xl md:text-3xl text-rose-gold-light leading-none mb-1"
            style={{ textShadow: "0 0 18px rgba(243,229,216,0.25)" }}
          >
            {card.title}
          </h3>
          <p className="font-montserrat text-[11px] md:text-xs text-slate-400 font-light leading-tight px-1">
            {card.caption}
          </p>
        </div>
      </motion.div>
    </div>
  );
}