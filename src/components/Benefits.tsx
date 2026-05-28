import { motion } from "framer-motion";
import {
  BookOpen,
  ClipboardList,
  Headphones,
  Users,
  Target,
  MessageSquare,
  Award,
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
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Benefits() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 max-w-[1200px] mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fade}
        className="mb-14 lg:mb-20 text-center flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-[11px] font-bold uppercase tracking-wider mb-4 backdrop-blur-sm shadow-sm">
          <Award size={14} className="text-amber-500" />
          Vantagem Competitiva
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          O arsenal completo para sua{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            aprovação
          </span>
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {benefits.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={fade}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-sm transition-all hover:border-amber-500/30 hover:bg-zinc-900/60 flex flex-col group"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-amber-500/10 border border-amber-500/20 group-hover:scale-110 transition-transform duration-300">
              <Icon size={24} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-display">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
