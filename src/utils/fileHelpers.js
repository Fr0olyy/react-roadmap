export function importJSON(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Файл не выбран'));
      return;
    }

    if (!file.name.endsWith('.json')) {
      reject(new Error('Пожалуйста, выберите JSON файл'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const data = JSON.parse(text);
        resolve(data);
      } catch (error) {
        reject(new Error('Неверный формат JSON: ' + error.message));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Ошибка при чтении файла'));
    };

    reader.readAsText(file);
  });
}

export function exportJSON(data, filename = 'roadmap.json') {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
 
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Ошибка при экспорте:', error);
    throw error;
  }
}