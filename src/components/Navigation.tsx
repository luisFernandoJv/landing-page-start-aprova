import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { trackEvent } from "../App";

const navItems = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Método" },
  { id: "conteudo", label: "Conteúdo" },
  { id: "depoimentos", label: "Resultados" },
  { id: "contato", label: "Contato" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const pos = window.scrollY + 120;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= pos) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
      trackEvent("navigation_click", { section: id });
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "hsla(220,18%,6%,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid hsla(220,10%,16%,1)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("inicio");
            }}
            className="flex items-center"
            aria-label="Start Aprovação - Início"
          >
            <img
              src="/image/logo.png"
              alt="Start Aprovação"
              className="h-9 object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                  style={{
                    color: active ? "hsl(36,100%,54%)" : "hsl(220,10%,58%)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "hsla(36,100%,54%,0.1)" }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <a
            href="https://forms.gle/e5GGQZqxGN2hMDnA6"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("cta_click", { location: "navigation" })}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all"
            style={{
              background:
                "linear-gradient(135deg, hsl(36,100%,54%) 0%, hsl(28,100%,42%) 100%)",
              color: "#0a0a0a",
              fontFamily: "var(--font-display)",
            }}
          >
            Garantir Vaga
            <ArrowRight size={14} />
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              border: "1px solid hsl(220,10%,16%)",
              color: "hsl(220,15%,96%)",
            }}
            aria-label="Menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 md:hidden flex flex-col"
              style={{
                background: "hsl(220,18%,6%)",
                borderLeft: "1px solid hsl(220,10%,16%)",
              }}
            >
              <div
                className="flex items-center justify-between p-5 border-b"
                style={{ borderColor: "hsl(220,10%,16%)" }}
              >
                <img
                  src="/image/logo.png"
                  alt="Start Aprovação"
                  className="h-8 object-contain"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  style={{ color: "hsl(220,10%,58%)" }}
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 p-5 space-y-1">
                {navItems.map((item, i) => {
                  const active = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => scrollTo(item.id)}
                      className="flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium text-left transition-all"
                      style={{
                        color: active ? "hsl(36,100%,54%)" : "hsl(220,10%,58%)",
                        background: active
                          ? "hsla(36,100%,54%,0.08)"
                          : "transparent",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </nav>

              <div className="p-5">
                <a
                  href="https://forms.gle/e5GGQZqxGN2hMDnA6"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("cta_click", { location: "mobile_menu" })
                  }
                  className="btn-primary w-full text-center"
                >
                  Garantir Minha Vaga
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
