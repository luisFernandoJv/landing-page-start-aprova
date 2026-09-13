import { useMemo, useState } from "react";
import { FileText, Search } from "lucide-react";
import { Navigation, Footer } from "./Layout";

export function Materials() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todos");
  const categories = [
    "Todos",
    "Português",
    "Matemática",
    "Direito",
    "Informática",
    "Legislação",
    "Conhecimentos específicos",
  ];
  const empty = useMemo(() => !query && filter === "Todos", [query, filter]);
  return (
    <div className="materials-page">
      <Navigation />
      <main className="section-wrap materials">
        <p className="eyebrow">BIBLIOTECA DIGITAL</p>
        <h1>
          Seu material de estudo,
          <br />
          <em>organizado em um só lugar.</em>
        </h1>
        <p className="lead">
          Encontre apostilas, PDFs, mapas mentais e materiais complementares
          para continuar sua preparação.
        </p>
        <div className="search-box">
          <Search />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar material..."
            aria-label="Buscar material"
          />
        </div>
        <div className="filter-row">
          {categories.map((c) => (
            <button
              className={filter === c ? "active" : ""}
              onClick={() => setFilter(c)}
              key={c}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="materials-empty">
          <FileText />
          <h2>
            {empty
              ? "Sua biblioteca está sendo preparada"
              : "Nenhum material encontrado"}
          </h2>
          <p>
            {empty
              ? "Em breve, você terá acesso a materiais organizados para cada etapa da sua preparação."
              : "Tente buscar outro termo ou selecionar uma categoria diferente."}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
