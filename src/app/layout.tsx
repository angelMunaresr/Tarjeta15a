import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat, Alex_Brush, Pinyon_Script } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
});

const alexBrush = Alex_Brush({
  variable: "--font-alex",
  subsets: ["latin"],
  weight: ["400"],
});

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Mis 15 Años | Marina",
  description: "Te invito a celebrar conmigo esta noche mágica e inolvidable. Confirma tu asistencia aquí.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${montserrat.variable} ${alexBrush.variable} ${pinyonScript.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-navy-dark text-slate-100 flex flex-col overflow-x-hidden">
        {children}
        <div className="noise-overlay" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
      </body>
    </html>
  );
}
