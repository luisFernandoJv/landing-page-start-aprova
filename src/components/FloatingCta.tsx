import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ClipboardList, X, ArrowRight } from "lucide-react";
import { trackEvent } from "../App";

export function FloatingCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="fixed bottom-5 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:w-80 z-50"
        >
          <div
            className="flex items-center gap-3 p-3.5 rounded-2xl relative overflow-hidden"
            style={{
              background: "hsl(220,14%,9%)",
              border: "1px solid hsl(36,100%,54%)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px hsla(36,100%,54%,0.2)",
            }}
          >
            {/* Amber glow left */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
              style={{
                background:
                  "linear-gradient(180deg, hsl(36,100%,54%) 0%, hsl(28,100%,42%) 100%)",
              }}
            />

            <a
              href="https://forms.gle/e5GGQZqxGN2hMDnA6"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("floating_cta_click", { action: "open_form" })
              }
              className="flex items-center gap-3 flex-1 min-w-0 pl-2"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(36,100%,54%) 0%, hsl(28,100%,42%) 100%)",
                }}
              >
                <ClipboardList size={16} style={{ color: "#0a0a0a" }} />
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className="block text-sm font-bold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Garantir minha vaga
                </span>
                <span className="text-xs" style={{ color: "hsl(220,10%,58%)" }}>
                  Últimas vagas disponíveis
                </span>
              </div>
              <ArrowRight
                size={16}
                style={{ color: "hsl(36,100%,54%)", flexShrink: 0 }}
              />
            </a>

            <button
              onClick={() => {
                setDismissed(true);
                trackEvent("floating_cta_dismiss");
              }}
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
              style={{
                background: "hsl(220,18%,13%)",
                color: "hsl(220,10%,48%)",
              }}
              aria-label="Fechar"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
