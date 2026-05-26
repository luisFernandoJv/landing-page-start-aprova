import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { trackEvent } from "../App";

const navItems = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "O Método" },
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
      {/* Header Fixo */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("inicio");
            }}
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg"
          >
            <img
              src="/image/logo.png"
              alt="Start Aprovação"
              className="h-8 md:h-9 object-contain transition-transform duration-300 group-hover:scale-105"
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
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 ${
                    active
                      ? "text-amber-500"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-amber-500/10 pointer-events-none"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                  {item.label}
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
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-95"
          >
            Garantir Vaga
            <ArrowRight size={16} />
          </a>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-zinc-900/50 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] z-50 md:hidden flex flex-col bg-[#0A0A0A] border-l border-white/10"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  Menu
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 px-6 py-8 space-y-2">
                {navItems.map((item, i) => {
                  const active = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.07 }}
                      onClick={() => scrollTo(item.id)}
                      className={`flex items-center w-full px-4 py-4 rounded-xl text-lg font-medium transition-all ${
                        active
                          ? "text-amber-500 bg-amber-500/5"
                          : "text-zinc-300 hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </nav>

              <div className="p-6 border-t border-white/5">
                <a
                  href="https://forms.gle/e5GGQZqxGN2hMDnA6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl bg-white text-black font-bold text-base transition-transform hover:scale-[0.98] active:scale-95"
                >
                  Garantir Minha Vaga
                  <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
