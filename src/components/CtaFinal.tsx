import { motion } from "framer-motion";
import {
  Rocket,
  ClipboardList,
  ArrowRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { trackEvent } from "../App";

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

export function CtaFinal() {
  const handleFormClick = () => {
    trackEvent("cta_click", {
      location: "final_section",
      type: "inscription_form",
    });
  };

  const handleWhatsAppClick = () => {
    trackEvent("cta_click", {
      location: "final_section",
      type: "whatsapp_contact",
    });
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-10 text-center mb-6 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 rounded-full -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle, hsla(var(--color-primary), 0.15) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Animated Icon */}
        <motion.div
          variants={itemVariants}
          className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 relative"
        >
          <motion.div
            className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[hsl(var(--color-primary))] to-[hsl(var(--color-primary-dark))] flex items-center justify-center shadow-lg glow-primary"
            animate={{
              y: [0, -6, 0],
              rotate: [-3, 3, -3],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Rocket className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </motion.div>
          {/* Sparkle decorations */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 text-[hsl(var(--color-warning))]" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >
            <Sparkles className="absolute -bottom-1 -left-2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--color-primary))]" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-2 sm:mb-3 text-balance"
        >
          <span className="gradient-text">Não perca</span>
          <br />
          <span className="text-white">essa oportunidade!</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm text-[hsl(var(--color-foreground-muted))] mb-5 sm:mb-7 leading-relaxed max-w-xs mx-auto"
        >
          Garanta sua vaga agora e dê o primeiro passo rumo à sua aprovação no
          concurso.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 sm:justify-center"
        >
          {/* Main CTA */}
          <motion.a
            href="https://forms.gle/e5GGQZqxGN2hMDnA6"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleFormClick}
            className="group shine-effect flex items-center gap-3 sm:gap-4 w-full sm:w-auto bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-primary-dark))] text-white font-bold py-3.5 sm:py-4 px-4 sm:px-6 lg:px-8 rounded-xl sm:rounded-2xl shadow-lg glow-primary border border-white/20"
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="flex-1 text-left">
              <strong className="block text-sm sm:text-base">
                Formulário de Inscrição
              </strong>
              <small className="text-[10px] sm:text-xs opacity-85 font-medium">
                Clique aqui para garantir sua vaga
              </small>
            </span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-300 flex-shrink-0" />
          </motion.a>

          {/* Secondary CTA - WhatsApp */}
          <motion.a
            href="https://wa.me/558398388509?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20curso"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="group flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto py-3.5 sm:py-4 px-5 sm:px-6 lg:px-8 rounded-xl sm:rounded-2xl border-2 border-[hsla(var(--color-whatsapp),0.4)] text-[hsl(var(--color-whatsapp))] font-bold hover:bg-[hsla(var(--color-whatsapp),0.1)] hover:border-[hsla(var(--color-whatsapp),0.6)] transition-all"
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Dúvidas? Fale Conosco</span>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
