import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { Benefits } from "./components/Benefits";
import { AboutSection } from "./components/AboutSection";
import { CurriculumSection } from "./components/CurriculumSection";
import { Testimonials } from "./components/Testimonials";
import { InstagramHighlight } from "./components/InstagramHighlight";
import { EditalRadar } from "./components/EditalRadar";
import { PriceCard } from "./components/PriceCard";
import { WhatsAppGroups } from "./components/WhatsAppGroups";
import { CtaFinal } from "./components/CtaFinal";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { FloatingCta } from "./components/FloatingCta";
import { BackgroundEffects } from "./components/BackgroundEffects";

export function trackEvent(name: string, props?: Record<string, unknown>) {
  // ... (mantenha seu código existente)
}

export default function App() {
  return (
    // Adicionado overflow-hidden e flex col para estruturação base firme
    <div
      style={{ minHeight: "100vh", position: "relative" }}
      className="overflow-x-hidden flex flex-col w-full"
    >
      <BackgroundEffects />
      <Navigation />

      {/* Adicionado overflow-x-hidden e w-full para evitar a "linha fixa" invisível */}
      <main
        style={{ position: "relative", zIndex: 1 }}
        className="flex-grow w-full overflow-x-hidden"
      >
        <HeroSection />
        <Benefits />
        <AboutSection />
        <CurriculumSection />
        <EditalRadar />
        <PriceCard />
        <Testimonials />
        <InstagramHighlight />
        <WhatsAppGroups />
        <CtaFinal />
        <ContactSection />
      </main>

      <Footer />
      <FloatingCta />
    </div>
  );
}
