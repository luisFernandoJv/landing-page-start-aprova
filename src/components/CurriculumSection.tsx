import { motion } from "framer-motion";
import {
  BookOpen,
  Calculator,
  Globe,
  FileText,
  ChevronRight,
  Clock,
  Star,
} from "lucide-react";

const subjects = [
  {
    name: "Língua Portuguesa",
    icon: FileText,
    color: "var(--color-primary)",
    topics: [
      "Interpretação de Texto",
      "Gramática e Ortografia",
      "Redação Oficial",
      "Coesão e Coerência",
    ],
    hours: "40h",
  },
  {
    name: "Raciocínio Lógico",
    icon: Calculator,
    color: "var(--color-accent-blue)",
    topics: [
      "Lógica Proposicional",
      "Sequências Lógicas",
      "Análise Combinatória",
      "Probabilidade",
    ],
    hours: "30h",
  },
  {
    name: "Conhecimentos Gerais",
    icon: Globe,
    color: "var(--color-success)",
    topics: [
      "Atualidades",
      "Geografia do Brasil",
      "História Geral",
      "Meio Ambiente",
    ],
    hours: "25h",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function CurriculumSection() {
  return (
    <section id="conteudo" className="mb-8 lg:mb-0 scroll-mt-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center mb-5 sm:mb-6"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass mb-3"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--color-primary))]" />
          <span className="text-[10px] sm:text-xs font-bold text-[hsl(var(--color-primary))] uppercase tracking-wider">
            Conteúdo Programático
          </span>
        </motion.div>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white text-balance mb-2">
          O que você vai <span className="gradient-text">aprender</span>
        </h2>
        <p className="text-xs sm:text-sm text-[hsl(var(--color-foreground-muted))] max-w-md mx-auto">
          Grade completa focada no edital do IGECAP, com professores
          especialistas em cada área.
        </p>
      </motion.div>

      {/* Total Hours Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
        className="flex justify-center mb-5 sm:mb-6"
      >
        <motion.div
          className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl glass-strong"
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(var(--color-primary))]" />
          <div>
            <span className="block text-base sm:text-lg font-black text-white">
              +130 horas
            </span>
            <span className="text-[10px] sm:text-xs text-[hsl(var(--color-foreground-muted))]">
              de conteúdo total
            </span>
          </div>
          <div className="w-px h-6 sm:h-8 bg-white/10 mx-1 sm:mx-2" />
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Star
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--color-warning))]"
              fill="currentColor"
            />
            <span className="text-xs sm:text-sm font-bold text-[hsl(var(--color-warning))]">
              100% atualizado
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Subjects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-3 sm:space-y-4"
      >
        {subjects.map((subject, index) => {
          const IconComponent = subject.icon;
          return (
            <motion.div
              key={subject.name}
              variants={itemVariants}
              className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 group cursor-default"
              whileHover={{
                y: -4,
                scale: 1.01,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
              custom={index}
            >
              {/* Subject Header */}
              <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <motion.div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, hsla(${subject.color}, 0.2) 0%, hsla(${subject.color}, 0.05) 100%)`,
                      border: `1px solid hsla(${subject.color}, 0.25)`,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <IconComponent
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      style={{ color: `hsl(${subject.color})` }}
                    />
                  </motion.div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {subject.name}
                  </h3>
                </div>
                <motion.div
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold"
                  style={{
                    background: `hsla(${subject.color}, 0.1)`,
                    color: `hsl(${subject.color})`,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {subject.hours}
                </motion.div>
              </div>

              {/* Topics */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                {subject.topics.map((topic, topicIndex) => (
                  <motion.li
                    key={topic}
                    className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[hsl(var(--color-foreground-muted))] group-hover:text-white/80 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + topicIndex * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <ChevronRight
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0"
                      style={{ color: `hsl(${subject.color})` }}
                    />
                    {topic}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Extra Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-5 sm:mt-6 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl text-center"
        style={{
          background:
            "linear-gradient(135deg, hsla(var(--color-primary), 0.1) 0%, hsla(var(--color-primary-dark), 0.05) 100%)",
          border: "1px solid hsla(var(--color-primary), 0.2)",
        }}
        whileHover={{ scale: 1.01 }}
      >
        <p className="text-xs sm:text-sm text-[hsl(var(--color-foreground-muted))]">
          <strong className="text-[hsl(var(--color-primary))]">Bônus:</strong>{" "}
          Material em PDF + Simulados semanais + Grupo exclusivo de estudos
        </p>
      </motion.div>
    </section>
  );
}
