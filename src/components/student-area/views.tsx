import { useMemo, useState } from "react";
import {
  ArrowLeft,
  FileText,
  FolderOpen,
  GraduationCap,
  MessageCircle,
  RefreshCw,
  User,
} from "lucide-react";
import { whatsapp } from "../Layout";
import {
  disciplineName,
  disciplines,
  materials as allMaterials,
  materialsByDiscipline,
  mostRecentMaterial,
  notebooks,
  type Material,
  type MaterialType,
} from "./data";
import { MaterialItem } from "./MaterialItem";
import { EmptyState, PageHeading, QuickAccessCard } from "./ui";
import type { View } from "./router";

type FavoritesApi = {
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
};

const FILTERS: { key: MaterialType | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "pdf", label: "PDFs" },
  { key: "video", label: "Vídeos" },
  { key: "apostila", label: "Apostilas" },
];

function FilterRow({
  value,
  onChange,
}: {
  value: MaterialType | "todos";
  onChange: (v: MaterialType | "todos") => void;
}) {
  return (
    <div className="sa-filters" role="tablist" aria-label="Filtrar por tipo">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          type="button"
          role="tab"
          aria-selected={value === f.key}
          className={value === f.key ? "sa-filter active" : "sa-filter"}
          onClick={() => onChange(f.key)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

function MaterialList({
  items,
  favorites,
  toggleFavorite,
  showDiscipline = true,
  emptyDescription,
}: FavoritesApi & {
  items: Material[];
  showDiscipline?: boolean;
  emptyDescription?: string;
}) {
  if (items.length === 0) {
    return <EmptyState description={emptyDescription} />;
  }
  return (
    <div className="sa-material-list">
      {items.map((m) => (
        <MaterialItem
          key={m.id}
          material={m}
          isFavorite={favorites.has(m.id)}
          onToggleFavorite={toggleFavorite}
          showDiscipline={showDiscipline}
        />
      ))}
    </div>
  );
}

/* ───────────────────────── Início ───────────────────────── */

export function HomeView({
  studentName,
  navigate,
  favorites,
  toggleFavorite,
}: FavoritesApi & { studentName: string; navigate: (v: View) => void }) {
  const current = mostRecentMaterial();
  return (
    <div className="sa-view">
      <div className="sa-hero-card">
        <div>
          <h1>Olá, {studentName}!</h1>
          <p>Continue sua preparação.</p>
        </div>
      </div>

      <section className="sa-section">
        <h2 className="sa-section-title">Continue estudando</h2>
        <div className="sa-continue-card">
          <div>
            <p className="sa-continue-discipline">
              {disciplineName(current.disciplineId)}
            </p>
            <p className="sa-continue-title">{current.title}</p>
          </div>
          <a
            href={current.href}
            target="_blank"
            rel="noopener noreferrer"
            className="sa-continue-btn"
          >
            Continuar
          </a>
        </div>
      </section>

      <section className="sa-section">
        <h2 className="sa-section-title">Acesso rápido</h2>
        <div className="sa-quick-grid">
          <QuickAccessCard
            icon={FileText}
            title="Materiais"
            description="PDFs, apostilas e vídeos."
            onClick={() => navigate({ name: "materiais" })}
          />
          <QuickAccessCard
            icon={FolderOpen}
            title="Cadernos"
            description="Organize seus conteúdos."
            onClick={() => navigate({ name: "cadernos" })}
          />
          <QuickAccessCard
            icon={GraduationCap}
            title="Disciplinas"
            description="Encontre conteúdos por matéria."
            onClick={() => navigate({ name: "disciplinas" })}
          />
          <QuickAccessCard
            icon={RefreshCw}
            title="Revisões"
            description="Veja o que precisa revisar."
            onClick={() => navigate({ name: "revisoes" })}
          />
        </div>
      </section>

      <section className="sa-section">
        <h2 className="sa-section-title">Meus materiais</h2>
        <MaterialList
          items={allMaterials.slice(0, 3)}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </section>
    </div>
  );
}

/* ───────────────────────── Materiais ───────────────────────── */

export function MateriaisView({ favorites, toggleFavorite }: FavoritesApi) {
  const [filter, setFilter] = useState<MaterialType | "todos">("todos");
  const items = useMemo(
    () =>
      filter === "todos"
        ? allMaterials
        : allMaterials.filter((m) => m.type === filter),
    [filter],
  );
  return (
    <div className="sa-view">
      <PageHeading title="Meus materiais" />
      <FilterRow value={filter} onChange={setFilter} />
      <MaterialList
        items={items}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}

/* ───────────────────────── Disciplinas ───────────────────────── */

export function DisciplinasView({ navigate }: { navigate: (v: View) => void }) {
  return (
    <div className="sa-view">
      <PageHeading title="Disciplinas" />
      <div className="sa-discipline-grid">
        {disciplines.map((d) => {
          const count = materialsByDiscipline(d.id).length;
          return (
            <button
              key={d.id}
              type="button"
              className="sa-discipline-card"
              onClick={() => navigate({ name: "disciplina", slug: d.id })}
            >
              <span className="sa-discipline-icon" aria-hidden="true">
                <GraduationCap />
              </span>
              <span className="sa-discipline-name">{d.name}</span>
              <span className="sa-discipline-count">
                {count} {count === 1 ? "material" : "materiais"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DisciplinaDetailView({
  slug,
  navigate,
  favorites,
  toggleFavorite,
}: FavoritesApi & { slug: string; navigate: (v: View) => void }) {
  const [filter, setFilter] = useState<MaterialType | "todos">("todos");
  const all = materialsByDiscipline(slug);
  const items = filter === "todos" ? all : all.filter((m) => m.type === filter);
  return (
    <div className="sa-view">
      <button
        type="button"
        className="sa-back-link"
        onClick={() => navigate({ name: "disciplinas" })}
      >
        <ArrowLeft aria-hidden="true" /> Disciplinas
      </button>
      <PageHeading title={disciplineName(slug)} />
      <FilterRow value={filter} onChange={setFilter} />
      <MaterialList
        items={items}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        showDiscipline={false}
        emptyDescription="Ainda não há materiais desse tipo nesta disciplina."
      />
    </div>
  );
}

/* ───────────────────────── Cadernos ───────────────────────── */

export function CadernosView({ navigate }: { navigate: (v: View) => void }) {
  return (
    <div className="sa-view">
      <PageHeading title="Meus cadernos" />
      <div className="sa-notebook-list">
        {notebooks.map((n) => (
          <button
            key={n.id}
            type="button"
            className="sa-notebook-card"
            onClick={() => navigate({ name: "caderno", slug: n.id })}
          >
            <span className="sa-notebook-icon" aria-hidden="true">
              <FolderOpen />
            </span>
            <span className="sa-notebook-name">{n.name}</span>
            <span className="sa-notebook-count">
              {n.materialIds.length}{" "}
              {n.materialIds.length === 1 ? "item" : "itens"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function CadernoDetailView({
  slug,
  navigate,
  favorites,
  toggleFavorite,
}: FavoritesApi & { slug: string; navigate: (v: View) => void }) {
  const notebook = notebooks.find((n) => n.id === slug);
  const items = allMaterials.filter((m) =>
    notebook?.materialIds.includes(m.id),
  );
  return (
    <div className="sa-view">
      <button
        type="button"
        className="sa-back-link"
        onClick={() => navigate({ name: "cadernos" })}
      >
        <ArrowLeft aria-hidden="true" /> Cadernos
      </button>
      <PageHeading title={notebook?.name ?? "Caderno"} />
      <MaterialList
        items={items}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        emptyDescription="Este caderno ainda não tem conteúdos."
      />
    </div>
  );
}

/* ───────────────────────── Revisões / Favoritos ───────────────────────── */

export function RevisoesView({ favorites, toggleFavorite }: FavoritesApi) {
  const items = allMaterials.filter((m) => m.needsReview);
  return (
    <div className="sa-view">
      <PageHeading
        title="Revisões"
        subtitle="Conteúdos marcados para você revisar."
      />
      <MaterialList
        items={items}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        emptyDescription="Nenhuma revisão pendente por aqui. Bom trabalho!"
      />
    </div>
  );
}

export function FavoritosView({ favorites, toggleFavorite }: FavoritesApi) {
  const items = allMaterials.filter((m) => favorites.has(m.id));
  return (
    <div className="sa-view">
      <PageHeading title="Favoritos" />
      <MaterialList
        items={items}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        emptyDescription="Toque no coração de um material para salvá-lo aqui."
      />
    </div>
  );
}

/* ───────────────────────── Busca ───────────────────────── */

export function SearchResultsView({
  query,
  favorites,
  toggleFavorite,
}: FavoritesApi & { query: string }) {
  const q = query.trim().toLowerCase();
  const materialHits = allMaterials.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      disciplineName(m.disciplineId).toLowerCase().includes(q),
  );
  const disciplineHits = disciplines.filter((d) =>
    d.name.toLowerCase().includes(q),
  );
  const notebookHits = notebooks.filter((n) =>
    n.name.toLowerCase().includes(q),
  );
  const hasResults =
    materialHits.length > 0 ||
    disciplineHits.length > 0 ||
    notebookHits.length > 0;

  return (
    <div className="sa-view">
      <PageHeading
        title={`Resultados para "${query}"`}
        subtitle={
          hasResults
            ? undefined
            : "Tente alterar sua busca ou selecionar outra disciplina."
        }
      />
      {!hasResults && <EmptyState />}
      {disciplineHits.length > 0 && (
        <section className="sa-section">
          <h2 className="sa-section-title">Disciplinas</h2>
          <div className="sa-search-chip-row">
            {disciplineHits.map((d) => (
              <span key={d.id} className="sa-search-chip">
                <GraduationCap aria-hidden="true" />
                {d.name}
              </span>
            ))}
          </div>
        </section>
      )}
      {notebookHits.length > 0 && (
        <section className="sa-section">
          <h2 className="sa-section-title">Cadernos</h2>
          <div className="sa-search-chip-row">
            {notebookHits.map((n) => (
              <span key={n.id} className="sa-search-chip">
                <FolderOpen aria-hidden="true" />
                {n.name}
              </span>
            ))}
          </div>
        </section>
      )}
      {materialHits.length > 0 && (
        <section className="sa-section">
          <h2 className="sa-section-title">Materiais</h2>
          <MaterialList
            items={materialHits}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </section>
      )}
    </div>
  );
}

/* ───────────────────────── Páginas de apoio ───────────────────────── */

export function MeuPlanoView() {
  return (
    <div className="sa-view">
      <PageHeading title="Meu plano" />
      <div className="sa-plain-card">
        <p className="sa-plain-card-label">Plano ativo</p>
        <p className="sa-plain-card-title">Preparação completa</p>
        <p className="sa-plain-card-desc">
          Acesso a videoaulas, materiais e simulados de todas as disciplinas
          da sua preparação.
        </p>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="sa-plain-card-cta"
        >
          <MessageCircle aria-hidden="true" /> Falar com a equipe
        </a>
      </div>
    </div>
  );
}

export function DiscussoesView() {
  return (
    <div className="sa-view">
      <PageHeading title="Discussões" />
      <EmptyState
        title="Em breve por aqui."
        description="As discussões entre alunos e professores vão aparecer nesta área."
      />
    </div>
  );
}

export function ConfiguracoesView() {
  return (
    <div className="sa-view">
      <PageHeading title="Configurações" />
      <div className="sa-plain-card">
        <p className="sa-plain-card-label">Preferências</p>
        <p className="sa-plain-card-desc">
          O tema claro/escuro pode ser alterado a qualquer momento pelo botão
          no topo da página.
        </p>
      </div>
    </div>
  );
}

export function PerfilView({ studentName }: { studentName: string }) {
  return (
    <div className="sa-view">
      <PageHeading title="Perfil" />
      <div className="sa-plain-card">
        <span className="sa-profile-avatar" aria-hidden="true">
          <User />
        </span>
        <p className="sa-plain-card-title">{studentName}</p>
        <p className="sa-plain-card-desc">Aluno(a) Start Aprovação</p>
      </div>
    </div>
  );
}
