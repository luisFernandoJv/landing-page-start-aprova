import { Navigation } from "./components/Navigation";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { WhatsAppGroups } from "./components/WhatsAppGroups";
import { PriceCard } from "./components/PriceCard";
import { Benefits } from "./components/Benefits";
import { CurriculumSection } from "./components/CurriculumSection";
import { Testimonials } from "./components/Testimonials";
import { ContactSection } from "./components/ContactSection";
import { CtaFinal } from "./components/CtaFinal";
import { Footer } from "./components/Footer";
import { FloatingCta } from "./components/FloatingCta";
import { BackgroundEffects } from "./components/BackgroundEffects";

export const trackEvent = (
  eventName: string,
  eventData?: Record<string, unknown>,
) => {
  // Ready for analytics integration (GA4, Mixpanel, etc.)
  if (typeof window !== "undefined") {
    if (import.meta.env.DEV) {
      console.log("[Analytics]", eventName, eventData);
    }
  }
};

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10 px-4 pt-24 pb-28 md:pt-28 md:pb-36 lg:pt-32 lg:pb-40">
        {/* Hero & Header - Full width on larger screens */}
        <div className="max-w-7xl mx-auto">
          {/* Section: Início */}
          <section id="inicio" className="scroll-mt-24">
            <Header />

            {/* Desktop: Two column layout for hero area */}
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12 lg:items-start">
              {/* Left Column: Hero + WhatsApp */}
              <div>
                <HeroSection />
                <div className="lg:hidden">
                  <WhatsAppGroups />
                </div>
              </div>

              {/* Right Column: Price + WhatsApp (desktop) + Benefits */}
              <div>
                <PriceCard />
                <div className="hidden lg:block">
                  <WhatsAppGroups />
                </div>
              </div>
            </div>

            {/* Benefits - Full width with better grid on desktop */}
            <div className="mt-6 lg:mt-10">
              <Benefits />
            </div>
          </section>

          {/* Two column layout for about and curriculum on desktop */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12 lg:items-start mt-8 lg:mt-12">
            {/* Section: Sobre */}
            <AboutSection />

            {/* Section: Conteúdo */}
            <CurriculumSection />
          </div>

          {/* Testimonials and Contact - Two columns on desktop */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12 lg:items-start mt-8 lg:mt-12">
            {/* Section: Depoimentos */}
            <section id="depoimentos" className="scroll-mt-24">
              <Testimonials />
            </section>

            {/* Section: Contato */}
            <ContactSection />
          </div>

          {/* Final CTA - Centered, max width for readability */}
          <div className="max-w-2xl mx-auto mt-8 lg:mt-12">
            <CtaFinal />
          </div>

          {/* Footer - Full width */}
          <Footer />
        </div>
      </main>

      {/* Floating CTA */}
      <FloatingCta />
    </div>
  );
}

export default App;
