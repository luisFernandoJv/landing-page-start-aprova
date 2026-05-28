import { motion } from "framer-motion";
import { CheckCircle, BrainCircuit, Target, Trophy } from "lucide-react";

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

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
