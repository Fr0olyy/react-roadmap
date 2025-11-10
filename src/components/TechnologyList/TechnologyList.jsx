import { useState, useMemo } from "react";
import TechnologyCard from "../ui/TechnologyCard/TechnologyCard";
import "./TechnologyList.css";

const FILTERS = [
  { key: "all", label: "Все" },
  { key: "not-started", label: "Не начатые" },
  { key: "in-progress", label: "В процессе" },
  { key: "completed", label: "Выполненные" }
];

export default function TechnologyList({
  technologies,
  onChangeStatus,
  onUpdateNotes
}) {
  const [filter, setFilter] = useState("all");

  const filteredTechnologies = useMemo(() => {
    return filter === "all"
      ? technologies
      : technologies.filter(t => t.status === filter);
  }, [technologies, filter]);

  return (
    <>
      <section className="actions-section">
        <div className="filters">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`btn ${filter === f.key ? "active" : ""}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section className="cards-section">
        {filteredTechnologies.length > 0 ? (
          filteredTechnologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              {...tech}
              onChangeStatus={() => onChangeStatus(tech.id)}
              onUpdateNotes={onUpdateNotes}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>Нет технологий с этим статусом</p>
          </div>
        )}
      </section>
    </>
  );
}
