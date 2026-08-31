import { Link } from "react-router";
import useAutoSlide from "../../hooks/useAutoSlide";

const images = [
    "/image/new-arrivals/news.webp",
    "/image/new-arrivals/news1.webp",
    "/image/new-arrivals/news2.webp",
    "/image/new-arrivals/news3.webp",
    "/image/new-arrivals/news4.webp",
    "/image/new-arrivals/news5.webp",
    "/image/new-arrivals/news6.webp",
];

const NewArrivals = () => {
    const { activeIndex, sectionRef } = useAutoSlide(images.length);

    return (
        <section ref={sectionRef} className="md:px-12 px-6 sm:px-8 lg:px-16 py-12 sm:py-16 bg-[#000000] flex flex-col lg:flex-row min-h-[500px] lg:m-auto">
            <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-start py-10 lg:py-0">
                <p className="text-[13px] sm:text-[14px] uppercase tracking-wide text-white">
                    What's new
                </p>
                <h2 className="text-[28px] sm:text-[32px] lg:text-[48px] font-serif leading-[1.05] mt-4 text-white">
                    Your next essential just dropped.
                </h2>
                <p className="text-[15px] sm:text-[16px] text-white mt-5 max-w-md">
                    Discover new arrivals to inspire your next adventure.
                </p>

                <Link
                    to="/collections/new-arrivals"
                    className="inline-block rounded-md w-fit uppercase text-[13px] sm:text-[14px] font-medium bg-[#FBFDFC] text-[#1A211E] border border-white px-6 py-3 mt-8 hover:bg-black hover:border-white hover:text-white transition-colors cursor-pointer"
                >
                    Shop New Arrivals
                </Link>
            </div>

            <div className="relative w-full lg:w-1/2 h-[400px] lg:h-[570px] overflow-hidden rounded-md">
                {images.map((src, i) => (
                    <img
                        key={src}
                        src={src}
                        alt=""
                        className={`w-full h-full absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out ${
                            activeIndex === i ? "opacity-100" : "opacity-0"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;