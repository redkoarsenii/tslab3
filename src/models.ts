export interface IBook {
    id: number;
    title: string;
    author: string;
    year: number;
    isBorrowed: boolean;
    borrowedByUserId?: number;
}

export class Book implements IBook {
    public id: number;
    public title: string;
    public author: string;
    public year: number;
    public isBorrowed: boolean;
    public borrowedByUserId?: number;

    constructor(params: IBook) {
        this.id = params.id;
        this.title = params.title;
        this.author = params.author;
        this.year = params.year;
        this.isBorrowed = params.isBorrowed;
        this.borrowedByUserId = params.borrowedByUserId;
    }

    get displayTitle(): string {
        return `${this.title} (${this.year})`;
    }
}

export interface IUser {
    id: number;
    name: string;
    borrowedBookIds: number[];
}

export class User implements IUser {
    public id: number;
    public name: string;
    public borrowedBookIds: number[];

    constructor(params: IUser) {
        this.id = params.id;
        this.name = params.name;
        this.borrowedBookIds = Array.isArray(params.borrowedBookIds) ? params.borrowedBookIds.slice() : [];
    }

    get borrowedCount(): number {
        return this.borrowedBookIds.length;
    }
}
