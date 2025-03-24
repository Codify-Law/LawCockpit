import Cookies from "js-cookie";

export default class StorageService {
  // Prefix for all storage keys, defaults to "app_" if not set in environment
  private prefix = process.env.NEXT_PUBLIC_STORAGE_PREFIX || "app_";

  /**
   * Retrieves a value from localStorage by key
   * @param key The key to look up
   * @returns The stored value or null if not found/error
   */
  get(key: string): string | null {
    try {
      return Cookies.get(this.prefix + key) || null;
    } catch (error) {
      console.error("Error getting item from Cookies:", error);
      return null;
    }
  }

  /**
   * Stores a value in localStorage
   * @param key The key to store under
   * @param value The value to store
   */
  set(key: string, value: string): void {
    try {
      Cookies.set(this.prefix + key, value);
    } catch (error) {
      console.error("Error setting item in Cookies:", error);
    }
  }

  /**
   * Removes an item from localStorage
   * @param key The key to remove
   */
  delete(key: string): void {
    try {
      Cookies.remove(this.prefix + key);
    } catch (error) {
      console.error("Error removing item from Cookies:", error);
    }
  }
}
