import { useState } from "react";
import {ProgressHeader} from "./components/ProgressHeader/ProgressHeader";
import TechnologyList from "./components/TechnologyList/TechnologyList";
import SearchBox from "./components/SearchBox/SearchBox";
import QuickActions from "./components/QuickActions/QuickActions";
import { useTechnologies } from "./hooks/useTechnologies";
import "./App.css";

export default function App() {
  const {
    technologies,
    changeStatus,
    updateNotes,
    markAllCompleted,
    resetAllStatuses,
    pickRandom,
    exportData,
    importData
  } = useTechnologies();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredTechnologies = technologies.filter(
    (tech) =>
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePickRandom = () => {
    const random = pickRandom();
    if (random) {
      alert(`🎯 ${random.title} выбран для начала!`);
    }
  };

  return (
    <div className="app-container">
      <ProgressHeader technologies={filteredTechnologies} />
      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        count={filteredTechnologies.length}
      />
      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAllStatuses}
        onPickRandom={handlePickRandom}
        onExport={exportData}
        onImport={importData}
      />
      <TechnologyList
        technologies={filteredTechnologies}
        onChangeStatus={changeStatus}
        onUpdateNotes={updateNotes}
      />
    </div>
  );
}