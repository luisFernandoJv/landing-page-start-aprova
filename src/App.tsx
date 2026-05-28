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

// ── Analytics helper (Corrigido para evitar erro de TS6133) ────────────────
export function trackEvent(_name: string, _props?: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", _name, _props);
    }
    if (import.meta.env.DEV) {
      console.log(`[track] ${_name}`, _props);
    }
  } catch {
    // silently fail
  }
}

// ── App ───────────────────────────────────────────────────
export default function App() {
  return (
    // 'overflow-x-hidden' e 'w-full' resolvem o problema da linha fixa à esquerda
    <div className="min-h-screen relative overflow-x-hidden w-full bg-zinc-950">
      {/* Ambient background effects */}
      <BackgroundEffects />

      {/* Sticky navigation */}
      <Navigation />

      {/* ── Main content ── */}
      <main className="relative z-10 w-full">
        <HeroSection />
        <Benefits />
        <AboutSection />
        <CurriculumSection />

        {/* Radar de Editais */}
        <EditalRadar />

        <PriceCard />
        <Testimonials />
        <InstagramHighlight />
        <WhatsAppGroups />
        <CtaFinal />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA */}
      <FloatingCta />
    </div>
  );
}
