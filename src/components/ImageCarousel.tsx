import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { trackEvent } from "../App";

// ─── Data ─────────────────────────────────────────────────────────────────────

const IMAGES = [
  { src: "/image/turma.jpeg", alt: "1ª Turma IGECAP em aula" },
  { src: "/image/turma5.jpeg", alt: "Alunos em aula" },
  { src: "/image/turma6.jpeg", alt: "Ambiente de aprendizado" },
  { src: "/image/turma4.jpeg", alt: "Sala de aula" },
  { src: "/image/turma2.jpeg", alt: "Professores e alunos" },
  { src: "/image/turma3.jpeg", alt: "Material didático" },
];

// ─── Fullscreen Modal ─────────────────────────────────────────────────────────

function FullscreenModal({
  images,
  initialIndex,
  onClose,
}: {
  images: typeof IMAGES;
  initialIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initialIndex);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        setIdx((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/96 backdrop-blur-2xl"
      onClick={onClose}
    >
      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          src={images[idx].src}
          alt={images[idx].alt}
          className="max-w-[90vw] max-h-[82vh] object-contain rounded-xl shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIdx((i) => (i - 1 + images.length) % images.length);
        }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all duration-200 active:scale-95"
        aria-label="Foto anterior"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIdx((i) => (i + 1) % images.length);
        }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all duration-200 active:scale-95"
        aria-label="Próxima foto"
      >
        <ChevronRight size={20} />
      </button>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all duration-200"
        aria-label="Fechar"
      >
        <X size={18} />
      </button>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setIdx(i);
            }}
            className="h-1 rounded-full transition-all duration-400"
            style={{
              width: i === idx ? "28px" : "6px",
              background:
                i === idx ? "hsl(38,95%,54%)" : "rgba(255,255,255,0.25)",
            }}
            aria-label={`Foto ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ImageCarousel() {
  const [selected, setSelected] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const autoplay = useRef(Autoplay({ delay: 4800, stopOnInteraction: false }));

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
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

  // Lock body scroll when fullscreen
  useEffect(() => {
    document.body.style.overflow = fullscreen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [fullscreen]);

  const openFullscreen = useCallback((i: number) => {
    setSelected(i);
    setFullscreen(true);
    trackEvent("image_fullscreen", { index: i });
  }, []);

  return (
    <>
      <div className="relative group w-full select-none">
        {/* ── Embla viewport ── */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {IMAGES.map((img, i) => (
              <div
                key={i}
                className="flex-[0_0_100%] min-w-0 relative cursor-zoom-in"
                onClick={() => openFullscreen(i)}
              >
                <div className="aspect-[4/3] sm:aspect-[16/10]">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading={i === 0 ? "eager" : "lazy"}
                    draggable={false}
                  />
                  {/* Bottom vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/15 to-transparent" />
                  {/* Hover hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm text-white text-xs font-medium">
                      <Expand size={13} />
                      Ver em tela cheia
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Nav arrows — appear on hover ── */}
        {(["prev", "next"] as const).map((dir) => (
          <button
            key={dir}
            onClick={dir === "prev" ? prev : next}
            className={`absolute top-1/2 -translate-y-1/2 ${dir === "prev" ? "left-3" : "right-3"}
              w-9 h-9 rounded-full flex items-center justify-center
              bg-black/40 hover:bg-black/60 text-white
              border border-white/10 backdrop-blur-md
              opacity-0 group-hover:opacity-100
              transition-all duration-250 active:scale-90`}
            aria-label={dir === "prev" ? "Foto anterior" : "Próxima foto"}
          >
            {dir === "prev" ? (
              <ChevronLeft size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
        ))}

        {/* ── Footer bar ── */}
        <div className="absolute bottom-0 inset-x-0 px-4 py-3.5 flex items-end justify-between gap-3">
          {/* Label */}
          <span className="text-xs sm:text-[13px] font-semibold text-white/85 drop-shadow-sm leading-none">
            1ª Turma — Março 2026
          </span>

          <div className="flex items-center gap-3">
            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    emblaApi?.scrollTo(i);
                  }}
                  className="h-[5px] rounded-full transition-all duration-400 ease-out"
                  style={{
                    width: i === selected ? "22px" : "5px",
                    background:
                      i === selected
                        ? "hsl(38,95%,54%)"
                        : "rgba(255,255,255,0.28)",
                  }}
                  aria-label={`Foto ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter badge */}
            <span className="text-[10px] font-bold tabular-nums px-2 py-0.5 rounded-md bg-black/40 border border-white/10 text-white/80 backdrop-blur-sm">
              {selected + 1}/{IMAGES.length}
            </span>
          </div>
        </div>
      </div>

      {/* ── Fullscreen Modal ── */}
      <AnimatePresence>
        {fullscreen && (
          <FullscreenModal
            images={IMAGES}
            initialIndex={selected}
            onClose={() => setFullscreen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
