import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  MapPin,
  Calendar,
  Users,
  ClipboardList,
} from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";
import { trackEvent } from "../App";

const WhatsAppIcon = ({ size = 18, className = "" }) => (
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

const proofPoints = [
  { icon: CheckCircle, label: "Metodologia Validada" },
  { icon: MapPin, label: "Híbrido (Presencial & Online)" },
  { icon: Calendar, label: "Matrículas Abertas" },
  { icon: Users, label: "Turma Limitada" },
];

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="pt-28 lg:pt-32 pb-16 px-4 sm:px-6 max-w-[1200px] mx-auto overflow-hidden"
    >
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Lado Esquerdo — Copy */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="lg:col-span-7 pr-0 lg:pr-6"
        >
          {/* Badge Superior */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs font-semibold mb-6 backdrop-blur-sm shadow-sm transition-colors hover:bg-zinc-800/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="tracking-wide">
              Vagas Limitadas <span className="text-zinc-600 mx-2">•</span>{" "}
              Turma 2026
            </span>
          </div>

          {/* Margem inferior do H1 reduzida de mb-6 para mb-4 */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-white mb-4 leading-[1.05] tracking-tight font-display">
            Pare de estudar no escuro. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Aprove com método.
            </span>
          </h1>

          {/* Margem inferior do P reduzida de mb-10 para mb-8 */}
          <p className="text-base sm:text-lg leading-relaxed text-zinc-400 mb-8 max-w-[90%] text-pretty">
            Aplicamos{" "}
            <strong className="text-zinc-200 font-semibold">
              engenharia reversa nas bancas examinadoras
            </strong>
            . Ciclos de revisão, análise de provas anteriores e retenção máxima
            — seja presencial ou online.
          </p>

          {/* Área de Botões com espaçamento ajustado */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <motion.a
              href="https://forms.gle/e5GGQZqxGN2hMDnA6"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_click", { location: "hero", type: "form" })
              }
              className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 px-7 py-3.5 text-base font-bold text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <div className="absolute inset-0 rounded-xl border border-white/20 pointer-events-none" />
              <ClipboardList
                size={20}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <span className="font-display">Garantir Minha Vaga</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </motion.a>

            <motion.a
              href="https://wa.me/558398388509?text=Ola!%20Quero%20saber%20mais%20sobre%20o%20curso%20preparatorio%20Start%20Aprovacao!"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_click", { location: "hero", type: "whatsapp" })
              }
              className="group flex items-center justify-center gap-3 rounded-xl bg-zinc-900 border border-zinc-700 px-7 py-3.5 text-base font-bold text-white transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-500 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <WhatsAppIcon
                size={20}
                className="text-emerald-500 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-display">Falar no WhatsApp</span>
            </motion.a>
          </div>

          <div className="flex flex-wrap gap-3 max-w-2xl">
            {proofPoints.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-400 font-medium"
              >
                <Icon size={16} className="text-amber-500/80 flex-shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Lado Direito — Showcase Unificado */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="lg:col-span-5 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

          <div className="relative w-full rounded-[2rem] bg-zinc-900/60 border border-zinc-800 backdrop-blur-md shadow-2xl p-2 sm:p-3 transition-colors hover:bg-zinc-900/80">
            <div className="flex items-center justify-between px-5 py-4 bg-zinc-950/90 rounded-[1.25rem] border border-white/5 mb-3 shadow-inner">
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">
                  Investimento
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-zinc-500">R$</span>
                  <span className="text-3xl font-black text-white tracking-tight font-display leading-none">
                    300
                  </span>
                  <span className="text-xs font-medium text-zinc-500 ml-1">
                    à vista
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[9px] font-bold text-amber-500/80 mb-1.5 uppercase tracking-widest">
                  Ou parcelado em
                </p>
                <p className="text-xs sm:text-sm font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 shadow-inner">
                  3x de R$ 110,00
                </p>
              </div>
            </div>

            <div className="rounded-[1.25rem] overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-inner">
              <ImageCarousel />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
