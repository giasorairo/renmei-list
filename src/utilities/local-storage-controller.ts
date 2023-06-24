export class LocalStorageController {

  static get<T>(key: string): T | null | string {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    try {
      const json = JSON.parse(value);
      return json;
    } catch (e) {
      return value as string;
    }
  }

  static set<T>(key: string, value: T) {
    if (value === null
      || value === undefined
      || (typeof value === 'number' && isNaN(value))
    ) {
      localStorage.removeItem(key);
      return;
    }
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
      return;
    }
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }
}