import React from "react";
import { motion } from "framer-motion";

interface WaveDividerProps {
  className?: string;
  fillColor?: string;
  flip?: boolean;
  animated?: boolean;
  height?: string;
}

export default function WaveDivider({
  className = "",
  fillColor = "text-navy-medium",
  flip = false,
  animated = false,
  height = "h-[60px] md:h-[90px]",
}: WaveDividerProps) {
  const WaveLayer = ({
    d,
    opacity,
    className,
  }: {
    d: string;
    opacity: number;
    className?: string;
  }) => (
    <path d={d} className={className} opacity={opacity} />
  );

  const AnimatedWave = () => (
    <motion.div
      className="relative w-full"
      animate={{
        y: [0, 6, 0, -6, 0],
        rotate: [0, 0.5, 0, -0.5, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className={`relative block w-full ${height} ${fillColor}`}
      >
        {/* Capa trasera - sombra suave */}
        <WaveLayer
          d="M0,80 C150,120 300,60 450,100 C600,140 750,80 900,110 C1050,140 1150,100 1200,120 L1200,200 L0,200 Z"
          opacity={0.15}
          className="fill-current"
        />

        {/* Capa media - agua principal */}
        <WaveLayer
          d="M0,60 C100,100 200,40 350,80 C500,120 650,50 800,90 C950,130 1100,70 1200,100 L1200,200 L0,200 Z"
          opacity={0.35}
          className="fill-current"
        />

        {/* Capa media-alta */}
        <WaveLayer
          d="M0,40 C80,80 180,30 300,60 C420,90 580,40 700,70 C820,100 950,50 1100,80 L1200,60 L1200,200 L0,200 Z"
          opacity={0.5}
          className="fill-current"
        />

        {/* Capa frontal - cresta de espuma */}
        <WaveLayer
          d="M0,20 C60,55 140,15 250,45 C360,75 480,25 600,55 C720,85 850,35 1000,65 C1100,85 1150,50 1200,70 L1200,200 L0,200 Z"
          opacity={0.75}
          className="fill-current"
        />

        {/* Línea de espuma brillante en la cresta */}
        <motion.path
          d="M0,20 C60,55 140,15 250,45 C360,75 480,25 600,55 C720,85 850,35 1000,65 C1100,85 1150,50 1200,70"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            strokeWidth: [2, 3, 2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );

  const StaticWave = () => (
    <svg
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      className={`relative block w-full ${height} ${fillColor}`}
    >
      {/* Capa trasera - sombra suave */}
      <WaveLayer
        d="M0,80 C150,120 300,60 450,100 C600,140 750,80 900,110 C1050,140 1150,100 1200,120 L1200,200 L0,200 Z"
        opacity={0.15}
        className="fill-current"
      />

      {/* Capa media */}
      <WaveLayer
        d="M0,60 C100,100 200,40 350,80 C500,120 650,50 800,90 C950,130 1100,70 1200,100 L1200,200 L0,200 Z"
        opacity={0.35}
        className="fill-current"
      />

      {/* Capa media-alta */}
      <WaveLayer
        d="M0,40 C80,80 180,30 300,60 C420,90 580,40 700,70 C820,100 950,50 1100,80 L1200,60 L1200,200 L0,200 Z"
        opacity={0.5}
        className="fill-current"
      />

      {/* Capa frontal */}
      <WaveLayer
        d="M0,20 C60,55 140,15 250,45 C360,75 480,25 600,55 C720,85 850,35 1000,65 C1100,85 1150,50 1200,70 L1200,200 L0,200 Z"
        opacity={0.75}
        className="fill-current"
      />

      {/* Línea de espuma estática */}
      <path
        d="M0,20 C60,55 140,15 250,45 C360,75 480,25 600,55 C720,85 850,35 1000,65 C1100,85 1150,50 1200,70"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? "transform rotate-180" : ""} ${className}`}
    >
      {animated ? <AnimatedWave /> : <StaticWave />}
    </div>
  );
}