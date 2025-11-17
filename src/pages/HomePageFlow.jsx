import { useState } from 'react';
import { RoadmapFlowVisualization } from '../components/RoadmapFlowVisualization';
import { ProgressHeader } from '../components/ProgressHeader';
import { QuickActions } from '../components/QuickActions';
import { validateRoadmap, normalizeRoadmap } from '../utils/validation';
import { importJSON, exportJSON } from '../utils/fileHelpers';

export function HomePageFlow({ roadmap, setRoadmap, error, setError }) {
  const [selectedTech, setSelectedTech] = useState(null);

  const handleImport = async (file) => {
    try {
      const data = await importJSON(file);
      const validation = validateRoadmap(data);

      if (!validation.valid) {
        setError(validation.error);
        return;
      }

      const normalized = normalizeRoadmap(data);
      setRoadmap(normalized);
      setError('');
      setSelectedTech(null);
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке файла');
    }
  };

  const handleExport = () => {
    if (roadmap) {
      try {
        const filename = `${roadmap.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
        exportJSON(roadmap, filename);
      } catch (err) {
        setError('Ошибка при экспорте файла');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ProgressHeader roadmap={roadmap} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <QuickActions onImport={handleImport} onExport={handleExport} hasRoadmap={!!roadmap} />

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 shadow-md">
            <div className="font-semibold">Ошибка</div>
            <div className="text-sm">{error}</div>
          </div>
        )}

        {!roadmap ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Дорожные карты технологий</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Загрузите JSON файл с дорожными картами технологий. Каждая технология будет представлена в виде интерактивной карты со стрелками между этапами изучения
            </p>

            <div className="mt-8 text-left max-w-3xl mx-auto">
              <h3 className="font-bold text-lg mb-4">📝 Примерный формат JSON:</h3>
              <pre className="bg-gray-900 text-gray-100 p-6 rounded text-xs overflow-x-auto border-l-4 border-blue-500">
{`{
  "name": "Technology Roadmaps 2025",
  "description": "Roadmaps for multiple technologies",
  "items": [
    {
      "id": "react-roadmap",
      "name": "React Developer Roadmap",
      "description": "Learn React step by step",
      "status": "in_progress",
      "nodes": [
        {
          "id": "react-1",
          "name": "Basics",
          "description": "JSX, Components",
          "section": "Foundation",
          "status": "completed"
        }
      ]
    }
  ]
}`}
              </pre>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roadmap.items?.map((tech) => {
                const nodeCount = Array.isArray(tech.nodes) ? tech.nodes.length : 0;
                
                return (
                  <button
                    key={tech.id}
                    onClick={() => setSelectedTech(tech.id)}
                    className={`p-6 rounded-lg border-2 transition-all text-left ${
                      selectedTech === tech.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-300 bg-white hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{tech.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{tech.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">
                        {nodeCount} {nodeCount === 1 ? 'этап' : 'этапов'}
                      </span>
                      <span className="text-2xl">
                        {tech.status === 'completed'
                          ? '✓'
                          : tech.status === 'in_progress'
                          ? '⊙'
                          : '○'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedTech && (
              <div className="mt-8">
                <RoadmapFlowVisualization
                  roadmapItem={roadmap.items.find((item) => item.id === selectedTech)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}