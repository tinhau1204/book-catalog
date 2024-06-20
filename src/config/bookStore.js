import { create } from "zustand";

const bookStore = (set) => ({
    books: [],
    setBooks: (newBooks) => set({ books: newBooks }),
    addBook: (newBook) => set((state) => {
        const year = newBook.publication_year || "";
        const updatedBooksByYear = [...state.books];

        const yearIndex = updatedBooksByYear.findIndex(item => item.year === year);

        if (yearIndex !== -1) {
            // Year exists, add book to existing array
            updatedBooksByYear[yearIndex].books.push(newBook);
        } else {
            // Year doesn't exist, create new entry
            updatedBooksByYear.push({ year, books: [newBook] });
        }

        // Sort the array by year (with 'unknown year' at the end)
        updatedBooksByYear.sort((a, b) => {
            if (a.year === "") return 1;
            if (b.year === "") return -1;
            return b.year - a.year;
        });

        return { books: updatedBooksByYear };
    }),
    deleteBook: (bookName) => { //delete by book name (unique)
        set((state) => {
            const updatedAfterDelBooks = state.books.map(yearGroup => {
                const updatedBooks = yearGroup.books.filter(book => book.name !== bookName);
                return {
                    ...yearGroup,
                    books: updatedBooks
                };
            }).filter(yearGroup => yearGroup.books.length > 0);

            return { books: updatedAfterDelBooks };
        });
    },
    reset: () => {
        set({
            books: [],
        });
    },
});

const useBookStore = create(bookStore);

export default useBookStore;