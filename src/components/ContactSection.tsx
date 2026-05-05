import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Instagram,
} from "lucide-react";
import { trackEvent } from "../App";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const contactMethods = [
  {
    icon: Instagram,
    label: "Instagram",
    value: "@startaprova",
    href: "https://www.instagram.com/startaprova/",
    color: "var(--color-primary)",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@startaprovacao.com",
    href: "mailto:contato@startaprovacao.com",
    color: "var(--color-accent-blue)",
  },
];

const locations = [
  {
    city: "Poço Dantas",
    address: "Escola Rosa Dias, Centro",
    schedule: "Domingos, 8h às 12h",
  },
  {
    city: "Uiraúna",
    address: "Escola Benevenuto Mariano",
    schedule: "Domingos, 8h às 12h",
  },
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

export function ContactSection() {
  return (
    <section id="contato" className="mb-8 lg:mb-0 scroll-mt-24">
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
          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--color-primary))]" />
          <span className="text-[10px] sm:text-xs font-bold text-[hsl(var(--color-primary))] uppercase tracking-wider">
            Contato
          </span>
        </motion.div>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white text-balance mb-2">
          Fale <span className="gradient-text">conosco</span>
        </h2>
        <p className="text-xs sm:text-sm text-[hsl(var(--color-foreground-muted))] max-w-md mx-auto">
          Tire suas duvidas e garanta sua vaga. Estamos prontos para te ajudar!
        </p>
      </motion.div>

      {/* Primary CTA - WhatsApp */}
      <motion.a
        href="https://wa.me/5583996372727?text=Ola!%20Quero%20saber%20mais%20sobre%20o%20curso%20preparatorio%20Start%20Aprovacao!"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("contact_click", { method: "whatsapp_main" })}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="group shine-effect flex items-center justify-center gap-3 sm:gap-4 w-full p-4 sm:p-5 mb-5 sm:mb-6 rounded-xl sm:rounded-2xl shadow-lg glow-whatsapp"
        style={{
          background:
            "linear-gradient(135deg, hsl(142, 70%, 45%) 0%, hsl(142, 70%, 35%) 100%)",
        }}
        whileHover={{ scale: 1.02, y: -3 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <WhatsAppIcon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
        </motion.div>
        <div className="flex-1 text-left">
          <span className="block text-base sm:text-lg font-black text-white">
            Falar no WhatsApp
          </span>
          <span className="text-xs sm:text-sm text-white/80">
            (83) 99637-2727
          </span>
        </div>
        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-1.5 transition-transform duration-300" />
      </motion.a>

      {/* Other Contact Methods */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-5 sm:mb-6"
      >
        {contactMethods.map((method, index) => {
          const IconComponent = method.icon;
          return (
            <motion.a
              key={method.label}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("contact_click", {
                  method: method.label.toLowerCase(),
                })
              }
              variants={itemVariants}
              custom={index}
              className="glass-strong rounded-xl sm:rounded-2xl p-3.5 sm:p-4 group text-center"
              whileHover={{
                y: -4,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
            >
              <motion.div
                className="w-9 h-9 sm:w-10 sm:h-10 mx-auto mb-2 rounded-lg sm:rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, hsla(${method.color}, 0.2) 0%, hsla(${method.color}, 0.05) 100%)`,
                  border: `1px solid hsla(${method.color}, 0.25)`,
                }}
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <IconComponent
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  style={{ color: `hsl(${method.color})` }}
                />
              </motion.div>
              <span className="block text-xs sm:text-sm font-bold text-white mb-0.5">
                {method.label}
              </span>
              <span className="text-[10px] sm:text-xs text-[hsl(var(--color-foreground-muted))] truncate block">
                {method.value}
              </span>
            </motion.a>
          );
        })}
      </motion.div>

      {/* Locations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6"
        whileHover={{
          y: -2,
          transition: { type: "spring", stiffness: 300, damping: 25 },
        }}
      >
        <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-white/10">
          <motion.div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-[hsla(var(--color-accent-blue),0.2)] to-[hsla(var(--color-accent-blue),0.05)] border border-[hsla(var(--color-accent-blue),0.2)] flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(var(--color-accent-blue))]" />
          </motion.div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              Locais de Aula
            </h3>
            <p className="text-[10px] sm:text-xs text-[hsl(var(--color-foreground-muted))]">
              Aulas 100% presenciais
            </p>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {locations.map((loc, index) => (
            <motion.div
              key={loc.city}
              className="p-3 sm:p-4 rounded-lg sm:rounded-xl"
              style={{ background: "hsla(var(--color-background), 0.4)" }}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{
                x: 4,
                backgroundColor: "hsla(var(--color-background), 0.6)",
              }}
            >
              <span className="block text-xs sm:text-sm font-bold text-[hsl(var(--color-primary))] mb-0.5 sm:mb-1">
                {loc.city}
              </span>
              <span className="block text-[10px] sm:text-xs text-[hsl(var(--color-foreground-muted))] mb-1.5 sm:mb-2">
                {loc.address}
              </span>
              <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-[hsl(var(--color-foreground-muted))]">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {loc.schedule}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
