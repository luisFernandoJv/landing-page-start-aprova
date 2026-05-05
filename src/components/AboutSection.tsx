import { motion } from "framer-motion";
import {
  Target,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Sparkles,
} from "lucide-react";

const stats = [
  { value: "100%", label: "Presencial", icon: Users },
  { value: "2", label: "Cidades", icon: Target },
  { value: "+500", label: "Questões", icon: Award },
];

const differentials = [
  "Professores especializados em concursos",
  "Material didatico atualizado e exclusivo",
  "Turmas reduzidas para melhor aprendizado",
  "Simulados no estilo da banca IGECAP",
  "Suporte continuo via WhatsApp",
  "Metodologia focada em aprovacao",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function AboutSection() {
  return (
    <section id="sobre" className="mb-8 lg:mb-0 scroll-mt-24">
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
          <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--color-primary))]" />
          <span className="text-[10px] sm:text-xs font-bold text-[hsl(var(--color-primary))] uppercase tracking-wider">
            Sobre o curso
          </span>
        </motion.div>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white text-balance mb-2">
          Por que escolher o{" "}
          <span className="gradient-text">Start Aprovação</span>?
        </h2>
        <p className="text-xs sm:text-sm text-[hsl(var(--color-foreground-muted))] max-w-md mx-auto">
          Somos especializados em preparar candidatos para o concurso IGECAP com
          metodologia comprovada.
        </p>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-3 gap-2 sm:gap-3 mb-5 sm:mb-6"
      >
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="glass-strong rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center group cursor-default"
              whileHover={{
                y: -4,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
              custom={index}
            >
              <motion.div
                className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 sm:mb-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-[hsla(var(--color-primary),0.2)] to-[hsla(var(--color-primary),0.05)] border border-[hsla(var(--color-primary),0.2)] flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(var(--color-primary))]" />
              </motion.div>
              <span className="block text-lg sm:text-xl font-black text-white">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs text-[hsl(var(--color-foreground-muted))]">
                {stat.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8"
        whileHover={{
          y: -4,
          transition: { type: "spring", stiffness: 300, damping: 25 },
        }}
      >
        {/* Mission */}
        <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-white/10">
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3">
            <motion.div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-[hsla(var(--color-accent-blue),0.2)] to-[hsla(var(--color-accent-blue),0.05)] border border-[hsla(var(--color-accent-blue),0.2)] flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(var(--color-accent-blue))]" />
            </motion.div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              Nossa Missão
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[hsl(var(--color-foreground-muted))] leading-relaxed">
            Transformar o sonho da estabilidade financeira em realidade por meio
            de uma preparação de excelência para o concurso IGECAP. Acreditamos
            que, com o método certo e dedicação,{" "}
            <strong className="text-white">
              qualquer pessoa pode conquistar sua aprovação
            </strong>
            .
          </p>
        </div>

        {/* Differentials */}
        <div>
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <motion.div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-[hsla(var(--color-primary),0.2)] to-[hsla(var(--color-primary),0.05)] border border-[hsla(var(--color-primary),0.2)] flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(var(--color-primary))]" />
            </motion.div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              Nossos Diferenciais
            </h3>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {differentials.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex items-start gap-2 sm:gap-2.5 group"
                whileHover={{ x: 4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--color-success))] flex-shrink-0 mt-0.5" />
                </motion.div>
                <span className="text-xs sm:text-sm text-[hsl(var(--color-foreground-muted))] group-hover:text-white transition-colors">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
