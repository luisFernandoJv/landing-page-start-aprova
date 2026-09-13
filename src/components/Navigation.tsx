import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
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
  Zap,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import { trackEvent } from "../App";

// ─── Ícone customizado do WhatsApp ────────────────────────────────────────────

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

// ─── Constants ───────────────────────────────────────────────────────────────
// Estrutura inspirada em plataformas de concursos consolidadas (ex.: Gran
// Cursos): cabeçalho institucional, item de destaque para editais abertos e
// um canal de contato rápido sempre visível — sem qualquer selo de promoção,
// já que não há oferta ativa no momento.

const NAV_ITEMS: NavItem[] = [
  { id: "inicio", label: "Início", icon: Home },
  { id: "editais", label: "Editais Abertos", icon: AlertCircle },
  { id: "sobre", label: "O Método", icon: Target },
  { id: "conteudo", label: "Conteúdo", icon: BookOpen },
  { id: "depoimentos", label: "Resultados", icon: Star },
  { id: "contato", label: "Contato", icon: Phone },
];

const WHATSAPP_URL =
  "https://wa.me/558398388509?text=Ola!%20Quero%20saber%20mais%20sobre%20o%20curso%20preparatorio%20Start%20Aprovacao!";

const SCROLL_OFFSET = 84;
const ACTIVE_BUFFER = 140;
const FORM_URL = "https://forms.gle/e5GGQZqxGN2hMDnA6";

// ─── Animations ──────────────────────────────────────────────────────────────

const drawerVariants = {
  closed: {
    x: "100%",
    transition: { type: "spring", stiffness: 340, damping: 34 },
  },
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 34,
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  closed: { x: 48, opacity: 0 },
  open: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 340, damping: 26 },
  },
} as const;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
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

function AnnouncementBar() {
  return (
    <div className="relative z-50 overflow-hidden bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 py-1.5 flex items-center justify-center gap-2 text-[11px] sm:text-xs font-bold text-zinc-950">
        <Zap size={12} className="flex-shrink-0 fill-zinc-950" />
        <span className="truncate tracking-wide">
          Matrículas abertas — Turma 2026 com vagas limitadas
        </span>
        <button
          onClick={() => scrollToSection("editais")}
          className="hidden sm:inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded-full bg-zinc-950/90 text-amber-400 hover:bg-zinc-900 transition-colors"
        >
          Ver editais abertos
          <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}

// Canal de atendimento rápido — mesmo espírito das barras utilitárias de
// grandes plataformas de concurso, aqui reduzido a um único link direto de
// WhatsApp para não competir com o CTA principal.
function QuickContact() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent("cta_click", { location: "navigation", type: "whatsapp" })
      }
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
      className="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg
                 bg-zinc-900/80 border border-zinc-800 text-zinc-400
                 hover:text-emerald-500 hover:border-emerald-500/40
                 transition-colors duration-200
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
    >
      <WhatsAppIcon className="w-4 h-4" />
    </a>
  );
}

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <a
      href="#inicio"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      aria-label="Start Aprovação — Voltar ao início"
      className="group flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
    >
      {/* Fallback tipográfico caso a imagem falhe */}
      <div className="relative flex items-center">
        <img
          src="/image/logo2.png"
          alt="Start Aprovação"
          className="h-8 md:h-9 object-contain transition-transform duration-300 group-hover:scale-[1.04]"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <span className="hidden font-display text-lg font-extrabold tracking-tight text-white group-hover:[img+&]:hidden">
          Start{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Aprovação
          </span>
        </span>
      </div>

      {/* Separador + tagline (aparece no desktop) */}
      <div className="hidden lg:flex items-center gap-2.5 pl-2.5 border-l border-zinc-800">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 leading-tight">
          Preparatório
          <br />
          Concursos PB
        </span>
      </div>
    </a>
  );
}

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
            transition={{ duration: 0.16 }}
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
            transition={{ duration: 0.16 }}
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
      className={`relative px-3.5 py-2 text-[13px] font-semibold rounded-lg
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60
                  ${active ? "text-white" : "text-zinc-400 hover:text-zinc-100"}`}
    >
      {active && (
        <>
          {/* Pill de fundo sutil */}
          <motion.span
            layoutId="desktop-pill"
            className="absolute inset-0 rounded-lg bg-white/[0.06] border border-white/[0.06] pointer-events-none"
            transition={{ type: "spring", stiffness: 500, damping: 38 }}
          />
          {/* Underline âmbar animado */}
          <motion.span
            layoutId="desktop-underline"
            className="absolute -bottom-px left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-amber-400 to-orange-500 pointer-events-none"
            transition={{ type: "spring", stiffness: 500, damping: 38 }}
          />
        </>
      )}
      <span className="relative z-10">{item.label}</span>
    </button>
  );
}

