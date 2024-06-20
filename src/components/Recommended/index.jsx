import { useEffect, useState } from "react";
import BookCard from "../BookCard";
import { db } from "../../config/firebase";
import { getRecommendBook } from "../../api/book";

export default function Recommended() {
    const [books, setBooks] = useState({});

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const books = await getRecommendBook(db);
                setBooks(books);
            }
            catch (e) {
                console.error(e)
            }
        };
        fetchBooks();
    }, [])

    return (
        <section id="recommended" className="min-h-96 w-full px-4">
            <div className="flex flex-col md:flex-row items-end md:items-center justify-between">
                <h3 className="text-start">Book Recommendations</h3>
            </div>

            <div className="h-full w-full">
                {
                    books && <BookCard book={books} />
                }
            </div>
        </section>
    );
}