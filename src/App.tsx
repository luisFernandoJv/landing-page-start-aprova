import { useEffect, useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  BookOpen,
  Check,
  ChevronDown,
  FileText,
  Home,
  Instagram,
  Mail,
  MessageCircle,
  Menu,
  Search,
  ShieldCheck,
  Target,
  Trophy,
  Users,
  X,
} from "lucide-react";
export function trackEvent(name: string, props?: Record<string, unknown>) {
  if (
    typeof window !== "undefined" &&
    (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
  ) {
    (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.(
      "event",
      name,
      props,
    );
  }
}

const photos = [
  "/image/turma.jpeg",
  "/image/turma2.jpeg",
  "/image/turma3.jpeg",
  "/image/turma4.jpeg",
  "/image/turma5.jpeg",
  "/image/turma6.jpeg",
];

// Prints de depoimentos, salvos em public/image como 1.png até 6.png
const feedbackShots = Array.from(
  { length: 6 },
  (_, i) => `/image/${i + 1}.png`,
);
const whatsapp = "https://wa.me/5583999999999";
const EASE = [0.16, 1, 0.3, 1] as const;

/** Barra fina de progresso de leitura, fixa no topo — feedback sutil de onde o usuário está na página. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });
  const width = useTransform(progress, (v) => `${v * 100}%`);
  return <motion.div className="scroll-progress" style={{ width }} />;
}

/** Wrapper de revelação ao rolar: fade + leve elevação, uma vez, com curva suave (substitui o "aparecer" abrupto). */
function Reveal({
  children,
  className = "",
  delay = 0,
  y = 26,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function CTA({
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

const NAV_LINKS = [
  { label: "Início", href: "#inicio", icon: Home },
  { label: "Método", href: "#metodo", icon: Target },
  { label: "Professores", href: "#professores", icon: Users },
  { label: "Resultados", href: "#resultados", icon: Trophy },
  { label: "Materiais", href: "/materiais", icon: BookOpen },
] as const;

function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#inicio");
  const isMaterials =
    typeof window !== "undefined" && window.location.pathname === "/materiais";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMaterials) return;
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
  }, [isMaterials]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
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
            onClick={() => trackEvent("navigation_click", { section: l.href })}
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
        <CTA>GARANTIR VAGA</CTA>
      </nav>

      <button
        className="menu-button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X /> : <Menu />}
      </button>

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
                    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
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
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  >
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                  </motion.a>
                ))}
              </motion.div>
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
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-bg" role="img" aria-label="Equipe Start Aprovação" />
      <div className="section-wrap hero-inner">
        <Reveal className="hero-copy" y={22}>
          <p className="eyebrow">PREPARAÇÃO PARA CONCURSOS</p>
          <h1>
            Preparação que transforma estudo em <em>aprovação.</em>
          </h1>
          <p className="lead">
            Estude com professores especialistas, materiais direcionados e uma
            metodologia pensada para você chegar mais preparado à prova.
          </p>
          <div className="hero-actions">
            <CTA />
            <a className="text-link" href="#metodo">
              Conhecer a metodologia <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <div className="proof-row">
            <span>
              <Check /> Professores especialistas
            </span>
            <span>
              <Check /> Material direcionado
            </span>
            <span>
              <Check /> Foco em resultado
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const authority = [
  {
    icon: Users,
    title: "Professores especialistas",
    text: "Experiência de quem entende a prova e sabe ensinar.",
  },
  {
    icon: Target,
    title: "Conteúdo direcionado",
    text: "O que importa, organizado para você avançar.",
  },
  {
    icon: BookOpen,
    title: "Material de apoio",
    text: "Recursos para estudar, revisar e praticar melhor.",
  },
  {
    icon: ShieldCheck,
    title: "Estratégia de prova",
    text: "Mais clareza para tomar decisões no dia da prova.",
  },
];
function Authority() {
  return (
    <section className="blue-section">
      <div className="section-wrap">
        <Reveal className="section-heading light">
          <p className="eyebrow">A BASE DA SUA PREPARAÇÃO</p>
          <h2>Uma preparação pensada para quem leva sua aprovação a sério.</h2>
        </Reveal>
        <div className="authority-grid">
          {authority.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <article className="authority-card">
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  "Entenda o que cai",
  "Estude com direção",
  "Pratique com questões",
  "Revise o que importa",
  "Chegue preparado",
];
function Method() {
  return (
    <section id="metodo" className="section-wrap method">
      <Reveal className="section-heading">
        <p className="eyebrow">MÉTODO START</p>
        <h2>
          Menos dispersão.
          <br />
          <span>Mais direção.</span>
        </h2>
        <p className="lead">
          Uma jornada simples e consistente para transformar intenção em rotina
          de estudos.
        </p>
      </Reveal>
      <div className="timeline">
        {steps.map((step, i) => (
          <Reveal key={step} className="step" delay={i * 0.07} y={16}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <span>{step}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="section-wrap benefits">
      <Reveal className="benefit-feature">
        <p className="eyebrow">PARA VOCÊ AVANÇAR</p>
        <h2>
          O estudo fica mais leve quando você sabe <em>por onde começar.</em>
        </h2>
        <p>
          Você não precisa estudar mais horas. Precisa estudar melhor, com um
          caminho que faça sentido para a sua prova e para a sua rotina.
        </p>
        <CTA>COMEÇAR MINHA PREPARAÇÃO</CTA>
      </Reveal>
      <Reveal className="benefit-stack" delay={0.12}>
        <div className="number-card">
          <strong>01</strong>
          <span>Clareza para escolher o próximo passo.</span>
        </div>
        <div className="quote-card">
          “A aprovação começa muito antes do dia da prova: começa quando você
          decide se preparar de verdade.”
        </div>
      </Reveal>
    </section>
  );
}

const teachers = [
  {
    photo: "/image/prof-francisco.jpg",
    name: "Francisco",
    highlight: "Petrônio",
    subject: "Professor de Português e Conhecimentos Gerais",
  },
  {
    photo: "/image/prof-luis.jpg",
    name: "Luis",
    highlight: "Fernando",
    subject: "Professor de Matemática e Informática",
  },
  {
    photo: "/image/prof-antonio.jpg",
    name: "Antônio",
    highlight: "Junior",
    subject: "Professor de Português e Conhecimentos Gerais",
  },
];
function Professors() {
  return (
    <section id="professores" className="cream-section">
      <div className="section-wrap">
        <Reveal className="section-heading row-heading">
          <div>
            <p className="eyebrow">QUEM ENSINA</p>
            <h2>Quem vai estar ao seu lado nessa preparação?</h2>
          </div>
          <p className="lead">
            Uma equipe preparada para compartilhar conhecimento, método e
            confiança.
          </p>
        </Reveal>
        <div className="teacher-grid">
          {teachers.map((t, i) => (
            <Reveal
              key={t.name}
              className="teacher-card"
              delay={i * 0.08}
              y={20}
            >
              <div className="teacher-photo">
                <img
                  src={t.photo}
                  alt={`${t.name} ${t.highlight}, ${t.subject}`}
                  loading="lazy"
                />
              </div>
              <p className="teacher-subject">{t.subject}</p>
              <p className="teacher-name">
                {t.name} <em>{t.highlight}</em>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section-wrap gallery-section">
      <Reveal className="section-heading">
        <p className="eyebrow">NOSSA COMUNIDADE</p>
        <h2>Mais do que uma sala de aula.</h2>
        <p className="lead">
          Uma comunidade de pessoas que decidiu levar a aprovação a sério.
        </p>
      </Reveal>
      <div className="gallery">
        {photos.map((src, i) => (
          <Reveal key={src} className="gallery-item" delay={i * 0.06} y={18}>
            <img
              src={src}
              alt={`Comunidade Start Aprovação ${i + 1}`}
              loading="lazy"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="resultados" className="blue-section">
      <div className="section-wrap">
        <Reveal className="section-heading light">
          <p className="eyebrow">PROVA SOCIAL</p>
          <h2>Quem estudou com a Start Aprovação</h2>
          <p className="lead">
            Prints reais de conversas e feedbacks enviados pelos nossos alunos.
          </p>
        </Reveal>

        {/* Mosaico próprio para os prints — preserva a altura natural de
            cada imagem (sem cortar o texto das conversas) */}
        <div className="proof-grid">
          {feedbackShots.map((src, i) => (
            <Reveal key={src} className="proof-item" delay={i * 0.06} y={18}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Ampliar depoimento ${i + 1}`}
                style={{
                  display: "block",
                  width: "100%",
                  padding: 0,
                  border: 0,
                  background: "none",
                  cursor: "zoom-in",
                }}
              >
                <img
                  src={src}
                  alt={`Print de depoimento de aluno ${i + 1}`}
                  loading="lazy"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox — amplia o print para leitura confortável */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 backdrop-blur-sm px-4 py-10"
          >
            <motion.img
              key={openIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              src={feedbackShots[openIndex]}
              alt={`Print de depoimento de aluno ${openIndex + 1} ampliado`}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[92vw] max-h-[85vh] rounded-2xl shadow-2xl object-contain"
            />
            <button
              onClick={() => setOpenIndex(null)}
              aria-label="Fechar"
              className="fixed top-5 right-5 sm:top-8 sm:right-8 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all duration-200"
            >
              <X aria-hidden="true" size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Offer() {
  return (
    <section className="section-wrap offer">
      <Reveal>
        <p className="eyebrow">COMECE HOJE</p>
        <h2>Seu próximo passo começa agora.</h2>
        <p className="lead">
          Pare de estudar sem direção. Comece sua preparação com a Start
          Aprovação.
        </p>
      </Reveal>
      <Reveal className="offer-card" delay={0.12}>
        <p>PREPARAÇÃO START</p>
        <strong>Plano completo</strong>
        <span>Acesso à preparação e aos materiais disponíveis.</span>
        <CTA />
      </Reveal>
    </section>
  );
}

const faqs = [
  "Como funciona a preparação?",
  "Como tenho acesso às aulas e materiais?",
  "Quem são os professores?",
  "Existe suporte durante os estudos?",
  "Qual é a duração do acesso?",
  "Quais formas de pagamento estão disponíveis?",
];
function FAQ() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="cream-section">
      <div className="section-wrap faq">
        <Reveal className="section-heading">
          <p className="eyebrow">DÚVIDAS FREQUENTES</p>
          <h2>Tudo claro para você começar.</h2>
        </Reveal>
        <div>
          {faqs.map((q, i) => (
            <button
              className="faq-item"
              key={q}
              onClick={() => setActive(active === i ? null : i)}
              aria-expanded={active === i}
            >
              <span>{q}</span>
              <ChevronDown className={active === i ? "rotate" : ""} />
              {active === i && (
                <p>
                  Fale com a nossa equipe para receber os detalhes mais
                  atualizados sobre este assunto.
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
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
          <a href="/materiais">Materiais</a>
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
        <span>© 2026 Start Aprovação. Todos os direitos reservados.</span>
        <span className="footer-legal">
          <a href="#">Termos</a>
          <span aria-hidden="true">·</span>
          <a href="#">Privacidade</a>
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

function Materials() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todos");
  const categories = [
    "Todos",
    "Português",
    "Matemática",
    "Direito",
    "Informática",
    "Legislação",
    "Conhecimentos específicos",
  ];
  const empty = useMemo(() => !query && filter === "Todos", [query, filter]);
  return (
    <div className="materials-page">
      <Navigation />
      <main className="section-wrap materials">
        <p className="eyebrow">BIBLIOTECA DIGITAL</p>
        <h1>
          Seu material de estudo,
          <br />
          <em>organizado em um só lugar.</em>
        </h1>
        <p className="lead">
          Encontre apostilas, PDFs, mapas mentais e materiais complementares
          para continuar sua preparação.
        </p>
        <div className="search-box">
          <Search />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar material..."
            aria-label="Buscar material"
          />
        </div>
        <div className="filter-row">
          {categories.map((c) => (
            <button
              className={filter === c ? "active" : ""}
              onClick={() => setFilter(c)}
              key={c}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="materials-empty">
          <FileText />
          <h2>
            {empty
              ? "Sua biblioteca está sendo preparada"
              : "Nenhum material encontrado"}
          </h2>
          <p>
            {empty
              ? "Em breve, você terá acesso a materiais organizados para cada etapa da sua preparação."
              : "Tente buscar outro termo ou selecionar uma categoria diferente."}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return window.location.pathname === "/materiais" ? (
    <Materials />
  ) : (
    <div>
      <Navigation />
      <main>
        <Hero />
        <Authority />
        <Method />
        <Benefits />
        <Professors />
        <Gallery />
        <Testimonials />
        <Offer />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
