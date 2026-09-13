import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  BookMarked,
  FileText,
  FolderOpen,
  GraduationCap,
  Heart,
  Home,
  LogOut,
  MessageCircle,
  Menu,
  RefreshCw,
  Search,
  Settings,
  User,
  X,
  Zap,
} from "lucide-react";
import { mostRecentMaterial } from "./data";
import {
  getInitialTheme,
  persistTheme,
  ThemeToggle,
  type Theme,
} from "./ThemeToggle";
import { parsePath, viewToPath, type View } from "./router";
import {
  CadernoDetailView,
  CadernosView,
  ConfiguracoesView,
  DisciplinaDetailView,
  DisciplinasView,
  DiscussoesView,
  FavoritosView,
  HomeView,
  MateriaisView,
  MeuPlanoView,
  PerfilView,
  RevisoesView,
  SearchResultsView,
} from "./views";

const STUDENT_NAME = "Luis";

interface NavItem {
  view?: View;
  label: string;
  icon: typeof Home;
  onSelect?: () => void;
}

export function StudentArea({ initialPath }: { initialPath?: string }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [view, setView] = useState<View>(() =>
    parsePath(initialPath ?? window.location.pathname),
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(
    () => new Set(["mat-5", "mat-9"]),
  );

  useEffect(() => {
    persistTheme(theme);
  }, [theme]);

  useEffect(() => {
    const onPop = () => setView(parsePath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.getElementById("sa-content")?.scrollTo({ top: 0 });
  }, [view]);

  function navigate(next: View) {
    setView(next);
    setQuery("");
    setSidebarOpen(false);
    const path = viewToPath(next);
    if (path !== window.location.pathname) {
      window.history.pushState(null, "", path);
    }
  }

  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  }

  const favoritesApi = { favorites, toggleFavorite };

  const principal: NavItem[] = [
    { view: { name: "home" }, label: "Início", icon: Home },
    { view: { name: "meu-plano" }, label: "Meu plano", icon: BookMarked },
    {
      label: "Estudar agora",
      icon: Zap,
      onSelect: () =>
        window.open(mostRecentMaterial().href, "_blank", "noopener"),
    },
  ];
  const estudos: NavItem[] = [
    { view: { name: "disciplinas" }, label: "Disciplinas", icon: GraduationCap },
    { view: { name: "materiais" }, label: "Materiais", icon: FileText },
    { view: { name: "cadernos" }, label: "Cadernos", icon: FolderOpen },
    { view: { name: "revisoes" }, label: "Revisões", icon: RefreshCw },
  ];
  const outros: NavItem[] = [
    { view: { name: "discussoes" }, label: "Discussões", icon: MessageCircle },
    { view: { name: "favoritos" }, label: "Favoritos", icon: Heart },
  ];

  const isActive = (item: NavItem) =>
    !!item.view &&
    (item.view.name === view.name ||
      (item.view.name === "disciplinas" && view.name === "disciplina") ||
      (item.view.name === "cadernos" && view.name === "caderno"));

  function renderNavGroup(title: string, items: NavItem[]) {
    return (
      <div className="sa-nav-group">
        <p className="sa-nav-group-title">{title}</p>
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            className={isActive(item) ? "sa-nav-item active" : "sa-nav-item"}
            onClick={() => (item.view ? navigate(item.view) : item.onSelect?.())}
          >
            <item.icon aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    );
  }

  const content = useMemo(() => {
    if (query.trim()) {
      return (
        <SearchResultsView query={query} {...favoritesApi} />
      );
    }
    switch (view.name) {
      case "home":
        return (
          <HomeView
            studentName={STUDENT_NAME}
            navigate={navigate}
            {...favoritesApi}
          />
        );
      case "materiais":
        return <MateriaisView {...favoritesApi} />;
      case "disciplinas":
        return <DisciplinasView navigate={navigate} />;
      case "disciplina":
        return (
          <DisciplinaDetailView
            slug={view.slug}
            navigate={navigate}
            {...favoritesApi}
          />
        );
      case "cadernos":
        return <CadernosView navigate={navigate} />;
      case "caderno":
        return (
          <CadernoDetailView
            slug={view.slug}
            navigate={navigate}
            {...favoritesApi}
          />
        );
      case "revisoes":
        return <RevisoesView {...favoritesApi} />;
      case "favoritos":
        return <FavoritosView {...favoritesApi} />;
      case "meu-plano":
        return <MeuPlanoView />;
      case "discussoes":
        return <DiscussoesView />;
      case "configuracoes":
        return <ConfiguracoesView />;
      case "perfil":
        return <PerfilView studentName={STUDENT_NAME} />;
      default:
        return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, query, favorites]);

  const sidebar = (
    <>
      <a href="/" className="sa-brand">
        <img src="/image/logo.png" alt="Start Aprovação" />
      </a>
      <nav className="sa-nav" aria-label="Navegação da área do aluno">
        {renderNavGroup("Principal", principal)}
        {renderNavGroup("Estudos", estudos)}
        {renderNavGroup("Outros", outros)}
      </nav>
      <div className="sa-nav-footer">
        <button
          type="button"
          className={
            view.name === "configuracoes" ? "sa-nav-item active" : "sa-nav-item"
          }
          onClick={() => navigate({ name: "configuracoes" })}
        >
          <Settings aria-hidden="true" />
          <span>Configurações</span>
        </button>
        <button
          type="button"
          className={view.name === "perfil" ? "sa-nav-item active" : "sa-nav-item"}
          onClick={() => navigate({ name: "perfil" })}
        >
          <User aria-hidden="true" />
          <span>Perfil</span>
        </button>
        <a href="/" className="sa-nav-item sa-nav-item-exit">
          <LogOut aria-hidden="true" />
          <span>Sair</span>
        </a>
      </div>
    </>
  );

  return (
    <div className="student-area" data-theme={theme}>
      <aside className="sa-sidebar sa-sidebar-desktop">{sidebar}</aside>

      {sidebarOpen && (
        <div className="sa-sidebar-overlay" onClick={() => setSidebarOpen(false)}>
          <aside
            className="sa-sidebar sa-sidebar-mobile"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="sa-sidebar-close"
              aria-label="Fechar menu"
              onClick={() => setSidebarOpen(false)}
            >
              <X aria-hidden="true" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="sa-main">
        <header className="sa-header">
          <button
            type="button"
            className="sa-menu-btn"
            aria-label="Abrir menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu aria-hidden="true" />
          </button>

          <div className="sa-search">
            <Search aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar materiais, disciplinas..."
              aria-label="Buscar materiais, disciplinas, cadernos"
            />
          </div>

          <div className="sa-header-actions">
            <button
              type="button"
              className="sa-icon-btn"
              aria-label="Notificações"
            >
              <Bell aria-hidden="true" />
            </button>
            <ThemeToggle theme={theme} onChange={setTheme} />
            <button
              type="button"
              className="sa-profile-btn"
              onClick={() => navigate({ name: "perfil" })}
            >
              <span className="sa-avatar" aria-hidden="true">
                <User />
              </span>
              <span className="sa-profile-name">{STUDENT_NAME}</span>
            </button>
          </div>
        </header>

        <main id="sa-content" className="sa-content">
          {content}
        </main>
      </div>
    </div>
  );
}
