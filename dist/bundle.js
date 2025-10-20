/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ \"./src/services.ts\");\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ \"./src/storage.ts\");\n/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation */ \"./src/validation.ts\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal */ \"./src/modal.ts\");\n\n\n\n\nclass App {\n    constructor() {\n        var _a, _b;\n        this.BOOKS_KEY = 'books';\n        this.USERS_KEY = 'users';\n        this.booksPerPage = 5;\n        this.usersPerPage = 5;\n        this.booksPage = 1;\n        this.usersPage = 1;\n        this.currentSearch = '';\n        this.storage = new _storage__WEBPACK_IMPORTED_MODULE_1__.Storage();\n        this.modal = new _modal__WEBPACK_IMPORTED_MODULE_3__.Modal();\n        const savedBooks = (_a = this.storage.getItem(this.BOOKS_KEY)) !== null && _a !== void 0 ? _a : [];\n        const savedUsers = (_b = this.storage.getItem(this.USERS_KEY)) !== null && _b !== void 0 ? _b : [];\n        this.service = new _services__WEBPACK_IMPORTED_MODULE_0__.LibraryService(savedBooks, savedUsers);\n        this.bindForms();\n        this.bindSearch();\n        this.render();\n    }\n    bindForms() {\n        const bookForm = document.getElementById('book-form');\n        const userForm = document.getElementById('user-form');\n        bookForm === null || bookForm === void 0 ? void 0 : bookForm.addEventListener('submit', (e) => {\n            e.preventDefault();\n            const book = this.readBookForm();\n            if (!book)\n                return;\n            try {\n                this.service.addBook(book);\n                this.persist();\n                e.target.reset();\n                this.modal.show('Книгу додано', 'success');\n                this.renderBooks(1);\n            }\n            catch (err) {\n                this.modal.show(err.message, 'danger');\n            }\n        });\n        userForm === null || userForm === void 0 ? void 0 : userForm.addEventListener('submit', (e) => {\n            e.preventDefault();\n            const user = this.readUserForm();\n            if (!user)\n                return;\n            try {\n                this.service.addUser(user);\n                this.persist();\n                e.target.reset();\n                this.modal.show('Користувача додано', 'success');\n                this.renderUsers(1);\n            }\n            catch (err) {\n                this.modal.show(err.message, 'danger');\n            }\n        });\n    }\n    bindSearch() {\n        const input = document.getElementById('search');\n        input === null || input === void 0 ? void 0 : input.addEventListener('input', () => {\n            this.currentSearch = input.value;\n            this.renderBooks(1);\n        });\n    }\n    readBookForm() {\n        const idEl = document.getElementById('book-id');\n        const titleEl = document.getElementById('book-title');\n        const authorEl = document.getElementById('book-author');\n        const yearEl = document.getElementById('book-year');\n        const id = _validation__WEBPACK_IMPORTED_MODULE_2__.Validation.parseUserId(idEl === null || idEl === void 0 ? void 0 : idEl.value);\n        const year = _validation__WEBPACK_IMPORTED_MODULE_2__.Validation.parseYear(yearEl === null || yearEl === void 0 ? void 0 : yearEl.value);\n        if (id === null) {\n            this.modal.show('ID книги має бути числом', 'danger');\n            return null;\n        }\n        if (!_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.isNonEmptyString(titleEl === null || titleEl === void 0 ? void 0 : titleEl.value)) {\n            this.modal.show('Назва обов’язкова', 'danger');\n            return null;\n        }\n        if (!_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.isNonEmptyString(authorEl === null || authorEl === void 0 ? void 0 : authorEl.value)) {\n            this.modal.show('Автор обов’язковий', 'danger');\n            return null;\n        }\n        if (year === null) {\n            this.modal.show('Рік має бути у форматі YYYY', 'danger');\n            return null;\n        }\n        return { id, title: titleEl.value.trim(), author: authorEl.value.trim(), year, isBorrowed: false };\n    }\n    readUserForm() {\n        const idEl = document.getElementById('user-id');\n        const nameEl = document.getElementById('user-name');\n        const id = _validation__WEBPACK_IMPORTED_MODULE_2__.Validation.parseUserId(idEl === null || idEl === void 0 ? void 0 : idEl.value);\n        if (id === null) {\n            this.modal.show('ID користувача має бути числом', 'danger');\n            return null;\n        }\n        if (!_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.isNonEmptyString(nameEl === null || nameEl === void 0 ? void 0 : nameEl.value)) {\n            this.modal.show('Ім’я обов’язкове', 'danger');\n            return null;\n        }\n        return { id, name: nameEl.value.trim(), borrowedBookIds: [] };\n    }\n    persist() {\n        const books = this.service.listBooks().map(b => ({ id: b.id, title: b.title, author: b.author, year: b.year, isBorrowed: b.isBorrowed, borrowedByUserId: b.borrowedByUserId }));\n        const users = this.service.listUsers().map(u => ({ id: u.id, name: u.name, borrowedBookIds: u.borrowedBookIds }));\n        this.storage.setItem(this.BOOKS_KEY, books);\n        this.storage.setItem(this.USERS_KEY, users);\n    }\n    render() {\n        this.renderBooks(this.booksPage);\n        this.renderUsers(this.usersPage);\n    }\n    renderBooks(page) {\n        this.booksPage = page;\n        const listEl = document.getElementById('books-list');\n        if (!listEl)\n            return;\n        listEl.innerHTML = '';\n        let books = this.service.listBooks();\n        if (this.currentSearch.trim()) {\n            books = this.service.searchBooksByTitleOrAuthor(this.currentSearch);\n        }\n        const total = books.length;\n        const start = (page - 1) * this.booksPerPage;\n        const slice = books.slice(start, start + this.booksPerPage);\n        for (const b of slice) {\n            const li = document.createElement('li');\n            li.className = 'list-group-item d-flex align-items-center justify-content-between';\n            const left = document.createElement('div');\n            left.innerHTML = `<strong>${b.title}</strong> — ${b.author} (${b.year})`;\n            const actions = document.createElement('div');\n            const btn = document.createElement('button');\n            btn.className = `btn btn-sm ${b.isBorrowed ? 'btn-secondary' : 'btn-success'}`;\n            btn.textContent = b.isBorrowed ? 'Повернути' : 'Позичити';\n            btn.addEventListener('click', () => this.handleBorrowReturn(b));\n            const del = document.createElement('button');\n            del.className = 'btn btn-sm btn-outline-danger ms-2';\n            del.textContent = 'Видалити';\n            del.addEventListener('click', () => { this.service.removeBook(b.id); this.persist(); this.renderBooks(this.booksPage); });\n            actions.appendChild(btn);\n            actions.appendChild(del);\n            li.appendChild(left);\n            li.appendChild(actions);\n            listEl.appendChild(li);\n        }\n        this.renderPagination('books-pagination', total, this.booksPerPage, (p) => this.renderBooks(p));\n    }\n    renderUsers(page) {\n        this.usersPage = page;\n        const listEl = document.getElementById('users-list');\n        if (!listEl)\n            return;\n        listEl.innerHTML = '';\n        const users = this.service.listUsers();\n        const total = users.length;\n        const start = (page - 1) * this.usersPerPage;\n        const slice = users.slice(start, start + this.usersPerPage);\n        for (const u of slice) {\n            const li = document.createElement('li');\n            li.className = 'list-group-item d-flex align-items-center justify-content-between';\n            const left = document.createElement('div');\n            left.innerHTML = `<strong>${u.name}</strong> — ID: ${u.id} | Книг: ${u.borrowedCount}`;\n            const actions = document.createElement('div');\n            const del = document.createElement('button');\n            del.className = 'btn btn-sm btn-outline-danger';\n            del.textContent = 'Видалити';\n            del.addEventListener('click', () => { this.service.removeUser(u.id); this.persist(); this.renderUsers(this.usersPage); });\n            actions.appendChild(del);\n            li.appendChild(left);\n            li.appendChild(actions);\n            listEl.appendChild(li);\n        }\n        this.renderPagination('users-pagination', total, this.usersPerPage, (p) => this.renderUsers(p));\n    }\n    renderPagination(id, total, perPage, go) {\n        const ul = document.getElementById(id);\n        if (!ul)\n            return;\n        ul.innerHTML = '';\n        const pages = Math.max(1, Math.ceil(total / perPage));\n        for (let p = 1; p <= pages; p++) {\n            const li = document.createElement('li');\n            li.className = `page-item ${p === (id === 'books-pagination' ? this.booksPage : this.usersPage) ? 'active' : ''}`;\n            const a = document.createElement('a');\n            a.className = 'page-link';\n            a.href = '#';\n            a.textContent = String(p);\n            a.addEventListener('click', (e) => { e.preventDefault(); go(p); });\n            li.appendChild(a);\n            ul.appendChild(li);\n        }\n    }\n    handleBorrowReturn(book) {\n        const userIdStr = prompt('Введіть ID користувача:');\n        const userId = _validation__WEBPACK_IMPORTED_MODULE_2__.Validation.parseUserId(userIdStr !== null && userIdStr !== void 0 ? userIdStr : '');\n        if (userId === null) {\n            this.modal.show('Некоректний ID користувача', 'danger');\n            return;\n        }\n        const res = book.isBorrowed ? this.service.returnBook(book.id, userId) : this.service.borrowBook(book.id, userId);\n        this.modal.show(res.message, res.ok ? 'success' : 'warning');\n        if (res.ok) {\n            this.persist();\n            this.renderBooks(this.booksPage);\n            this.renderUsers(this.usersPage);\n        }\n    }\n}\ndocument.addEventListener('DOMContentLoaded', () => {\n    new App();\n});\n\n\n//# sourceURL=webpack://lab-app/./src/app.ts?\n}");

