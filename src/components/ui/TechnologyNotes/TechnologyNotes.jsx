import "./TechnologyNotes.css";

export default function TechnologyNotes({ notes, onNotesChange, techId }) {
  return (
    <div className="notes-section">
      <div className="notes-header">
        <h4>📝 Мои заметки</h4>
        <span className="notes-char-count">{notes.length} символов</span>
      </div>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        placeholder="Записывайте сюда важные моменты, примеры кода, ссылки..."
        className="notes-textarea"
        rows="4"
      />
      <div className="notes-hint">
        {notes.length > 0 ? "✅ Заметка автосохранена" : "💡 Добавьте заметку к этой технологии"}
      </div>
    </div>
  );
}
