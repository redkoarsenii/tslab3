import assert from "assert";
import { Library } from "../src/library";

interface Book {
    id: number;
    title: string;
    author: string;
}

describe("Library<T>", () => {
    let library: Library<Book>;

    beforeEach(() => {
        library = new Library<Book>((book) => book.id, [
            { id: 1, title: "1984", author: "George Orwell" },
            { id: 2, title: "Brave New World", author: "Aldous Huxley" },
        ]);
    });

    it("повинна додавати елемент", () => {
        const newBook = { id: 3, title: "Fahrenheit 451", author: "Ray Bradbury" };
        library.add(newBook);

        const allBooks = library.getAll();
        assert.strictEqual(allBooks.length, 3);
        assert.deepStrictEqual(library.getById(3), newBook);
    });

    it("повинна видаляти елемент за id", () => {
        const result = library.remove(1);
        assert.strictEqual(result, true);
        assert.strictEqual(library.getById(1), undefined);
    });

    it("повинна повертати елемент за id", () => {
        const book = library.getById(2);
        assert.deepStrictEqual(book, {
            id: 2,
            title: "Brave New World",
            author: "Aldous Huxley",
        });
    });

    it("повинна повертати всі елементи", () => {
        const books = library.getAll();
        assert.strictEqual(books.length, 2);
    });

    it("повинна знаходити елементи за умовою (predicate)", () => {
        const result = library.find((book) => book.author.includes("Orwell"));
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].title, "1984");
    });

    it("повинна повертати порожній масив, якщо збігів немає", () => {
        const result = library.find((book) => book.author === "Someone Else");
        assert.deepStrictEqual(result, []);
    });
});