function DrawerNavItem({
  item,
  active,
  onPress,
  index,
}: {
  item: NavItem;
  active: boolean;
  onPress: () => void;
  index: number;
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
          <span
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors
              ${
                active
                  ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
                  : "bg-zinc-900 border-zinc-800 text-zinc-500 group-hover:text-zinc-300"
              }`}
          >
            <Icon size={15} />
          </span>
          {item.label}
        </span>

        <span className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-zinc-600 tabular-nums">
            0{index + 1}
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
        </span>
      </button>
    </motion.li>
  );
}

function CTAButton({
  className = "",
  label = "Garantir Minha Vaga",
  showIcon = true,
  size = "sm",
}: {
  className?: string;
  label?: string;
  showIcon?: boolean;
  size?: "sm" | "lg";
}) {
  const padding =
    size === "lg" ? "px-6 py-4 text-base" : "px-5 py-2.5 text-[13px]";

  return (
    <a
      href={FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("cta_click", { location: "navigation" })}
      className={`relative group inline-flex items-center justify-center gap-2
                  font-extrabold rounded-xl overflow-hidden
                  bg-gradient-to-b from-amber-400 to-amber-600 text-zinc-950
                  shadow-[0_0_0_1px_rgba(251,191,36,0.25),0_4px_16px_rgba(245,158,11,0.18)]
                  hover:shadow-[0_0_0_1px_rgba(251,191,36,0.4),0_6px_24px_rgba(245,158,11,0.35)]
                  hover:-translate-y-0.5 active:scale-[0.97]
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                  ${padding} ${className}`}
    >
      <span
        className="absolute inset-0 bg-white/25 -translate-x-full skew-x-12
                   group-hover:translate-x-full transition-transform duration-500 ease-out"
      />
      <span className="relative z-10 tracking-tight">{label}</span>
      {showIcon && (
        <ArrowRight
          size={size === "lg" ? 18 : 15}
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
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Barra de progresso de leitura
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  // Esconde o header ao rolar para baixo, mostra ao rolar para cima
  // (apenas no desktop — no mobile o nav permanece sempre visível)
  useMotionValueEvent(useScroll().scrollY, "change", (y) => {
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) {
      if (hidden) setHidden(false);
      lastY.current = y;
      return;
    }
    const delta = y - lastY.current;
    if (Math.abs(delta) > 4) {
      setHidden(delta > 0 && y > 420 && !isOpen);
      lastY.current = y;
    }
  });

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
      <motion.div
        animate={{ y: hidden && !isOpen ? "-110%" : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 inset-x-0 z-50"
      >
        {/* ── Topbar de anúncio ── */}
        <div
          className={`transition-all duration-300 overflow-hidden ${scrolled ? "max-h-0" : "max-h-12"}`}
        >
          <AnnouncementBar />
        </div>

        {/* ── Header principal ── */}
        <header
          className={`transition-all duration-300 border-b
            bg-zinc-950/95 backdrop-blur-2xl border-zinc-800/80
            ${
              scrolled
                ? "md:bg-zinc-950/85 md:shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
                : "md:bg-zinc-950/40 md:backdrop-blur-md md:border-transparent"
            }`}
        >
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 flex items-center justify-between gap-4 py-3">
            <Logo onClick={() => scrollToSection("inicio")} />

            {/* Desktop Nav */}
            <nav
              aria-label="Navegação principal"
              className="hidden md:flex items-center gap-0.5"
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
            <div className="hidden md:flex items-center gap-3">
              <QuickContact />
              <span
                className="hidden lg:block w-px h-6 bg-zinc-800"
                aria-hidden="true"
              />
              <CTAButton />
            </div>

            {/* Mobile: CTA compacto + toggle */}
            <div className="flex md:hidden items-center gap-2">
              <CTAButton label="Garantir Vaga" showIcon={false} />
              <MenuToggle isOpen={isOpen} onToggle={toggle} />
            </div>
          </div>

          {/* Barra de progresso de leitura */}
          <motion.div
            style={{ scaleX: progress }}
            className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-amber-400 to-orange-500"
          />
        </header>
      </motion.div>

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
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden"
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
              className="fixed top-0 right-0 bottom-0 w-[86%] max-w-[340px] z-50 md:hidden
                         flex flex-col bg-zinc-950 border-l border-white/[0.06]
                         shadow-[-24px_0_48px_rgba(0,0,0,0.55)]"
            >
              {/* Header do drawer com marca */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.06]">
                <span className="font-display text-sm font-extrabold text-white tracking-tight">
                  Start{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                    Aprovação
                  </span>
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
                <p className="px-4 pb-3 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
                  Navegação
                </p>
                <ul className="space-y-1.5" role="list">
                  {NAV_ITEMS.map((item, i) => (
                    <DrawerNavItem
                      key={item.id}
                      item={item}
                      index={i}
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
                <p className="text-[11px] text-zinc-500 text-center mb-3 leading-relaxed">
                  R$ 300 à vista ou 3x de R$ 110
                </p>
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
