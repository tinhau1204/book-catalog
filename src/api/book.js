import { collection, getDocs, query} from "firebase/firestore";

const findHighestRatedBooks = (books) => {
    let maxRating = -1
    let highestRatedBookList = []
    if (books.length === 0) {
        return []
    }
    for (const book of books) {
        if (book.rating && book.rating > maxRating) {
            maxRating = book.rating
            highestRatedBookList = [book]
        } else if (book.rating && book.rating === maxRating) {
            highestRatedBookList.push(book)
        }
    }
    return highestRatedBookList
}

export async function getRecommendBook(db) {
    let currentYear = new Date().getFullYear();
    const bookCol = collection(db, "book");
    const bookSnapshot = (await getDocs(bookCol));
    const bookList = bookSnapshot.docs.map(doc => doc.data());

    const ratedBookList = bookList.filter((book) => book.rating)
    
    const recentBookList = ratedBookList.filter(
        (book) => (book.publication_year) && (currentYear - book.publication_year) >= 3,
    )
    let highestRatedBookList = []

    highestRatedBookList = findHighestRatedBooks(recentBookList)

    if (highestRatedBookList.length === 0 && ratedBookList.length > 0) {
        highestRatedBookList = findHighestRatedBooks(ratedBookList)
    }

    if (highestRatedBookList.length === 0) {
        return bookList[Math.floor(Math.random() * bookList.length)]
    }

    return highestRatedBookList[Math.floor(Math.random() * highestRatedBookList.length)]

}

export async function getAllBook(db) {
    const bookCol = collection(db, "book");
    const bookQuery = query(bookCol)
    const bookSnapshot = (await getDocs(bookQuery));
    const bookList = bookSnapshot.docs.map(doc => doc.data());

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

    const sortedBooksByYear = Object.keys(booksByYear)
        .sort((a, b) => b - a)
        .map(year => {
            return {
                year,
                books: booksByYear[year].sort((a, b) => a.name.localeCompare(b.name)) //sorted alphabetically
            };
        });

    booksWithoutYear.sort((a, b) => a.name.localeCompare(b.name));

    if (booksWithoutYear.length > 0) {
        sortedBooksByYear.push({
            year: '',
            books: booksWithoutYear
        });
    }

    return sortedBooksByYear;
}
