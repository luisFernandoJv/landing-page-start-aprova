import { motion } from "framer-motion";
import { CheckCircle, BrainCircuit, Target } from "lucide-react";

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
      className="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20"
    >
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fade}
        className="mb-14"
      >
        <div className="tag mb-5">Arquitetura do Método</div>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 max-w-2xl"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.03em",
          }}
        >
          Por que somos a máquina de{" "}
          <span className="gradient-text">fazer aprovados</span>?
        </h2>
        <p
          className="text-base leading-relaxed max-w-xl"
          style={{ color: "hsl(220,10%,58%)" }}
        >
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
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
      >
        {pillars.map(({ icon: Icon, title, desc }) => (
          <motion.div key={title} variants={fade} className="card p-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              style={{
                background: "hsla(36,100%,54%,0.1)",
                border: "1px solid hsla(36,100%,54%,0.2)",
              }}
            >
              <Icon size={20} style={{ color: "hsl(36,100%,54%)" }} />
            </div>
            <h3
              className="text-base font-bold text-white mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "hsl(220,10%,58%)" }}
            >
              {desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Differentials */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="card p-7 sm:p-9"
      >
        <div
          className="flex items-center gap-2 mb-1 text-xs font-bold uppercase tracking-widest"
          style={{ color: "hsl(36,100%,54%)" }}
        >
          Diferenciais Competitivos
        </div>
        <p
          className="text-2xl font-extrabold text-white mb-7"
          style={{ fontFamily: "var(--font-display)" }}
        >
          O que nos separa do resto
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {differentials.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle
                size={16}
                className="flex-shrink-0 mt-0.5"
                style={{ color: "hsl(36,100%,54%)" }}
              />
              <span
                className="text-sm leading-relaxed"
                style={{ color: "hsl(220,10%,58%)" }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
