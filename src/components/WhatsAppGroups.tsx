import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { trackEvent } from "../App";

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const groups = [
  {
    name: "Uiraúna - PB",
    url: "https://chat.whatsapp.com/CgggrrGluFbACqlpYurrWh?mode=gi_t",
    members: "45+ alunos",
  },
  {
    name: "Poço Dantas - PB",
    url: "https://chat.whatsapp.com/HACDAXvcbJMFOzN8bqkB7x?mode=gi_t",
    members: "30+ alunos",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function WhatsAppGroups() {
  const handleGroupClick = (groupName: string) => {
    trackEvent("whatsapp_group_click", { group: groupName });
  };

  return (
    <section className="mb-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[hsla(var(--color-whatsapp),0.3)]" />
        <motion.div
          className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--color-whatsapp))]" />
          <span className="text-xs sm:text-sm font-semibold text-white">
            Entre no grupo da sua cidade
          </span>
        </motion.div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[hsla(var(--color-whatsapp),0.3)]" />
      </motion.div>

      {/* WhatsApp Buttons */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-2.5 sm:space-y-3 lg:space-y-4"
      >
        {groups.map((group, index) => (
          <motion.a
            key={group.name}
            href={group.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleGroupClick(group.name)}
            variants={itemVariants}
            custom={index}
            className="group shine-effect flex items-center gap-3 sm:gap-4 w-full bg-gradient-to-r from-[hsl(var(--color-whatsapp))] to-[hsl(var(--color-whatsapp-light))] text-white font-bold py-3.5 sm:py-4 px-4 sm:px-5 rounded-xl sm:rounded-2xl shadow-lg glow-whatsapp border border-white/20"
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>

            <div className="flex-1 text-left min-w-0">
              <span className="block text-sm sm:text-base font-bold truncate">
                Grupo de WhatsApp
              </span>
              <span className="text-xs sm:text-sm opacity-90 truncate block">
                {group.name} - {group.members}
              </span>
            </div>

            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-300 flex-shrink-0" />
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
