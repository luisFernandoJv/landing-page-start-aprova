import {
  AlertTriangle,
  BookOpenCheck,
  Gavel,
  Scale,
  Shield,
  Users,
} from "lucide-react";
import { Footer, LegalBackLink, Navigation } from "./Layout";
import { LEGAL_UPDATED } from "./PrivacyPolicy";

export function TermsOfService() {
  return (
    <div className="legal-page">
      <Navigation />
      <main className="legal-main">
        <LegalBackLink />
        <p className="eyebrow">CONDIÇÕES DE USO</p>
        <h1>Termos de Uso</h1>
        <p className="legal-updated">Última atualização: {LEGAL_UPDATED}</p>

        <section>
          <p>
            Estes Termos de Uso regulam o acesso e a utilização do site da Start
            Aprovação, bem como a contratação dos serviços de preparação para
            concursos oferecidos pela instituição. Ao usar este site ou se
            matricular em nossos cursos, você concorda com as condições
            descritas abaixo.
          </p>
        </section>

        <section>
          <h2>
            <BookOpenCheck aria-hidden="true" /> Sobre os serviços
          </h2>
          <p>
            A Start Aprovação oferece cursos preparatórios para concursos
            públicos, incluindo aulas, materiais didáticos, simulados e suporte
            de estudo, nas modalidades presencial e/ou online, conforme descrito
            no site.
          </p>
        </section>

        <section>
          <h2>
            <Gavel aria-hidden="true" /> Matrícula e pagamento
          </h2>
          <ul>
            <li>
              A matrícula é confirmada após o preenchimento do formulário
              oficial e a confirmação do pagamento, conforme as condições
              vigentes no momento da inscrição (à vista ou parcelado).
            </li>
            <li>
              Os valores, formas de pagamento e prazos de acesso ao material
              podem ser alterados a qualquer momento para novas turmas, sem
              efeito retroativo sobre matrículas já confirmadas.
            </li>
            <li>
              Vagas são limitadas e podem se encerrar antes da data anunciada.
            </li>
          </ul>
        </section>

        <section>
          <h2>
            <AlertTriangle aria-hidden="true" /> Isenção de responsabilidade
            sobre resultados
          </h2>
          <p>
            A Start Aprovação se compromete a fornecer material de qualidade,
            metodologia estruturada e acompanhamento durante a preparação. No
            entanto,{" "}
            <strong>não garantimos aprovação em concursos públicos</strong>, já
            que o resultado depende de fatores fora do nosso controle, como
            desempenho individual, concorrência, banca examinadora e número de
            vagas disponíveis.
          </p>
        </section>

        <section>
          <h2>
            <Shield aria-hidden="true" /> Propriedade intelectual
          </h2>
          <p>
            Todo o conteúdo produzido pela Start Aprovação — apostilas,
            videoaulas, simulados, slides e materiais de apoio — é protegido por
            direitos autorais e destinado exclusivamente ao uso pessoal do aluno
            matriculado. É proibida a reprodução, revenda ou compartilhamento do
            material com terceiros não matriculados, sob pena de suspensão do
            acesso e medidas legais cabíveis.
          </p>
        </section>

        <section>
          <h2>
            <Users aria-hidden="true" /> Grupo de WhatsApp e comunidade
          </h2>
          <p>
            Ao entrar em nossos grupos de WhatsApp, o aluno se compromete a
            manter um comportamento respeitoso com colegas e professores.
            Divulgação de conteúdo comercial de terceiros, spam ou ofensas podem
            resultar na remoção do grupo, sem prejuízo do acesso ao curso.
          </p>
        </section>

        <section>
          <h2>
            <Scale aria-hidden="true" /> Alterações nos termos
          </h2>
          <p>
            Estes Termos de Uso podem ser atualizados a qualquer momento, para
            refletir mudanças nos serviços oferecidos ou na legislação
            aplicável. A versão vigente será sempre a publicada nesta página.
          </p>
        </section>

        <section>
          <h2>
            <Gavel aria-hidden="true" /> Foro e legislação aplicável
          </h2>
          <p>
            Estes termos são regidos pela legislação brasileira. Eventuais
            controvérsias serão preferencialmente resolvidas por meio de contato
            direto com a nossa equipe, pelos canais informados na seção de
            contato do site.
          </p>
        </section>

        <div className="legal-note">
          Este documento tem caráter informativo e foi elaborado para refletir
          as práticas atuais da Start Aprovação. Ele não substitui uma
          consultoria jurídica especializada; recomendamos revisão por um
          advogado para adequação completa conforme o crescimento do negócio.
        </div>
      </main>
      <Footer />
    </div>
  );
}
