import { motion } from "framer-motion";
import {
  BookOpen,
  ClipboardList,
  Headphones,
  Users,
  Target,
  MessageSquare,
  Zap,
} from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Material Completo",
    description: "Apostilas e material didático atualizado para o IGECAP",
  },
  {
    icon: ClipboardList,
    title: "Simulados Exclusivos",
    description: "Provas simuladas com o mesmo estilo da banca",
  },
  {
    icon: Headphones,
    title: "Suporte de Monitoria",
    description: "Tire suas dúvidas com monitores especializados",
  },
  {
    icon: Users,
    title: "Turmas Reduzidas",
    description: "Acompanhamento mais próximo do professor",
  },
  {
    icon: Target,
    title: "Foco no Edital",
    description: "Conteúdo 100% direcionado ao concurso IGECAP",
  },
  {
    icon: MessageSquare,
    title: "Grupo de Estudos",
    description: "Comunidade ativa para troca de conhecimentos",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function Benefits() {
  return (
    <section className="mb-6">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={headerVariants}
        className="text-center mb-5 lg:mb-6"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass mb-3"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--color-primary))]" />
          <span className="text-[10px] sm:text-xs font-bold text-[hsl(var(--color-primary))] uppercase tracking-wider">
            Benefícios inclusos
          </span>
        </motion.div>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white text-balance">
          Tudo que você precisa para{" "}
          <span className="gradient-text">ser aprovado</span>
        </h2>
      </motion.div>

      {/* Benefits Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-4"
      >
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              className="glass-strong rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 group cursor-default"
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
              custom={index}
            >
              <motion.div
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[hsla(var(--color-primary),0.2)] to-[hsla(var(--color-primary),0.05)] border border-[hsla(var(--color-primary),0.2)] flex items-center justify-center mb-2.5 sm:mb-3"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[hsl(var(--color-primary))]" />
              </motion.div>
              <h3 className="text-xs sm:text-sm lg:text-base font-bold text-white mb-0.5 sm:mb-1">
                {benefit.title}
              </h3>
              <p className="text-[10px] sm:text-xs lg:text-sm text-[hsl(var(--color-foreground-muted))] leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
