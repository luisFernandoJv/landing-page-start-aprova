import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Home,
  Instagram,
  LogIn,
  Mail,
  MessageCircle,
  Menu,
  Target,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { trackEvent } from "./analytics";

export const whatsapp = "https://wa.me/5583999999999";
export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Rota da área do aluno (login → materiais e videoaulas). Antes apontava
 * para um portal externo; agora o login é resolvido dentro do próprio
 * site (ver StudentLogin.tsx), então é um link interno normal.
 */
export const studentPortalUrl = "/login";

/** Barra fina de progresso de leitura, fixa no topo — feedback sutil de onde o usuário está na página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });
  const width = useTransform(progress, (v) => `${v * 100}%`);
  return <motion.div className="scroll-progress" style={{ width }} />;
}

/** Wrapper de revelação ao rolar: fade + leve elevação, uma vez, com curva suave. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 26,
  tabIndex,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  tabIndex?: number;
}) {
  return (
    <motion.div
      className={className}
      tabIndex={tabIndex}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function CTA({
  children = "QUERO COMEÇAR AGORA",
  href = whatsapp,
}: {
  children?: React.ReactNode;
  href?: string;
}) {
  return (
    <motion.a
      href={href}
      onClick={() => trackEvent("cta_click", { label: String(children) })}
      className="cta"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      <span className="cta-shine" aria-hidden="true" />
      <span className="cta-label">{children}</span>
      <ArrowRight aria-hidden="true" className="cta-arrow" />
    </motion.a>
  );
}

/** Link de "voltar" usado nas páginas internas (legais, perfil de professor). */
export function LegalBackLink({
  href = "/",
  label = "Voltar ao início",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <a href={href} className="legal-back">
      <ArrowLeft aria-hidden="true" /> {label}
    </a>
  );
}

