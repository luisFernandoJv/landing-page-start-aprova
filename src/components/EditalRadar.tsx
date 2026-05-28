import { motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  MapPin,
  Briefcase,
  FileText,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { trackEvent } from "../App";

// Banco de dados atualizado com os brasões das cidades
const editais = [
  {
    id: 1,
    cidade: "Triunfo — PB",
    instituicao: "Prefeitura Municipal",
    status: "Inscrições Abertas",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    vagas: "Diversas vagas (Todos os níveis)",
    salario: "Até R$ 7.000,00",
    inscricoes: "Verificar edital",
    banca: "EDUCAPB",
    link: "https://educapb.com.br/",
    brasao: "/image/brasao-triunfo.png", // <-- Adicione a imagem na pasta public/image/
  },
  {
    id: 2,
    cidade: "Campina Grande — PB",
    instituicao: "Prefeitura (Quadro Geral)",
    status: "Inscrições Abertas",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    vagas: "+900 oportunidades",
    salario: "Diversas faixas",
    inscricoes: "Até 15 de Junho",
    banca: "IDECAN",
    link: "https://idecan.org.br/",
    brasao: "/image/brasao-campina-grande.png", // <-- Adicione a imagem na pasta public/image/
  },
  {
    id: 3,
    cidade: "Campina Grande — PB",
    instituicao: "STTP (Agente de Trânsito)",
    status: "Inscrições Abertas",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    vagas: "Nível Superior",
    salario: "+ de R$ 4.000,00",
    inscricoes: "Até 22 de Junho",
    banca: "IDECAN",
    link: "https://idecan.org.br/",
    brasao: "/image/brasao-campina-grande.png", // <-- Adicione a imagem na pasta public/image/
  },
];

export function EditalRadar() {
  return (
    <section
      id="editais"
      className="py-20 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-[11px] font-bold uppercase tracking-wider mb-4 backdrop-blur-sm shadow-sm">
            <AlertCircle size={14} className="text-amber-500" />
            Radar de Oportunidades
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Editais abertos na{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Paraíba
            </span>
          </h2>
          <p className="text-zinc-400 max-w-xl text-sm sm:text-base">
            Acompanhe os principais concursos em andamento e direcione seus
            estudos com o nosso método cirúrgico.
          </p>
        </div>

        <a
          href="https://wa.me/558398388509?text=Quero%20me%20preparar%20para%20os%20editais%20abertos%20na%20Paraíba!"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("cta_click", {
              location: "radar_editais",
              type: "whatsapp",
            })
          }
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm font-bold text-white transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-500 active:scale-95 flex-shrink-0"
        >
          Me preparar agora
          <ArrowRight size={16} />
        </a>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {editais.map((edital, index) => (
          <motion.div
            key={edital.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-2xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-sm overflow-hidden flex flex-col hover:border-amber-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.05)] hover:-translate-y-1"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="p-6 flex-1 flex flex-col">
              {/* Topo do Card com Badge e Brasão */}
              <div className="flex justify-between items-start mb-5">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md border ${edital.statusColor}`}
                >
                  {edital.status}
                </span>

                {/* Imagem do Brasão da Cidade */}
                <div className="w-12 h-12 rounded-full bg-white p-1.5 shadow-lg flex-shrink-0 border border-zinc-800/50 flex items-center justify-center">
                  <img
                    src={edital.brasao}
                    alt={`Brasão de ${edital.cidade}`}
                    className="w-full h-full object-contain"
                    // Caso a imagem falhe ao carregar (antes de você adicionar na pasta), mostramos o ícone de mapa como fallback
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.parentElement?.classList.add("bg-zinc-800");
                      target.parentElement?.classList.remove("bg-white");
                    }}
                  />
                  {/* Ícone de fallback oculto por padrão (visível apenas se a imagem falhar) */}
                  <MapPin size={20} className="text-zinc-500 absolute -z-10" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 font-display">
                {edital.instituicao}
              </h3>
              <p className="text-sm font-medium text-amber-500 mb-6 flex items-center gap-1.5">
                <MapPin size={14} className="opacity-80" />
                {edital.cidade}
              </p>

              <div className="space-y-3.5 mb-8 flex-1">
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <Briefcase size={16} className="text-zinc-500" />
                  <span>{edital.vagas}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-zinc-800 text-[10px] font-bold text-zinc-400">
                    R$
                  </span>
                  <span>{edital.salario}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <Calendar size={16} className="text-zinc-500" />
                  <span>
                    Inscrições:{" "}
                    <strong className="text-zinc-100 font-medium">
                      {edital.inscricoes}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <FileText size={16} className="text-zinc-500" />
                  <span>
                    Banca:{" "}
                    <strong className="text-zinc-100 font-medium">
                      {edital.banca}
                    </strong>
                  </span>
                </div>
              </div>

              <a
                href={edital.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-2 rounded-xl bg-zinc-950/50 border border-zinc-800/80 text-sm font-bold text-zinc-300 transition-colors group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-zinc-950 overflow-hidden"
              >
                <span className="truncate">Ver no site da banca</span>
                <ExternalLink
                  size={16}
                  className="flex-shrink-0 opacity-70 group-hover:opacity-100"
                />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