/***/ }),

/***/ "./src/library.ts":
/*!************************!*\
  !*** ./src/library.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Library: () => (/* binding */ Library)\n/* harmony export */ });\nclass Library {\n    constructor(getId, initialItems) {\n        this.getId = getId;\n        this.items = new Map();\n        if (initialItems) {\n            for (const item of initialItems) {\n                this.items.set(this.getId(item), item);\n            }\n        }\n    }\n    add(item) {\n        const id = this.getId(item);\n        this.items.set(id, item);\n    }\n    remove(id) {\n        return this.items.delete(id);\n    }\n    getById(id) {\n        return this.items.get(id);\n    }\n    getAll() {\n        return Array.from(this.items.values());\n    }\n    find(predicate) {\n        const result = [];\n        for (const item of this.items.values()) {\n            if (predicate(item))\n                result.push(item);\n        }\n        return result;\n    }\n}\n\n\n//# sourceURL=webpack://lab-app/./src/library.ts?\n}");

/***/ }),

/***/ "./src/modal.ts":
/*!**********************!*\
  !*** ./src/modal.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Modal: () => (/* binding */ Modal)\n/* harmony export */ });\nclass Modal {\n    constructor(containerSelector = '#modal-root') {\n        const container = document.querySelector(containerSelector);\n        if (!container) {\n            const div = document.createElement('div');\n            div.id = containerSelector.replace('#', '');\n            document.body.appendChild(div);\n            this.container = div;\n        }\n        else {\n            this.container = container;\n        }\n    }\n    show(message, type = 'info') {\n        const alertDiv = document.createElement('div');\n        alertDiv.className = `alert alert-${type}`;\n        alertDiv.role = 'alert';\n        alertDiv.textContent = message;\n        this.container.appendChild(alertDiv);\n        setTimeout(() => alertDiv.remove(), 3000);\n    }\n}\n\n\n//# sourceURL=webpack://lab-app/./src/modal.ts?\n}");

