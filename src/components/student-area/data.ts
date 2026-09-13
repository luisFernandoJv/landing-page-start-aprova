/**
 * Dados de exemplo da Área do Aluno.
 *
 * Em produção isso deve vir da API/backend da Start Aprovação. Por ora,
 * usamos um conjunto estático para montar a interface — a estrutura dos
 * tipos (Discipline, Material, Notebook) é o que importa: basta trocar
 * estas constantes por dados reais sem mexer nos componentes.
 */

export type MaterialType = "pdf" | "video" | "apostila";

export interface Material {
  id: string;
  title: string;
  disciplineId: string;
  type: MaterialType;
  meta: string; // ex.: "42 páginas", "35 min"
  href: string;
  favorite?: boolean;
  needsReview?: boolean;
  updatedAt: string; // ISO date, usado para "continuar estudando"
}

export interface Discipline {
  id: string;
  name: string;
  description: string;
}

export interface Notebook {
  id: string;
  name: string;
  disciplineId: string;
  materialIds: string[];
}

export const disciplines: Discipline[] = [
  {
    id: "portugues",
    name: "Português",
    description: "Interpretação, gramática e redação.",
  },
  {
    id: "matematica",
    name: "Matemática",
    description: "Raciocínio lógico e matemática básica.",
  },
  {
    id: "informatica",
    name: "Informática",
    description: "Conceitos, ferramentas e segurança da informação.",
  },
  {
    id: "direito-constitucional",
    name: "Direito Constitucional",
    description: "Princípios fundamentais e organização do Estado.",
  },
  {
    id: "direito-administrativo",
    name: "Direito Administrativo",
    description: "Atos, poderes e responsabilidade da administração.",
  },
];

export const materials: Material[] = [
  {
    id: "mat-1",
    title: "Interpretação de Texto",
    disciplineId: "portugues",
    type: "pdf",
    meta: "42 páginas",
    href: "/materiais/portugues/interpretacao-de-texto.pdf",
    updatedAt: "2026-09-10",
  },
  {
    id: "mat-2",
    title: "Gramática — Classes de palavras",
    disciplineId: "portugues",
    type: "pdf",
    meta: "28 páginas",
    href: "/materiais/portugues/gramatica.pdf",
    needsReview: true,
    updatedAt: "2026-08-28",
  },
  {
    id: "mat-3",
    title: "Aula 01 — Concordância verbal",
    disciplineId: "portugues",
    type: "video",
    meta: "31 min",
    href: "/videoaulas/portugues/aula-01",
    updatedAt: "2026-09-01",
  },
  {
    id: "mat-4",
    title: "Aula 02 — Concordância nominal",
    disciplineId: "portugues",
    type: "video",
    meta: "27 min",
    href: "/videoaulas/portugues/aula-02",
    updatedAt: "2026-09-03",
  },
  {
    id: "mat-5",
    title: "Redação — Estrutura dissertativa",
    disciplineId: "portugues",
    type: "apostila",
    meta: "18 páginas",
    href: "/materiais/portugues/redacao.pdf",
    favorite: true,
    updatedAt: "2026-08-20",
  },
  {
    id: "mat-6",
    title: "Porcentagem",
    disciplineId: "matematica",
    type: "apostila",
    meta: "22 páginas",
    href: "/materiais/matematica/porcentagem.pdf",
    updatedAt: "2026-09-05",
  },
  {
    id: "mat-7",
    title: "Porcentagem — Videoaula",
    disciplineId: "matematica",
    type: "video",
    meta: "24 min",
    href: "/videoaulas/matematica/porcentagem",
    updatedAt: "2026-09-05",
  },
  {
    id: "mat-8",
    title: "Regra de três simples e composta",
    disciplineId: "matematica",
    type: "pdf",
    meta: "16 páginas",
    href: "/materiais/matematica/regra-de-tres.pdf",
    needsReview: true,
    updatedAt: "2026-08-15",
  },
  {
    id: "mat-9",
    title: "Windows — Aula 03",
    disciplineId: "informatica",
    type: "video",
    meta: "35 min",
    href: "/videoaulas/informatica/windows-aula-03",
    favorite: true,
    updatedAt: "2026-09-08",
  },
  {
    id: "mat-10",
    title: "Segurança da informação",
    disciplineId: "informatica",
    type: "pdf",
    meta: "30 páginas",
    href: "/materiais/informatica/seguranca-da-informacao.pdf",
    updatedAt: "2026-08-22",
  },
  {
    id: "mat-11",
    title: "Princípios fundamentais — CF/88",
    disciplineId: "direito-constitucional",
    type: "pdf",
    meta: "38 páginas",
    href: "/materiais/direito-constitucional/principios-fundamentais.pdf",
    updatedAt: "2026-08-30",
  },
  {
    id: "mat-12",
    title: "Direitos e garantias fundamentais",
    disciplineId: "direito-constitucional",
    type: "apostila",
    meta: "44 páginas",
    href: "/materiais/direito-constitucional/direitos-e-garantias.pdf",
    needsReview: true,
    updatedAt: "2026-08-12",
  },
  {
    id: "mat-13",
    title: "Atos administrativos",
    disciplineId: "direito-administrativo",
    type: "pdf",
    meta: "26 páginas",
    href: "/materiais/direito-administrativo/atos-administrativos.pdf",
    updatedAt: "2026-09-02",
  },
  {
    id: "mat-14",
    title: "Poderes da administração — Videoaula",
    disciplineId: "direito-administrativo",
    type: "video",
    meta: "29 min",
    href: "/videoaulas/direito-administrativo/poderes-da-administracao",
    updatedAt: "2026-08-18",
  },
];

export const notebooks: Notebook[] = [
  {
    id: "cad-portugues",
    name: "Português",
    disciplineId: "portugues",
    materialIds: ["mat-1", "mat-2", "mat-3", "mat-4", "mat-5"],
  },
  {
    id: "cad-matematica",
    name: "Matemática",
    disciplineId: "matematica",
    materialIds: ["mat-6", "mat-7", "mat-8"],
  },
  {
    id: "cad-informatica",
    name: "Informática",
    disciplineId: "informatica",
    materialIds: ["mat-9", "mat-10"],
  },
  {
    id: "cad-concurso-pm",
    name: "Concurso PM",
    disciplineId: "direito-constitucional",
    materialIds: ["mat-11", "mat-12", "mat-13", "mat-14"],
  },
];

export function disciplineName(id: string): string {
  return disciplines.find((d) => d.id === id)?.name ?? id;
}

export function materialsByDiscipline(id: string): Material[] {
  return materials.filter((m) => m.disciplineId === id);
}

export function mostRecentMaterial(): Material {
  return [...materials].sort((a, b) =>
    a.updatedAt < b.updatedAt ? 1 : -1,
  )[0];
}
