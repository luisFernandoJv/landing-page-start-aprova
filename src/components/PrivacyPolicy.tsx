import {
  Clock,
  Cookie,
  Database,
  FileText,
  Shield,
  UserCheck,
} from "lucide-react";
import { Footer, LegalBackLink, Navigation, whatsapp } from "./Layout";

export const LEGAL_UPDATED = "12 de setembro de 2026";

export function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <Navigation />
      <main className="legal-main">
        <LegalBackLink />
        <p className="eyebrow">TRANSPARÊNCIA E LGPD</p>
        <h1>Política de Privacidade</h1>
        <p className="legal-updated">Última atualização: {LEGAL_UPDATED}</p>

        <section>
          <p>
            A Start Aprovação respeita a sua privacidade e se compromete a
            proteger os dados pessoais de quem visita este site ou se relaciona
            com a gente, em conformidade com a Lei Geral de Proteção de Dados
            (Lei nº 13.709/2018 — LGPD). Esta política explica quais dados
            coletamos, para que usamos e quais são os seus direitos.
          </p>
        </section>

        <section>
          <h2>
            <Database aria-hidden="true" /> Quais dados coletamos
          </h2>
          <p>Coletamos dados em três situações principais:</p>
          <ul>
            <li>
              <strong>Formulário de matrícula:</strong> quando você preenche
              nosso formulário (Google Forms) para garantir uma vaga, coletamos
              nome, telefone e e-mail, entre outras informações que você opte
              por fornecer.
            </li>
            <li>
              <strong>WhatsApp:</strong> ao entrar em contato ou participar do
              nosso grupo, seu número de telefone e nome de perfil ficam
              visíveis para a equipe e demais participantes do grupo.
            </li>
            <li>
              <strong>Navegação no site:</strong> utilizamos o Google Analytics
              para entender como o site é usado (páginas visitadas, tempo de
              navegação, cliques em botões e links), através de cookies e
              identificadores anônimos.
            </li>
          </ul>
        </section>

        <section>
          <h2>
            <Clock aria-hidden="true" /> Para que usamos seus dados
          </h2>
          <ul>
            <li>Organizar turmas, matrículas e comunicação sobre o curso;</li>
            <li>
              Responder dúvidas enviadas por WhatsApp, e-mail ou redes sociais;
            </li>
            <li>
              Enviar avisos, materiais e informações relevantes sobre a
              preparação;
            </li>
            <li>
              Entender o comportamento de navegação para melhorar o site e
              nossas campanhas de divulgação.
            </li>
          </ul>
          <p>
            Não vendemos nem compartilhamos seus dados pessoais com terceiros
            para fins comerciais alheios à Start Aprovação.
          </p>
        </section>

        <section>
          <h2>
            <Cookie aria-hidden="true" /> Cookies e ferramentas de terceiros
          </h2>
          <p>
            Usamos o Google Analytics, que instala cookies no seu navegador para
            gerar estatísticas de uso do site. Também exibimos conteúdos
            incorporados do Instagram, que pode coletar dados de navegação
            conforme a própria política de privacidade da Meta. Você pode
            desativar cookies nas configurações do seu navegador a qualquer
            momento, embora isso possa afetar algumas funcionalidades do site.
          </p>
        </section>

        <section>
          <h2>
            <Clock aria-hidden="true" /> Por quanto tempo guardamos seus dados
          </h2>
          <p>
            Mantemos seus dados pelo tempo necessário para cumprir as
            finalidades descritas nesta política, ou até que você solicite a
            exclusão, respeitando eventuais obrigações legais de guarda de
            informações.
          </p>
        </section>

        <section>
          <h2>
            <UserCheck aria-hidden="true" /> Seus direitos como titular dos
            dados
          </h2>
          <p>De acordo com a LGPD, você pode, a qualquer momento:</p>
          <ul>
            <li>Confirmar se tratamos algum dado seu e acessá-lo;</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
            <li>
              Solicitar a exclusão ou anonimização de dados desnecessários;
            </li>
            <li>Revogar o consentimento dado anteriormente;</li>
            <li>
              Solicitar informações sobre com quem compartilhamos seus dados.
            </li>
          </ul>
          <p>
            Para exercer qualquer um desses direitos, entre em contato pelo
            e-mail{" "}
            <a
              className="legal-link"
              href="mailto:contato@startaprovacao.com.br"
            >
              contato@startaprovacao.com.br
            </a>{" "}
            ou pelo{" "}
            <a
              className="legal-link"
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            .
          </p>
        </section>

        <section>
          <h2>
            <Shield aria-hidden="true" /> Segurança
          </h2>
          <p>
            Adotamos medidas razoáveis para proteger seus dados contra acessos
            não autorizados, perda ou uso indevido. Ainda assim, nenhum sistema
            é 100% livre de riscos, e recomendamos que você também tome cuidado
            ao compartilhar informações sensíveis online.
          </p>
        </section>

        <section>
          <h2>
            <FileText aria-hidden="true" /> Alterações desta política
          </h2>
          <p>
            Esta política pode ser atualizada periodicamente para refletir
            mudanças em nossas práticas ou na legislação. A data da última
            atualização estará sempre indicada no topo desta página.
          </p>
        </section>

        <div className="legal-note">
          Este documento tem caráter informativo e foi elaborado para refletir
          as práticas atuais da Start Aprovação. Ele não substitui uma
          consultoria jurídica especializada; recomendamos revisão por um
          advogado para adequação completa à LGPD conforme o crescimento do
          negócio.
        </div>
      </main>
      <Footer />
    </div>
  );
}
