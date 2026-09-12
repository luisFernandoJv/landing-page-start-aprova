import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, Check, ChevronDown, FileText, Menu, Search, ShieldCheck, Sparkles, Target, Users, X } from "lucide-react";
export function trackEvent(name: string, props?: Record<string, unknown>) {
  if (typeof window !== "undefined" && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.("event", name, props);
  }
}

const photos = ["/image/turma.jpeg", "/image/turma2.jpeg", "/image/turma3.jpeg", "/image/turma4.jpeg", "/image/turma5.jpeg", "/image/turma6.jpeg"];
const whatsapp = "https://wa.me/5583999999999";

function CTA({ children = "QUERO COMEÇAR AGORA", href = whatsapp }: { children?: React.ReactNode; href?: string }) {
  return <a href={href} onClick={() => trackEvent("cta_click", { label: String(children) })} className="cta"><span>{children}</span><ArrowRight aria-hidden="true" /></a>;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");
  const [scrolled, setScrolled] = useState(false);
  const links = [["Início", "#inicio"], ["Método", "#metodo"], ["Professores", "#professores"], ["Resultados", "#resultados"], ["Materiais", "/materiais"]];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = links.filter(([, href]) => href.startsWith("#")).map(([, href]) => document.querySelector(href)).filter(Boolean) as Element[];
      const current = sections.reverse().find((section) => section.getBoundingClientRect().top <= 140);
      if (current?.id) setActive(`#${current.id}`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <motion.header animate={{ y: 0 }} className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
    <a href="#inicio" className="brand"><img src="/image/logo.png" alt="Start Aprovação" /></a>
    <AnimatePresence>
      {open && <motion.button className="nav-overlay" aria-label="Fechar menu" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
    </AnimatePresence>
    <motion.nav className={open ? "nav-links open" : "nav-links"} initial={false} animate={open ? { x: 0 } : {}}>
      {links.map(([label, href], index) => <motion.a key={href} href={href} onClick={() => setOpen(false)} className={active === href ? "active" : ""} initial={false} animate={open ? { opacity: 1, x: 0 } : {}} transition={{ delay: open ? index * 0.055 : 0 }}><span>{label}</span>{active === href && href.startsWith("#") && <motion.i layoutId="active-nav-pill" />}</motion.a>)}
      <CTA />
    </motion.nav>
    <button className="menu-button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </motion.header>;
}

function ScrollSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -12]);
  return <motion.section ref={ref} style={{ y }} className={`scroll-section ${className}`}>{children}</motion.section>;
}

function Hero() { return <section id="inicio" className="hero section-wrap"><div className="hero-copy"><p className="eyebrow">PREPARAÇÃO PARA CONCURSOS</p><h1>Preparação que transforma estudo em <em>aprovação.</em></h1><p className="lead">Estude com professores especialistas, materiais direcionados e uma metodologia pensada para você chegar mais preparado à prova.</p><div className="hero-actions"><CTA /><a className="text-link" href="#metodo">Conhecer a metodologia <ArrowRight aria-hidden="true" /></a></div><div className="proof-row"><span><Check /> Professores especialistas</span><span><Check /> Material direcionado</span><span><Check /> Foco em resultado</span></div></div><div className="faculty-board"><div className="board-label">COMUNIDADE START <span>● AO VIVO</span></div><div className="photo-grid"><img className="photo-main" src={photos[0]} alt="Turma Start Aprovação em aula" /><img src={photos[1]} alt="Alunos da Start Aprovação" /><img src={photos[2]} alt="Momento de estudo da turma" /></div><div className="board-note"><Sparkles /><div><strong>Estude com direção.</strong><small>Seu objetivo merece um plano.</small></div></div></div></section> }

