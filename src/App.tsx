import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  BookOpenCheck,
  Check,
  ChevronDown,
  Compass,
  ListChecks,
  RefreshCw,
  ShieldCheck,
  Target,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { CTA, Footer, Navigation, Reveal } from "./components/Layout";
import { teachers } from "./components/teachers";
import { Materials } from "./components/Materials";
import { TeacherProfile } from "./components/TeacherProfile";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfService } from "./components/TermsOfService";

// Re-exportado para compatibilidade com componentes que ainda importam
// trackEvent a partir de "../App" (ex: HeroSection, WhatsAppGroups, etc.)
export { trackEvent } from "./components/analytics";

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
    detail:
      "Um time selecionado, com bagagem prática nas bancas que você vai enfrentar — não apenas teoria de sala de aula.",
  },
  {
    icon: Target,
    title: "Conteúdo direcionado",
    text: "O que importa, organizado para você avançar.",
    detail:
      "Nada de enciclopédias. Você recebe uma trilha objetiva, atualizada com o edital e o histórico da banca.",
  },
  {
    icon: BookOpen,
    title: "Material de apoio",
    text: "Recursos para estudar, revisar e praticar melhor.",
    detail:
      "Resumos, exercícios comentados e simulados para transformar teoria em repertório de prova.",
  },
  {
    icon: ShieldCheck,
    title: "Estratégia de prova",
    text: "Mais clareza para tomar decisões no dia da prova.",
    detail:
      "Técnicas de gestão de tempo, leitura de enunciado e eliminação de alternativas para decidir com confiança.",
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
          {authority.map(({ icon: Icon, title, text, detail }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <article className="authority-card" tabIndex={0}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
                <p className="authority-detail">{detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    icon: Compass,
    title: "Entenda o que cai",
    text: "Mapeamos o histórico da banca para você focar no que é cobrado de verdade.",
  },
  {
    icon: BookOpenCheck,
    title: "Estude com direção",
    text: "Uma trilha objetiva, sem dispersão, construída para o seu edital.",
  },
  {
    icon: ListChecks,
    title: "Pratique com questões",
    text: "Exercícios comentados no nível exato da prova que você vai enfrentar.",
  },
  {
    icon: RefreshCw,
    title: "Revise o que importa",
    text: "Ciclos de revisão espaçada para fixar o conteúdo na memória de longo prazo.",
  },
  {
    icon: Award,
    title: "Chegue preparado",
    text: "Estratégia de prova e confiança para decidir rápido no dia certo.",
  },
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
        <span className="timeline-track" aria-hidden="true" />
        {steps.map(({ icon: Icon, title, text }, i) => (
          <Reveal
            key={title}
            className="step"
            delay={i * 0.08}
            y={16}
            tabIndex={0}
          >
            <div className="step-marker">
              <Icon aria-hidden="true" />
              <span className="step-number">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="step-body">
              <b>{title}</b>
              <span>{text}</span>
            </div>
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
              <a href={`/professor/${t.slug}`} className="teacher-more">
                Saiba mais <ArrowRight aria-hidden="true" />
              </a>
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

const offerHighlights = [
  "Professores especialistas em concursos",
  "Metodologia direcionada, sem enrolação",
  "Suporte durante toda a preparação",
];
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
        <ul className="offer-points">
          {offerHighlights.map((item) => (
            <li key={item}>
              <Check aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal className="offer-card" delay={0.12}>
        <span className="offer-card-glow" aria-hidden="true" />
        <p>PREPARAÇÃO START</p>
        <strong>Plano completo</strong>
        <span>
          Tudo que você precisa para estudar com direção, do início à prova.
        </span>
        <ul className="offer-card-list">
          <li>
            <Check aria-hidden="true" /> Aulas com professores especialistas
          </li>
          <li>
            <Check aria-hidden="true" /> Material direcionado e simulados
          </li>
          <li>
            <Check aria-hidden="true" /> Acesso à preparação completa
          </li>
        </ul>
        <CTA />
      </Reveal>
    </section>
  );
}

const faqs = [
  {
    q: "Como funciona a preparação?",
    a: "A preparação funciona tanto para concursos com edital já divulgado quanto para os que ainda não têm edital publicado — você pode começar a estudar desde já, com o conteúdo direcionado ao seu objetivo.",
  },
  {
    q: "Como tenho acesso às aulas e materiais?",
    a: "Os materiais ficam disponíveis tanto no grupo do WhatsApp da turma quanto no site institucional da Start Aprovação — a própria página em que você está agora.",
  },
  {
    q: "Quem são os professores?",
    a: "Professor Petrônio, formado em Letras pela UFCG. Professor Antônio Júnior, formado em Letras pela UFCG e mestrando em Ensino pela UERN. Professor Luís Fernando, formado em Matemática, Ciência e Tecnologia e em Engenharia de Computação pela UFERSA, e mestrando em Engenharia Elétrica pela UFERSA.",
  },
  {
    q: "Existe suporte durante os estudos?",
    a: "Sim. O suporte inclui acompanhamento quantitativo do desempenho do aluno e dicas individuais de estudo, direcionadas ao seu ritmo e às suas dificuldades.",
  },
  {
    q: "Qual é a duração do acesso?",
    a: "A duração do acesso varia de acordo com o material e o concurso escolhido. Em geral, o material tem duração de 6 meses.",
  },
  {
    q: "Quais formas de pagamento estão disponíveis?",
    a: "Aceitamos cartão de crédito, cartão de débito, Pix e dinheiro.",
  },
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
          {faqs.map(({ q, a }, i) => (
            <button
              className="faq-item"
              key={q}
              onClick={() => setActive(active === i ? null : i)}
              aria-expanded={active === i}
            >
              <span>{q}</span>
              <ChevronDown className={active === i ? "rotate" : ""} />
              {active === i && <p>{a}</p>}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const path = window.location.pathname;
  if (path === "/materiais") return <Materials />;
  if (path === "/privacidade") return <PrivacyPolicy />;
  if (path === "/termos") return <TermsOfService />;
  if (path.startsWith("/professor/")) {
    const slug = path.replace("/professor/", "").replace(/\/$/, "");
    return <TeacherProfile slug={slug} />;
  }

  return (
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
