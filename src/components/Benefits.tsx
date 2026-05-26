import { motion } from "framer-motion";
import {
  BookOpen,
  ClipboardList,
  Headphones,
  Users,
  Target,
  MessageSquare,
} from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Material Cirúrgico",
    desc: "Apostilas e PDFs focados na regra de Pareto 80/20. Estude apenas o que cai.",
  },
  {
    icon: ClipboardList,
    title: "Simulados Calibrados",
    desc: "Treinamento com o nível de dificuldade exato e as pegadinhas das maiores bancas.",
  },
  {
    icon: Headphones,
    title: "Suporte Especializado",
    desc: "Tire dúvidas técnicas e receba direcionamento estratégico da equipe.",
  },
  {
    icon: Users,
    title: "Turma de Elite",
    desc: "Acompanhamento focado no seu rendimento. Sem turmas superlotadas.",
  },
  {
    icon: Target,
    title: "Engenharia de Prova",
    desc: "Método de resolução rápida para ganhar tempo e evitar brancos.",
  },
  {
    icon: MessageSquare,
    title: "Comunidade Blindada",
    desc: "Networking com quem tem o mesmo nível de foco e disciplina que você.",
  },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function Benefits() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fade}
        className="mb-12"
      >
        <div className="tag mb-5">Vantagem Competitiva</div>
        <h2
          className="text-3xl sm:text-4xl font-extrabold text-white max-w-xl"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.03em",
          }}
        >
          O arsenal completo para sua{" "}
          <span className="gradient-text">aprovação</span>
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {benefits.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={fade}
            className="card p-6 group"
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors"
              style={{
                background: "hsla(36,100%,54%,0.08)",
                border: "1px solid hsla(36,100%,54%,0.15)",
              }}
            >
              <Icon size={18} style={{ color: "hsl(36,100%,54%)" }} />
            </div>
            <h3
              className="text-sm font-bold text-white mb-2"
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
    </section>
  );
}
