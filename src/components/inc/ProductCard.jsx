import { useState, useRef } from "react";

const ProductCard = ({ product }) => {
    const { title, price, colors, image, hoverImage, isNew } = product;

    const [isHovered, setIsHovered] = useState(false);
    const [activeImg, setActiveImg] = useState(0);
    const trackRef = useRef(null);

    const handleScroll = () => {
        const track = trackRef.current;
        if (!track) return;
        const index = Math.round(track.scrollLeft / track.clientWidth);
        setActiveImg(index);
    };

    const scrollToImage = (index) => {
        const track = trackRef.current;
        if (!track) return;
        track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
        setActiveImg(index);
    };

    return (
        <div
            className="group cursor-pointer w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative bg-[#f5f5f5] aspect-[4/5] overflow-hidden p-6 sm:p-8 lg:p-10 ">
                {isNew && (
                    <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#2B2B2B] text-white text-[10px] sm:text-[12px] uppercase px-3 py-1.5 rounded-full z-10">
                        New
                    </span>
                )}

                {image ? (
                    <>

                        <div className="hidden lg:block w-full h-full">
                            <img
                                src={image}
                                alt={title}
                                className={`w-full h-full object-cover absolute inset-0 mix-blend-multiply transition-opacity duration-100 ease-linear ${
                                    isHovered && hoverImage ? "opacity-0" : "opacity-100"
                                }`}
                            />
                            {hoverImage && (
                                <img
                                    src={hoverImage}
                                    alt={title}
                                    className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-100 ease-linear ${
                                        isHovered ? "opacity-100" : "opacity-0"
                                    }`}
                                />
                            )}
                        </div>

        
                        <div
                            ref={trackRef}
                            onScroll={handleScroll}
                            className="flex lg:hidden w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
                        >
                            {[image, hoverImage].filter(Boolean).map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={title}
                                    className="w-full h-full object-cover shrink-0 snap-start"
                                />
                            ))}
                        </div>

                        {hoverImage && (
                            <div className="flex lg:hidden absolute bottom-3 left-0 right-0 justify-center gap-1.5 z-10">
                                {[image, hoverImage].map((_, i) => (
                                    <span
                                        key={i}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            scrollToImage(i);
                                        }}
                                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                            i === activeImg ? "w-5 bg-[#1A1A1A]" : "w-1.5 bg-gray-300"
                                        }`}
                                    ></span>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-[12px]">
                        şəkil yoxdur
                    </div>
                )}
            </div>

            <div className="mt-3 sm:mt-4">
                <h3 className="text-[14px] sm:text-[16px] font-medium">{title}</h3>
                <p className="text-[13px] sm:text-[15px] mt-1">{price}</p>
                <p className="text-[11px] sm:text-[12px] uppercase text-gray-500 mt-1">
                    in {colors} colors
                </p>
            </div>
        </div>
    );
};

export default ProductCard;