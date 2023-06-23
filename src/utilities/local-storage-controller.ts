export class LocalStorageController {

  static get<T>(key: string): T | null | string {
    const value = localStorage.getItem(key);
    try {
      const json = JSON.parse(value || '');
      if (json === 'undefined' || json === 'null') {
        return null;
      }
      return json;
    } catch (e) {
      return value as string;
    }
  }

  static set<T>(key: string, value: T) {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }
}