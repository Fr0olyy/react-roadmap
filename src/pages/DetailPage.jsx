import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

export function DetailPage({ roadmap, setRoadmap }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!roadmap || !roadmap.items) {
      navigate('/');
      return;
    }

    let foundItem = roadmap.items.find(i => i.id === id);

    if (!foundItem) {
      for (const mainItem of roadmap.items) {
        if (mainItem.nodes && Array.isArray(mainItem.nodes)) {
          const nodeItem = mainItem.nodes.find(n => n.id === id);
          if (nodeItem) {
            foundItem = {
              ...nodeItem,
              link: nodeItem.link || '',
              note: nodeItem.note || '',
              deadline: nodeItem.deadline || '',
              parentId: mainItem.id
            };
            break;
          }
        }
      }
    }

    if (foundItem) {
      setItem(foundItem);
    } else {
      navigate('/');
    }
  }, [id, roadmap, navigate]);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Элемент не найден</h2>
          <p className="text-gray-600 mb-6">
            К сожалению, данный элемент дорожной карты не найден
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            ← Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  const handleStatusChange = (newStatus) => {
    const updatedItem = { ...item, status: newStatus };
    setItem(updatedItem);
    
    // Обновляем в roadmap
    if (item.parentId) {
      // Это node из подкарты
      const updatedRoadmap = {
        ...roadmap,
        items: roadmap.items.map(mainItem => {
          if (mainItem.id === item.parentId) {
            return {
              ...mainItem,
              nodes: mainItem.nodes.map(node => 
                node.id === id ? updatedItem : node
              )
            };
          }
          return mainItem;
        })
      };
      setRoadmap(updatedRoadmap);
    } else {
      // Это главный item
      const updatedRoadmap = {
        ...roadmap,
        items: roadmap.items.map(i =>
          i.id === id ? updatedItem : i
        )
      };
      setRoadmap(updatedRoadmap);
    }
  };

  const handleNoteChange = (newNote) => {
    const updatedItem = { ...item, note: newNote };
    setItem(updatedItem);

    if (item.parentId) {
      const updatedRoadmap = {
        ...roadmap,
        items: roadmap.items.map(mainItem => {
          if (mainItem.id === item.parentId) {
            return {
              ...mainItem,
              nodes: mainItem.nodes.map(node => 
                node.id === id ? updatedItem : node
              )
            };
          }
          return mainItem;
        })
      };
      setRoadmap(updatedRoadmap);
    } else {
      const updatedRoadmap = {
        ...roadmap,
        items: roadmap.items.map(i =>
          i.id === id ? updatedItem : i
        )
      };
      setRoadmap(updatedRoadmap);
    }
  };

  const handleDeadlineChange = (newDeadline) => {
    const updatedItem = { ...item, deadline: newDeadline };
    setItem(updatedItem);

    if (item.parentId) {
      const updatedRoadmap = {
        ...roadmap,
        items: roadmap.items.map(mainItem => {
          if (mainItem.id === item.parentId) {
            return {
              ...mainItem,
              nodes: mainItem.nodes.map(node => 
                node.id === id ? updatedItem : node
              )
            };
          }
          return mainItem;
        })
      };
      setRoadmap(updatedRoadmap);
    } else {
      const updatedRoadmap = {
        ...roadmap,
        items: roadmap.items.map(i =>
          i.id === id ? updatedItem : i
        )
      };
      setRoadmap(updatedRoadmap);
    }
  };

  const handleDeleteNote = () => {
    handleNoteChange('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'from-green-400 to-green-600';
      case 'in_progress':
        return 'from-yellow-400 to-yellow-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Выполнено ✓';
      case 'in_progress':
        return 'В работе ⊙';
      default:
        return 'Не начато ○';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Кнопка возврата */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
        >
          ← Вернуться на главную
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Заголовок */}
          <div className={`bg-gradient-to-r ${getStatusColor(item.status)} p-8 text-white`}>
            <h1 className="text-4xl font-bold mb-2">{item.name}</h1>
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 bg-white/20 rounded-full font-semibold text-lg">
                {getStatusText(item.status)}
              </span>
              <span className="text-blue-100">ID: {item.id}</span>
              {item.section && <span className="text-blue-100">📂 {item.section}</span>}
            </div>
          </div>

          {/* Основной контент */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Левая колонка - основная информация */}
              <div className="lg:col-span-2 space-y-6">
                {/* Описание */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">📝 Описание</h2>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {item.description}
                  </p>
                </div>

                {/* Ссылка */}
                {item.link && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">🔗 Полезная ссылка</h2>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200 font-semibold"
                    >
                      Открыть ресурс →
                    </a>
                  </div>
                )}

                {/* Заметки */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-bold text-gray-900">📝 Ваши заметки</h2>
                    {item.note && (
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors font-semibold"
                      >
                        {isEditing ? 'Отменить' : 'Редактировать'}
                      </button>
                    )}
                  </div>

                  {isEditing || !item.note ? (
                    <div className="space-y-3">
                      <textarea
                        value={item.note}
                        onChange={(e) => handleNoteChange(e.target.value)}
                        placeholder="Напишите здесь свои заметки, идеи, конспекты и интересные команды..."
                        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                          ✓ Сохранить
                        </button>
                        {item.note && (
                          <button
                            onClick={handleDeleteNote}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                          >
                            🗑️ Удалить
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="text-gray-800 whitespace-pre-wrap">{item.note}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Правая колонка - управление статусом и сроками */}
              <div className="lg:col-span-1 space-y-6">
                {/* Статус */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Статус</h3>
                  <div className="space-y-2">
                    {[
                      { value: 'not_started', label: 'Не начат' },
                      { value: 'in_progress', label: 'В работе' },
                      { value: 'completed', label: 'Выполнено' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleStatusChange(option.value)}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                          item.status === option.value
                            ? 'bg-blue-600 text-white shadow-md scale-105'
                            : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Дедлайн */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📅 Дедлайн</h3>
                  <input
                    type="date"
                    value={item.deadline}
                    onChange={(e) => handleDeadlineChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {item.deadline && (
                    <div className="mt-3 text-sm text-gray-600">
                      📍 {new Date(item.deadline).toLocaleDateString('ru-RU', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  )}
                  {item.deadline && (
                    <button
                      onClick={() => handleDeadlineChange('')}
                      className="mt-3 w-full py-2 px-3 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm font-semibold"
                    >
                      Очистить дату
                    </button>
                  )}
                </div>

                {/* Информация */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">ℹ️ Информация</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>
                      <span className="font-semibold">Статус:</span>
                      <br />
                      {getStatusText(item.status)}
                    </div>
                    {item.note && (
                      <div className="mt-3 pt-3 border-t border-purple-200">
                        <span className="font-semibold">Заметки:</span>
                        <br />
                        ✓ Есть личные заметки
                      </div>
                    )}
                    {item.deadline && (
                      <div className="mt-3 pt-3 border-t border-purple-200">
                        <span className="font-semibold">Дедлайн:</span>
                        <br />
                        📅 Установлен
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Футер */}
          <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-between items-center">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              ← Вернуться на главную
            </button>
            <span className="text-sm text-gray-500">
              💾 Данные автоматически сохраняются
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}