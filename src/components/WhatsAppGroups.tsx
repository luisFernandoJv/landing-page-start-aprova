import { motion } from "framer-motion";
import { ArrowRight, Users, MessageSquare } from "lucide-react";
import { trackEvent } from "../App";

// 1. Definição corrigida: Adicionamos a propriedade className ao tipo
const WhatsAppIcon = ({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string; // Prop adicionada para evitar erro de TS2322
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className} // Agora é aceito pelo TypeScript
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const groups = [
  {
    name: "Uiraúna — PB",
    url: "https://chat.whatsapp.com/CgggrrGluFbACqlpYurrWh?s=cl&p=a&mlu=0",
    members: "45+ alunos ativos",
  },
];

export function WhatsAppGroups() {
  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 max-w-[1200px] mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-[11px] font-bold uppercase tracking-wider mb-4 backdrop-blur-sm shadow-sm">
          <MessageSquare size={14} className="text-emerald-500" />
          Nossa Comunidade
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-3">
          Estude com quem está na{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
            mesma jornada
          </span>
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Participe do nosso grupo oficial para receber avisos, materiais
          gratuitos e suporte da equipe.
        </p>
      </motion.div>

      <div className="flex justify-center">
        {groups.map((group) => (
          <motion.a
            key={group.name}
            href={group.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("whatsapp_group_click", { group: group.name })
            }
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="group flex items-center gap-5 p-5 sm:p-6 rounded-3xl w-full max-w-xl bg-zinc-900/40 border border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all duration-300 shadow-xl backdrop-blur-sm"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg group-hover:shadow-emerald-500/50 transition-shadow">
              <WhatsAppIcon size={28} className="text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="block text-xl font-extrabold text-white font-display tracking-tight mb-1">
                Entrar no Grupo VIP
              </span>
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                <Users size={14} className="text-emerald-500" />
                {group.name} <span className="mx-0.5">•</span> {group.members}
              </div>
            </div>

            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-800/80 text-zinc-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors flex-shrink-0">
              <ArrowRight size={18} />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
