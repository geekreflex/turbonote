export const setToLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLS = (key) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};
