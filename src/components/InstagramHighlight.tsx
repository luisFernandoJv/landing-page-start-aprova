import { motion } from "framer-motion";
import { Instagram, Play, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export function InstagramHighlight() {
  const embedRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detecta o tamanho da tela para ajustar a abertura do leque
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // Checa na montagem inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Configuração responsiva do "Leque"
  const instagramPosts = [
    {
      id: "1",
      link: "https://www.instagram.com/p/DW4IJPFEfuo/",
      rotate: isMobile ? -20 : -30,
      x: isMobile ? -80 : -180,
      y: isMobile ? 15 : 40,
      zIndex: 1,
      delay: 0,
    },
    {
      id: "2",
      link: "https://www.instagram.com/reel/DYzpey1RCOa/",
      rotate: isMobile ? -10 : -15,
      x: isMobile ? -40 : -90,
      y: isMobile ? 5 : 15,
      zIndex: 2,
      delay: 0.1,
    },
    {
      id: "3",
      link: "https://www.instagram.com/p/DY2mKPHxftJ/",
      rotate: 0,
      x: 0,
      y: 0,
      zIndex: 3,
      delay: 0.2,
    },
    {
      id: "4",
      link: "https://www.instagram.com/p/DYqORBPNLfe/",
      rotate: isMobile ? 10 : 15,
      x: isMobile ? 40 : 90,
      y: isMobile ? 5 : 15,
      zIndex: 2,
      delay: 0.3,
    },
    {
      id: "5",
      link: "https://www.instagram.com/p/DW4IJPFEfuo/",
      rotate: isMobile ? 20 : 30,
      x: isMobile ? 80 : 180,
      y: isMobile ? 15 : 40,
      zIndex: 1,
      delay: 0.4,
    },
  ];

  useEffect(() => {
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
  }, []);

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Header com margem inferior MUITO maior (mb-24 lg:mb-32) para evitar sobreposição */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 lg:mb-20 text-center flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-[11px] font-bold uppercase tracking-wider mb-4 backdrop-blur-sm shadow-sm">
          <Instagram size={12} className="text-pink-500" />
          Destaque nas Redes
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-4 relative z-20">
          Veja o método{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
            em ação
          </span>
        </h2>

        <p className="text-zinc-400 max-w-xl mx-auto mb-2 text-sm sm:text-base relative z-20">
          Acompanhe nossas análises diárias, dicas de engenharia reversa de
          bancas e os resultados dos nossos alunos.
        </p>
      </motion.div>

      {/* Grid estilo Leque Responsivo */}
      <div
        ref={embedRef}
        // Altura do container AUMENTADA significativamente para abrigar a expansão dos iframes para cima
        className="relative h-[450px] sm:h-[600px] lg:h-[650px] w-full max-w-4xl mx-auto flex justify-center mb-16"
      >
        {instagramPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 150, rotate: 0, scale: 0.8 }}
            whileInView={{
              opacity: 1,
              y: post.y,
              x: post.x,
              rotate: post.rotate,
              scale: 1,
              zIndex: post.zIndex,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: post.delay,
              type: "spring",
              bounce: 0.4,
            }}
            whileHover={{
              scale: isMobile ? 1.05 : 1.1,
              rotate: 0,
              y: -20,
              zIndex: 50,
              transition: { duration: 0.3 },
            }}
            style={{ transformOrigin: "bottom center" }}
            // Adicionado 'bottom-0' para ancorar a base do card no chão da div, assim ele cresce apenas para cima
            className="absolute bottom-0 w-[200px] sm:w-[300px] rounded-2xl overflow-hidden bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-zinc-800/80 cursor-pointer"
          >
            <blockquote
              className="instagram-media w-full m-0 p-0 border-0 bg-transparent"
              data-instgrm-permalink={`${post.link}?utm_source=ig_embed&utm_campaign=loading`}
              data-instgrm-version="14"
              style={{ minWidth: "100%", maxWidth: "100%" }}
            >
              <div className="flex items-center justify-center h-[350px] sm:h-[450px] bg-zinc-900">
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 flex items-center justify-center shadow-lg">
                    <Play
                      size={isMobile ? 16 : 20}
                      className="text-white ml-1"
                    />
                  </div>
                  <p className="text-[10px] sm:text-xs text-zinc-500 font-medium px-4">
                    Carregando post...
                  </p>
                </div>
              </div>
            </blockquote>
          </motion.div>
        ))}
      </div>

      {/* Footer da Seção */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
          <div className="flex-1 grid grid-cols-3 gap-2 sm:gap-4 p-5 sm:p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm z-10">
            {[
              { value: "+110h", label: "de conteúdo" },
              { value: "80/20", label: "regra Pareto" },
              { value: "100%", label: "foco em banca" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="text-center flex flex-col justify-center"
              >
                <p className="text-lg sm:text-3xl font-extrabold text-white font-display">
                  {value}
                </p>
                <p className="text-[9px] sm:text-[10px] md:text-xs text-zinc-500 mt-1 uppercase tracking-wider font-medium">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <a
            href="https://www.instagram.com/startaprova/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Seguir no Instagram para dicas diárias"
            className="flex-1 group flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/20 transition-all duration-300 hover:border-pink-500/40 hover:from-pink-500/15 hover:to-rose-500/15 z-10"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 flex-shrink-0 shadow-[0_0_20px_rgba(236,72,153,0.3)] group-hover:scale-105 transition-transform">
              <Instagram size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <span className="block text-base sm:text-lg font-bold text-white font-display mb-0.5">
                Siga @startaprova
              </span>
              <span className="text-[11px] sm:text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
                Junte-se à nossa comunidade diária.
              </span>
            </div>
            <ExternalLink
              size={20}
              className="text-zinc-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-pink-400"
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
