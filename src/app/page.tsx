import BubbleBackground from "@/components/BubbleBackground";
import HeroSection from "@/components/HeroSection";
import TransitionSection from "@/components/TransitionSection";
import DetailsSection from "@/components/DetailsSection";
import RsvpSection from "@/components/RsvpSection";
import InfoSection from "@/components/InfoSection";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Fondo de burbujas flotantes interactivas en canvas */}
      <BubbleBackground />

      {/* Reproductor de música de fondo flotante */}
      <MusicPlayer />

      {/* Secciones del Scroll */}
      <HeroSection />
      
      <TransitionSection />
      
      <DetailsSection />
      
      <RsvpSection />
      
      <InfoSection />
    </main>
  );
}
