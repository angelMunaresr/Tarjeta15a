import BubbleBackground from "@/components/BubbleBackground";
import RippleEffect from "@/components/RippleEffect";
import HeroSection from "@/components/HeroSection";
import TransitionSection from "@/components/TransitionSection";
import DetailsSection from "@/components/DetailsSection";
import RsvpAndInfoSection from "@/components/RsvpAndInfoSection";
import PhotoAlbumSection from "@/components/PhotoAlbumSection";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Fondo de burbujas flotantes interactivas en canvas */}
      <BubbleBackground excludeSection1={true} />

      {/* Efecto de ondas de agua al tocar */}
      <RippleEffect />

      {/* Reproductor de música de fondo flotante */}
      <MusicPlayer />

      {/* Secciones del Scroll */}
      <HeroSection />

      <TransitionSection />

      <DetailsSection />

      <RsvpAndInfoSection />

      <PhotoAlbumSection />
    </main>
  );
}
