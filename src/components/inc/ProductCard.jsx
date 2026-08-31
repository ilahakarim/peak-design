// components/ProductCard.jsx
import { useState, useRef, useContext } from "react";
import { Link } from "react-router";
import { DATA } from "../../Context/Context";

// once there are more swatches than this, the rest hide behind "+N more"
const MAX_VISIBLE_SWATCHES = 4;

function ProductCard({ product }) {
    const { title, isNew, isSale } = product;
    const { wishlist = [], toggleWishlist, addToCart } = useContext(DATA);

    let variants = product.variants;
    if (!variants) {
        variants = [
            {
                name: "default",
                subtitle: product.colors ? "in " + product.colors + " colors" : "",
                price: product.price,
                salePrice: null,
                image: product.image,
                hoverImage: product.hoverImage,
            },
        ];
    }

    // A product can be sold in different sizes/colors (e.g. liters, colorways).
    // If the data didn't say how to render the picker but there's more than one
    // variant, fall back to a plain text picker so selection still works and the
    // price still updates correctly.
    const variantType = product.variantType || (variants.length > 1 ? "pill" : null);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [showAllSwatches, setShowAllSwatches] = useState(false);
    const [justAdded, setJustAdded] = useState(false);

    const [mobileImageIndex, setMobileImageIndex] = useState(0);
    const trackRef = useRef(null);

    const selected = variants[selectedIndex];
    const hasSalePrice = selected.salePrice ? true : false;
    const hasHoverImage = selected.hoverImage ? true : false;
    const isFav = wishlist.includes(product.id);

    const showVariantButtons = variants.length > 1 && variantType;

    // only show the first MAX_VISIBLE_SWATCHES unless "show all" was clicked
    const visibleVariants = showAllSwatches ? variants : variants.slice(0, MAX_VISIBLE_SWATCHES);
    const hiddenCount = variants.length - MAX_VISIBLE_SWATCHES;

    // Carry the currently selected size/color into the product page link, so the
    // price and options shown there match what was picked on the card.
    const linkParams = new URLSearchParams();
    if (selected.size) linkParams.set("Size", selected.size);
    if (selected.colorName) linkParams.set("Color", selected.colorName);
    const productHref = `/products/${product.id}${linkParams.toString() ? `?${linkParams.toString()}` : ""}`;

    // Picking a color/size happens inside the card - it must not navigate to the product page
    function handleVariantClick(e, index) {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex(index);
        setMobileImageIndex(0);

        if (trackRef.current) {
            trackRef.current.scrollTo({ left: 0 });
        }
    }

    function handleFavClick(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product.id);
    }

    // Kartdakı kiçik səbət ikonu - məhsul səhifəsinə keçmədən birbaşa səbətə əlavə edir
    function handleAddToCart(e) {
        e.preventDefault();
        e.stopPropagation();

        const priceText = selected.salePrice || selected.price || "0";
        const priceNumber = parseFloat(priceText.toString().replace("$", "")) || 0;

        addToCart({
            id: product.id,
            name: title,
            image: selected.image,
            price: priceNumber,
            size: selected.size,
            color: selected.colorName,
        });

        // Düymədə qısa müddət "əlavə olundu" göstəririk
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1200);
    }

    function handleMobileScroll() {
        const track = trackRef.current;
        if (!track) return;

        const index = Math.round(track.scrollLeft / track.clientWidth);
        setMobileImageIndex(index);
    }

    function scrollToMobileImage(e, index) {
        e.preventDefault();
        e.stopPropagation();

        const track = trackRef.current;
        if (!track) return;

        track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
        setMobileImageIndex(index);
    }

    return (
        <Link
            to={productHref}
            className="group cursor-pointer w-full block"
            onMouseEnter={function () { setIsHovered(true); }}
            onMouseLeave={function () { setIsHovered(false); }}
        >
            {/* Image area */}
            <div className="relative bg-[#f5f5f5] aspect-[4/5] overflow-hidden p-8">
                {isNew && (
                    <span className="absolute top-4 left-4 bg-[#2B2B2B] text-white text-[12px] uppercase px-3 py-1.5 rounded-full z-10">
                        New
                    </span>
                )}

                {isSale && !isNew && (
                    <span className="absolute top-4 left-4 bg-[#2B2B2B] text-white text-[12px] uppercase px-3 py-1.5 rounded-full z-10">
                        Sale
                    </span>
                )}

                {/* Sağ üstdəki ikonlar: sevimlilər + səbətə at */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    <button
                        onClick={handleFavClick}
                        aria-label="Add to wishlist"
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? "black" : "none"}>
                            <path
                                d="M12 21s-6.7-4.35-9-8.28C.87 9.08 3.15 4.5 7.5 4.5c2.08 0 3.55 1.1 4.5 2.4.95-1.3 2.42-2.4 4.5-2.4 4.35 0 6.63 4.58 4.5 8.22C18.7 16.65 12 21 12 21Z"
                                stroke="black"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <button
                        onClick={handleAddToCart}
                        aria-label="Add to cart"
                        title="Add to cart"
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                    >
                        {justAdded ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12l5 5L20 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M5 6H7L9 17H19L21 9H7" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="10" cy="20" r="1.2" fill="black" />
                                <circle cx="17" cy="20" r="1.2" fill="black" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Desktop - image changes on hover */}
                <div className="hidden lg:block w-full h-full">
                    {selected.image && (
                        <img
                            src={selected.image}
                            alt={title}
                            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-150 ${
                                isHovered && hasHoverImage ? "opacity-0" : "opacity-100"
                            }`}
                        />
                    )}

                    {hasHoverImage && (
                        <img
                            src={selected.hoverImage}
                            alt={title}
                            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-150 ${
                                isHovered ? "opacity-100" : "opacity-0"
                            }`}
                        />
                    )}

                    {!selected.image && (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-[12px]">
                            No image
                        </div>
                    )}
                </div>

                {/* Mobile - swipe between images */}
                <div
                    ref={trackRef}
                    onScroll={handleMobileScroll}
                    className="flex lg:hidden w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
                >
                    {[selected.image, selected.hoverImage].filter(Boolean).map(function (img, i) {
                        return (
                            <img
                                key={i}
                                src={img}
                                alt={title}
                                className="w-full h-full object-cover shrink-0 snap-start"
                            />
                        );
                    })}

                    {!selected.image && !selected.hoverImage && (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-[12px] shrink-0">
                            No image
                        </div>
                    )}
                </div>

                {hasHoverImage && (
                    <div className="flex lg:hidden absolute bottom-3 left-0 right-0 justify-center gap-1.5 z-10">
                        {[selected.image, selected.hoverImage].map(function (_, i) {
                            return (
                                <span
                                    key={i}
                                    onClick={function (e) { scrollToMobileImage(e, i); }}
                                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                        i === mobileImageIndex ? "w-5 bg-[#1A1A1A]" : "w-1.5 bg-gray-300"
                                    }`}
                                ></span>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Text area */}
            <div className="mt-4">
                <h3 className="text-[16px] font-medium">{title}</h3>
                {selected.subtitle && (
                    <p className="text-[14px] text-gray-500 mt-1">{selected.subtitle}</p>
                )}

                <div className="flex items-center gap-2 mt-1">
                    {hasSalePrice ? (
                        <>
                            <span className="text-[15px] text-gray-400 line-through">{selected.price}</span>
                            <span className="text-[15px]">{selected.salePrice}</span>
                        </>
                    ) : (
                        <span className="text-[15px]">{selected.price}</span>
                    )}
                </div>

                {/* Color swatches */}
                {showVariantButtons && variantType === "swatch" && (
                    <div className="flex items-center gap-2 mt-3">
                        {visibleVariants.map(function (variant, index) {
                            const isSelected = index === selectedIndex;

                            return (
                                <button
                                    key={variant.name}
                                    onClick={function (e) { handleVariantClick(e, index); }}
                                    title={variant.name}
                                    className={`w-7 h-7 flex items-center justify-center rounded-[4px] border-2 transition-colors cursor-pointer ${
                                        isSelected ? "border-black" : "border-transparent"
                                    }`}
                                >
                                    <span
                                        style={{ backgroundColor: variant.colorHex }}
                                        className="w-5 h-5 rounded-[2px]"
                                    ></span>
                                </button>
                            );
                        })}

                        {/* many colors: "+N more" button */}
                        {!showAllSwatches && hiddenCount > 0 && (
                            <button
                                onClick={function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowAllSwatches(true);
                                }}
                                className="text-[12px] text-gray-500 hover:text-black transition-colors whitespace-nowrap cursor-pointer"
                            >
                                +{hiddenCount} more
                            </button>
                        )}
                    </div>
                )}

                {/* Text pills (sizes, liters, "PRO TALL" etc.) */}
                {showVariantButtons && variantType === "pill" && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {variants.map(function (variant, index) {
                            const isSelected = index === selectedIndex;

                            return (
                                <button
                                    key={variant.name}
                                    onClick={function (e) { handleVariantClick(e, index); }}
                                    className={`text-[11px] uppercase px-3 py-1.5 border rounded-md transition-colors cursor-pointer ${
                                        isSelected
                                            ? "border-black font-medium"
                                            : "border-gray-300 text-gray-500"
                                    }`}
                                >
                                    {variant.size || variant.name}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </Link>
    );
}

export default ProductCard;