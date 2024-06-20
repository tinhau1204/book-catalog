import { Grid } from "@mantine/core";
import BookCard from "../BookCard";

export default function BookofEachYear({ books }) {

    return (
        <div className="flex flex-col justify-center gap-y-4 w-full py-4">
            {books ?
                <>
                    <div className="flex flex-row justify-between w-full items-center gap-x-2">
                        <span className="border border-solid border-black w-full pl-2"></span>
                        <strong className="min-w-fit w-full">{books.year ? 'Year ' : 'Books without a year'}<span>{books.year ? books.year : ''}</span></strong>
                        <span className="border border-solid border-black w-full pr-2"></span>
                    </div>

                    <Grid>
                        {
                            books.books?.map((book, index) => (
                                <Grid.Col key={index} span={{ base: 12, xs: 6, md: 4 }} className="[&>*]:mx-auto">
                                    <BookCard book={book} />
                                </Grid.Col>
                            ))

                        }
                    </Grid>

                </>
                :     
                <>
                    <strong>unable to load book</strong>
                </>
        }
        </div>
    );
}