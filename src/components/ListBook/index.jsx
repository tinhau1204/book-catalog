import { Grid } from "@mantine/core";
import { getAllBook } from "../../api/book";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import BookCard from "../BookCard";


export default function ListBook() {
    const [books, setBooks] = useState([]);
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
    }, [books])

    return (
        <div className="min-h-96 w-full bg-gray-200">
            <h3>All Books We Have</h3>
            <Grid>
                {
                    books?.map((book) => (
                        book.books?.map((book, index) => (
                            <Grid.Col key={index} span={{ base: 12,xs: 6, md: 4 }} className="[&>*]:mx-auto">
                                <BookCard book={book} />
                            </Grid.Col>
                        ))
                    ))
                }
            </Grid>
        </div>
    );
}