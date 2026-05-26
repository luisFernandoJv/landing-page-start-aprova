import { motion } from "framer-motion";
import {
  BookOpen,
  Calculator,
  Globe,
  FileText,
  ChevronRight,
  Clock,
} from "lucide-react";

const subjects = [
  {
    name: "Língua Portuguesa",
    subtitle: "Raio-X das Bancas",
    icon: FileText,
    hue: "36,100%,54%",
    topics: [
      "Interpretação Avançada",
      "Morfossintaxe Focada",
      "Reescrita de Frases",
      "Gabarito das Bancas",
    ],
    hours: "40h",
  },
  {
    name: "Raciocínio Lógico",
    subtitle: "Matemático",
    icon: Calculator,
    hue: "213,90%,60%",
    topics: [
      "Lógica Proposicional",
      "Análise Combinatória",
      "Probabilidade",
      "Matemática Frequente",
    ],
    hours: "30h",
  },
  {
    name: "Conhecimentos Estratégicos",
    subtitle: "Direito & Atualidades",
    icon: Globe,
    hue: "145,60%,45%",
    topics: [
      "Atualidades e Redação",
      "Direito Constitucional",
      "Direito Administrativo",
      "Ética no Serviço Público",
    ],
    hours: "40h",
  },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function CurriculumSection() {
  return (
    <section
      id="conteudo"
      className="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20"
    >
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fade}
        className="mb-12"
      >
        <div className="tag mb-5">Grade Curricular</div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            O núcleo duro da sua{" "}
            <span className="gradient-text">Aprovação</span>
          </h2>

          {/* Total hours badge */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg self-start sm:self-auto flex-shrink-0"
            style={{
              background: "hsl(220,14%,9%)",
              border: "1px solid hsl(220,10%,16%)",
            }}
          >
            <Clock size={16} style={{ color: "hsl(36,100%,54%)" }} />
            <div>
              <span
                className="block text-lg font-extrabold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                +110h
              </span>
              <span className="text-xs" style={{ color: "hsl(220,10%,58%)" }}>
                de conteúdo
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Subjects */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
        className="space-y-4"
      >
        {subjects.map(({ name, subtitle, icon: Icon, hue, topics, hours }) => (
          <motion.div key={name} variants={fade} className="card p-6 sm:p-7">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `hsla(${hue}, 0.1)`,
                    border: `1px solid hsla(${hue}, 0.2)`,
                  }}
                >
                  <Icon size={20} style={{ color: `hsl(${hue})` }} />
                </div>
                <div>
                  <h3
                    className="text-base font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {name}
                  </h3>
                  <span
                    className="text-sm"
                    style={{ color: "hsl(220,10%,58%)" }}
                  >
                    {subtitle}
                  </span>
                </div>
              </div>

              <span
                className="text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0"
                style={{
                  background: `hsla(${hue}, 0.1)`,
                  color: `hsl(${hue})`,
                }}
              >
                {hours}
              </span>
            </div>

            {/* Divider */}
            <div
              className="h-px mb-5"
              style={{ background: "hsl(220,10%,16%)" }}
            />

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {topics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "hsl(220,10%,58%)" }}
                >
                  <ChevronRight
                    size={14}
                    style={{ color: `hsl(${hue})`, flexShrink: 0 }}
                  />
                  {topic}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Bonus banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-5 px-6 py-5 rounded-xl"
        style={{
          background: "hsla(36,100%,54%,0.06)",
          border: "1px solid hsla(36,100%,54%,0.18)",
        }}
      >
        <p
          className="text-sm text-center"
          style={{ color: "hsl(220,10%,78%)" }}
        >
          <strong style={{ color: "hsl(36,100%,54%)" }}>
            Bônus Exclusivo:
          </strong>{" "}
          Análise Tática de Editais · Simulados Ranqueados · Resolução em Vídeo
        </p>
      </motion.div>
    </section>
  );
}
