import { useState, useEffect, useCallback } from "react";

const initialTechnologies = [
  {
    id: 1,
    title: "React Components",
    description: "Изучение базовых компонентов",
    status: "not-started",
    notes: ""
  },
  {
    id: 2,
    title: "JSX Syntax",
    description: "Освоение синтаксиса JSX",
    status: "not-started",
    notes: ""
  },
  {
    id: 3,
    title: "State Management",
    description: "Работа с состоянием компонентов",
    status: "not-started",
    notes: ""
  }
];

const STATUS_ORDER = ["not-started", "in-progress", "completed"];

export function useTechnologies() {
  const [technologies, setTechnologies] = useState(() => {
    try {
      const saved = localStorage.getItem("techTrackerData");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("❌ Ошибка загрузки из localStorage:", error);
    }
    return initialTechnologies;
  });

  // Сохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("techTrackerData", JSON.stringify(technologies));
  }, [technologies]);

  // Изменение статуса
  const changeStatus = useCallback((id) => {
    setTechnologies(techs =>
      techs.map(tech =>
        tech.id === id
          ? {
              ...tech,
              status: STATUS_ORDER[(STATUS_ORDER.indexOf(tech.status) + 1) % STATUS_ORDER.length]
            }
          : tech
      )
    );
  }, []);

  // Обновление заметок
  const updateNotes = useCallback((techId, newNotes) => {
    setTechnologies(prevTech =>
      prevTech.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  }, []);

  // Отметить все как выполненные
  const markAllCompleted = useCallback(() => {
    setTechnologies(techs => techs.map(t => ({ ...t, status: "completed" })));
  }, []);

  // Сбросить все статусы
  const resetAllStatuses = useCallback(() => {
    setTechnologies(techs => techs.map(t => ({ ...t, status: "not-started" })));
  }, []);

  // Выбрать случайную
  const pickRandom = useCallback(() => {
    const notStarted = technologies.filter(t => t.status === "not-started");
    if (notStarted.length === 0) return null;
    return notStarted[Math.floor(Math.random() * notStarted.length)];
  }, [technologies]);

  // Экспорт данных
  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(technologies, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tech-tracker-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [technologies]);

  // Импорт данных
  const importData = useCallback((jsonData) => {
    try {
      const imported = JSON.parse(jsonData);
      if (Array.isArray(imported)) {
        setTechnologies(imported);
        return true;
      }
    } catch (error) {
      console.error("❌ Ошибка импорта:", error);
      return false;
    }
  }, []);

  return {
    technologies,
    changeStatus,
    updateNotes,
    markAllCompleted,
    resetAllStatuses,
    pickRandom,
    exportData,
    importData
  };
}
