import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Home,
  Target,
  BookOpen,
  Star,
  Phone,
} from "lucide-react";
import { trackEvent } from "../App";

const navItems = [
  { id: "inicio", label: "Início", icon: Home },
  { id: "sobre", label: "O Método", icon: Target },
  { id: "conteudo", label: "Conteúdo", icon: BookOpen },
  { id: "depoimentos", label: "Resultados", icon: Star },
  { id: "contato", label: "Contato", icon: Phone },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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

  const containerVariants = {
    closed: {
      x: "100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <>
      {/* Header Fixo Desktop/Mobile */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-zinc-950/85 backdrop-blur-lg border-b border-zinc-800/80 shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 flex items-center justify-between">
          {/* Logo - Ocupa flex-1 para empurrar o menu pro centro exato */}
          <div className="flex-1 flex justify-start">
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
                className="h-8 md:h-10 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Desktop Nav - Centralizado */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 ${
                    active ? "text-amber-400" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill-desktop"
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

          {/* Desktop CTA - Ocupa flex-1 para empurrar o menu pro centro */}
          <div className="hidden md:flex flex-1 justify-end">
            <a
              href="https://forms.gle/e5GGQZqxGN2hMDnA6"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_click", { location: "navigation" })
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 active:scale-95"
            >
              Garantir Vaga
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Menu Toggle (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 rounded-xl flex items-center justify-center bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label={isOpen ? "Fechar Menu" : "Abrir Menu"}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay e Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[340px] z-50 md:hidden flex flex-col bg-zinc-950 border-l border-white/5 shadow-[-20px_0_40px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                  Menu de Navegação
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 text-zinc-400 hover:text-white bg-zinc-900/50 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 overflow-y-auto">
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const active = activeSection === item.id;
                    const Icon = item.icon;
                    return (
                      <motion.li key={item.id} variants={itemVariants}>
                        <button
                          onClick={() => scrollTo(item.id)}
                          className={`group relative flex items-center justify-between w-full p-4 rounded-2xl text-base font-semibold transition-all duration-300 ${
                            active
                              ? "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                              : "text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <Icon
                              size={20}
                              className={
                                active
                                  ? "text-amber-500"
                                  : "text-zinc-500 group-hover:text-zinc-400 transition-colors"
                              }
                            />
                            {item.label}
                          </div>

                          <ChevronRight
                            size={16}
                            className={`transition-all duration-300 ${active ? "text-amber-500 opacity-100" : "text-zinc-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}
                          />
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <motion.div
                variants={itemVariants}
                className="p-6 pb-8 border-t border-white/5 bg-gradient-to-b from-transparent to-black/50"
              >
                <a
                  href="https://forms.gle/e5GGQZqxGN2hMDnA6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950 font-extrabold text-base transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] active:scale-[0.98] overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 font-display tracking-wide">
                    Garantir Minha Vaga
                  </span>
                  <ArrowRight
                    size={18}
                    className="relative z-10 group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
