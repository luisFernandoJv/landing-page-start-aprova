import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ImageIcon, X } from "lucide-react";

// Prints salvos em /public/image/depoimentos/1.png até 6.png
const SCREENSHOTS_PATH = "/image/depoimentos";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  initial: string;
  screenshot: string;
}

// As 3 primeiras imagens (1, 2 e 3) ilustram os depoimentos com nome e texto.
const testimonials: Testimonial[] = [
  {
    name: "Carlos Eduardo",
    role: "Aprovado — Tribunal de Justiça",
    text: "O diferencial do Start Aprovação é a inteligência por trás do material. Eles mapeiam a banca de uma forma que você chega na prova sabendo o que vai encontrar.",
    initial: "C",
    screenshot: `${SCREENSHOTS_PATH}/1.png`,
  },
  {
    name: "Fernanda Lima",
    role: "Aprovada — Carreira Administrativa",
    text: "A modalidade híbrida salvou minha rotina. O direcionamento dos professores cortou meu tempo de estudo pela metade com o dobro de eficiência.",
    initial: "F",
    screenshot: `${SCREENSHOTS_PATH}/2.png`,
  },
  {
    name: "Rafael Souza",
    role: "Classificado em 3º Lugar",
    text: "Mudei de nível após entender a metodologia de revisões. O suporte é técnico, direto e focado no rendimento. Melhor investimento que já fiz.",
    initial: "R",
    screenshot: `${SCREENSHOTS_PATH}/3.png`,
  },
];

// As imagens 4, 5 e 6 entram como provas extras (prints avulsos, sem card de
// texto associado) numa mini-galeria logo abaixo dos depoimentos principais.
const extraProofs = [4, 5, 6].map((n) => ({
  id: n,
  screenshot: `${SCREENSHOTS_PATH}/${n}.png`,
}));

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── Modal de print (lightbox) ────────────────────────────────────────────────
// Genérico: aceita apenas a imagem, com legenda opcional (nome + cargo do
// aluno) — assim serve tanto para os depoimentos nomeados quanto para os
// prints avulsos da mini-galeria.
interface LightboxData {
  src: string;
  name?: string;
  role?: string;
  initial?: string;
}

function ScreenshotModal({
  data,
  onClose,
}: {
  data: LightboxData;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl px-4 py-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-[2rem] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
      >
        <img
          src={data.src}
          alt={
            data.name
              ? `Print do depoimento de ${data.name}`
              : "Print de depoimento de aluno"
          }
          className="w-full h-auto max-h-[75vh] object-contain bg-zinc-950"
        />
        {data.name && (
          <div className="flex items-center gap-3 p-4 border-t border-zinc-800 bg-zinc-900">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold bg-gradient-to-br from-amber-400 to-orange-600 text-zinc-950 font-display flex-shrink-0">
              {data.initial}
            </div>
            <div className="min-w-0">
              <span className="block text-sm font-bold text-white truncate">
                {data.name}
              </span>
              <span className="text-xs text-amber-500 truncate block">
                {data.role}
              </span>
            </div>
          </div>
        )}
      </motion.div>

      <button
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-5 right-5 sm:top-8 sm:right-8 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all duration-200"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
}

export function Testimonials() {
  const [lightbox, setLightbox] = useState<LightboxData | null>(null);

  return (
    <section
      id="depoimentos"
      className="py-20 lg:py-28 px-4 sm:px-6 max-w-[1200px] mx-auto scroll-mt-20"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fade}
        className="mb-14 lg:mb-20 text-center flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-[11px] font-bold uppercase tracking-wider mb-4 backdrop-blur-sm shadow-sm">
          <Star size={14} className="text-amber-500" />
          Resultados Comprovados
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          Quem tem método,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            mostra o resultado
          </span>
        </h2>
      </motion.div>

      {/* Depoimentos nomeados, cada um com print anexado */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {testimonials.map((testimonial) => {
          const { name, role, text, initial, screenshot } = testimonial;
          return (
            <motion.div
              key={name}
              variants={fade}
              className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-sm transition-all hover:border-amber-500/30 hover:bg-zinc-900/60 flex flex-col group"
            >
              <div className="flex items-start justify-between mb-6">
                <Quote size={32} className="text-amber-500/20" />
                <button
                  onClick={() =>
                    setLightbox({ src: screenshot, name, role, initial })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/60 border border-zinc-800 text-[11px] font-bold text-zinc-400 hover:text-amber-500 hover:border-amber-500/40 transition-colors"
                >
                  <ImageIcon size={13} />
                  Ver print
                </button>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-zinc-300 flex-1 mb-8">
                "{text}"
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-zinc-800/80">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold bg-gradient-to-br from-amber-400 to-orange-600 text-zinc-950 font-display flex-shrink-0">
                  {initial}
                </div>
                <div className="min-w-0">
                  <span className="block text-sm font-bold text-white font-display truncate">
                    {name}
                  </span>
                  <span className="text-xs font-medium text-amber-500 truncate block">
                    {role}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Mini-galeria com provas extras (prints avulsos, sem texto vinculado) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8"
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            Mais provas reais
          </span>
          <span className="flex-1 h-px bg-zinc-800" />
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
          {extraProofs.map((proof) => (
            <button
              key={proof.id}
              onClick={() => setLightbox({ src: proof.screenshot })}
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 transition-colors"
            >
              <img
                src={proof.screenshot}
                alt="Print de depoimento de aluno"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <ImageIcon
                  size={18}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <ScreenshotModal data={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
