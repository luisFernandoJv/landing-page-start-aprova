import { motion } from "framer-motion";
import { Instagram, Mail, Phone, MapPin, ChevronRight } from "lucide-react";

// Ícone customizado do WhatsApp
const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/startaprova/",
    label: "Siga no Instagram",
    hoverClass: "hover:text-pink-500 hover:border-pink-500/50",
  },
  {
    icon: WhatsAppIcon,
    href: "https://wa.me/558398388509",
    label: "Fale no WhatsApp",
    hoverClass: "hover:text-emerald-500 hover:border-emerald-500/50",
  },
];

const quickLinks = [
  { label: "Início", href: "#inicio" },
  { label: "O Método", href: "#sobre" },
  { label: "Grade Curricular", href: "#conteudo" },
  { label: "Depoimentos", href: "#depoimentos" },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative pt-16 pb-8 mt-20 border-t border-zinc-800 bg-zinc-950"
    >
      {/* Brilho sutil no topo do footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Coluna 1: Marca e Descrição (Ocupa mais espaço) */}
          <div className="md:col-span-5 lg:col-span-4">
            <h3
              className="text-2xl font-extrabold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Start{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Aprovação
              </span>
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400 mb-6">
              O arsenal completo para sua aprovação. Aplicamos engenharia
              reversa nas principais bancas do país para você estudar apenas o
              que realmente cai na prova.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className={`group flex w-10 h-10 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 ${social.hoverClass}`}
                  >
                    <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="md:col-span-3 lg:col-span-4 lg:pl-12">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              Navegação Rápida
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center text-sm text-zinc-400 transition-colors hover:text-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 rounded-md w-fit"
                  >
                    <ChevronRight
                      size={14}
                      className="mr-1.5 opacity-0 -ml-5 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 text-amber-500"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Contato e Localização */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              Fale Conosco
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+5583983888509"
                className="flex items-start gap-3 text-sm text-zinc-400 transition-colors hover:text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 rounded-md"
              >
                <Phone className="w-4 h-4 mt-0.5 text-zinc-500 group-hover:text-amber-500 transition-colors" />
                <span>(83) 98388-8509</span>
              </a>
              <a
                href="mailto:contato@startaprovacao.com.br"
                className="flex items-start gap-3 text-sm text-zinc-400 transition-colors hover:text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 rounded-md"
              >
                <Mail className="w-4 h-4 mt-0.5 text-zinc-500 group-hover:text-amber-500 transition-colors" />
                <span>contato@startaprovacao.com.br</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-zinc-400">
                <MapPin className="w-4 h-4 mt-0.5 text-zinc-500 flex-shrink-0" />
                <div>
                  <span className="block text-white mb-0.5">Uiraúna — PB</span>
                  <span className="block text-xs">
                    Aulas Presenciais & Online para todo o Brasil
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Linha Inferior: Copyright e Informações Legais */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 text-center md:text-left">
            © {new Date().getFullYear()} Start Aprovação. Todos os direitos
            reservados.
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">
              Termos de Uso
            </a>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <a href="#" className="hover:text-white transition-colors">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
