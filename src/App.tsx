import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { Benefits } from "./components/Benefits";
import { AboutSection } from "./components/AboutSection";
import { CurriculumSection } from "./components/CurriculumSection";
import { Testimonials } from "./components/Testimonials";
import { PriceCard } from "./components/PriceCard";
import { WhatsAppGroups } from "./components/WhatsAppGroups";
import { CtaFinal } from "./components/CtaFinal";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { FloatingCta } from "./components/FloatingCta";
import { BackgroundEffects } from "./components/BackgroundEffects";

// ── Analytics helper ──────────────────────────────────────
export function trackEvent(name: string, props?: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", name, props);
    }
    if (import.meta.env.DEV) {
      console.log(`[track] ${name}`, props);
    }
  } catch {
    // silently fail — never break the UI
  }
}

// ── App ───────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Ambient background effects — fixed, behind everything */}
      <BackgroundEffects />

      {/* Sticky navigation */}
      <Navigation />

      {/* ── Main content ── */}
      <main style={{ position: "relative", zIndex: 1 }}>
        {/* 1. Hero — headline + carrossel + CTA primário */}
        <HeroSection />

        {/* 2. Benefícios — o que o aluno ganha */}
        <Benefits />

        {/* 3. Sobre o Método — credibilidade + diferenciais */}
        <AboutSection />

        {/* 4. Grade Curricular — o que é ensinado */}
        <CurriculumSection />

        {/* 5. Preço — investimento + CTA de conversão */}
        <PriceCard />

        {/* 6. Depoimentos — prova social */}
        <Testimonials />

        {/* 7. WhatsApp Groups — comunidade */}
        <WhatsAppGroups />

        {/* 8. CTA Final — urgência + conversão */}
        <CtaFinal />

        {/* 9. Contato — canais de comunicação */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA — aparece após scroll */}
      <FloatingCta />
    </div>
  );
}
