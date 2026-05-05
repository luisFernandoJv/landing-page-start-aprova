import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Camera, Play } from "lucide-react";
import { trackEvent } from "../App";

const images = [
  { src: "/image/turma.jpeg", alt: "1ª Turma IGECAP em aula" },
  {
    src: "/image/turma5.jpeg",
    alt: "Alunos estudando",
  },
  {
    src: "/image/turma6.jpeg",
    alt: "Ambiente de aprendizado",
  },
  {
    src: "/image/turma4.jpeg",
    alt: "Sala de aula",
  },
  {
    src: "/image/turma2.jpeg",
    alt: "Professores e alunos",
  },
  {
    src: "/image/turma3.jpeg",
    alt: "Material didático",
  },
];

export function ImageCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    trackEvent("carousel_navigate", { direction: "prev" });
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    trackEvent("carousel_navigate", { direction: "next" });
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const openFullscreen = (index: number) => {
    setSelectedIndex(index);
    setIsFullscreen(true);
    trackEvent("image_fullscreen", { index });
  };

  return (
    <>
      <div className="relative mb-5 rounded-2xl overflow-hidden group">
        {/* Carousel Container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 cursor-pointer"
                onClick={() => openFullscreen(index)}
              >
                <div className="relative aspect-[4/3] md:aspect-video">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play
                        className="w-5 h-5 text-white ml-0.5"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Próxima foto"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Caption & Counter */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="flex items-center gap-2 text-xs text-white/90">
            <Camera className="w-4 h-4" />
            <span className="font-medium">1ª Turma — Março 2026</span>
          </div>
          <span className="text-xs text-white/90 font-semibold bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
            {selectedIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mb-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-[hsl(var(--color-primary))] w-8"
                : "bg-white/25 w-2 hover:bg-white/40"
            }`}
            aria-label={`Ir para foto ${index + 1}`}
          />
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Fechar"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
