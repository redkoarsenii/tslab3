import {Book, User, IBook, IUser} from './models';
import {Library} from './library';
import {Validation} from './validation';

export class LibraryService {
    private books: Library<Book>;
    private users: Library<User>;

    constructor(initialBooks?: IBook[], initialUsers?: IUser[]) {
        const bookInstances = (initialBooks ?? []).map(b => new Book({...b}));
        const userInstances = (initialUsers ?? []).map(u => new User({...u}));
        this.books = new Library<Book>((b) => b.id, bookInstances);
        this.users = new Library<User>((u) => u.id, userInstances);
    }

    // CRUD helpers
    addBook(book: IBook): void {
        this.validateBook(book);
        this.books.add(new Book({...book}));
    }

    removeBook(bookId: number): boolean {
        return this.books.remove(bookId);
    }

    addUser(user: IUser): void {
        this.validateUser(user);
        this.users.add(new User({...user}));
    }

    removeUser(userId: number): boolean {
        return this.users.remove(userId);
    }

    // Queries
    listBooks(): Book[] { return this.books.getAll(); }
    listUsers(): User[] { return this.users.getAll(); }
    getBook(id: number): Book | undefined { return this.books.getById(id); }
    getUser(id: number): User | undefined { return this.users.getById(id); }

    searchBooksByTitleOrAuthor(query: string): Book[] {
        const q = query.trim().toLowerCase();
        return this.books.find(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
    }

    // Borrow/Return with constraints
    borrowBook(bookId: number, userId: number): { ok: boolean; message: string } {
        const book = this.books.getById(bookId);
        const user = this.users.getById(userId);
        if (!book) return { ok: false, message: 'Книга не знайдена.' };
        if (!user) return { ok: false, message: 'Користувача не знайдено.' };
        if (book.isBorrowed) return { ok: false, message: 'Книга вже позичена.' };
        if (user.borrowedBookIds.length >= 3) return { ok: false, message: 'Ліміт: не більше 3-х книг.' };

        book.isBorrowed = true;
        book.borrowedByUserId = user.id;
        user.borrowedBookIds.push(book.id);
        return { ok: true, message: 'Успішно позичено.' };
    }

    returnBook(bookId: number, userId: number): { ok: boolean; message: string } {
        const book = this.books.getById(bookId);
        const user = this.users.getById(userId);
        if (!book) return { ok: false, message: 'Книга не знайдена.' };
        if (!user) return { ok: false, message: 'Користувача не знайдено.' };
        if (!book.isBorrowed || book.borrowedByUserId !== user.id) {
            return { ok: false, message: 'Книга не позичена цим користувачем.' };
        }
        book.isBorrowed = false;
        book.borrowedByUserId = undefined;
        user.borrowedBookIds = user.borrowedBookIds.filter(id => id !== book.id);
        return { ok: true, message: 'Книгу повернуто.' };
    }

    // Validation enforcement
    private validateBook(book: IBook): void {
        if (!Validation.isNonEmptyString(book.title)) throw new Error('Назва книги обов’язкова.');
        if (!Validation.isNonEmptyString(book.author)) throw new Error('Автор обов’язковий.');
        if (!Validation.isValidYear(book.year)) throw new Error('Рік видання має бути валідним роком (YYYY).');
        if (!Validation.isValidUserId(book.id)) throw new Error('ID книги має бути числом.');
    }

    private validateUser(user: IUser): void {
        if (!Validation.isValidUserId(user.id)) throw new Error('ID користувача має бути числом.');
        if (!Validation.isNonEmptyString(user.name)) throw new Error('Ім’я обов’язкове.');
        if (!Array.isArray(user.borrowedBookIds)) throw new Error('borrowedBookIds має бути масивом.');
    }
}
