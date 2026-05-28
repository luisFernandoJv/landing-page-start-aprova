import { motion } from "framer-motion";
import { Rocket, ClipboardList, ArrowRight } from "lucide-react";
import { trackEvent } from "../App";

export function CtaFinal() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative rounded-[2rem] p-10 sm:p-16 text-center overflow-hidden bg-zinc-900/40 border border-zinc-800 shadow-2xl backdrop-blur-md"
      >
        {/* Efeito de brilho de fundo sutil */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Ícone de Destaque */}
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg">
            <Rocket size={28} className="text-zinc-950" />
          </div>

          {/* Headline Padronizada */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight font-display">
            Assuma o controle da sua{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Aprovação
            </span>
          </h2>

          <p className="text-base md:text-lg mb-10 text-zinc-400 leading-relaxed max-w-xl mx-auto">
            O tempo está passando e a concorrência já começou. Dê o passo
            definitivo rumo à sua posse.
          </p>

          {/* Área de Botão de Alta Conversão */}
          <div className="flex justify-center">
            <motion.a
              href="https://forms.gle/e5GGQZqxGN2hMDnA6"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_click", { location: "final_section" })
              }
              className="group flex items-center justify-center gap-3 w-full sm:w-auto rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 px-8 py-4 text-base font-bold text-zinc-950 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-amber-500/20 active:scale-95 font-display"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ClipboardList
                size={20}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <span>Garantir Minha Vaga</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
