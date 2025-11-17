const STATUS_STYLES = {
  not_started: {
    bg: 'bg-gray-200',
    text: 'text-gray-700',
    border: 'border-gray-300',
    label: 'Не начат'
  },
  in_progress: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-300',
    label: 'В работе'
  },
  completed: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
    label: 'Выполнено'
  }
};

export function StatusBadge({ status, className = '' }) {
  const styles = STATUS_STYLES[status] || STATUS_STYLES.not_started;
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${styles.bg} ${styles.text} border ${styles.border} ${className}`}>
      {styles.label}
    </span>
  );
}