export const loadFromLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error loading from localStorage', err);
    return [];
  }
};

export const saveToLocalStorage = <T>(key: string, values: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(values));
  } catch (err) {
    console.error('Error saving to localStorage', err);
  }
};
