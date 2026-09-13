import { ArrowRight, Check, GraduationCap, Sparkles } from "lucide-react";
import { CTA, Footer, LegalBackLink, Navigation, Reveal } from "./Layout";
import { teachers } from "./teachers";

export function TeacherProfile({ slug }: { slug: string }) {
  const teacher = teachers.find((t) => t.slug === slug);

  if (!teacher) {
    return (
      <div className="legal-page">
        <Navigation />
        <main className="legal-main">
          <LegalBackLink />
          <p className="eyebrow">OPS</p>
          <h1>Professor não encontrado</h1>
          <p>
            Não encontramos essa página. Volte para conhecer toda a nossa equipe
            de professores.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const others = teachers.filter((t) => t.slug !== slug);

  return (
    <div className="teacher-page">
      <Navigation />
      <main className="teacher-profile">
        <div className="section-wrap">
          <LegalBackLink href="/#professores" label="Voltar para a equipe" />

          <div className="teacher-profile-grid">
            <Reveal className="teacher-profile-photo" y={20}>
              <img
                src={teacher.photo}
                alt={`${teacher.name} ${teacher.highlight}, ${teacher.subject}`}
              />
            </Reveal>

            <Reveal className="teacher-profile-info" delay={0.1} y={20}>
              <p className="eyebrow">PROFESSOR START APROVAÇÃO</p>
              <h1>
                {teacher.name} <em>{teacher.highlight}</em>
              </h1>
              <p className="teacher-profile-subject">{teacher.subject}</p>

              <div className="teacher-profile-formation">
                <GraduationCap aria-hidden="true" />
                <span>{teacher.formation}</span>
              </div>

              {teacher.bio.map((paragraph, i) => (
                <p key={i} className="teacher-profile-bio">
                  {paragraph}
                </p>
              ))}

              <div className="teacher-profile-highlights">
                <p className="teacher-profile-highlights-title">
                  <Sparkles aria-hidden="true" /> Foco das aulas
                </p>
                <ul>
                  {teacher.highlights.map((h) => (
                    <li key={h}>
                      <Check aria-hidden="true" /> {h}
                    </li>
                  ))}
                </ul>
              </div>

              <CTA>QUERO ESTUDAR COM {teacher.highlight.toUpperCase()}</CTA>
            </Reveal>
          </div>
        </div>

        <div className="section-wrap teacher-profile-others">
          <p className="teacher-profile-others-title">Outros professores</p>
          <div className="teacher-profile-others-grid">
            {others.map((t) => (
              <a
                key={t.slug}
                href={`/professor/${t.slug}`}
                className="teacher-profile-other-card"
              >
                <img
                  src={t.photo}
                  alt={`${t.name} ${t.highlight}`}
                  loading="lazy"
                />
                <div>
                  <span className="teacher-profile-other-subject">
                    {t.subject}
                  </span>
                  <span className="teacher-profile-other-name">
                    {t.name} <em>{t.highlight}</em>
                  </span>
                </div>
                <ArrowRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
