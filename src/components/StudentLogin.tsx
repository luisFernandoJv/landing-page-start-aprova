import { useState, useRef, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  ShieldCheck,
  User,
} from "lucide-react";
import { EASE, whatsapp } from "./Layout";

/** Remove tudo que não é dígito. */
function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

/** Formata progressivamente enquanto o usuário digita: 000.000.000-00 */
function formatCPF(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  const p1 = digits.slice(0, 3);
  const p2 = digits.slice(3, 6);
  const p3 = digits.slice(6, 9);
  const p4 = digits.slice(9, 11);
  let out = p1;
  if (p2) out += `.${p2}`;
  if (p3) out += `.${p3}`;
  if (p4) out += `-${p4}`;
  return out;
}

/** Validação real de CPF (dígitos verificadores), não só formato. */
function isValidCPF(rawValue: string) {
  const cpf = onlyDigits(rawValue);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const calcDigit = (base: string) => {
    let sum = 0;
    let weight = base.length + 1;
    for (const char of base) {
      sum += Number(char) * weight;
      weight -= 1;
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  const d1 = calcDigit(cpf.slice(0, 9));
  const d2 = calcDigit(cpf.slice(0, 9) + d1);
  return cpf === cpf.slice(0, 9) + String(d1) + String(d2);
}

const benefits = [
  "Videoaulas e apostilas por disciplina",
  "Simulados no nível exato da sua banca",
  "Acompanhamento do seu progresso",
];

export function StudentLogin() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);

  const cpfDigits = onlyDigits(cpf);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (cpfDigits.length < 11 || !isValidCPF(cpf)) {
      setStatus("error");
      setErrorMsg(
        "Verifique o CPF digitado — ele parece incompleto ou inválido.",
      );
      return;
    }
    if (password.length < 1) {
      setStatus("error");
      setErrorMsg("Digite sua senha para continuar.");
      passwordRef.current?.focus();
      return;
    }

    setErrorMsg("");
    setStatus("loading");

    // TODO: substituir pela chamada real de autenticação da Start Aprovação.
    // Por ora, simula a validação e leva o aluno para a Área de Materiais.
    window.setTimeout(() => {
      window.location.href = "/area";
    }, 900);
  }

  return (
    <div className="login-page">
      <div className="login-grid">
        {/* ── Painel visual (some no mobile) ── */}
        <aside className="login-visual" aria-hidden="true">
          <div className="login-visual-glow" />
          <a href="/" className="login-visual-brand">
            <img src="/image/logo.png" alt="" />
          </a>

          <div className="login-visual-content">
            <p className="eyebrow">ÁREA DO ALUNO</p>
            <h2>
              Seus estudos, organizados
              <br />
              em um só lugar.
            </h2>
            <ul className="login-benefits">
              {benefits.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="login-visual-quote">
            <span className="login-visual-quote-mark">“</span>
            Estudar com direção é o que separa esforço de resultado.
          </div>
        </aside>

        {/* ── Painel de formulário ── */}
        <main className="login-form-panel">
          <motion.div
            className="login-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <a href="/" className="login-mobile-brand">
              <img src="/image/logo.png" alt="Start Aprovação" />
            </a>

            <p className="eyebrow">ÁREA DO ALUNO</p>
            <h1>Bem-vindo de volta</h1>
            <p className="login-subtitle">
              Acesse com seu CPF e senha para continuar sua preparação.
            </p>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="login-field">
                <label htmlFor="login-cpf">CPF</label>
                <div
                  className={
                    status === "error" &&
                    (cpfDigits.length < 11 || !isValidCPF(cpf))
                      ? "login-input-wrap login-input-error"
                      : "login-input-wrap"
                  }
                >
                  <User aria-hidden="true" />
                  <input
                    id="login-cpf"
                    name="cpf"
                    type="text"
                    inputMode="numeric"
                    autoComplete="username"
                    placeholder="000.000.000-00"
                    value={cpf}
                    maxLength={14}
                    onChange={(e) => {
                      setCpf(formatCPF(e.target.value));
                      if (status === "error") setStatus("idle");
                    }}
                  />
                </div>
              </div>

              <div className="login-field">
                <label htmlFor="login-password">Senha</label>
                <div
                  className={
                    status === "error" && password.length < 1
                      ? "login-input-wrap login-input-error"
                      : "login-input-wrap"
                  }
                >
                  <Lock aria-hidden="true" />
                  <input
                    id="login-password"
                    name="password"
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                  />
                  <button
                    type="button"
                    className="login-toggle-visibility"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    {showPassword ? (
                      <EyeOff aria-hidden="true" />
                    ) : (
                      <Eye aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {status === "error" && (
                <p className="login-error-msg" role="alert">
                  {errorMsg}
                </p>
              )}

              <div className="login-row">
                <label className="login-checkbox">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span className="login-checkbox-box">
                    <Check aria-hidden="true" />
                  </span>
                  Manter conectado
                </label>
                <a
                  href={`${whatsapp}?text=${encodeURIComponent(
                    "Oi! Esqueci minha senha da Área do Aluno, podem me ajudar?",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="login-forgot"
                >
                  Esqueci minha senha
                </a>
              </div>

              <motion.button
                type="submit"
                className="login-submit"
                disabled={status === "loading"}
                whileHover={status !== "loading" ? { y: -2 } : undefined}
                whileTap={status !== "loading" ? { scale: 0.98 } : undefined}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
              >
                {status === "loading" ? (
                  <>
                    <span className="login-spinner" aria-hidden="true" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <LogIn aria-hidden="true" />
                    Entrar na área do aluno
                  </>
                )}
              </motion.button>
            </form>

            <div className="login-divider">
              <span />
              ou
              <span />
            </div>

            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="login-secondary"
            >
              Ainda não sou aluno, quero me matricular
              <ArrowRight aria-hidden="true" />
            </a>

            <p className="login-security-note">
              <ShieldCheck aria-hidden="true" />
              Ambiente seguro. Seus dados são protegidos conforme a LGPD.
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}