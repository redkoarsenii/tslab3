export class Storage {
    private storage: globalThis.Storage;

    constructor(storage: globalThis.Storage = window.localStorage) {
        this.storage = storage;
    }

    setItem<T>(key: string, value: T): void {
        const serialized = JSON.stringify(value);
        this.storage.setItem(key, serialized);
    }

    getItem<T>(key: string): T | null {
        const raw = this.storage.getItem(key);
        if (raw === null) return null;
        try {
            return JSON.parse(raw) as T;
        } catch {
            return null;
        }
    }

    removeItem(key: string): void {
        this.storage.removeItem(key);
    }

    clear(): void {
        this.storage.clear();
    }
}