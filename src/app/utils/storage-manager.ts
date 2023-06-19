export function getStorageObject(key: string): any {
  if (sessionStorage.getItem(key)) {
    return JSON.parse(<string>sessionStorage.getItem(key));
  } else if (localStorage.getItem(key)) {
    return JSON.parse(<string>localStorage.getItem(key));
  }
}

export function removeStorageObject(key: string): void {
  sessionStorage.removeItem(key);
  localStorage.removeItem(key);
}

export function setStorageObject<T>(key: string, value: T, storage = 'local'): void {
  if (storage === 'session') {
    sessionStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
