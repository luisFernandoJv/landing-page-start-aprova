import { motion } from "framer-motion";
import {
  Calculator,
  Globe,
  FileText,
  ChevronRight,
  Clock,
  BookOpen,
} from "lucide-react";

const subjects = [
  {
    name: "Língua Portuguesa",
    subtitle: "Raio-X das Bancas",
    icon: FileText,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-500/10",
    borderClass: "border-amber-500/20",
    hoverBorder: "group-hover:border-amber-500/50",
    topics: [
      "Interpretação Avançada de Textos",
      "Morfossintaxe Focada",
      "Reescrita e Coesão de Frases",
      "Gabarito e Pegadinhas das Bancas",
    ],
    hours: "40h",
  },
  {
    name: "Raciocínio Lógico",
    subtitle: "Estrutura Matemática",
    icon: Calculator,
    colorClass: "text-blue-500",
    bgClass: "bg-blue-500/10",
    borderClass: "border-blue-500/20",
    hoverBorder: "group-hover:border-blue-500/50",
    topics: [
      "Lógica Proposicional",
      "Análise Combinatória",
      "Probabilidade Aplicada",
      "Matemática Mais Frequente",
    ],
    hours: "30h",
  },
  {
    name: "Conhecimentos Estratégicos",
    subtitle: "Direito & Atualidades",
    icon: Globe,
    colorClass: "text-emerald-500",
    bgClass: "bg-emerald-500/10",
    borderClass: "border-emerald-500/20",
    hoverBorder: "group-hover:border-emerald-500/50",
    topics: [
      "Atualidades e Estrutura de Redação",
      "Direito Constitucional Direto",
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
      className="py-20 lg:py-28 px-4 sm:px-6 max-w-[1200px] mx-auto overflow-hidden"
    >
      {/* Header Padronizado */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fade}
        className="mb-14 lg:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-[11px] font-bold uppercase tracking-wider mb-4 backdrop-blur-sm shadow-sm">
            <BookOpen size={14} className="text-amber-500" />
            Grade Curricular
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            O núcleo duro da sua{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Aprovação
            </span>
          </h2>
          <p className="text-zinc-400 max-w-xl text-sm sm:text-base leading-relaxed">
            Nossa grade é enxuta. Nada de apostilas de 1.000 páginas. Ensinamos
            o que a banca cobra, com foco total no ganho de pontos.
          </p>
        </div>

        {/* Total hours badge Premium */}
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-xl backdrop-blur-sm flex-shrink-0">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-amber-500/10 border border-amber-500/20 text-amber-500">
            <Clock size={20} />
          </div>
          <div>
            <span className="block text-2xl font-black text-white font-display leading-none">
              +110h
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Carga Horária Focada
            </span>
          </div>
        </div>
      </motion.div>

      {/* Grid de Disciplinas Expansíveis */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {subjects.map(
          ({
            name,
            subtitle,
            icon: Icon,
            colorClass,
            bgClass,
            borderClass,
            hoverBorder,
            topics,
            hours,
          }) => (
            <motion.div
              key={name}
              variants={fade}
              whileHover={{ scale: 1.02, y: -5 }} // Efeito Sênior de Elevação
              className={`group relative p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-sm overflow-hidden transition-all duration-300 ${hoverBorder} shadow-lg hover:shadow-2xl`}
            >
              {/* Efeito de brilho de fundo no hover */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full ${bgClass}`}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${bgClass} ${borderClass} group-hover:scale-110 transition-transform duration-500`}
                    >
                      <Icon size={24} className={colorClass} />
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg border ${bgClass} ${borderClass} ${colorClass}`}
                  >
                    {hours}
                  </span>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 font-display">
                    {name}
                  </h3>
                  <span className="text-sm font-medium text-zinc-500">
                    {subtitle}
                  </span>
                </div>

                {/* Tópicos com animação sutil nos ícones */}
                <ul className="space-y-3 mt-auto">
                  {topics.map((topic, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors"
                    >
                      <ChevronRight
                        size={16}
                        className={`mt-0.5 flex-shrink-0 ${colorClass} group-hover:translate-x-1 transition-transform`}
                      />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ),
        )}
      </motion.div>

      {/* Bonus banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-6 py-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-center"
      >
        <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-md">
          Bônus Exclusivo
        </span>
        <p className="text-xs sm:text-sm font-medium text-zinc-400">
          Análise Tática de Editais <span className="mx-1.5 opacity-50">•</span>{" "}
          Simulados Ranqueados <span className="mx-1.5 opacity-50">•</span>{" "}
          Resolução em Vídeo
        </p>
      </motion.div>
    </section>
  );
}
