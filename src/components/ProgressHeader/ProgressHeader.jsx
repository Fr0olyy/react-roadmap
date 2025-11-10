import "./ProgressHeader.css";

export function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === "completed").length;
  const inProgress = technologies.filter(t => t.status === "in-progress").length;
  const notStarted = technologies.filter(t => t.status === "not-started").length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-header">
      <h2>Статистика по дорожной карте</h2>
      <div className="stats-row">
        <span>Всего: {total}</span>
        <span>Изучено: {completed}</span>
        <span>В процессе: {inProgress}</span>
        <span>Не начато: {notStarted}</span>
        <span>Прогресс: {percent}%</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}

