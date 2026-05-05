import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { trackEvent } from "../App";

export function Header() {
  return (
    <header className="mb-8 lg:mb-12 flex flex-col items-center text-center">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mb-5"
      >
        <div className="relative w-52 lg:w-64 h-28 lg:h-36 flex items-center justify-center">
          <img
            src="/image/logo.png"
            alt="Start Aprovação - Preparatório para Concursos"
            className="w-full object-contain drop-shadow-2xl"
            onLoad={() => trackEvent("logo_loaded")}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        </div>
        {/* Glow behind logo */}
        <div
          className="absolute inset-0 -z-10 blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle, hsl(25, 100%, 50%) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Location Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-2 mb-4"
      ></motion.div>

      {/* Urgency Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full animate-badge-pulse"
        style={{
          background:
            "linear-gradient(135deg, hsla(0, 84%, 60%, 0.15) 0%, hsla(45, 100%, 55%, 0.15) 100%)",
          border: "1px solid hsla(45, 100%, 55%, 0.3)",
        }}
      >
        <Flame className="w-4 h-4 text-[hsl(var(--color-warning))]" />
        <span className="text-xs font-bold text-[hsl(var(--color-warning))] tracking-wider uppercase">
          Vagas Limitadas — Garanta a Sua!
        </span>
      </motion.div>
    </header>
  );
}
