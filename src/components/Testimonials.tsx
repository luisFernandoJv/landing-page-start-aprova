import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Eduardo",
    role: "Aprovado — Tribunal de Justiça",
    text: "O diferencial do Start Aprovação é a inteligência por trás do material. Eles mapeiam a banca de uma forma que você chega na prova sabendo o que vai encontrar.",
    initial: "C",
  },
  {
    name: "Fernanda Lima",
    role: "Aprovada — Carreira Administrativa",
    text: "A modalidade híbrida salvou minha rotina. O direcionamento dos professores cortou meu tempo de estudo pela metade com o dobro de eficiência.",
    initial: "F",
  },
  {
    name: "Rafael Souza",
    role: "Classificado em 3º Lugar",
    text: "Mudei de nível após entender a metodologia de revisões. O suporte é técnico, direto e focado no rendimento. Melhor investimento que já fiz.",
    initial: "R",
  },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Testimonials() {
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
        {testimonials.map(({ name, role, text, initial }) => (
          <motion.div
            key={name}
            variants={fade}
            className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-sm transition-all hover:border-amber-500/30 hover:bg-zinc-900/60 flex flex-col group"
          >
            <Quote size={32} className="text-amber-500/20 mb-6" />
            <p className="text-sm sm:text-base leading-relaxed text-zinc-300 flex-1 mb-8">
              "{text}"
            </p>
            <div className="flex items-center gap-4 pt-6 border-t border-zinc-800/80">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold bg-gradient-to-br from-amber-400 to-orange-600 text-zinc-950 font-display">
                {initial}
              </div>
              <div>
                <span className="block text-sm font-bold text-white font-display">
                  {name}
                </span>
                <span className="text-xs font-medium text-amber-500">
                  {role}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
