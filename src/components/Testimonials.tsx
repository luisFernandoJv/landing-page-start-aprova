import { motion } from "framer-motion";
import { Star, Quote, MessageSquare } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Aluna aprovada",
    text: "O material é muito completo e os professores explicam de forma clara. Consegui minha aprovação!",
    rating: 5,
  },
  {
    name: "João Santos",
    role: "Aluno da 1ª turma",
    text: "Excelente metodologia de ensino. As aulas presenciais fazem toda a diferença na preparação.",
    rating: 5,
  },
  {
    name: "Ana Costa",
    role: "Concurseira",
    text: "Melhor investimento que fiz! O suporte é incrível e os simulados são muito parecidos com a prova.",
    rating: 5,
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
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function Testimonials() {
  return (
    <section className="mb-6 lg:mb-0">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center mb-4 sm:mb-5"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass mb-3"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--color-primary))]" />
          <span className="text-[10px] sm:text-xs font-bold text-[hsl(var(--color-primary))] uppercase tracking-wider">
            Depoimentos
          </span>
        </motion.div>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white text-balance">
          O que nossos <span className="gradient-text">alunos dizem</span>
        </h2>
      </motion.div>

      {/* Testimonials */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-2.5 sm:space-y-3"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 relative overflow-hidden group cursor-default"
            whileHover={{
              y: -4,
              scale: 1.01,
              transition: { type: "spring", stiffness: 400, damping: 17 },
            }}
          >
            {/* Quote Icon */}
            <motion.div
              className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[hsla(var(--color-primary),0.1)] flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--color-primary))] rotate-180" />
            </motion.div>

            {/* Rating */}
            <div className="flex gap-0.5 mb-2.5 sm:mb-3">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3 + i * 0.1,
                    type: "spring",
                    stiffness: 500,
                  }}
                >
                  <Star
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--color-warning))]"
                    fill="currentColor"
                  />
                </motion.div>
              ))}
            </div>

            {/* Text */}
            <p className="text-xs sm:text-sm text-[hsl(var(--color-foreground-muted))] leading-relaxed mb-3 sm:mb-4 pr-8">
              {`"${testimonial.text}"`}
            </p>

            {/* Author */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <motion.div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[hsl(var(--color-primary))] to-[hsl(var(--color-primary-dark))] flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {testimonial.name.charAt(0)}
              </motion.div>
              <div>
                <span className="block text-xs sm:text-sm font-bold text-white">
                  {testimonial.name}
                </span>
                <span className="text-[10px] sm:text-xs text-[hsl(var(--color-foreground-muted))]">
                  {testimonial.role}
                </span>
              </div>
            </div>

            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[hsla(var(--color-primary),0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