/***/ }),

/***/ "./src/models.ts":
/*!***********************!*\
  !*** ./src/models.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Book: () => (/* binding */ Book),\n/* harmony export */   User: () => (/* binding */ User)\n/* harmony export */ });\nclass Book {\n    constructor(params) {\n        this.id = params.id;\n        this.title = params.title;\n        this.author = params.author;\n        this.year = params.year;\n        this.isBorrowed = params.isBorrowed;\n        this.borrowedByUserId = params.borrowedByUserId;\n    }\n    get displayTitle() {\n        return `${this.title} (${this.year})`;\n    }\n}\nclass User {\n    constructor(params) {\n        this.id = params.id;\n        this.name = params.name;\n        this.borrowedBookIds = Array.isArray(params.borrowedBookIds) ? params.borrowedBookIds.slice() : [];\n    }\n    get borrowedCount() {\n        return this.borrowedBookIds.length;\n    }\n}\n\n\n//# sourceURL=webpack://lab-app/./src/models.ts?\n}");

/***/ }),

/***/ "./src/services.ts":
/*!*************************!*\
  !*** ./src/services.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LibraryService: () => (/* binding */ LibraryService)\n/* harmony export */ });\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models */ \"./src/models.ts\");\n/* harmony import */ var _library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./library */ \"./src/library.ts\");\n/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation */ \"./src/validation.ts\");\n\n\n\nclass LibraryService {\n    constructor(initialBooks, initialUsers) {\n        const bookInstances = (initialBooks !== null && initialBooks !== void 0 ? initialBooks : []).map(b => new _models__WEBPACK_IMPORTED_MODULE_0__.Book(Object.assign({}, b)));\n        const userInstances = (initialUsers !== null && initialUsers !== void 0 ? initialUsers : []).map(u => new _models__WEBPACK_IMPORTED_MODULE_0__.User(Object.assign({}, u)));\n        this.books = new _library__WEBPACK_IMPORTED_MODULE_1__.Library((b) => b.id, bookInstances);\n        this.users = new _library__WEBPACK_IMPORTED_MODULE_1__.Library((u) => u.id, userInstances);\n    }\n    addBook(book) {\n        this.validateBook(book);\n        this.books.add(new _models__WEBPACK_IMPORTED_MODULE_0__.Book(Object.assign({}, book)));\n    }\n    removeBook(bookId) {\n        return this.books.remove(bookId);\n    }\n    addUser(user) {\n        this.validateUser(user);\n        this.users.add(new _models__WEBPACK_IMPORTED_MODULE_0__.User(Object.assign({}, user)));\n    }\n    removeUser(userId) {\n        return this.users.remove(userId);\n    }\n    listBooks() { return this.books.getAll(); }\n    listUsers() { return this.users.getAll(); }\n    getBook(id) { return this.books.getById(id); }\n    getUser(id) { return this.users.getById(id); }\n    searchBooksByTitleOrAuthor(query) {\n        const q = query.trim().toLowerCase();\n        return this.books.find(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));\n    }\n    borrowBook(bookId, userId) {\n        const book = this.books.getById(bookId);\n        const user = this.users.getById(userId);\n        if (!book)\n            return { ok: false, message: 'Книга не знайдена.' };\n        if (!user)\n            return { ok: false, message: 'Користувача не знайдено.' };\n        if (book.isBorrowed)\n            return { ok: false, message: 'Книга вже позичена.' };\n        if (user.borrowedBookIds.length >= 3)\n            return { ok: false, message: 'Ліміт: не більше 3-х книг.' };\n        book.isBorrowed = true;\n        book.borrowedByUserId = user.id;\n        user.borrowedBookIds.push(book.id);\n        return { ok: true, message: 'Успішно позичено.' };\n    }\n    returnBook(bookId, userId) {\n        const book = this.books.getById(bookId);\n        const user = this.users.getById(userId);\n        if (!book)\n            return { ok: false, message: 'Книга не знайдена.' };\n        if (!user)\n            return { ok: false, message: 'Користувача не знайдено.' };\n        if (!book.isBorrowed || book.borrowedByUserId !== user.id) {\n            return { ok: false, message: 'Книга не позичена цим користувачем.' };\n        }\n        book.isBorrowed = false;\n        book.borrowedByUserId = undefined;\n        user.borrowedBookIds = user.borrowedBookIds.filter(id => id !== book.id);\n        return { ok: true, message: 'Книгу повернуто.' };\n    }\n    validateBook(book) {\n        if (!_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.isNonEmptyString(book.title))\n            throw new Error('Назва книги обов’язкова.');\n        if (!_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.isNonEmptyString(book.author))\n            throw new Error('Автор обов’язковий.');\n        if (!_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.isValidYear(book.year))\n            throw new Error('Рік видання має бути валідним роком (YYYY).');\n        if (!_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.isValidUserId(book.id))\n            throw new Error('ID книги має бути числом.');\n    }\n    validateUser(user) {\n        if (!_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.isValidUserId(user.id))\n            throw new Error('ID користувача має бути числом.');\n        if (!_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.isNonEmptyString(user.name))\n            throw new Error('Ім’я обов’язкове.');\n        if (!Array.isArray(user.borrowedBookIds))\n            throw new Error('borrowedBookIds має бути масивом.');\n    }\n}\n\n\n//# sourceURL=webpack://lab-app/./src/services.ts?\n}");

