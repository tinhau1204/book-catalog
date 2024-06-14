import { Button } from '@mantine/core';
import { CiPlane } from "react-icons/ci";

export default function Hero() {


    return (
        <>
            {/* <div className="w-[80%] border-2 border-solid rounded-md border-black h-full">
                <HTMLFlipBook width={400} height={400} className="w-[60%] p-4 mx-auto">
                    <div className="bg-hero bg-cover bg-center bg-no-repeat overflow-hidden -top-2">Page 1</div>
                    <div className="demoPage">
                        <section className="h-full w-full flex flex-col gap-y-2">
                            <h1 className="text-start w-full px-12 m-0">About Catalog</h1>
                            <p className="text-start px-12 m-0 h-full">
                                Welcome to Book Catalog,
                                your ultimate destination for book lovers!
                                Our meticulously curated book catalog is designed
                                to help you discover your next great read.
                                Whether you`&aposre into fantasy, mystery, romance, or non-fiction, our catalog offers a diverse selection of titles to suit every taste.
                                Explore summaries, reviews, and personalized recommendations tailored to your reading preferences. Dive into a world of stories and let us guide you on your literary journey!
                            </p>
                        </section>
                    </div>
                    <div className="bg-hero-world bg-cover bg-center bg-no-repeat overflow-hidden">Page 3</div>
                    <div className="demoPage">Page 4</div>
                </HTMLFlipBook>
            </div> */}
            <div className="w-full bg-gray-200 min-h-96 mt-6 flex flex-col md:flex-row items-center justify-between gap-4 p-4 flex-1">
                <div className='bg-hero-world bg-contain max-w-[80%] lg:max-w-[50%] bg-center bg-no-repeat h-full min-h-96 w-full'></div>
                <section className="h-full w-full mx-auto max-w-[80%] lg:max-w-[50%] flex flex-col items-start justify-start gap-y-4 text-start">
                    <h1 className="w-full  m-0">About Catalog</h1>
                    <p className="m-0">
                        Welcome to Book Catalog,
                        your ultimate destination for book lovers!
                        Our meticulously curated book catalog is designed
                        to help you discover your next great read.
                        Whether you`&aposre into fantasy, mystery, romance, or non-fiction, our catalog offers a diverse selection of titles to suit every taste.
                        Explore summaries, reviews, and personalized recommendations tailored to your reading preferences. Dive into a world of stories and let us guide you on your literary journey!
                    </p>
                    <Button
                        variant="light"
                        color="cyan"
                        rightSection={<CiPlane className="w-5 h-5"/>}
                        href="#recommended"
                    >
                        Get Started
                    </Button>
                </section>
            </div>
        </>
    );
}