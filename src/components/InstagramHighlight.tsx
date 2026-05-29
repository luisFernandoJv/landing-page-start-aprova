import { motion } from "framer-motion";
import {
  Instagram,
  ExternalLink,
  Heart,
  MessageCircle,
  Eye,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

type BreakpointKey = "xs" | "sm" | "md" | "lg";

interface PostConfig {
  id: string;
  link: string;
  rotate: number;
  x: number;
  y: number;
  zIndex: number;
  delay: number;
}

// Breakpoint-aware config
const BREAKPOINTS: Record<BreakpointKey, number> = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
};

const FAN_CONFIGS: Record<
  BreakpointKey,
  Omit<PostConfig, "id" | "link" | "delay">[]
> = {
  xs: [
    { rotate: -22, x: -82, y: 18, zIndex: 1 },
    { rotate: -11, x: -41, y: 6, zIndex: 2 },
    { rotate: 0, x: 0, y: 0, zIndex: 3 },
    { rotate: 11, x: 41, y: 6, zIndex: 2 },
    { rotate: 22, x: 82, y: 18, zIndex: 1 },
  ],
  sm: [
    { rotate: -26, x: -120, y: 28, zIndex: 1 },
    { rotate: -13, x: -60, y: 10, zIndex: 2 },
    { rotate: 0, x: 0, y: 0, zIndex: 3 },
    { rotate: 13, x: 60, y: 10, zIndex: 2 },
    { rotate: 26, x: 120, y: 28, zIndex: 1 },
  ],
  md: [
    { rotate: -30, x: -160, y: 38, zIndex: 1 },
    { rotate: -15, x: -80, y: 14, zIndex: 2 },
    { rotate: 0, x: 0, y: 0, zIndex: 3 },
    { rotate: 15, x: 80, y: 14, zIndex: 2 },
    { rotate: 30, x: 160, y: 38, zIndex: 1 },
  ],
  lg: [
    { rotate: -32, x: -200, y: 48, zIndex: 1 },
    { rotate: -16, x: -100, y: 18, zIndex: 2 },
    { rotate: 0, x: 0, y: 0, zIndex: 3 },
    { rotate: 16, x: 100, y: 18, zIndex: 2 },
    { rotate: 32, x: 200, y: 48, zIndex: 1 },
  ],
};

const POST_LINKS = [
  "https://www.instagram.com/p/DW4IJPFEfuo/",
  "https://www.instagram.com/reel/DYzpey1RCOa/",
  "https://www.instagram.com/p/DY2mKPHxftJ/",
  "https://www.instagram.com/p/DYqORBPNLfe/",
  "https://www.instagram.com/p/DW4IJPFEfuo/",
];

function getBreakpoint(width: number): BreakpointKey {
  if (width >= BREAKPOINTS.lg) return "lg";
  if (width >= BREAKPOINTS.md) return "md";
  if (width >= BREAKPOINTS.sm) return "sm";
  return "xs";
}

// Card width by breakpoint
const CARD_WIDTHS: Record<BreakpointKey, number> = {
  xs: 150,
  sm: 200,
  md: 240,
  lg: 280,
};

// Container height by breakpoint (must fit fan spread)
const CONTAINER_HEIGHTS: Record<BreakpointKey, number> = {
  xs: 360,
  sm: 460,
  md: 540,
  lg: 620,
};

interface FanCardProps {
  post: PostConfig;
  cardWidth: number;
  bp: BreakpointKey;
  isMobile: boolean;
}

