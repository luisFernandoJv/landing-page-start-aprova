import { motion } from "framer-motion";
import { Rocket, ClipboardList, ArrowRight } from "lucide-react";
import { trackEvent } from "../App";

const WhatsAppIcon = ({
  size = 18,
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

export function CtaFinal() {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto mb-10">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative rounded-3xl p-8 sm:p-14 text-center overflow-hidden bg-zinc-900/60 border border-zinc-800 shadow-2xl backdrop-blur-md"
      >
        {/* Brilho Superior Refinado (Glow Dinâmico) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-amber-500/15 blur-[80px] rounded-full pointer-events-none -z-10" />

        <div className="relative z-10">
          {/* Ícone de Destaque */}
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
            <Rocket size={28} className="text-zinc-950" />
          </div>

          {/* Headline com Tipografia Premium */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Assuma o controle da sua <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Aprovação
            </span>
          </h2>

          <p className="text-base md:text-lg mb-10 max-w-xl mx-auto text-zinc-400 leading-relaxed">
            O tempo está passando e a concorrência já começou. Dê o passo
            definitivo rumo à sua posse.
          </p>

          {/* Área de Botões (Idêntica à HeroSection para consistência) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Botão Primário: Ação Principal */}
            <motion.a
              href="https://forms.gle/e5GGQZqxGN2hMDnA6"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_click", {
                  location: "final_section",
                  type: "form",
                })
              }
              className="group relative flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 px-8 py-4 text-base font-bold text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50 active:scale-[0.98]"
            >
              <div className="absolute inset-0 rounded-xl border border-white/20 pointer-events-none" />
              <ClipboardList
                size={20}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <span style={{ fontFamily: "var(--font-display)" }}>
                Garantir Minha Vaga
              </span>
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </motion.a>

            {/* Botão Secundário: Redução de Atrito */}
            <motion.a
              href="https://wa.me/558398388509?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20a%20metodologia"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_click", {
                  location: "final_section",
                  type: "whatsapp",
                })
              }
              className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-zinc-900 border border-zinc-700 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-zinc-700 active:scale-[0.98]"
            >
              <WhatsAppIcon
                size={20}
                className="text-emerald-500 transition-transform duration-300 group-hover:scale-110"
              />
              <span style={{ fontFamily: "var(--font-display)" }}>
                Falar com Consultor
              </span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