/***/ }),

/***/ "./src/storage.ts":
/*!************************!*\
  !*** ./src/storage.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Storage: () => (/* binding */ Storage)\n/* harmony export */ });\nclass Storage {\n    constructor(storage = window.localStorage) {\n        this.storage = storage;\n    }\n    setItem(key, value) {\n        const serialized = JSON.stringify(value);\n        this.storage.setItem(key, serialized);\n    }\n    getItem(key) {\n        const raw = this.storage.getItem(key);\n        if (raw === null)\n            return null;\n        try {\n            return JSON.parse(raw);\n        }\n        catch (_a) {\n            return null;\n        }\n    }\n    removeItem(key) {\n        this.storage.removeItem(key);\n    }\n    clear() {\n        this.storage.clear();\n    }\n}\n\n\n//# sourceURL=webpack://lab-app/./src/storage.ts?\n}");

/***/ }),

/***/ "./src/validation.ts":
/*!***************************!*\
  !*** ./src/validation.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Validation: () => (/* binding */ Validation)\n/* harmony export */ });\nclass Validation {\n    static isNonEmptyString(value) {\n        return typeof value === 'string' && value.trim().length > 0;\n    }\n    static isValidUserId(value) {\n        if (typeof value === 'number' && Number.isInteger(value))\n            return true;\n        if (typeof value === 'string' && /^\\d+$/.test(value))\n            return true;\n        return false;\n    }\n    static parseUserId(value) {\n        if (typeof value === 'number' && Number.isInteger(value))\n            return value;\n        if (typeof value === 'string' && /^\\d+$/.test(value))\n            return parseInt(value, 10);\n        return null;\n    }\n    static isValidYear(value) {\n        if (typeof value === 'number' && Number.isInteger(value)) {\n            return this.yearInRange(value);\n        }\n        if (typeof value === 'string' && /^\\d{4}$/.test(value)) {\n            return this.yearInRange(parseInt(value, 10));\n        }\n        return false;\n    }\n    static parseYear(value) {\n        if (typeof value === 'number' && Number.isInteger(value) && this.yearInRange(value)) {\n            return value;\n        }\n        if (typeof value === 'string' && /^\\d{4}$/.test(value)) {\n            const y = parseInt(value, 10);\n            return this.yearInRange(y) ? y : null;\n        }\n        return null;\n    }\n    static yearInRange(year) {\n        const current = new Date().getFullYear();\n        return year >= 1000 && year <= current;\n    }\n}\n\n\n//# sourceURL=webpack://lab-app/./src/validation.ts?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;