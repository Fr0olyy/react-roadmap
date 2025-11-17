import { Link } from 'react-router';
import { StatusBadge } from '../components/StatusBadge';

export function RoadmapCard({ item }) {
  return (
    <Link 
      to={`/item/${item.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl p-6 min-h-[220px] transition-all duration-300 hover:translate-y-[-4px] border-l-4 border-blue-500 hover:border-blue-600"
    >
      <div className="flex justify-between items-start gap-3 mb-4">
        <h3 className="text-xl font-bold text-gray-900 flex-1 line-clamp-2">
          {item.name}
        </h3>
        <StatusBadge status={item.status} />
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3 h-[60px]">
        {item.description}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        {item.link && (
          <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 text-xs font-semibold flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            🔗 Ссылка
          </a>
        )}
        
        {item.deadline && (
          <div className="text-xs text-gray-500 font-medium">
            📅 {new Date(item.deadline).toLocaleDateString('ru-RU')}
          </div>
        )}
      </div>

      {item.note && (
        <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-800 border border-blue-200">
          📝 Есть заметка
        </div>
      )}
    </Link>
  );
}