import { motion } from "framer-motion";
import { Star, Banknote, CreditCard, Percent, ShieldCheck } from "lucide-react";

const cardVariants = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const priceVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

export function PriceCard() {
  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      className="relative mb-6"
    >
      {/* Best Offer Badge - Outside card */}
      <motion.div
        className="flex justify-center mb-[-14px] relative z-10"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <motion.div
          className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[hsl(var(--color-warning))] to-[hsl(45,100%,45%)] px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold text-[hsl(var(--color-background))] shadow-lg"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Star className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" />
          <span className="hidden sm:inline">MELHOR OFERTA DO MERCADO</span>
          <span className="sm:hidden">MELHOR OFERTA</span>
          <Star className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" />
        </motion.div>
      </motion.div>

      {/* Main Card */}
      <motion.div
        className="relative shine-effect bg-gradient-to-br from-[hsl(var(--color-primary))] to-[hsl(var(--color-primary-dark))] p-5 sm:p-7 lg:p-10 text-center rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        whileHover={{
          scale: 1.01,
          transition: { type: "spring", stiffness: 400, damping: 25 },
        }}
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Investment Label */}
        <div className="relative">
          <motion.div
            className="text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] text-white/80 uppercase mb-3 sm:mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Investimento completo
          </motion.div>

          {/* Main Price */}
          <motion.div
            variants={priceVariants}
            className="flex items-baseline justify-center gap-1 mb-2"
          >
            <span className="text-base sm:text-lg lg:text-xl font-bold text-white/90">
              3x de
            </span>
            <motion.span
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white"
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              R$ 110
            </motion.span>
          </motion.div>

          {/* Credit Card Badge */}
          <motion.div
            className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80" />
            <span className="text-xs sm:text-sm text-white/90 font-medium">
              No cartão de crédito, sem juros
            </span>
          </motion.div>

          {/* Cash Price */}
          <motion.div
            className="inline-flex items-center gap-2 sm:gap-3 bg-black/25 backdrop-blur-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-white/20 mb-4 sm:mb-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
              <Banknote className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] sm:text-xs text-white/70 font-medium">
                Ou à vista por apenas
              </span>
              <span className="text-lg sm:text-xl font-black text-white">
                R$ 300,00
              </span>
            </div>
            <motion.div
              className="flex items-center gap-0.5 sm:gap-1 bg-[hsl(var(--color-success))] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg"
              whileHover={{ scale: 1.1 }}
            >
              <Percent className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
              <span className="text-[9px] sm:text-[10px] font-bold text-white">
                -9%
              </span>
            </motion.div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/15"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-white/80">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Pagamento seguro</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-white/80">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" />
              <span>Satisfação garantida</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
