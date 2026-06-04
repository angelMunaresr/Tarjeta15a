import BubbleBackground from "@/components/BubbleBackground";
import LoadingScreen from "@/components/LoadingScreen";
import RippleEffect from "@/components/RippleEffect";
import HeroSection from "@/components/HeroSection";
import DetailsSection from "@/components/DetailsSection";
import RsvpAndInfoSection from "@/components/RsvpAndInfoSection";
import SectionFourStackingCards from "@/components/SectionFourStackingCards";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <main className="relative min-h-screen w-full overflow-x-hidden">
        {/* Fondo de burbujas flotantes interactivas en canvas */}
        <BubbleBackground excludeSection1={true} />

        {/* Efecto de ondas de agua al tocar */}
        <RippleEffect />

        {/* Reproductor de música de fondo flotante */}
        <MusicPlayer />

        {/* Secciones del Scroll */}
        <HeroSection />

        <DetailsSection />

        <RsvpAndInfoSection />

        <SectionFourStackingCards />
      </main>
    </>
  );
}
