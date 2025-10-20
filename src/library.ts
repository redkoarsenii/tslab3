export class Library<T> {
    private items: Map<number, T>;
    private getId: (item: T) => number;

    constructor(getId: (item: T) => number, initialItems?: T[]) {
        this.getId = getId;
        this.items = new Map<number, T>();
        if (initialItems) {
            for (const item of initialItems) {
                this.items.set(this.getId(item), item);
            }
        }
    }

    add(item: T): void {
        const id = this.getId(item);
        this.items.set(id, item);
    }

    remove(id: number): boolean {
        return this.items.delete(id);
    }

    getById(id: number): T | undefined {
        return this.items.get(id);
    }

    getAll(): T[] {
        return Array.from(this.items.values());
    }

    find(predicate: (item: T) => boolean): T[] {
        const result: T[] = [];
        for (const item of this.items.values()) {
            if (predicate(item)) result.push(item);
        }
        return result;
    }
}
