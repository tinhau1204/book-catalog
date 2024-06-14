import { useEffect, useState } from "react";
import { Carousel } from '@mantine/carousel';
import BookCard from "../BookCard";
import { Group, Select } from "@mantine/core";
import { db } from "../../config/firebase";
import { getBookFilterYear } from "../../api/book";


/*
The system should be able to recommend a good book to the user:
a. A good book should be published at least 3 years ago or earlier; - publication_year now.year() - date.year() > 3
b. From all these books you should pick ones with the highest rating; - rating highest
c. If there are several good books matching the criteria - pick one at random;
*/

// add year to show the recommend book by year
function getScreenSize() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    return { width: width, height: height };
}

// function handleResize() {
//     var screenSize = getScreenSize();
//     console.log('Width:', screenSize.width, 'Height:', screenSize.height);
//     // Add your responsive logic here
// }

// window.addEventListener('resize', handleResize);

// Initial call to set up the current screen size
// handleResize();

export default function Recommended() {
    const [books, setBooks] = useState([]);
    const [years, setYears] = useState([]);
    const [pickedYear, setPickedYear] = useState("");
    const [innerWidth, setInnerWidth] = useState(getScreenSize().width);
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if (pickedYear) {
                    const books = await getBookFilterYear(db, pickedYear);
                    setBooks(books);
                } else {
                    const books = await getBookFilterYear(db);
                    setBooks(books);
                    const uniqueYears = [...new Set(books.map(book => book.publication_year))];
                    setYears(uniqueYears);
                }
            } catch (e) {
                console.error(e)
            }
        };
        fetchBooks();
    }, [pickedYear, books])

    useEffect(() => {
        const handleResize = () => {
            var screenSize = getScreenSize();
            setInnerWidth(screenSize.width);
        }
        window.addEventListener('resize', handleResize);
        handleResize();

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    },[]);

    return (
        <section id="recommended" className="min-h-96 w-full px-4">
            <div className="flex flex-col md:flex-row items-end md:items-center justify-between">
                <h3 className="text-start">Top Book Rating</h3>
                <Group className="items-center">
                    <p className="text-sm md:text-base font-semibold">Filter by Year: </p>
                    <Select
                        placeholder="Select Year"
                        value={pickedYear}
                        onChange={(value) => setPickedYear(value)}
                        data={years}
                    />

                </Group>
            </div>
            <Carousel
                // withIndicators
                height={550}
                slideSize={`${innerWidth > 600 ? `33,3333%` : `60%` }`}
                slideGap="lg"
                // loop
                align="start"
                slidesToScroll={`${innerWidth > 979 ? 3 : 2}`}
                dragFree
                controlsOffset={0}
            >
                {
                    books?.map((book, index) => (
                        <Carousel.Slide key={index}>
                            <BookCard book={book} />
                        </Carousel.Slide>
                    ))
                }
            </Carousel>
        </section>
    );
}