import React from "react";
import { motion } from "framer-motion";

interface WaveDividerProps {
  className?: string;
  fillColor?: string;
  flip?: boolean;
  animated?: boolean;
}

export default function WaveDivider({
  className = "",
  fillColor = "text-navy-medium",
  flip = false,
  animated = false,
}: WaveDividerProps) {
  const WaveContent = () => (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className={`relative block w-full h-[60px] md:h-[90px] ${fillColor}`}
    >
      <path
        d="M0,30 C150,90 350,10 500,50 C650,90 900,20 1200,60 L1200,120 L0,120 Z"
        className="fill-current"
      />
    </svg>
  );

  if (animated) {
    return (
      <div
        className={`w-full overflow-hidden leading-[0] ${flip ? "transform rotate-180" : ""} ${className}`}
      >
        <motion.div
          animate={{
            y: [0, 8, 0, -8, 0],
            scale: [1, 1.02, 1, 1.02, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative block w-full"
        >
          <WaveContent />
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? "transform rotate-180" : ""} ${className}`}
    >
      <WaveContent />
    </div>
  );
}
