import { useState } from 'react';
import { Link } from 'react-router';

export function RoadmapFlowVisualization({ roadmapItem }) {
  const [expandedSections, setExpandedSections] = useState({});

  const hasNodes = roadmapItem && Array.isArray(roadmapItem.nodes) && roadmapItem.nodes.length > 0;

  if (!roadmapItem) {
    return (
      <div className="w-full bg-red-50 border-2 border-red-300 rounded-lg p-6 text-center">
        <p className="text-red-700 font-semibold">
          ⚠️ Карта не найдена
        </p>
      </div>
    );
  }

  if (!hasNodes) {
    return (
      <div className="w-full bg-blue-50 border-2 border-blue-300 rounded-lg p-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🗺️</div>
          <p className="text-blue-800 font-bold text-lg mb-2">
            {roadmapItem.name}
          </p>
          <p className="text-blue-600 mb-4">
            {roadmapItem.description}
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-blue-200">
          <p className="text-blue-700 font-semibold mb-3">
            ℹ️ Для этой карты требуется структура с этапами (nodes)
          </p>
          <p className="text-sm text-blue-600 mb-4">
            Убедитесь что JSON содержит поле "nodes" с массивом этапов:
          </p>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto text-gray-800 mb-4 border border-gray-300">
{`{
  "name": "React Roadmap",
  "items": [
    {
      "id": "react",
      "name": "React Developer",
      "description": "Learn React",
      "nodes": [              // ← Обязательно!
        {
          "id": "react-1",
          "name": "Basics",
          "description": "JSX, Components",
          "section": "Foundation",
          "status": "not_started"
        }
      ]
    }
  ]
}`}
          </pre>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const getNodeColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 border-green-400 text-green-900';
      case 'in_progress':
        return 'bg-yellow-100 border-yellow-400 text-yellow-900';
      case 'not_started':
        return 'bg-gray-100 border-gray-400 text-gray-900';
      default:
        return 'bg-blue-100 border-blue-400 text-blue-900';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'in_progress':
        return '⊙';
      case 'not_started':
        return '○';
      default:
        return '•';
    }
  };

  const sections = {};
  roadmapItem.nodes.forEach((node) => {
    const sectionName = node.section || 'General';
    if (!sections[sectionName]) {
      sections[sectionName] = [];
    }
    sections[sectionName].push(node);
  });

  const sectionNames = Object.keys(sections);

  const defaultExpanded = {};
  sectionNames.slice(0, 3).forEach(name => {
    defaultExpanded[name] = true;
  });

  const [isInitialized, setIsInitialized] = useState(false);
  if (!isInitialized) {
    Object.assign(expandedSections, defaultExpanded);
    setIsInitialized(true);
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-white overflow-x-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">{roadmapItem.name}</h2>
        <p className="text-gray-300">{roadmapItem.description}</p>
        <div className="mt-4 text-sm text-gray-400 flex gap-6">
          <span>📊 Всего этапов: <span className="font-bold text-white">{roadmapItem.nodes.length}</span></span>
          <span>📋 Секций: <span className="font-bold text-white">{sectionNames.length}</span></span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {sectionNames.map((sectionName) => {
          const nodes = sections[sectionName];
          const isExpanded = expandedSections[sectionName];
          const completedCount = nodes.filter(n => n.status === 'completed').length;
          const inProgressCount = nodes.filter(n => n.status === 'in_progress').length;

          return (
            <div key={sectionName} className="flex flex-col">
              <button
                onClick={() => toggleSection(sectionName)}
                className="mb-4 flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left w-full"
              >
                <span className="text-2xl font-bold">
                  {isExpanded ? '▼' : '▶'}
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{sectionName}</h3>
                  <p className="text-sm text-gray-300">
                    {nodes.length} элемент{nodes.length !== 1 ? 'ов' : ''} 
                    {completedCount > 0 && ` • ✓${completedCount}`}
                    {inProgressCount > 0 && ` • ⊙${inProgressCount}`}
                  </p>
                </div>
                <div className="text-xs bg-gray-600 px-3 py-1 rounded-full">
                  {completedCount}/{nodes.length}
                </div>
              </button>

              {isExpanded && (
                <div className="ml-4 flex flex-wrap gap-3 items-start pb-4">
                  {nodes.map((node, nodeIndex) => (
                    <div key={node.id} className="flex items-center">
                      <Link
                        to={`/item/${node.id}`}
                        className={`min-w-[160px] p-3 rounded-lg border-2 hover:shadow-xl transition-all cursor-pointer group ${getNodeColor(
                          node.status
                        )}`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-xl font-bold flex-shrink-0">
                            {getStatusIcon(node.status)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm group-hover:underline truncate">
                              {node.name}
                            </h4>
                            <p className="text-xs opacity-80 line-clamp-2">
                              {node.description}
                            </p>
                          </div>
                        </div>
                      </Link>

                      {nodeIndex < nodes.length - 1 && (
                        <div className="mx-2 text-xl font-bold">→</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-100 border-2 border-green-400 flex items-center justify-center text-green-900 font-bold text-sm">
            ✓
          </div>
          <span className="text-sm">Выполнено</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-yellow-100 border-2 border-yellow-400 flex items-center justify-center text-yellow-900 font-bold text-sm">
            ⊙
          </div>
          <span className="text-sm">В работе</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-100 border-2 border-gray-400 flex items-center justify-center text-gray-900 font-bold text-sm">
            ○
          </div>
          <span className="text-sm">Не начато</span>
        </div>
      </div>
    </div>
  );
}