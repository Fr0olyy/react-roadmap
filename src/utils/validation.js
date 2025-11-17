export function validateRoadmap(data) {
  if (!data || typeof data !== 'object') {
    return { 
      valid: false, 
      error: '❌ JSON должен быть объектом' 
    };
  }

  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    return { 
      valid: false, 
      error: '❌ Отсутствует поле "name" (название дорожной карты)' 
    };
  }

  if (!data.description || typeof data.description !== 'string') {
    return { 
      valid: false, 
      error: '❌ Отсутствует поле "description" (описание дорожной карты)' 
    };
  }

  if (!Array.isArray(data.items)) {
    return { 
      valid: false, 
      error: '❌ Поле "items" должно быть массивом' 
    };
  }

  if (data.items.length === 0) {
    return { 
      valid: false, 
      error: '❌ Поле "items" не может быть пустым' 
    };
  }

  for (let i = 0; i < data.items.length; i++) {
    const item = data.items[i];
    
    if (!item.id) {
      return { 
        valid: false, 
        error: `❌ Элемент ${i + 1}: отсутствует поле "id"` 
      };
    }

    if (!item.name || typeof item.name !== 'string') {
      return { 
        valid: false, 
        error: `❌ Элемент ${i + 1}: отсутствует поле "name"` 
      };
    }

    if (!item.description || typeof item.description !== 'string') {
      return { 
        valid: false, 
        error: `❌ Элемент ${i + 1}: отсутствует поле "description"` 
      };
    }

    if (item.status && !['not_started', 'in_progress', 'completed'].includes(item.status)) {
      return { 
        valid: false, 
        error: `❌ Элемент ${i + 1}: статус должен быть one of: "not_started", "in_progress", "completed"` 
      };
    }
  }

  return { valid: true };
}

export function normalizeRoadmap(data) {
  return {
    name: data.name,
    description: data.description,
    items: data.items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      link: item.link || '',
      status: item.status || 'not_started',
      note: item.note || '',
      deadline: item.deadline || '',
      nodes: Array.isArray(item.nodes) && item.nodes.length > 0
        ? item.nodes.map(node => ({
            id: node.id || `${item.id}-${Math.random()}`,
            name: node.name || 'Unnamed',
            description: node.description || '',
            section: node.section || 'General',
            status: node.status || 'not_started',
            link: node.link || ''
          }))
        : [] 
    }))
  };
}