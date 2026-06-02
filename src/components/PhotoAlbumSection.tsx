"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, Sparkles } from "lucide-react";

interface AlbumPhoto {
  id: number;
  numeral: string;
  title: string;
  caption: string;
  src: string;
}

const ALBUM_PHOTOS: AlbumPhoto[] = [
  {
    id: 1,
    numeral: "I",
    title: "El Comienzo del Sueño",
    caption: "Cuando todo empezó a tomar forma...",
    src: "/img/album/placeholder-1.svg",
  },
  {
    id: 2,
    numeral: "II",
    title: "Cercanía de Familia",
    caption: "Los que siempre están a mi lado.",
    src: "/img/album/placeholder-2.svg",
  },
  {
    id: 3,
    numeral: "III",
    title: "Brillo del Mar",
    caption: "La costa que vio crecer mis ganas de celebrar.",
    src: "/img/album/placeholder-3.svg",
  },
  {
    id: 4,
    numeral: "IV",
    title: "Mis Personas Favoritas",
    caption: "Amigas que se vuelven recuerdos eternos.",
    src: "/img/album/placeholder-4.svg",
  },
  {
    id: 5,
    numeral: "V",
    title: "La Cuenta Final",
    caption: "A un paso de la noche más mágica.",
    src: "/img/album/placeholder-5.svg",
  },
];

export default function PhotoAlbumSection() {
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackContainerRef,
    offset: ["start start", "end end"],
  });

  // Progreso de "apilamiento": al hacer scroll, las cards se agrupan
  const stackProgress = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  return (
    <section className="relative w-full bg-navy-abyss overflow-hidden">
      {/* Número de sección */}
      <div className="absolute top-4 left-4 z-50 bg-rose-gold/20 border border-rose-gold/40 rounded-full w-8 h-8 flex items-center justify-center">
        <span className="font-cinzel text-xs text-rose-gold font-bold">5</span>
      </div>

      {/* Luces radiales del fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-rose-gold/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-sea-glow/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Header de la sección - normal, no sticky */}
      <div className="relative z-10 px-6 pt-20 pb-12 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex p-3 rounded-full bg-rose-gold/10 border border-rose-gold/25 text-rose-gold mb-4 shadow-[0_0_15px_rgba(212,163,115,0.15)]">
            <Camera className="w-4 h-4" />
          </div>
          <span className="block text-[10px] md:text-xs uppercase tracking-[0.3em] text-rose-gold font-semibold mb-2">
            Álbum de Recuerdos
          </span>
          <h2 className="font-cinzel text-3xl md:text-4xl text-slate-100 font-bold tracking-wide">
            Fragmentos del Camino
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-rose-gold to-transparent my-4 mx-auto" />
          <p className="font-montserrat text-xs md:text-sm text-slate-400 font-light leading-relaxed mt-2 px-2 max-w-md mx-auto">
            Cinco instantes que me trajeron hasta acá. Deslizá para descubrirlos uno a uno, como las hojas de un diario íntimo.
          </p>
        </motion.div>
      </div>

      {/* Contenedor de scroll-stacking */}
      <div
        ref={stackContainerRef}
        className="relative w-full"
        style={{ height: `${ALBUM_PHOTOS.length * 90}vh` }}
      >
        {/* Indicador de progreso de scroll (lateral) */}
        <motion.div
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 pointer-events-none"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0]) }}
        >
          {ALBUM_PHOTOS.map((photo, i) => (
            <ScrollDot key={photo.id} index={i} total={ALBUM_PHOTOS.length} progress={stackProgress} />
          ))}
        </motion.div>

        {ALBUM_PHOTOS.map((photo, index) => (
          <StackingPhoto
            key={photo.id}
            photo={photo}
            index={index}
          />
        ))}
      </div>

      {/* Footer / Cierre del álbum */}
      <div className="relative z-10 px-6 py-20 text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 mb-4 text-rose-gold">
            <Sparkles className="w-4 h-4" />
            <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] font-bold">
              Próximo Capítulo
            </span>
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="font-pinyon text-4xl md:text-5xl text-rose-gold-light mb-3" style={{ textShadow: "0 0 30px rgba(243,229,216,0.3)" }}>
            Tu presencia
          </p>
          <p className="font-montserrat text-xs text-slate-400 font-light leading-relaxed">
            será el recuerdo más hermoso de esta historia.
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-gold to-transparent mx-auto my-6" />
          <p className="font-cinzel text-[10px] text-rose-gold tracking-[0.25em] uppercase font-bold">
            Marina • 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ScrollDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: ReturnType<typeof useTransform<number, number>>;
}) {
  const isActive = useTransform(
    progress,
    [(index - 0.5) / total, index / total, (index + 0.5) / total],
    [0.3, 1, 0.3]
  );

  return (
    <motion.div
      className="w-1.5 h-1.5 rounded-full bg-rose-gold/50"
      style={{ scale: useTransform(isActive, [0.3, 1], [1, 1.6]), opacity: isActive }}
    />
  );
}

