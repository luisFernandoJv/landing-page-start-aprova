import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  BrainCircuit,
  Target,
  Trophy,
  Search,
  BookOpenCheck,
  RefreshCw,
  Award,
} from "lucide-react";

const differentials = [
  "Engenharia reversa das principais bancas do país",
  "Ciclos de estudo e revisões espaçadas programadas",
  "Mentoria estratégica e acompanhamento de métricas",
  "Simulados com correção focada em pontos cegos",
  "Material focado no Princípio de Pareto — 80/20",
  "Ecossistema imersivo para blindagem emocional",
];

const pillars = [
  {
    icon: BrainCircuit,
    title: "Análise de Dados",
    desc: "Mapeamos o histórico de provas para entregar apenas o que cai.",
  },
  {
    icon: Target,
    title: "Tática de Prova",
    desc: "Aprenda a resolver questões com velocidade e precisão.",
  },
  {
    icon: CheckCircle,
    title: "Resultado Real",
    desc: "Metodologia validada por aprovados em todo o Brasil.",
  },
];

const steps = [
  {
    icon: Search,
    title: "Mapeamento da Banca",
    short: "Raio-X do histórico de provas",
    desc: "Cruzamos anos de provas anteriores da banca do seu concurso para identificar os temas que mais caem — e os que você pode ignorar com segurança.",
  },
  {
    icon: BookOpenCheck,
    title: "Material Cirúrgico",
    short: "Só o que cai, sem enrolação",
    desc: "Apostilas enxutas construídas com o Princípio de Pareto: 20% do conteúdo responsável por 80% dos pontos possíveis na prova.",
  },
  {
    icon: RefreshCw,
    title: "Ciclos de Revisão",
    short: "Repetição espaçada e programada",
    desc: "Cronograma de revisões e simulados calibrados no nível exato da banca, para fixar o conteúdo na memória de longo prazo.",
  },
  {
    icon: Award,
    title: "Prova & Aprovação",
    short: "Tática de resolução rápida",
    desc: "Você chega no dia sabendo exatamente o que esperar, com estratégia de tempo e resolução treinada até virar hábito.",
  },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── Sub-componente: Ciclo do Método (interativo) ─────────────────────────────
// Visualização prática do passo a passo — clique em cada etapa para ver o
// detalhe. A linha de progresso "desenha" suavemente ao entrar na tela e se
// atualiza ao trocar de etapa.
function MethodCycle() {
  const [active, setActive] = useState(0);
  const ActiveIcon = steps[active].icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mb-16 p-6 sm:p-10 lg:p-12 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm relative overflow-hidden"
    >
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-500/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="relative z-10 mb-10 lg:mb-14 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
          Passo a Passo
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-2">
          O ciclo do método, na prática
        </h3>
      </div>

      {/* Trilho de etapas */}
      <div className="relative z-10 flex items-start justify-between max-w-3xl mx-auto mb-10">
        {/* Linha base */}
        <div className="absolute top-6 left-0 right-0 h-[2px] bg-zinc-800 mx-6" />
        {/* Linha de progresso animada */}
        <motion.div
          className="absolute top-6 left-6 h-[2px] bg-gradient-to-r from-amber-400 to-orange-500 origin-left"
          initial={{ width: "0%" }}
          whileInView={{
            width: `calc(${(active / (steps.length - 1)) * 100}% - 3rem)`,
          }}
          animate={{
            width: `calc(${(active / (steps.length - 1)) * 100}% - 3rem)`,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {steps.map((step, i) => {
          const StepIcon = step.icon;
          const isActive = i === active;
          const isDone = i < active;
          return (
            <button
              key={step.title}
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className="relative z-10 flex flex-col items-center gap-3 flex-1 group focus:outline-none"
            >
              <motion.span
                animate={{
                  scale: isActive ? 1.12 : 1,
                  backgroundColor:
                    isActive || isDone ? "rgb(245 158 11)" : "rgb(24 24 27)",
                  borderColor:
                    isActive || isDone ? "rgb(245 158 11)" : "rgb(63 63 70)",
                }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg"
              >
                <StepIcon
                  size={18}
                  className={
                    isActive || isDone
                      ? "text-zinc-950"
                      : "text-zinc-500 group-hover:text-zinc-300"
                  }
                />
              </motion.span>
              <span
                className={`hidden sm:block text-[11px] font-bold text-center leading-tight max-w-[7.5rem] transition-colors ${
                  isActive
                    ? "text-amber-500"
                    : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Painel de detalhe da etapa ativa */}
      <div className="relative z-10 max-w-2xl mx-auto min-h-[9rem] sm:min-h-[7.5rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 text-center sm:text-left"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-amber-500/10 border border-amber-500/20">
              <ActiveIcon size={20} className="text-amber-500" />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-1">
                Etapa {active + 1} de {steps.length} — {steps[active].short}
              </span>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {steps[active].desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegação simples entre etapas */}
      <div className="relative z-10 flex items-center justify-center gap-2 mt-6">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Ver etapa ${i + 1}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === active ? "22px" : "7px",
              background:
                i === active ? "hsl(38,95%,54%)" : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="py-20 lg:py-28 px-4 sm:px-6 max-w-[1200px] mx-auto overflow-hidden"
    >
      {/* Header Padronizado com o Radar */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fade}
        className="mb-14 lg:mb-20 text-center flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-[11px] font-bold uppercase tracking-wider mb-4 backdrop-blur-sm shadow-sm">
          <Trophy size={14} className="text-amber-500" />
          Arquitetura do Método
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          Por que somos a máquina de{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            fazer aprovados?
          </span>
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Não acreditamos em força bruta. Acreditamos em análise de dados,
          inteligência emocional e tática de prova.
        </p>
      </motion.div>

      {/* Pillars */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mb-16"
      >
        {pillars.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={fade}
            className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-amber-500/30 transition-colors backdrop-blur-sm flex flex-col items-center text-center group"
          >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-amber-500/10 border border-amber-500/20 group-hover:scale-110 transition-transform duration-300">
              <Icon size={24} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-display">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400">{desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Ciclo do método — visual, interativo e prático */}
      <MethodCycle />

      {/* Differentials - Agora parece uma extensão limpa da UI */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-8 lg:p-12 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-widest text-amber-500">
          Vantagem Competitiva
        </div>
        <p className="text-2xl sm:text-3xl font-extrabold text-white mb-8 font-display">
          O arsenal completo para sua aprovação
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {differentials.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle
                size={18}
                className="flex-shrink-0 mt-0.5 text-amber-500"
              />
              <span className="text-sm sm:text-base leading-relaxed text-zinc-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
