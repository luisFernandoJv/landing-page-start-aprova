import { useState, useEffect, useCallback } from "react";
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
  type LucideIcon,
} from "lucide-react";
import { trackEvent } from "../App";

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon; // ✅ tipo correto para ícones Lucide
}

// ─── Constants ───────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { id: "inicio", label: "Início", icon: Home },
  { id: "sobre", label: "O Método", icon: Target },
  { id: "conteudo", label: "Conteúdo", icon: BookOpen },
  { id: "depoimentos", label: "Resultados", icon: Star },
  { id: "contato", label: "Contato", icon: Phone },
];

const SCROLL_OFFSET = 80;
const ACTIVE_BUFFER = 120;

// ─── Animations ──────────────────────────────────────────────────────────────

const drawerVariants = {
  closed: {
    x: "100%",
    transition: { type: "spring", stiffness: 320, damping: 32 },
  },
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 32,
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
} as const;

const itemVariants = {
  closed: { x: 40, opacity: 0 },
  open: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 320, damping: 26 },
  },
} as const;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scrollToSection(id: string, close?: () => void) {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
      behavior: "smooth",
    });
    trackEvent("navigation_click", { section: id });
  }
  close?.();
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function MenuToggle({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-drawer"
      className="md:hidden relative w-10 h-10 rounded-xl flex items-center justify-center
                 bg-zinc-900/80 border border-zinc-800 text-zinc-300
                 hover:text-white hover:border-zinc-600
                 transition-colors duration-200
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="x"
            initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
            transition={{ duration: 0.18 }}
            className="absolute"
          >
            <X size={20} />
          </motion.span>
        ) : (
          <motion.span
            key="menu"
            initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
            transition={{ duration: 0.18 }}
            className="absolute"
          >
            <Menu size={20} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function DesktopNavItem({
  item,
  active,
  onPress,
}: {
  item: NavItem;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <button
      onClick={onPress}
      className={`relative px-4 py-2 text-sm font-semibold rounded-lg
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60
                  ${active ? "text-amber-400" : "text-zinc-400 hover:text-white"}`}
    >
      {active && (
        <motion.span
          layoutId="desktop-pill"
          className="absolute inset-0 rounded-lg bg-amber-500/10 pointer-events-none"
          transition={{ type: "spring", stiffness: 480, damping: 36 }}
        />
      )}
      <span className="relative z-10">{item.label}</span>
    </button>
  );
}

function DrawerNavItem({
  item,
  active,
  onPress,
}: {
  item: NavItem;
  active: boolean;
  onPress: () => void;
}) {
  const Icon = item.icon;
  return (
    <motion.li variants={itemVariants}>
      <button
        onClick={onPress}
        className={`group relative flex items-center justify-between w-full px-4 py-3.5
                    rounded-2xl text-[15px] font-semibold
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60
                    ${
                      active
                        ? "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                        : "text-zinc-300 hover:text-white hover:bg-zinc-900/80 border border-transparent"
                    }`}
      >
        <span className="flex items-center gap-3.5">
          <Icon
            size={18}
            className={
              active
                ? "text-amber-500"
                : "text-zinc-500 group-hover:text-zinc-400 transition-colors"
            }
          />
          {item.label}
        </span>

        <ChevronRight
          size={15}
          className={`transition-all duration-200
            ${
              active
                ? "text-amber-500 opacity-100"
                : "text-zinc-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
            }`}
        />
      </button>
    </motion.li>
  );
}

function CTAButton({
  className = "",
  label = "Garantir Vaga",
  showIcon = true,
  size = "sm",
}: {
  className?: string;
  label?: string;
  showIcon?: boolean;
  size?: "sm" | "lg";
}) {
  const padding = size === "lg" ? "px-6 py-4 text-base" : "px-5 py-2.5 text-sm";

  return (
    <a
      href="https://forms.gle/e5GGQZqxGN2hMDnA6"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("cta_click", { location: "navigation" })}
      className={`relative group inline-flex items-center justify-center gap-2
                  font-extrabold rounded-xl overflow-hidden
                  bg-gradient-to-b from-amber-400 to-amber-600 text-zinc-950
                  shadow-[0_0_16px_rgba(245,158,11,0.15)]
                  hover:shadow-[0_0_24px_rgba(245,158,11,0.3)]
                  hover:-translate-y-0.5 active:scale-[0.97]
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                  ${padding} ${className}`}
    >
      <span
        className="absolute inset-0 bg-white/20 -translate-x-full skew-x-12
                       group-hover:translate-x-full transition-transform duration-500 ease-out"
      />
      <span className="relative z-10">{label}</span>
      {showIcon && (
        <ArrowRight
          size={size === "lg" ? 18 : 16}
          className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-200"
        />
      )}
    </a>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 30);
    const pos = window.scrollY + ACTIVE_BUFFER;
    for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
      const el = document.getElementById(NAV_ITEMS[i].id);
      if (el && el.offsetTop <= pos) {
        setActive(NAV_ITEMS[i].id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <>
      {/* ── Fixed Header ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
          ${
            scrolled
              ? "bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80 shadow-[0_2px_20px_rgba(0,0,0,0.4)] py-2"
              : "bg-transparent py-4"
          }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("inicio");
              }}
              className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg"
            >
              <img
                src="/image/logo.png"
                alt="Start Aprovação"
                className="h-8 md:h-10 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-1"
          >
            {NAV_ITEMS.map((item) => (
              <DesktopNavItem
                key={item.id}
                item={item}
                active={activeSection === item.id}
                onPress={() => scrollToSection(item.id)}
              />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex flex-1 justify-end">
            <CTAButton />
          </div>

          {/* Mobile toggle */}
          <MenuToggle isOpen={isOpen} onToggle={toggle} />
        </div>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/65 backdrop-blur-sm z-40 md:hidden"
              onClick={close}
              aria-hidden="true"
            />

            <motion.div
              key="drawer"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[340px] z-50 md:hidden
                         flex flex-col bg-zinc-950 border-l border-white/[0.06]
                         shadow-[-24px_0_48px_rgba(0,0,0,0.55)]"
            >
              <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.06]">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                  Navegação
                </span>
                <button
                  onClick={close}
                  aria-label="Fechar menu"
                  className="p-2 -mr-1 rounded-xl text-zinc-400 hover:text-white
                             bg-zinc-900/60 hover:bg-zinc-800/80 border border-transparent
                             hover:border-zinc-700/60 transition-all duration-200
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 px-4 py-5 overflow-y-auto overscroll-contain">
                <ul className="space-y-1.5" role="list">
                  {NAV_ITEMS.map((item) => (
                    <DrawerNavItem
                      key={item.id}
                      item={item}
                      active={activeSection === item.id}
                      onPress={() => scrollToSection(item.id, close)}
                    />
                  ))}
                </ul>
              </nav>

              <motion.div
                variants={itemVariants}
                className="px-5 pb-8 pt-4 border-t border-white/[0.06] bg-gradient-to-b from-transparent to-black/40"
              >
                <CTAButton
                  label="Garantir Minha Vaga"
                  size="lg"
                  className="w-full"
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
