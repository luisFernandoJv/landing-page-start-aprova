import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  Star,
  Users,
  MapPin,
  CheckCircle,
  ClipboardList,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";
import { trackEvent } from "../App";

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeInItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function HeroSection() {
  const handleCtaClick = () => {
    trackEvent("cta_click", {
      location: "hero_section",
      type: "inscription_form",
    });
  };

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="relative glass-strong rounded-3xl p-5 sm:p-6 lg:p-8 xl:p-10 mb-6 overflow-hidden"
    >
      {/* Top Accent Border */}
      <div className="absolute top-0 left-0 right-0 h-1 border-shimmer" />

      {/* Header */}
      <motion.div
        variants={fadeInItem}
        className="flex items-center gap-3 mb-5"
      >
        <div className="relative">
          <motion.div
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[hsl(var(--color-primary))] to-[hsl(var(--color-primary-dark))] flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.div>
          <motion.div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[hsl(var(--color-success))] border-2 border-[hsl(var(--color-background))] flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
          >
            <CheckCircle className="w-3 h-3 text-white" />
          </motion.div>
        </div>
        <div className="flex-1 min-w-0">
          <span className="block text-sm sm:text-base font-bold text-white truncate">
            Start Aprovação
          </span>
          <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[hsl(var(--color-foreground-muted))]">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[hsl(var(--color-primary))] flex-shrink-0" />
            <span className="truncate">
              Turma iniciada em 15 de marco de 2026
            </span>
          </span>
        </div>
        <motion.div
          className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-br from-[hsla(var(--color-primary),0.2)] to-[hsla(var(--color-primary-light),0.15)] border border-[hsla(var(--color-primary),0.3)] text-[hsl(var(--color-primary-light))] text-[10px] sm:text-[11px] font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full uppercase tracking-wide animate-badge-pulse flex-shrink-0"
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">Novo</span>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div variants={fadeInItem} className="text-left mb-5">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-3 leading-tight text-balance">
          Sua aprovação no <span className="gradient-text">IGECAP</span> começa
          aqui!
        </h1>

        <p className="text-xs sm:text-sm lg:text-base text-[hsl(var(--color-foreground-muted))] leading-relaxed mb-2">
          Nossa{" "}
          <strong className="text-white">
            1ª turma do preparatório IGECAP
          </strong>{" "}
          já está em andamento, com aulas presenciais, material completo e
          professores especializados.
        </p>

        <p className="text-xs sm:text-sm lg:text-base text-[hsl(var(--color-foreground-muted))] leading-relaxed">
          <strong className="text-[hsl(var(--color-primary))]">
            Ainda dá tempo
          </strong>{" "}
          de garantir sua vaga e conquistar a aprovação que você merece!
        </p>
      </motion.div>

      {/* Image Carousel */}
      <motion.div variants={fadeInItem}>
        <ImageCarousel />
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={fadeInItem}
        className="flex flex-wrap gap-2 mb-5 p-3 sm:p-3.5 rounded-2xl"
        style={{ background: "hsla(var(--color-background), 0.5)" }}
      >
        <motion.div
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl glass text-[10px] sm:text-xs text-[hsl(var(--color-foreground-muted))]"
          whileHover={{ scale: 1.03, y: -2 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--color-primary))]" />
          <span>Turma ativa</span>
        </motion.div>
        <motion.div
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold text-[hsl(var(--color-primary))]"
          style={{
            background: "hsla(var(--color-primary), 0.12)",
            border: "1px solid hsla(var(--color-primary), 0.25)",
          }}
          whileHover={{ scale: 1.03, y: -2 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Uirauna & Poço Dantas</span>
        </motion.div>
        <motion.div
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl glass text-[10px] sm:text-xs text-[hsl(var(--color-foreground-muted))]"
          whileHover={{ scale: 1.03, y: -2 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Star
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--color-warning))]"
            fill="currentColor"
          />
          <span>100% Presencial</span>
        </motion.div>
      </motion.div>

      {/* CTA Button */}
      <motion.a
        variants={fadeInItem}
        href="https://forms.gle/e5GGQZqxGN2hMDnA6"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCtaClick}
        className="group shine-effect flex items-center justify-center gap-2 sm:gap-3 w-full bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-primary-dark))] text-white font-bold py-3.5 sm:py-4 px-5 sm:px-6 rounded-2xl shadow-lg glow-primary border border-white/20"
        whileHover={{ scale: 1.02, y: -3 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Garantir minha vaga agora</span>
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
      </motion.a>
    </motion.section>
  );
}
