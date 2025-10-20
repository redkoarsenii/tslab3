// import all modules here
import {Book, User, IBook, IUser} from './models';
import {LibraryService} from './services';
import {Storage} from './storage';
import {Validation} from './validation';
import {Modal} from './modal';

class App {
    private service: LibraryService;
    private storage: Storage;
    private modal: Modal;

    private readonly BOOKS_KEY = 'books';
    private readonly USERS_KEY = 'users';

    private booksPerPage = 5;
    private usersPerPage = 5;
    private booksPage = 1;
    private usersPage = 1;
    private currentSearch = '';

    constructor() {
        this.storage = new Storage();
        this.modal = new Modal();

        const savedBooks = this.storage.getItem<IBook[]>(this.BOOKS_KEY) ?? [];
        const savedUsers = this.storage.getItem<IUser[]>(this.USERS_KEY) ?? [];
        this.service = new LibraryService(savedBooks, savedUsers);

        this.bindForms();
        this.bindSearch();
        this.render();
    }

    private bindForms(): void {
        const bookForm = document.getElementById('book-form') as HTMLFormElement | null;
        const userForm = document.getElementById('user-form') as HTMLFormElement | null;
        bookForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const book: IBook | null = this.readBookForm();
            if (!book) return;
            try {
                this.service.addBook(book);
                this.persist();
                (e.target as HTMLFormElement).reset();
                this.modal.show('Книгу додано', 'success');
                this.renderBooks(1);
            } catch (err) {
                this.modal.show((err as Error).message, 'danger');
            }
        });

        userForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const user: IUser | null = this.readUserForm();
            if (!user) return;
            try {
                this.service.addUser(user);
                this.persist();
                (e.target as HTMLFormElement).reset();
                this.modal.show('Користувача додано', 'success');
                this.renderUsers(1);
            } catch (err) {
                this.modal.show((err as Error).message, 'danger');
            }
        });
    }

    private bindSearch(): void {
        const input = document.getElementById('search') as HTMLInputElement | null;
        input?.addEventListener('input', () => {
            this.currentSearch = input.value;
            this.renderBooks(1);
        });
    }

    private readBookForm(): IBook | null {
        const idEl = document.getElementById('book-id') as HTMLInputElement | null;
        const titleEl = document.getElementById('book-title') as HTMLInputElement | null;
        const authorEl = document.getElementById('book-author') as HTMLInputElement | null;
        const yearEl = document.getElementById('book-year') as HTMLInputElement | null;
        const id = Validation.parseUserId(idEl?.value);
        const year = Validation.parseYear(yearEl?.value);
        if (id === null) { this.modal.show('ID книги має бути числом', 'danger'); return null; }
        if (!Validation.isNonEmptyString(titleEl?.value)) { this.modal.show('Назва обов’язкова', 'danger'); return null; }
        if (!Validation.isNonEmptyString(authorEl?.value)) { this.modal.show('Автор обов’язковий', 'danger'); return null; }
        if (year === null) { this.modal.show('Рік має бути у форматі YYYY', 'danger'); return null; }
        return { id, title: titleEl!.value.trim(), author: authorEl!.value.trim(), year, isBorrowed: false };
    }

    private readUserForm(): IUser | null {
        const idEl = document.getElementById('user-id') as HTMLInputElement | null;
        const nameEl = document.getElementById('user-name') as HTMLInputElement | null;
        const id = Validation.parseUserId(idEl?.value);
        if (id === null) { this.modal.show('ID користувача має бути числом', 'danger'); return null; }
        if (!Validation.isNonEmptyString(nameEl?.value)) { this.modal.show('Ім’я обов’язкове', 'danger'); return null; }
        return { id, name: nameEl!.value.trim(), borrowedBookIds: [] };
    }

    private persist(): void {
        const books = this.service.listBooks().map(b => ({ id: b.id, title: b.title, author: b.author, year: b.year, isBorrowed: b.isBorrowed, borrowedByUserId: b.borrowedByUserId }));
        const users = this.service.listUsers().map(u => ({ id: u.id, name: u.name, borrowedBookIds: u.borrowedBookIds }));
        this.storage.setItem(this.BOOKS_KEY, books);
        this.storage.setItem(this.USERS_KEY, users);
    }

    private render(): void {
        this.renderBooks(this.booksPage);
        this.renderUsers(this.usersPage);
    }

    private renderBooks(page: number): void {
        this.booksPage = page;
        const listEl = document.getElementById('books-list') as HTMLUListElement | null;
        if (!listEl) return;
        listEl.innerHTML = '';

        let books = this.service.listBooks();
        if (this.currentSearch.trim()) {
            books = this.service.searchBooksByTitleOrAuthor(this.currentSearch);
        }

        const total = books.length;
        const start = (page - 1) * this.booksPerPage;
        const slice = books.slice(start, start + this.booksPerPage);

        for (const b of slice) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex align-items-center justify-content-between';
            const left = document.createElement('div');
            left.innerHTML = `<strong>${b.title}</strong> — ${b.author} (${b.year})`;
            const actions = document.createElement('div');
            const btn = document.createElement('button');
            btn.className = `btn btn-sm ${b.isBorrowed ? 'btn-secondary' : 'btn-success'}`;
            btn.textContent = b.isBorrowed ? 'Повернути' : 'Позичити';
            btn.addEventListener('click', () => this.handleBorrowReturn(b));
            const del = document.createElement('button');
            del.className = 'btn btn-sm btn-outline-danger ms-2';
            del.textContent = 'Видалити';
            del.addEventListener('click', () => { this.service.removeBook(b.id); this.persist(); this.renderBooks(this.booksPage); });
            actions.appendChild(btn);
            actions.appendChild(del);
            li.appendChild(left);
            li.appendChild(actions);
            listEl.appendChild(li);
        }

        this.renderPagination('books-pagination', total, this.booksPerPage, (p) => this.renderBooks(p));
    }

    private renderUsers(page: number): void {
        this.usersPage = page;
        const listEl = document.getElementById('users-list') as HTMLUListElement | null;
        if (!listEl) return;
        listEl.innerHTML = '';

        const users = this.service.listUsers();
        const total = users.length;
        const start = (page - 1) * this.usersPerPage;
        const slice = users.slice(start, start + this.usersPerPage);

        for (const u of slice) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex align-items-center justify-content-between';
            const left = document.createElement('div');
            left.innerHTML = `<strong>${u.name}</strong> — ID: ${u.id} | Книг: ${u.borrowedCount}`;
            const actions = document.createElement('div');
            const del = document.createElement('button');
            del.className = 'btn btn-sm btn-outline-danger';
            del.textContent = 'Видалити';
            del.addEventListener('click', () => { this.service.removeUser(u.id); this.persist(); this.renderUsers(this.usersPage); });
            actions.appendChild(del);
            li.appendChild(left);
            li.appendChild(actions);
            listEl.appendChild(li);
        }

        this.renderPagination('users-pagination', total, this.usersPerPage, (p) => this.renderUsers(p));
    }

    private renderPagination(id: string, total: number, perPage: number, go: (p: number) => void): void {
        const ul = document.getElementById(id) as HTMLUListElement | null;
        if (!ul) return;
        ul.innerHTML = '';
        const pages = Math.max(1, Math.ceil(total / perPage));
        for (let p = 1; p <= pages; p++) {
            const li = document.createElement('li');
            li.className = `page-item ${p === (id === 'books-pagination' ? this.booksPage : this.usersPage) ? 'active' : ''}`;
            const a = document.createElement('a');
            a.className = 'page-link';
            a.href = '#';
            a.textContent = String(p);
            a.addEventListener('click', (e) => { e.preventDefault(); go(p); });
            li.appendChild(a);
            ul.appendChild(li);
        }
    }

    private handleBorrowReturn(book: Book): void {
        const userIdStr = prompt('Введіть ID користувача:');
        const userId = Validation.parseUserId(userIdStr ?? '');
        if (userId === null) { this.modal.show('Некоректний ID користувача', 'danger'); return; }
        const res = book.isBorrowed ? this.service.returnBook(book.id, userId) : this.service.borrowBook(book.id, userId);
        this.modal.show(res.message, res.ok ? 'success' : 'warning');
        if (res.ok) { this.persist(); this.renderBooks(this.booksPage); this.renderUsers(this.usersPage); }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