const authority = [{ icon: Users, title: "Professores especialistas", text: "Experiência de quem entende a prova e sabe ensinar." }, { icon: Target, title: "Conteúdo direcionado", text: "O que importa, organizado para você avançar." }, { icon: BookOpen, title: "Material de apoio", text: "Recursos para estudar, revisar e praticar melhor." }, { icon: ShieldCheck, title: "Estratégia de prova", text: "Mais clareza para tomar decisões no dia da prova." }];
function Authority() { return <section className="blue-section"><div className="section-wrap"><div className="section-heading light"><p className="eyebrow">A BASE DA SUA PREPARAÇÃO</p><h2>Uma preparação pensada para quem leva sua aprovação a sério.</h2></div><div className="authority-grid">{authority.map(({ icon: Icon, title, text }) => <article className="authority-card" key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section> }

const steps = ["Entenda o que cai", "Estude com direção", "Pratique com questões", "Revise o que importa", "Chegue preparado"];
function Method() { return <section id="metodo" className="section-wrap method"><div className="section-heading"><p className="eyebrow">MÉTODO START</p><h2>Menos dispersão.<br /><span>Mais direção.</span></h2><p className="lead">Uma jornada simples e consistente para transformar intenção em rotina de estudos.</p></div><div className="timeline">{steps.map((step, i) => <div className="step" key={step}><b>{String(i + 1).padStart(2, "0")}</b><span>{step}</span></div>)}</div></section> }

function Benefits() { return <section className="section-wrap benefits"><div className="benefit-feature"><p className="eyebrow">PARA VOCÊ AVANÇAR</p><h2>O estudo fica mais leve quando você sabe <em>por onde começar.</em></h2><p>Você não precisa estudar mais horas. Precisa estudar melhor, com um caminho que faça sentido para a sua prova e para a sua rotina.</p><CTA>COMEÇAR MINHA PREPARAÇÃO</CTA></div><div className="benefit-stack"><div className="number-card"><strong>01</strong><span>Clareza para escolher o próximo passo.</span></div><div className="quote-card">“A aprovação começa muito antes do dia da prova: começa quando você decide se preparar de verdade.”</div></div></section> }

function Professors() { return <section id="professores" className="cream-section"><div className="section-wrap"><div className="section-heading row-heading"><div><p className="eyebrow">QUEM ENSINA</p><h2>Quem vai estar ao seu lado nessa preparação?</h2></div><p className="lead">Uma equipe preparada para compartilhar conhecimento, método e confiança.</p></div><div className="professor-empty"><Users /><h3>Equipe de professores em atualização</h3><p>Em breve, você conhecerá os especialistas que fazem parte da Start Aprovação.</p></div></div></section> }

function Gallery() { return <section className="section-wrap gallery-section"><div className="section-heading"><p className="eyebrow">NOSSA COMUNIDADE</p><h2>Mais do que uma sala de aula.</h2><p className="lead">Uma comunidade de pessoas que decidiu levar a aprovação a sério.</p></div><div className="gallery">{photos.map((src, i) => <img key={src} src={src} alt={`Comunidade Start Aprovação ${i + 1}`} loading="lazy" />)}</div></section> }

function Testimonials() { return <section id="resultados" className="blue-section"><div className="section-wrap"><div className="section-heading light"><p className="eyebrow">PROVA SOCIAL</p><h2>Quem estudou com a Start Aprovação</h2></div><div className="testimonial-placeholder"><FileText /><p>Depoimentos reais dos nossos alunos serão publicados aqui.</p><small>Estamos preparando este espaço para compartilhar histórias de quem viveu essa jornada.</small></div></div></section> }

function Offer() { return <section className="section-wrap offer"><div><p className="eyebrow">COMECE HOJE</p><h2>Seu próximo passo começa agora.</h2><p className="lead">Pare de estudar sem direção. Comece sua preparação com a Start Aprovação.</p></div><div className="offer-card"><p>PREPARAÇÃO START</p><strong>Plano completo</strong><span>Acesso à preparação e aos materiais disponíveis.</span><CTA /></div></section> }

const faqs = ["Como funciona a preparação?", "Como tenho acesso às aulas e materiais?", "Quem são os professores?", "Existe suporte durante os estudos?", "Qual é a duração do acesso?", "Quais formas de pagamento estão disponíveis?"];
function FAQ() { const [active, setActive] = useState<number | null>(null); return <section className="cream-section"><div className="section-wrap faq"><div className="section-heading"><p className="eyebrow">DÚVIDAS FREQUENTES</p><h2>Tudo claro para você começar.</h2></div><div>{faqs.map((q, i) => <button className="faq-item" key={q} onClick={() => setActive(active === i ? null : i)} aria-expanded={active === i}><span>{q}</span><ChevronDown className={active === i ? "rotate" : ""} />{active === i && <p>Fale com a nossa equipe para receber os detalhes mais atualizados sobre este assunto.</p>}</button>)}</div></div></section> }

function Footer() { return <footer><div className="section-wrap footer-grid"><div><img src="/image/logo.png" alt="Start Aprovação" className="footer-logo" /><p>Preparação séria para objetivos reais.</p></div><div><strong>Explorar</strong><a href="#metodo">Método</a><a href="#professores">Professores</a><a href="/materiais">Materiais</a></div><div><strong>Contato</strong><a href={whatsapp}>WhatsApp</a><a href="mailto:contato@startaprovacao.com.br">E-mail</a></div></div><div className="section-wrap footer-bottom"><span>© 2026 Start Aprovação. Todos os direitos reservados.</span><span>Termos · Privacidade</span></div></footer> }

function Materials() { const [query, setQuery] = useState(""); const [filter, setFilter] = useState("Todos"); const categories = ["Todos", "Português", "Matemática", "Direito", "Informática", "Legislação", "Conhecimentos específicos"]; const empty = useMemo(() => !query && filter === "Todos", [query, filter]); return <div className="materials-page"><Navigation /><main className="section-wrap materials"><p className="eyebrow">BIBLIOTECA DIGITAL</p><h1>Seu material de estudo,<br /><em>organizado em um só lugar.</em></h1><p className="lead">Encontre apostilas, PDFs, mapas mentais e materiais complementares para continuar sua preparação.</p><div className="search-box"><Search /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar material..." aria-label="Buscar material" /></div><div className="filter-row">{categories.map(c => <button className={filter === c ? "active" : ""} onClick={() => setFilter(c)} key={c}>{c}</button>)}</div><div className="materials-empty"><FileText /><h2>{empty ? "Sua biblioteca está sendo preparada" : "Nenhum material encontrado"}</h2><p>{empty ? "Em breve, você terá acesso a materiais organizados para cada etapa da sua preparação." : "Tente buscar outro termo ou selecionar uma categoria diferente."}</p></div></main><Footer /></div> }

export default function App() { return window.location.pathname === "/materiais" ? <Materials /> : <div><Navigation /><main><Hero /><ScrollSection><Authority /></ScrollSection><ScrollSection><Method /></ScrollSection><ScrollSection><Benefits /></ScrollSection><ScrollSection><Professors /></ScrollSection><ScrollSection><Gallery /></ScrollSection><ScrollSection><Testimonials /></ScrollSection><ScrollSection><Offer /></ScrollSection><ScrollSection><FAQ /></ScrollSection></main><Footer /></div> }
