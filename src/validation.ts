export class Validation {
    static isNonEmptyString(value: unknown): value is string {
        return typeof value === 'string' && value.trim().length > 0;
    }

    static isValidUserId(value: unknown): value is number {
        if (typeof value === 'number' && Number.isInteger(value)) return true;
        if (typeof value === 'string' && /^\d+$/.test(value)) return true;
        return false;
    }

    static parseUserId(value: unknown): number | null {
        if (typeof value === 'number' && Number.isInteger(value)) return value;
        if (typeof value === 'string' && /^\d+$/.test(value)) return parseInt(value, 10);
        return null;
    }

    static isValidYear(value: unknown): value is number {
        if (typeof value === 'number' && Number.isInteger(value)) {
            return this.yearInRange(value);
        }
        if (typeof value === 'string' && /^\d{4}$/.test(value)) {
            return this.yearInRange(parseInt(value, 10));
        }
        return false;
    }

    static parseYear(value: unknown): number | null {
        if (typeof value === 'number' && Number.isInteger(value) && this.yearInRange(value)) {
            return value;
        }
        if (typeof value === 'string' && /^\d{4}$/.test(value)) {
            const y = parseInt(value, 10);
            return this.yearInRange(y) ? y : null;
        }
        return null;
    }

    private static yearInRange(year: number): boolean {
        const current = new Date().getFullYear();
        return year >= 1000 && year <= current;
    }
}