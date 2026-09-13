import { Download, FileText, Heart, Play, PlayCircle } from "lucide-react";
import type { Material } from "./data";
import { disciplineName } from "./data";

const TYPE_CONFIG: Record<
  Material["type"],
  { icon: typeof FileText; label: string; action: string; actionIcon: typeof Download }
> = {
  pdf: { icon: FileText, label: "PDF", action: "Baixar", actionIcon: Download },
  video: { icon: PlayCircle, label: "Vídeo", action: "Assistir", actionIcon: Play },
  apostila: { icon: FileText, label: "Apostila", action: "Abrir", actionIcon: FileText },
};

export function MaterialItem({
  material,
  isFavorite,
  onToggleFavorite,
  showDiscipline = true,
}: {
  material: Material;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  showDiscipline?: boolean;
}) {
  const config = TYPE_CONFIG[material.type];
  const Icon = config.icon;
  const ActionIcon = config.actionIcon;

  return (
    <div className={`sa-material sa-material-${material.type}`}>
      <span className="sa-material-icon" aria-hidden="true">
        <Icon />
      </span>
      <div className="sa-material-body">
        <p className="sa-material-title">{material.title}</p>
        <p className="sa-material-meta">
          {showDiscipline && (
            <>
              {disciplineName(material.disciplineId)}
              <span aria-hidden="true"> · </span>
            </>
          )}
          {config.label}
          <span aria-hidden="true"> · </span>
          {material.meta}
        </p>
      </div>
      <div className="sa-material-actions">
        <button
          type="button"
          className={
            isFavorite
              ? "sa-favorite-btn sa-favorite-btn-active"
              : "sa-favorite-btn"
          }
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Remover ${material.title} dos favoritos`
              : `Adicionar ${material.title} aos favoritos`
          }
          onClick={() => onToggleFavorite(material.id)}
        >
          <Heart aria-hidden="true" />
        </button>
        <a
          href={material.href}
          target="_blank"
          rel="noopener noreferrer"
          className="sa-material-cta"
        >
          <ActionIcon aria-hidden="true" />
          <span>{config.action}</span>
        </a>
      </div>
    </div>
  );
}
