export function ProgressHeader({ roadmap }) {
  if (!roadmap || !roadmap.items || roadmap.items.length === 0) {
    return (
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{roadmap?.name || 'Roadmap Tracker'}</h1>
            <div className="text-sm opacity-60">Загрузите JSON для начала</div>
          </div>
        </div>
      </div>
    );
  }

  let totalItems = 0;
  let completedItems = 0;
  let inProgressItems = 0;

  roadmap.items.forEach(item => {
    if (item.nodes && Array.isArray(item.nodes) && item.nodes.length > 0) {
      item.nodes.forEach(node => {
        totalItems++;
        if (node.status === 'completed') completedItems++;
        if (node.status === 'in_progress') inProgressItems++;
      });
    } else {
      totalItems++;
      if (item.status === 'completed') completedItems++;
      if (item.status === 'in_progress') inProgressItems++;
    }
  });

  const notStartedItems = totalItems - completedItems - inProgressItems;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{roadmap.name}</h1>
          <p className="text-gray-400">{roadmap.description}</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-sm text-gray-300">Общий прогресс</span>
            <span className="text-lg font-bold text-green-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-750 hover:border-gray-600 transition-all">
            <div className="text-xs text-gray-400 font-semibold mb-1">ВСЕГО ЭТАПОВ</div>
            <div className="text-3xl font-bold text-white">{totalItems}</div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-green-700/30 hover:border-green-600/50 hover:bg-gray-750 transition-all">
            <div className="text-xs text-green-400 font-semibold mb-1 flex items-center gap-1">
              ✓ ВЫПОЛНЕНО
            </div>
            <div className="text-3xl font-bold text-green-400">{completedItems}</div>
            <div className="text-xs text-green-400 mt-1 opacity-75">
              {totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0}%
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-yellow-700/30 hover:border-yellow-600/50 hover:bg-gray-750 transition-all">
            <div className="text-xs text-yellow-400 font-semibold mb-1 flex items-center gap-1">
              ⊙ В РАБОТЕ
            </div>
            <div className="text-3xl font-bold text-yellow-400">{inProgressItems}</div>
            <div className="text-xs text-yellow-400 mt-1 opacity-75">
              {totalItems > 0 ? Math.round((inProgressItems / totalItems) * 100) : 0}%
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-600 hover:border-gray-500 hover:bg-gray-750 transition-all">
            <div className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1">
              ○ НЕ НАЧАТО
            </div>
            <div className="text-3xl font-bold text-gray-300">{notStartedItems}</div>
            <div className="text-xs text-gray-400 mt-1 opacity-75">
              {totalItems > 0 ? Math.round((notStartedItems / totalItems) * 100) : 0}%
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="text-xs font-semibold text-gray-400 mb-2">РАСПРЕДЕЛЕНИЕ</div>
          <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-gray-700">
            {completedItems > 0 && (
              <div
                className="bg-green-500 transition-all duration-500"
                style={{ width: `${(completedItems / totalItems) * 100}%` }}
                title={`Выполнено: ${completedItems}`}
              />
            )}
            {inProgressItems > 0 && (
              <div
                className="bg-yellow-500 transition-all duration-500"
                style={{ width: `${(inProgressItems / totalItems) * 100}%` }}
                title={`В работе: ${inProgressItems}`}
              />
            )}
            {notStartedItems > 0 && (
              <div
                className="bg-gray-600 transition-all duration-500"
                style={{ width: `${(notStartedItems / totalItems) * 100}%` }}
                title={`Не начато: ${notStartedItems}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}