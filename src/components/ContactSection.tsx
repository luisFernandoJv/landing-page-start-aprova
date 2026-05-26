import { motion } from "framer-motion";
import { Mail, MapPin, Clock, ArrowRight, Instagram } from "lucide-react";
import { trackEvent } from "../App";

const WhatsAppIcon = ({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const channels = [
  {
    icon: Instagram,
    label: "Instagram",
    value: "@startaprova",
    href: "https://www.instagram.com/startaprova/",
    colorClass: "text-pink-500",
    bgClass: "bg-pink-500/10",
    borderClass: "border-pink-500/20",
    hoverClass: "hover:border-pink-500/50 hover:bg-pink-500/20",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@startaprovacao.com",
    href: "mailto:contato@startaprovacao.com",
    colorClass: "text-blue-400",
    bgClass: "bg-blue-400/10",
    borderClass: "border-blue-400/20",
    hoverClass: "hover:border-blue-400/50 hover:bg-blue-400/20",
  },
];

const locations = [
  {
    city: "Uiraúna — PB",
    address: "Escola Benevenuto Mariano (Presencial)",
    schedule: "Domingos, 8h às 12h",
  },
  {
    city: "Formato Online",
    address: "Acesso de qualquer lugar do Brasil",
    schedule: "Aulas e materiais digitais disponíveis",
  },
];

export function ContactSection() {
  return (
    <section
      id="contato"
      className="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs font-medium uppercase tracking-wider mb-5 backdrop-blur-sm shadow-sm">
          Contato
        </div>
        <h2
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Fale{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            conosco
          </span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Coluna Esquerda */}
        <div className="space-y-4">
          {/* WhatsApp CTA Premium */}
          <motion.a
            href="https://wa.me/5583996372727?text=Ola!%20Quero%20saber%20mais%20sobre%20o%20curso%20preparatorio%20Start%20Aprovacao!"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("contact_click", { method: "whatsapp_main" })
            }
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative flex items-center gap-4 p-5 rounded-2xl w-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/50"
          >
            {/* Brilho interno para volume */}
            <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none" />

            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/20 backdrop-blur-sm shadow-inner transition-transform duration-300 group-hover:scale-110">
              <WhatsAppIcon size={24} />
            </div>
            <div className="flex-1">
              <span
                className="block text-lg font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Falar no WhatsApp
              </span>
              <span className="text-sm font-medium text-emerald-100/90">
                (83) 99637-2727
              </span>
            </div>
            <ArrowRight
              size={20}
              className="text-white/80 transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.a>

          {/* Outros Canais */}
          <div className="grid grid-cols-2 gap-4">
            {channels.map(
              ({
                icon: Icon,
                label,
                value,
                href,
                colorClass,
                bgClass,
                borderClass,
                hoverClass,
              }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("contact_click", { method: label.toLowerCase() })
                  }
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className={`group p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 ${hoverClass}`}
                >
                  <div
                    className={`w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center transition-colors duration-300 ${bgClass} ${borderClass}`}
                  >
                    <Icon
                      size={20}
                      className={`${colorClass} transition-transform duration-300 group-hover:scale-110`}
                    />
                  </div>
                  <span
                    className="block text-sm font-bold text-white mb-0.5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {label}
                  </span>
                  <span className="text-xs text-zinc-400 truncate block">
                    {value}
                  </span>
                </motion.a>
              ),
            )}
          </div>
        </div>

        {/* Coluna Direita — Locais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-7 rounded-2xl bg-zinc-900/50 border border-zinc-800"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/20">
              <MapPin size={22} className="text-blue-400" />
            </div>
            <div>
              <h3
                className="text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Locais de Aula
              </h3>
              <p className="text-sm text-zinc-400">Presencial & Online</p>
            </div>
          </div>

          <div className="space-y-4">
            {locations.map((loc) => (
              <div
                key={loc.city}
                className="p-5 rounded-xl bg-zinc-950/50 border border-zinc-800/80 transition-colors hover:border-zinc-700"
              >
                <span
                  className="block text-sm font-bold text-amber-500 mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {loc.city}
                </span>
                <span className="block text-sm text-zinc-300 mb-3">
                  {loc.address}
                </span>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                  <Clock size={14} />
                  {loc.schedule}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
