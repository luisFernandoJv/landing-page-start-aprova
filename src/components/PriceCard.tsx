import { motion } from "framer-motion";
import {
  ShieldCheck,
  CreditCard,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import { trackEvent } from "../App";

const guarantees = [
  { icon: ShieldCheck, label: "Pagamento seguro" },
  { icon: CreditCard, label: "Sem juros ocultos" },
];

export function PriceCard() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, hsl(36,100%,54%) 0%, hsl(28,100%,38%) 100%)",
        }}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative grid md:grid-cols-2 gap-0">
          {/* Left — Price */}
          <div className="p-8 sm:p-12">
            <div
              className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(0,0,0,0.15)",
                color: "rgba(0,0,0,0.7)",
              }}
            >
              Investimento Mensal
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span
                className="text-xl font-bold"
                style={{ color: "rgba(0,0,0,0.6)" }}
              >
                R$
              </span>
              <span
                className="text-7xl sm:text-8xl font-black"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#0a0a0a",
                  lineHeight: 1,
                }}
              >
                130
              </span>
              <span
                className="text-lg font-bold"
                style={{ color: "rgba(0,0,0,0.6)" }}
              >
                /mês
              </span>
            </div>

            <p
              className="text-sm font-medium mb-8"
              style={{ color: "rgba(0,0,0,0.55)" }}
            >
              Menos de R$ 4,50 por dia
            </p>

            <div className="flex flex-wrap gap-4">
              {guarantees.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-sm"
                  style={{ color: "rgba(0,0,0,0.65)" }}
                >
                  <Icon size={14} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — CTA */}
          <div
            className="p-8 sm:p-12 flex flex-col justify-center"
            style={{ borderLeft: "1px solid rgba(0,0,0,0.1)" }}
          >
            <h3
              className="text-2xl sm:text-3xl font-extrabold mb-3"
              style={{ fontFamily: "var(--font-display)", color: "#0a0a0a" }}
            >
              Garanta sua vaga agora
            </h3>
            <p className="text-sm mb-8" style={{ color: "rgba(0,0,0,0.6)" }}>
              Turma híbrida com vagas limitadas. O tempo está passando e a
              concorrência já começou.
            </p>

            <motion.a
              href="https://forms.gle/e5GGQZqxGN2hMDnA6"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_click", {
                  location: "price_card",
                  type: "form",
                })
              }
              className="flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-base transition-all"
              style={{
                background: "#0a0a0a",
                color: "hsl(36,100%,54%)",
                fontFamily: "var(--font-display)",
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <ClipboardList size={18} />
              Quero Minha Vaga
              <ArrowRight size={16} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