function StackingPhoto({
  photo,
  index,
}: {
  photo: AlbumPhoto;
  index: number;
}) {
  return (
    <div
      className="sticky w-full h-screen flex items-center justify-center px-4"
      style={{
        top: 0,
        zIndex: 10 + index,
      }}
    >
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.96 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-30%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
        style={{
          // Cada card se posiciona con un pequeño offset vertical al agruparse
          marginTop: `${index * 14}px`,
        }}
      >
        {/* Polaroid Card */}
        <div
          className="relative bg-gradient-to-br from-rose-gold-light/10 via-rose-gold/5 to-rose-gold-dark/10 p-2 md:p-2.5 rounded-md shadow-2xl"
          style={{
            // Pequeña rotación para efecto de polaroid
            transform: `rotate(${(index % 2 === 0 ? -1 : 1) * (1 + index * 0.4)}deg)`,
            maxWidth: "min(360px, 88vw)",
          }}
        >
          {/* Marco interno (la "foto") */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-navy-dark">
            {/* Imagen */}
            {/* eslint-disable-next-line @next/next/no-img-element -- placeholder SVG; reemplazar por <Image /> de next/image al subir fotos reales en /public/img/album/ */}
            <img
              src={photo.src}
              alt={photo.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={600}
              height={800}
            />

            {/* Número romano superpuesto en la foto */}
            <div className="absolute top-3 left-3 z-10">
              <span
                className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-rose-gold-light/80 bg-navy-dark/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-rose-gold/20"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
              >
                Recuerdo {photo.numeral}
              </span>
            </div>

            {/* Viñeta cinematográfica sobre la foto */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 50%, rgba(2,6,20,0.55) 100%)",
              }}
            />

            {/* Brillo dorado sutil */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
          </div>

          {/* Pie de polaroid con título */}
          <div className="px-1 pt-3 pb-1.5 text-center">
            <h3 className="font-pinyon text-xl md:text-2xl text-rose-gold-light leading-none mb-1" style={{ textShadow: "0 0 18px rgba(243,229,216,0.25)" }}>
              {photo.title}
            </h3>
            <p className="font-montserrat text-[10px] text-slate-400 font-light leading-tight px-1">
              {photo.caption}
            </p>
          </div>

          {/* Cinta adhesiva decorativa (tape) */}
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-gradient-to-b from-rose-gold-light/15 to-rose-gold/10 border border-rose-gold/20 rounded-sm backdrop-blur-sm"
            style={{ transform: `translateX(-50%) rotate(${(index % 2 === 0 ? -1 : 1) * 2}deg)` }}
          />
        </div>

        {/* Sombra inferior suave */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-3/4 h-6 bg-rose-gold/20 blur-2xl rounded-full"
          style={{ opacity: 1 - index * 0.15 }}
        />
      </motion.div>
    </div>
  );
}
