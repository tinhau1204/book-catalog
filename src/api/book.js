import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

export async function getBookFilterYear(db, year) {
    let currentYear = new Date().getFullYear();
    const bookCol = collection(db, "book");
    const bookQuery = query(bookCol, where("publication_year", "<", (currentYear - 3)) && (year && where("publication_year", "==", year)), orderBy("publication_year", "desc"), orderBy("rating", "desc"))
    const bookSnapshot = (await getDocs(bookQuery));
    const bookList = bookSnapshot.docs.map(doc => doc.data());
    return bookList
}

export async function getAllBook(db) {
    const bookCol = collection(db, "book");
    const bookQuery = query(bookCol)
    const bookSnapshot = (await getDocs(bookQuery));
    const bookList = bookSnapshot.docs.map(doc => doc.data());

    // Separate books with and without publication year
    const booksWithYear = [];
    const booksWithoutYear = [];

    bookList.forEach(book => {
        if (book.publication_year) {
            booksWithYear.push(book);
        } else {
            booksWithoutYear.push(book);
        }
    });

    // Group books by publication year
    const booksByYear = booksWithYear.reduce((acc, book) => {
        const pubYear = book.publication_year;
        if (!acc[pubYear]) {
            acc[pubYear] = [];
        }
        acc[pubYear].push(book);
        return acc;
    }, {});

    // Convert the grouped books into an array and sort by publication year in descending order
    const sortedBooksByYear = Object.keys(booksByYear)
        .sort((a, b) => b - a)  // Sort years in descending order
        .map(year => {
            return {
                year,
                books: booksByYear[year].sort((a, b) => a.name.localeCompare(b.name))  // Sort books alphabetically by title
            };
        });

    // Sort books without publication year alphabetically
    booksWithoutYear.sort((a, b) => a.name.localeCompare(b.name));

    // Append books without publication year at the end
    if (booksWithoutYear.length > 0) {
        sortedBooksByYear.push({
            year: 'Unknown Year',
            books: booksWithoutYear
        });
    }

    return sortedBooksByYear;

    //return bookList
}
