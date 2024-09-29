export const setToLocalStorage = (key: string, value: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return window.localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return window.localStorage.getItem(key);
};
