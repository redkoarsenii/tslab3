## Система управління бібліотекою (TypeScript)

Цей проєкт реалізує застосунок для управління бібліотекою з використанням TypeScript, Generics, класів, інтерфейсів, модулів та Bootstrap для інтерфейсу.

### Архітектура
- **index.html**: розмітка Bootstrap (форми додавання, списки, пошук, пагінація, сповіщення) і підключення `./dist/bundle.js`.
- **src/app.ts**: зв’язує UI з бізнес-логікою, обробляє події, рендерить списки, керує LocalStorage, показує сповіщення.
- **src/models.ts**: інтерфейси і класи для `Book` та `User`.
- **src/library.ts**: узагальнена колекція `Library<T>` з методами `add/remove/get/find`.
- **src/services.ts**: бізнес-операції (CRUD, пошук, позичання/повернення з лімітом і валідаціями).
- **src/storage.ts**: типобезпечна обгортка над `localStorage`.
- **src/validation.ts**: перевірки рядків, цифрових `id`, року `YYYY`.
- **src/modal.ts**: прості Bootstrap-сповіщення (`alert`).
- **webpack.config.js**, **tsconfig.json**: збірка та налаштування компілятора.

### Моделі (src/models.ts)
- `IBook`: `id`, `title`, `author`, `year`, `isBorrowed`, `borrowedByUserId?`.
- `Book`: клас із конструктором за `IBook` і геттером `displayTitle`.
- `IUser`: `id`, `name`, `borrowedBookIds: number[]`.
- `User`: клас із геттером `borrowedCount`.

### Узагальнена колекція (src/library.ts)
`Library<T>(getId)` зберігає елементи у `Map<number, T>` і надає:
- `add(item)`, `remove(id)`
- `getById(id)`, `getAll()`
- `find(predicate)`

### Сховище (src/storage.ts)
Типобезпечні методи:
- `setItem<T>(key, value)` — JSON-серіалізація.
- `getItem<T>(key)` — безпечна десеріалізація.
- `removeItem(key)`, `clear()`

### Валідація (src/validation.ts)
- `isNonEmptyString` — непорожній рядок.
- `isValidUserId`/`parseUserId` — лише цифри або ціле число.
- `isValidYear`/`parseYear` — формат `YYYY` або валідне ціле в діапазоні `[1000..поточний]`.

### Бізнес-логіка (src/services.ts)
- Тримає `Library<Book>` і `Library<User>`.
- CRUD: `addBook/removeBook`, `addUser/removeUser`, `list*/get*` + валідації.
- Пошук: `searchBooksByTitleOrAuthor(query)` по назві/автору (без регістру).
- Позичання/повернення:
  - `borrowBook(bookId, userId)`: перевірки існування, статусу, ліміту в 3 книги; оновлення стану.
  - `returnBook(bookId, userId)`: перевірка власника; скидання стану й зв’язків.
- Повертає `{ ok, message }` для показу сповіщень.

### Сповіщення (src/modal.ts)
- Контейнер `#modal-root`.
- `show(message, type)`: створює `div.alert.alert-{type}`, автоматично прибирає через 3 сек.

### Логіка застосунку (src/app.ts)
- Ініціалізація: читає `books`/`users` із LocalStorage, створює `LibraryService`, підписує обробники подій.
- Форми додавання: збір значень, валідація, додавання через сервіс, збереження, сповіщення, перерендер.
- Пошук: фільтрує список книг за назвою/автором.
- Пагінація: по 5 елементів на сторінку для книг і користувачів.
- Дії у списках:
  - Книги: Позичити/Повернути (з `prompt` ID користувача), Видалити.
  - Користувачі: Видалити.
- Збереження (`persist()`): пише прості об’єкти (`IBook`/`IUser`) у LocalStorage.

### Вимоги лабораторної — виконання
- TS-типізація: інтерфейси/класи/Generics.
- Класи та інтерфейси: `Book`, `User` + `IBook`, `IUser`.
- Generics: `Library<T>`, `Storage.getItem<T>/setItem<T>`.
- Модулі: поділ на моделі, сервіси, utils, UI.
- Bootstrap: макет та стилі для UI.
- Позичання/повернення: `borrowBook`/`returnBook` з лімітом 3.
- Валідація: обов’язкові поля, `id` лише цифри, рік — `YYYY`.
- Пошук, видалення, пагінація: реалізовано.

### Запуск
1. Встановіть залежності: `npm install`
2. Запуск dev-сервера: `npm start` → `http://localhost:9000`
3. Збірка: `npm run build`

### Як згенерувати PDF зі звітом
1. Відкрийте цей README у браузері (або переглядачі Markdown).
2. Меню друку → Зберегти як PDF.

За потреби можна додати скріншоти з папки `design/` до звіту.



