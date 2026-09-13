import { Search } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  title = "Nenhum material encontrado.",
  description = "Tente alterar sua busca ou selecionar outra disciplina.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="sa-empty">
      <span className="sa-empty-icon" aria-hidden="true">
        <Search />
      </span>
      <p className="sa-empty-title">{title}</p>
      <p className="sa-empty-desc">{description}</p>
    </div>
  );
}

export function PageHeading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="sa-page-heading">
      <div>
        {eyebrow && <p className="sa-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p className="sa-subtitle">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function QuickAccessCard({
  icon: Icon,
  title,
  description,
  onClick,
}: {
  icon: typeof Search;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className="sa-quick-card" onClick={onClick}>
      <span className="sa-quick-icon" aria-hidden="true">
        <Icon />
      </span>
      <span className="sa-quick-title">{title}</span>
      <span className="sa-quick-desc">{description}</span>
    </button>
  );
}
