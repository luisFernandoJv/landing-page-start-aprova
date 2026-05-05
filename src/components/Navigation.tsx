import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  BookOpen,
  FileText,
  MessageSquare,
  Phone,
  ArrowRight,
} from "lucide-react";
import { trackEvent } from "../App";

const navItems = [
  { id: "inicio", label: "Início", icon: Home },
  { id: "sobre", label: "Sobre", icon: BookOpen },
  { id: "conteudo", label: "Conteúdo", icon: FileText },
  { id: "depoimentos", label: "Depoimentos", icon: MessageSquare },
  { id: "contato", label: "Contato", icon: Phone },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      trackEvent("navigation_click", { section: sectionId });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-2 sm:py-2.5" : "py-3 sm:py-4"
        }`}
        style={{
          background: isScrolled
            ? "hsla(var(--color-background), 0.9)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: isScrolled
            ? "blur(20px) saturate(180%)"
            : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "none",
          boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("inicio");
            }}
            className="flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <img
              src="/image/logo.png"
              alt="Start Aprovação"
              className="h-9 sm:h-10 md:h-12 object-contain"
            />
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[hsl(var(--color-primary))]"
                      : "text-[hsl(var(--color-foreground-muted))] hover:text-white"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[hsla(var(--color-primary),0.12)] rounded-xl"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* CTA Button - Desktop */}
          <motion.a
            href="https://wa.me/5583996372727?text=Ola!%20Quero%20saber%20mais%20sobre%20o%20curso%20preparatorio%20Start%20Aprovacao!"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("cta_click", { location: "navigation" })}
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-primary-dark))] text-white font-bold py-2 lg:py-2.5 px-4 lg:px-5 rounded-xl text-sm shadow-lg"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span>Inscrever-se</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-xl glass flex items-center justify-center text-white"
            aria-label="Menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] z-50 md:hidden"
              style={{
                background: "hsla(var(--color-background), 0.97)",
                backdropFilter: "blur(25px)",
                WebkitBackdropFilter: "blur(25px)",
                borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="p-5 sm:p-6 h-full flex flex-col">
                {/* Close Button */}
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-xl glass flex items-center justify-center text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Logo */}
                <img
                  src="/image/logo.png"
                  alt="Start Aprovação"
                  className="h-10 sm:h-12 object-contain mb-8"
                />

                {/* Nav Items */}
                <div className="space-y-1.5 sm:space-y-2 flex-1">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.08,
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        onClick={() => scrollToSection(item.id)}
                        className={`flex items-center gap-3 w-full px-4 py-3 sm:py-3.5 rounded-xl text-left font-medium transition-all ${
                          isActive
                            ? "text-[hsl(var(--color-primary))] bg-[hsla(var(--color-primary),0.12)]"
                            : "text-[hsl(var(--color-foreground-muted))] hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        {item.label}
                        {isActive && (
                          <motion.div
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-[hsl(var(--color-primary))]"
                            layoutId="activeMobileNav"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  href="https://wa.me/5583996372727?text=Ola!%20Quero%20saber%20mais%20sobre%20o%20curso%20preparatorio%20Start%20Aprovacao!"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("cta_click", { location: "mobile_menu" })
                  }
                  className="flex items-center justify-center gap-2 w-full mt-4 bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-primary-dark))] text-white font-bold py-3.5 sm:py-4 px-5 rounded-xl text-sm shadow-lg"
                >
                  Inscrever-se agora
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
