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

const proofPoints = [
  { icon: CheckCircle, label: "Metodologia Validada" },
  { icon: MapPin, label: "Híbrido (Presencial & Online)" },
  { icon: Calendar, label: "Matrículas Abertas" },
  { icon: Users, label: "Turma Limitada" },
];

export function HeroSection() {
  return (
    <section id="inicio" className="pt-28 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Lado Esquerdo — Copy */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Tag de Destaque */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs font-medium mb-6 backdrop-blur-sm shadow-sm">
            {/* Ponto pulsante de urgência (Substitui o emoji ruidoso) */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>

            <span className="tracking-wide">
              Vagas Limitadas <span className="text-zinc-600 mx-1.5">•</span>{" "}
              Turma 2026
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white mb-5 leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Pare de estudar no <br />
            escuro.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Aprove com método.
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-base sm:text-lg leading-relaxed text-zinc-400 mb-8 max-w-xl">
            Aplicamos{" "}
            <strong className="text-zinc-200 font-semibold">
              engenharia reversa nas bancas examinadoras
            </strong>
            . Ciclos de revisão, análise de provas anteriores e retenção máxima
            — seja presencial ou online.
          </p>

          {}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            {/* Botão Primário: Alta Conversão */}
            <motion.a
              href="https://forms.gle/e5GGQZqxGN2hMDnA6"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_click", { location: "hero", type: "form" })
              }
              className="group relative flex flex-1 sm:flex-none items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 px-8 py-4 text-base font-bold text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50 active:scale-[0.98]"
            >
              {/* Brilho interno para dar volume 3D */}
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

            {/* Botão Secundário: Suporte / WhatsApp */}
            <motion.a
              href="https://wa.me/558398388509?text=Ola!%20Quero%20saber%20mais%20sobre%20o%20curso%20preparatorio%20Start%20Aprovacao!"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_click", { location: "hero", type: "whatsapp" })
              }
              className="group flex flex-1 sm:flex-none items-center justify-center gap-3 rounded-xl bg-zinc-900 border border-zinc-700 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-zinc-700 active:scale-[0.98]"
            >
              <WhatsAppIcon
                size={20}
                className="text-emerald-500 transition-transform duration-300 group-hover:scale-110"
              />
              <span style={{ fontFamily: "var(--font-display)" }}>
                Falar no WhatsApp
              </span>
            </motion.a>
          </div>

          {/* Proof Points */}
          <div className="grid grid-cols-2 gap-3">
            {proofPoints.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 text-sm text-zinc-400 font-medium"
              >
                <Icon size={16} className="text-amber-500 flex-shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Lado Direito — Carousel */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="relative"
        >
          {/* Tag de Preço Flutuante Premium */}
          <div className="flex items-center justify-between mb-6 p-5 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 shadow-2xl">
            <div>
              <p className="text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">
                Investimento mensal
              </p>
              <p
                className="text-3xl font-extrabold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                R$ 130
                <span className="text-sm font-medium text-zinc-500 ml-1">
                  /mês
                </span>
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              &lt; R$ 4,50/dia
            </div>
          </div>

          <ImageCarousel />
        </motion.div>
      </div>
    </section>
  );
}
