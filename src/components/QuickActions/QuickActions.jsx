import { useRef, useState } from "react";
import "./QuickActions.css";

export default function QuickActions({
  onMarkAllCompleted,
  onResetAll,
  onPickRandom,
  onExport,
  onImport
}) {
  const fileInputRef = useRef(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        setImportText(text);
        setShowImportModal(true);
      }
    };
    reader.readAsText(file);
  };

  const handleImportConfirm = () => {
    if (onImport(importText)) {
      alert("✅ Данные успешно импортированы!");
      setShowImportModal(false);
      setImportText("");
    } else {
      alert("❌ Ошибка при импорте данных");
    }
  };

  return (
    <>
      <section className="quick-actions-section">
        <h3 className="quick-actions-title">Быстрые действия</h3>
        <div className="quick-actions">
          <button
            onClick={onMarkAllCompleted}
            className="btn btn-primary"
            title="Отметить все технологии как выполненные"
          >
            ✓ Выполнить все
          </button>
          <button
            onClick={onResetAll}
            className="btn btn-secondary"
            title="Сбросить все статусы на начальное значение"
          >
            ↻ Сбросить все
          </button>
          <button
            onClick={onPickRandom}
            className="btn btn-tertiary"
            title="Выбрать случайную технологию для начала"
          >
            🎲 Случайно
          </button>
          <button
            onClick={onExport}
            className="btn btn-export"
            title="Скачать данные в JSON"
          >
            📥 Экспорт
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-import"
            title="Загрузить данные из JSON"
          >
            📤 Импорт
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </div>
      </section>

      {showImportModal && (
        <div className="modal-overlay" onClick={() => setShowImportModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Подтвердить импорт</h3>
            <p>Текущие данные будут заменены. Вы уверены?</p>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              className="import-textarea"
              rows="6"
            />
            <div className="modal-actions">
              <button
                onClick={handleImportConfirm}
                className="btn btn-primary"
              >
                ✓ Подтвердить
              </button>
              <button
                onClick={() => setShowImportModal(false)}
                className="btn btn-secondary"
              >
                ✕ Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