function FanCard({ post, cardWidth, bp, isMobile }: FanCardProps) {
  const cardHeights: Record<BreakpointKey, number> = {
    xs: 240,
    sm: 300,
    md: 360,
    lg: 420,
  };
  const cardHeight = cardHeights[bp];

  return (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 120, rotate: 0, scale: 0.85 }}
      whileInView={{
        opacity: 1,
        y: post.y,
        x: post.x,
        rotate: post.rotate,
        scale: 1,
        zIndex: post.zIndex,
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.75,
        delay: post.delay,
        type: "spring",
        stiffness: 120,
        damping: 18,
      }}
      whileHover={{
        scale: isMobile ? 1.04 : 1.08,
        rotate: 0,
        y: isMobile ? -10 : -24,
        zIndex: 50,
        transition: { duration: 0.28, ease: "easeOut" },
      }}
      style={{
        transformOrigin: "bottom center",
        width: cardWidth,
        height: cardHeight,
        position: "absolute",
        bottom: 0,
      }}
      className="rounded-2xl overflow-hidden bg-zinc-900 shadow-[0_24px_56px_rgba(0,0,0,0.6)] border border-zinc-800/70 cursor-pointer will-change-transform"
    >
      {/* Gradient shimmer top strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-rose-400 to-orange-400 z-10" />

      <blockquote
        className="instagram-media m-0 p-0 border-0 bg-transparent"
        data-instgrm-permalink={`${post.link}?utm_source=ig_embed&utm_campaign=loading`}
        data-instgrm-version="14"
        style={{ minWidth: "100%", maxWidth: "100%", width: "100%" }}
      >
        {/* Placeholder while loading */}
        <div
          className="flex flex-col items-center justify-center bg-zinc-900"
          style={{ height: cardHeight }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 flex items-center justify-center shadow-lg mb-3">
            <Instagram size={18} className="text-white" />
          </div>
          <p className="text-[10px] text-zinc-600 font-medium tracking-wide uppercase">
            Instagram
          </p>
        </div>
      </blockquote>
    </motion.div>
  );
}

export function InstagramHighlight() {
  const [bp, setBp] = useState<BreakpointKey>("lg");
  const embedRef = useRef<HTMLDivElement>(null);

  const updateBp = useCallback(() => {
    setBp(getBreakpoint(window.innerWidth));
  }, []);

  useEffect(() => {
    updateBp();
    window.addEventListener("resize", updateBp);
    return () => window.removeEventListener("resize", updateBp);
  }, [updateBp]);

  useEffect(() => {
    const loadEmbed = () => {
      if (!document.getElementById("ig-embed-script")) {
        const script = document.createElement("script");
        script.id = "ig-embed-script";
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.onload = () => window.instgrm?.Embeds.process();
        document.body.appendChild(script);
      } else {
        window.instgrm?.Embeds.process();
      }
    };
    loadEmbed();
  }, []);

  const fanConfig = FAN_CONFIGS[bp];
  const cardWidth = CARD_WIDTHS[bp];
  const containerHeight = CONTAINER_HEIGHTS[bp];
  const isMobile = bp === "xs" || bp === "sm";

  const posts: PostConfig[] = POST_LINKS.map((link, i) => ({
    id: String(i + 1),
    link,
    delay: i * 0.1,
    ...fanConfig[i],
  }));

  const stats = [
    { value: "+110h", label: "de conteúdo", icon: Eye },
    { value: "80/20", label: "regra Pareto", icon: Heart },
    { value: "100%", label: "foco em banca", icon: MessageCircle },
  ];

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 lg:mb-16 text-center flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-[11px] font-bold uppercase tracking-wider mb-4 backdrop-blur-sm shadow-sm">
          <Instagram size={12} className="text-pink-500" />
          Destaque nas Redes
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
          Veja o método{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
            em ação
          </span>
        </h2>

        <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
          Acompanhe nossas análises diárias, dicas de engenharia reversa de
          bancas e os resultados dos nossos alunos.
        </p>
      </motion.div>

      {/* ── Fan Container ── */}
      <div
        ref={embedRef}
        className="relative w-full max-w-4xl mx-auto flex justify-center mb-20"
        style={{ height: containerHeight }}
      >
        {posts.map((post) => (
          <FanCard
            key={post.id}
            post={post}
            cardWidth={cardWidth}
            bp={bp}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* ── Footer ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.25 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
          {/* Stats */}
          <div className="flex-1 grid grid-cols-3 gap-3 p-5 sm:p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm">
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="text-center flex flex-col items-center justify-center gap-1"
              >
                <Icon size={14} className="text-pink-500 mb-0.5" />
                <p className="text-base sm:text-2xl lg:text-3xl font-extrabold text-white leading-none">
                  {value}
                </p>
                <p className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider font-medium leading-tight">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="https://www.instagram.com/startaprova/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Seguir no Instagram para dicas diárias"
            className="flex-1 group flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/20 transition-all duration-300 hover:border-pink-500/40 hover:from-pink-500/15 hover:to-rose-500/15"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 flex-shrink-0 shadow-[0_0_20px_rgba(236,72,153,0.3)] group-hover:scale-105 transition-transform duration-300">
              <Instagram size={22} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-base sm:text-lg font-bold text-white mb-0.5">
                Siga @startaprova
              </span>
              <span className="text-[11px] sm:text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
                Junte-se à nossa comunidade diária.
              </span>
            </div>
            <ExternalLink
              size={18}
              className="text-zinc-500 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-pink-400"
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
