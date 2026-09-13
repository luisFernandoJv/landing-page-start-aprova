export type View =
  | { name: "home" }
  | { name: "materiais" }
  | { name: "disciplinas" }
  | { name: "disciplina"; slug: string }
  | { name: "cadernos" }
  | { name: "caderno"; slug: string }
  | { name: "revisoes" }
  | { name: "favoritos" }
  | { name: "meu-plano" }
  | { name: "discussoes" }
  | { name: "configuracoes" }
  | { name: "perfil" };

const BASE = "/area";

/** Converte a pathname atual (ex.: "/area/disciplinas/portugues") em uma View. */
export function parsePath(pathname: string): View {
  // Compatibilidade: a rota antiga "/materiais" continua funcionando.
  if (pathname === "/materiais") return { name: "materiais" };

  const rest = pathname.startsWith(BASE)
    ? pathname.slice(BASE.length).replace(/^\//, "")
    : "";
  const [segment, slug] = rest.split("/").filter(Boolean);

  switch (segment) {
    case undefined:
      return { name: "home" };
    case "materiais":
      return { name: "materiais" };
    case "disciplinas":
      return slug
        ? { name: "disciplina", slug }
        : { name: "disciplinas" };
    case "cadernos":
      return slug ? { name: "caderno", slug } : { name: "cadernos" };
    case "revisoes":
      return { name: "revisoes" };
    case "favoritos":
      return { name: "favoritos" };
    case "meu-plano":
      return { name: "meu-plano" };
    case "discussoes":
      return { name: "discussoes" };
    case "configuracoes":
      return { name: "configuracoes" };
    case "perfil":
      return { name: "perfil" };
    default:
      return { name: "home" };
  }
}

export function viewToPath(view: View): string {
  switch (view.name) {
    case "home":
      return BASE;
    case "disciplina":
      return `${BASE}/disciplinas/${view.slug}`;
    case "caderno":
      return `${BASE}/cadernos/${view.slug}`;
    default:
      return `${BASE}/${view.name}`;
  }
}

export function isStudentAreaPath(pathname: string): boolean {
  return pathname === "/materiais" || pathname === BASE || pathname.startsWith(`${BASE}/`);
}