const NAV_LINKS = [
  { label: "Início", href: "#inicio", icon: Home },
  { label: "Método", href: "#metodo", icon: Target },
  { label: "Professores", href: "#professores", icon: Users },
  { label: "Resultados", href: "#resultados", icon: Trophy },
] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#inicio");
  const isSubpage =
    typeof window !== "undefined" &&
    (["/materiais", "/privacidade", "/termos", "/login"].includes(
      window.location.pathname,
    ) ||
      window.location.pathname.startsWith("/professor/"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isSubpage) return;
    const ids = NAV_LINKS.filter((l) => l.href.startsWith("#")).map((l) =>
      l.href.slice(1),
    );
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isSubpage]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={scrolled || open ? "nav nav-scrolled" : "nav"}>
        <ScrollProgress />
        <a href="#inicio" className="brand" onClick={() => setOpen(false)}>
          <img src="/image/logo.png" alt="Start Aprovação" />
        </a>

        <nav className="nav-links-desktop" aria-label="Navegação principal">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href ? "nav-link active" : "nav-link"}
              onClick={() =>
                trackEvent("navigation_click", { section: l.href })
              }
            >
              {active === l.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span>{l.label}</span>
            </a>
          ))}
          <a
            href={studentPortalUrl}
            className="nav-login"
            onClick={() =>
              trackEvent("student_login_click", { location: "desktop" })
            }
          >
            <LogIn aria-hidden="true" />
            <span>Entrar</span>
          </a>
          <CTA>GARANTIR VAGA</CTA>
        </nav>

        <div className="nav-actions-mobile">
          <a
            href={studentPortalUrl}
            className="nav-login-mobile"
            aria-label="Entrar na área do aluno"
            onClick={() =>
              trackEvent("student_login_click", { location: "mobile_compact" })
            }
          >
            <LogIn aria-hidden="true" />
          </a>
          <button
            className="menu-button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/*
        Overlay + drawer mobile são renderizados via portal direto em
        document.body — de propósito, e não como filhos do <header>.
        O <header> ganha a classe "nav-scrolled" (que usa backdrop-filter)
        assim que o menu abre, e um ancestral com backdrop-filter/filter/
        transform vira "containing block" dos descendentes position:fixed.
        Isso fazia o drawer e o overlay ficarem presos dentro da caixa de
        ~80px do header, em vez de cobrirem a tela — por isso "sumiam"
        atrás das sections. Renderizando fora da árvore do header, eles
        continuam fixos de verdade em relação à viewport, não importa o
        que aconteça com o estilo do header.
      */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  className="nav-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setOpen(false)}
                  aria-hidden="true"
                />
                <motion.nav
                  className="nav-drawer"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 320, damping: 34 }}
                  aria-label="Navegação móvel"
                >
                  <motion.div
                    className="nav-drawer-links"
                    initial="closed"
                    animate="open"
                    variants={{
                      open: {
                        transition: {
                          staggerChildren: 0.06,
                          delayChildren: 0.08,
                        },
                      },
                      closed: {},
                    }}
                  >
                    {NAV_LINKS.map(({ label, href, icon: Icon }) => (
                      <motion.a
                        key={href}
                        href={href}
                        className={
                          active === href
                            ? "nav-drawer-link active"
                            : "nav-drawer-link"
                        }
                        onClick={() => setOpen(false)}
                        variants={{
                          closed: { opacity: 0, x: 28 },
                          open: { opacity: 1, x: 0 },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 28,
                        }}
                      >
                        <Icon aria-hidden="true" />
                        <span>{label}</span>
                      </motion.a>
                    ))}
                  </motion.div>
                  <motion.a
                    href={studentPortalUrl}
                    className="nav-drawer-login"
                    onClick={() => {
                      setOpen(false);
                      trackEvent("student_login_click", {
                        location: "mobile_drawer",
                      });
                    }}
                    variants={{
                      closed: { opacity: 0, y: 16 },
                      open: { opacity: 1, y: 0 },
                    }}
                    initial="closed"
                    animate="open"
                    transition={{ delay: 0.26 }}
                  >
                    <LogIn aria-hidden="true" />
                    <span>Entrar na área do aluno</span>
                  </motion.a>
                  <motion.div
                    variants={{
                      closed: { opacity: 0, y: 16 },
                      open: { opacity: 1, y: 0 },
                    }}
                    initial="closed"
                    animate="open"
                    transition={{ delay: 0.3 }}
                  >
                    <CTA>GARANTIR MINHA VAGA</CTA>
                  </motion.div>
                </motion.nav>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-glow" aria-hidden="true" />
      <div className="section-wrap footer-cta-row">
        <div>
          <p className="eyebrow">COMECE HOJE</p>
          <h3>Pronto para transformar seu estudo em aprovação?</h3>
        </div>
        <CTA>FALE COM A NOSSA EQUIPE</CTA>
      </div>
      <div className="section-wrap footer-main">
        <div className="footer-brand">
          <img
            src="/image/logo.png"
            alt="Start Aprovação"
            className="footer-logo"
          />
          <p>
            Preparação séria para objetivos reais. Metodologia, professores
            especialistas e material direcionado para quem quer chegar mais
            preparado à aprovação.
          </p>
          <div className="footer-social">
            <a href={whatsapp} aria-label="WhatsApp">
              <MessageCircle aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/startaprova/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram aria-hidden="true" />
            </a>
            <a href="mailto:contato@startaprovacao.com.br" aria-label="E-mail">
              <Mail aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer-col">
          <strong>Institucional</strong>
          <a href="#inicio">Início</a>
          <a href="#metodo">Método</a>
          <a href="#professores">Professores</a>
          <a href="#resultados">Resultados</a>
          <a href={studentPortalUrl}>Área do Aluno</a>
        </div>
        <div className="footer-col">
          <strong>Contato</strong>
          <a href={whatsapp}>
            <MessageCircle aria-hidden="true" /> WhatsApp
          </a>
          <a href="mailto:contato@startaprovacao.com.br">
            <Mail aria-hidden="true" /> contato@startaprovacao.com.br
          </a>
          <a
            href="https://www.instagram.com/startaprova/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram aria-hidden="true" /> @startaprova
          </a>
        </div>
      </div>
      <div className="section-wrap footer-bottom">
        <span>
          © 2026 Start Aprovação. Todos os direitos reservados.
          <span className="footer-credit">
            {" "}
            · Desenvolvido por{" "}
            <a
              href="https://www.linkedin.com/in/luisfernando-eng"
              target="_blank"
              rel="noopener noreferrer"
            >
              Luis Dev
            </a>
          </span>
        </span>
        <span className="footer-legal">
          <a href="/termos">Termos</a>
          <span aria-hidden="true">·</span>
          <a href="/privacidade">Privacidade</a>
        </span>
        <button
          type="button"
          className="footer-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span>Voltar ao topo</span>
          <ArrowUp aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
