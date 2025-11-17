import { useRef } from 'react';

export function QuickActions({ onImport, onExport, hasRoadmap }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
      event.target.value = '';
    }
  };

  return (
    <div className="flex gap-4 mb-8 flex-wrap">
      <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
        <span>📂 Загрузить JSON</span>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Загрузить JSON файл"
        />
      </label>

      <button
        onClick={onExport}
        disabled={!hasRoadmap}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors shadow-md ${
          hasRoadmap
            ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
        }`}
      >
        <span>💾 Экспортировать</span>
      </button>

      <div className="ml-auto flex items-center text-sm text-gray-600">
        <span className="font-medium">💡 Совет: </span>
        <span className="ml-2">Загрузите JSON файл с дорожной картой для начала</span>
      </div>
    </div>
  );
}