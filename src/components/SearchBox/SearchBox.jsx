import "./SearchBox.css";

export default function SearchBox({ searchQuery, setSearchQuery, count }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="🔍 Поиск по названию или описанию..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <span className="search-count">
        Найдено: <strong>{count}</strong>
      </span>
    </div>
  );
}
