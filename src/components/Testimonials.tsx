import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";

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
      className="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fade}
        className="mb-12"
      >
        <div className="tag mb-5">Resultados Comprovados</div>
        <h2
          className="text-3xl sm:text-4xl font-extrabold text-white"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.03em",
          }}
        >
          Quem tem método,{" "}
          <span className="gradient-text">mostra o resultado</span>
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
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {testimonials.map(({ name, role, text, initial }) => (
          <motion.div
            key={name}
            variants={fade}
            className="card p-6 flex flex-col"
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  style={{ color: "hsl(36,100%,54%)" }}
                  fill="hsl(36,100%,54%)"
                />
              ))}
            </div>

            {/* Quote mark */}
            <div
              className="text-4xl font-black leading-none mb-3 select-none"
              style={{
                color: "hsla(36,100%,54%,0.2)",
                fontFamily: "var(--font-display)",
              }}
            >
              "
            </div>

            {/* Text */}
            <p
              className="text-sm leading-relaxed flex-1 mb-6"
              style={{ color: "hsl(220,10%,62%)" }}
            >
              {text}
            </p>

            {/* Author */}
            <div
              className="flex items-center gap-3 pt-5"
              style={{ borderTop: "1px solid hsl(220,10%,16%)" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(36,100%,54%) 0%, hsl(28,100%,42%) 100%)",
                  color: "#0a0a0a",
                  fontFamily: "var(--font-display)",
                }}
              >
                {initial}
              </div>
              <div>
                <span
                  className="block text-sm font-bold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {name}
                </span>
                <span className="text-xs" style={{ color: "hsl(36,100%,54%)" }}>
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
