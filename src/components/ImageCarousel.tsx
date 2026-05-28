import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { trackEvent } from "../App";

const images = [
  { src: "/image/turma.jpeg", alt: "1ª Turma IGECAP em aula" },
  { src: "/image/turma5.jpeg", alt: "Alunos em aula" },
  { src: "/image/turma6.jpeg", alt: "Ambiente de aprendizado" },
  { src: "/image/turma4.jpeg", alt: "Sala de aula" },
  { src: "/image/turma2.jpeg", alt: "Professores e alunos" },
  { src: "/image/turma3.jpeg", alt: "Material didático" },
];

export function ImageCarousel() {
  const [selected, setSelected] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4500, stopOnInteraction: false }),
  ]);

  const prev = useCallback(() => {
    emblaApi?.scrollPrev();
    trackEvent("carousel_navigate", { direction: "prev" });
  }, [emblaApi]);

  const next = useCallback(() => {
    emblaApi?.scrollNext();
    trackEvent("carousel_navigate", { direction: "next" });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <>
      <div className="relative group w-full h-full">
        {/* Embla */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((img, i) => (
              <div
                key={i}
                className="flex-[0_0_100%] min-w-0 cursor-pointer relative"
                onClick={() => {
                  setSelected(i);
                  setFullscreen(true);
                  trackEvent("image_fullscreen", { index: i });
                }}
              >
                {/* PROPORÇÃO CORRIGIDA: 4/3 no mobile e 16/10 no desktop */}
                <div className="aspect-[4/3] lg:aspect-[16/10]">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-90" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botões de Navegação */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 active:scale-95"
          aria-label="Foto anterior"
        >
          <ChevronLeft size={20} className="pr-0.5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 active:scale-95"
          aria-label="Próxima foto"
        >
          <ChevronRight size={20} className="pl-0.5" />
        </button>

        {/* Rodapé e Dots */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 px-5 py-4">
          <div className="flex items-center justify-between w-full">
            <span className="text-xs sm:text-sm font-semibold text-white/90 drop-shadow-md">
              1ª Turma — Março 2026
            </span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-white/90">
              {selected + 1} / {images.length}
            </span>
          </div>

          <div className="flex justify-start gap-1.5 mt-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  emblaApi?.scrollTo(i);
                }}
                className="h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: i === selected ? "24px" : "6px",
                  background:
                    i === selected
                      ? "hsl(36,100%,54%)"
                      : "rgba(255,255,255,0.3)",
                }}
                aria-label={`Ir para foto ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal Fullscreen */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl"
            onClick={() => setFullscreen(false)}
          >
            <motion.img
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={images[selected].src}
              alt={images[selected].alt}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setFullscreen(false)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-colors"
              aria-label="Fechar tela cheia"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
