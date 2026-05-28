import { motion } from "framer-motion";
import {
  ShieldCheck,
  CreditCard,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import { trackEvent } from "../App";

const guarantees = [
  { icon: ShieldCheck, label: "Pagamento seguro via plataforma" },
  { icon: CreditCard, label: "Parcelamento flexível" },
];

export function PriceCard() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl"
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative grid md:grid-cols-2 gap-0">
          {/* Left — Price */}
          <div className="p-8 sm:p-12 md:p-16">
            <div className="inline-block text-xs font-bold uppercase tracking-widest mb-6 px-4 py-2 rounded-full bg-black/15 text-black/80">
              Invista no seu futuro
            </div>

            <div className="flex flex-col gap-2 mb-8">
              {/* À vista */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-black/60">R$</span>
                <span className="text-6xl sm:text-7xl lg:text-8xl font-black text-black leading-none font-display">
                  300
                </span>
                <span className="text-lg font-bold text-black/60">à vista</span>
              </div>

              {/* Parcelado */}
              <div className="text-xl sm:text-2xl font-extrabold text-black/75">
                ou 3x de R$ 110,00
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8">
              {guarantees.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm font-bold text-black/75"
                >
                  <Icon size={18} className="text-black/60" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — CTA */}
          <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center border-t md:border-t-0 md:border-l border-black/10 bg-black/5 backdrop-blur-sm">
            <h3 className="text-3xl sm:text-4xl font-extrabold mb-4 text-black font-display">
              Garanta sua vaga agora
            </h3>
            <p className="text-base font-medium mb-8 text-black/70 leading-relaxed">
              Turma híbrida com vagas limitadas. O tempo está passando e a
              concorrência já começou sua preparação.
            </p>

            <motion.a
              href="https://forms.gle/e5GGQZqxGN2hMDnA6"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Preencher formulário de matrícula"
              onClick={() =>
                trackEvent("cta_click", {
                  location: "price_card",
                  type: "form",
                })
              }
              className="flex items-center justify-center gap-3 py-5 px-8 rounded-xl font-bold text-lg transition-all bg-zinc-950 text-amber-500 shadow-xl hover:shadow-2xl font-display group"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <ClipboardList
                size={22}
                className="group-hover:scale-110 transition-transform"
              />
              Quero Minha Vaga
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
