import { useState, useEffect, useRef, useContext } from "react";
import ProductCard from "./ProductCard";
import { DATA } from "../../Context/Context";

const categories = ["CITY", "TRAVEL", "EVERYDAY", "OUTDOOR", "CAMERA GEAR", "MOBILE", "WALLETS", "MOTO"];

// How many products to show per category in Best Sellers
const MAX_PRODUCTS_PER_CATEGORY = 6;

const getStep = () => {
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 3;
};

const BestSellers = () => {
    const { mehsul: allProducts = [] } = useContext(DATA);

    const [activeCategory, setActiveCategory] = useState("CITY");
    const [step, setStep] = useState(getStep());
    const [activePage, setActivePage] = useState(0);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const trackRef = useRef(null);

    useEffect(() => {
        const onResize = () => setStep(getStep());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const products = allProducts
        .filter((p) => p.category === activeCategory)
        .slice(0, MAX_PRODUCTS_PER_CATEGORY);
    const totalPages = Math.max(1, Math.ceil(products.length / step));

    useEffect(() => {
        if (trackRef.current) trackRef.current.scrollTo({ left: 0 });
        setActivePage(0);
        setIsPrevDisabled(true);
        checkNextDisabled();
    }, [activeCategory, step, allProducts]);

    const checkNextDisabled = () => {
        const track = trackRef.current;
        if (!track) return;
        const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
        setIsNextDisabled(isAtEnd);
    };

    const handleTrackScroll = () => {
        const track = trackRef.current;
        if (!track) return;

        setIsPrevDisabled(track.scrollLeft <= 2);
        checkNextDisabled();

        const cardWidth = track.children[0]?.getBoundingClientRect().width || 1;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        const pageWidth = step * (cardWidth + gap);
        const page = Math.round(track.scrollLeft / pageWidth);
        setActivePage(page);
    };

    const moveByOneCard = (direction) => {
        const track = trackRef.current;
        if (!track || !track.children[0]) return;

        const cardWidth = track.children[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;

        track.scrollBy({ left: direction * (cardWidth + gap), behavior: "smooth" });
    };

    const handlePrev = () => { if (!isPrevDisabled) moveByOneCard(-1); };
    const handleNext = () => { if (!isNextDisabled) moveByOneCard(1); };

    const scrollToPage = (pageIndex) => {
        const track = trackRef.current;
        if (!track || !track.children[0]) return;

        const cardWidth = track.children[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        const scrollAmount = pageIndex * step * (cardWidth + gap);

        track.scrollTo({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <section className="px-6 sm:px-10 py-12 sm:py-16 md:px-12 lg:px-16">
            <h2 className="text-[28px] sm:text-[36px] lg:text-[48px] font-serif flex items-center gap-4">
                Best sellers
                <span className="inline-block w-14 sm:w-20 lg:w-24 border-t border-black"></span>
            </h2>

            <div className="flex items-center justify-between mt-6 sm:mt-8 gap-4">
                <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1 pb-1">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`whitespace-nowrap uppercase text-[11px] sm:text-[13px] lg:text-[14px] px-3 sm:px-5 py-2 sm:py-3 rounded-full border transition-colors shrink-0 cursor-pointer ${
                                activeCategory === cat
                                    ? "bg-black text-white border-black"
                                    : "bg-gray-100 text-black border-transparent hover:bg-gray-200"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="hidden sm:flex gap-2 shrink-0">
                    <button
                        onClick={handlePrev}
                        disabled={isPrevDisabled}
                        aria-label="Previous products"
                        className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full border flex items-center justify-center transition-colors ${
                            isPrevDisabled
                                ? "border-gray-200 text-gray-300 bg-gray-100 cursor-not-allowed"
                                : "border-black text-black hover:bg-gray-100 cursor-pointer"
                        }`}
                    >
                        ←
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={isNextDisabled}
                        aria-label="Next products"
                        className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full border flex items-center justify-center transition-colors ${
                            isNextDisabled
                                ? "border-gray-200 text-gray-300 bg-gray-100 cursor-not-allowed"
                                : "border-black text-black hover:bg-gray-100 cursor-pointer"
                        }`}
                    >
                        →
                    </button>
                </div>
            </div>

            {allProducts.length === 0 ? (
                <p className="text-center text-gray-400 py-16">Loading...</p>
            ) : products.length > 0 ? (
                <>
                    <div
                        ref={trackRef}
                        onScroll={handleTrackScroll}
                        className="flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth mt-8"
                    >
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="shrink-0 snap-start w-[80%] sm:w-[43%] lg:w-[calc((100%-72px)/3.5)]"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <span
                                    key={i}
                                    onClick={() => scrollToPage(i)}
                                    className={`h-2 rounded-full transition-all cursor-pointer ${
                                        i === activePage ? "w-6 bg-black" : "w-2 bg-gray-300"
                                    }`}
                                ></span>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <p className="text-center text-gray-400 py-16">
                    No products in this category yet
                </p>
            )}
        </section>
    );
};

export default BestSellers;