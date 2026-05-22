import React from "react";

interface WaveDividerProps {
  className?: string;
  fillColor?: string; // Por ejemplo "text-navy-medium" o "text-navy-dark"
  flip?: boolean;
}

export default function WaveDivider({
  className = "",
  fillColor = "text-navy-medium",
  flip = false,
}: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${
        flip ? "transform rotate-180" : ""
      } ${className}`}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={`relative block w-full h-[60px] md:h-[90px] ${fillColor}`}
      >
        {/* Onda trasera semi-translúcida para dar sensación de profundidad */}
        <path
          d="M0,0 C300,40 600,0 900,40 L1200,20 L1200,120 L0,120 Z"
          className="opacity-40 fill-current"
        ></path>
        {/* Onda delantera principal */}
        <path
          d="M0,30 C150,90 350,10 500,50 C650,90 900,20 1200,60 L1200,120 L0,120 Z"
          className="fill-current"
        ></path>
      </svg>
    </div>
  );
}
