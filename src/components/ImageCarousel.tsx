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
      <div
        className="relative rounded-xl overflow-hidden group"
        style={{ border: "1px solid hsl(220,10%,16%)" }}
      >
        {/* Embla */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((img, i) => (
              <div
                key={i}
                className="flex-[0_0_100%] min-w-0 cursor-pointer"
                onClick={() => {
                  setSelected(i);
                  setFullscreen(true);
                  trackEvent("image_fullscreen", { index: i });
                }}
              >
                <div className="aspect-[16/10]">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nav buttons */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: "rgba(10,10,10,0.6)",
            backdropFilter: "blur(8px)",
            color: "#fff",
          }}
          aria-label="Foto anterior"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: "rgba(10,10,10,0.6)",
            backdropFilter: "blur(8px)",
            color: "#fff",
          }}
          aria-label="Próxima foto"
        >
          <ChevronRight size={18} />
        </button>

        {/* Bottom overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.8), transparent)",
          }}
        >
          <span
            className="text-xs font-medium"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            1ª Turma — Março 2026
          </span>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(6px)",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {selected + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === selected ? "1.75rem" : "0.375rem",
              background:
                i === selected ? "hsl(36,100%,54%)" : "hsla(220,10%,58%,0.4)",
            }}
            aria-label={`Foto ${i + 1}`}
          />
        ))}
      </div>

      {/* Fullscreen */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{
              background: "rgba(0,0,0,0.95)",
              backdropFilter: "blur(20px)",
            }}
            onClick={() => setFullscreen(false)}
          >
            <motion.img
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              src={images[selected].src}
              alt={images[selected].alt}
              className="max-w-full max-h-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setFullscreen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
              aria-label="Fechar"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
