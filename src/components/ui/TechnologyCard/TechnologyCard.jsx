import { useState } from "react";
import TechnologyNotes from "../TechnologyNotes/TechnologyNotes";
import "./TechnologyCard.css";

const STATUS_ICONS = {
  "not-started": "⏳",
  "in-progress": "🔄",
  "completed": "✅"
};

export default function TechnologyCard({ 
  id, 
  title, 
  description, 
  status, 
  notes,
  onChangeStatus, 
  onUpdateNotes 
}) {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div
      className={`technology-card technology-card--${status}`}
      onClick={onChangeStatus}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onChangeStatus()}
      title="Кликни чтобы изменить статус"
    >
      <div className="card__header">
        <span className="card__icon">{STATUS_ICONS[status]}</span>
        <h3 className="card__title">{title}</h3>
        <button
          className={`card__notes-toggle ${showNotes ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setShowNotes(!showNotes);
          }}
          title="Показать/скрыть заметки"
        >
          📝 {notes.length > 0 && <span className="notes-badge">{notes.length}</span>}
        </button>
      </div>
      <p className="card__description">{description}</p>
      <span className="card__status">{status}</span>

      {showNotes && (
        <TechnologyNotes
          notes={notes}
          onNotesChange={onUpdateNotes}
          techId={id}
        />
      )}
    </div>
  );
}
