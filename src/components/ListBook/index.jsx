import { getAllBook } from "../../api/book";
import { db } from "../../config/firebase";
import { useEffect } from "react";
import BookofEachYear from "./BookofEachYear";
import useBookStore from "../../config/bookStore";


export default function ListBook() {
    const { books, setBooks } = useBookStore((state) => ({
        books: state.books,
        setBooks: state.setBooks
    }))

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const books = await getAllBook(db);
                setBooks(books);
            } catch (e) {
                console.error(e)
            }
        };
        fetchBooks();
    }, [setBooks])

    return (
        <div className="min-h-96 w-full bg-gray-200">
            <h3>List of Book</h3>
            {books ?
                books.map((book) => (
                    <BookofEachYear key={book.year} books={book} />
                ))
                :
                <>
                    <div>
                        unable to load book
                    </div>
                </>
            }
        </div>
    );
}