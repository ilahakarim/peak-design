// pages/ProductPage.jsx
//
// This is the page that opens when a product card is clicked.
// It reads the product id from the route (/products/:id) and, if the
// product has variants, reads the chosen Size/Color from the URL
// (?Size=15L&Color=Black) so a shared link always opens on the right variant.
import { useContext, useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router";
import { DATA } from "../Context/Context";

function ProductPage() {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { mehsul: allProducts = [], addToCart, wishlist = [], toggleWishlist } = useContext(DATA);

    const product = allProducts.find((p) => String(p.id) === String(id));

    // Always work with a variants array, even for products that don't have real options
    const variants = useMemo(() => {
        if (product?.variants && product.variants.length > 0) return product.variants;
        if (!product) return [];
        return [
            {
                name: "default",
                price: product.price,
                salePrice: null,
                inStock: true,
                images: (product.images && product.images.filter(Boolean).length > 0
                    ? product.images.filter(Boolean)
                    : [product.image, product.hoverImage].filter(Boolean)),
            },
        ];
    }, [product]);

    // A product only varies along ONE axis: either color (swatches) or
    // size/option (pills) - never both at once. product.variantType says which.
    // Each variant's option value lives in `name` (real data uses "name" +
    // "colorHex", not "size"/"colorName" - matching ProductCard.jsx).
    const variantType = product?.variantType || (variants.length > 1 ? "pill" : null);
    const isColorAxis = variantType === "swatch";
    const isSizeAxis = variantType === "pill";

    const sizes = useMemo(
        () => (isSizeAxis ? [...new Set(variants.map((v) => v.size || v.name).filter(Boolean))] : []),
        [variants, isSizeAxis]
    );
    const colors = useMemo(
        () => (isColorAxis ? [...new Set(variants.map((v) => v.colorName || v.name).filter(Boolean))] : []),
        [variants, isColorAxis]
    );

    const [selectedSize, setSelectedSize] = useState(searchParams.get("Size") || sizes[0] || null);
    const [selectedColor, setSelectedColor] = useState(searchParams.get("Color") || colors[0] || null);
    const [quantity, setQuantity] = useState(1);

    // The variant matching the current selection on whichever single axis this
    // product actually has (size OR color - see isSizeAxis/isColorAxis above).
    const selectedVariant =
        variants.find((v) => {
            const matchesSize = !isSizeAxis || !selectedSize || (v.size || v.name) === selectedSize;
            const matchesColor = !isColorAxis || !selectedColor || (v.colorName || v.name) === selectedColor;
            return matchesSize && matchesColor;
        }) || variants[0];

    // Always show exactly 4 photo slots, even if some images are still
    // missing - empty slots render as "No image" placeholders below.
    const rawImages = (selectedVariant.images && selectedVariant.images.length > 0
        ? selectedVariant.images
        : [selectedVariant.image, selectedVariant.hoverImage].filter(Boolean));
    const gallery = [...rawImages, "", "", "", ""].slice(0, 4);

    function updateUrl(nextSize, nextColor) {
        const params = {};
        if (nextSize) params.Size = nextSize;
        if (nextColor) params.Color = nextColor;
        setSearchParams(params);
    }

    function chooseSize(size) {
        setSelectedSize(size);
        updateUrl(size, selectedColor);
    }

    function chooseColor(colorName) {
        setSelectedColor(colorName);
        updateUrl(selectedSize, colorName);
    }

    if (!product) {
        return (
            <section className="px-6 md:px-12 lg:px-16 py-24 text-center">
                <h1 className="text-[28px] font-serif">Product not found</h1>
                <p className="text-gray-500 mt-4">This product may have been removed, or the link is incorrect.</p>
                <Link
                    to="/"
                    className="inline-block mt-8 uppercase text-sm font-medium border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors"
                >
                    Back to home
                </Link>
            </section>
        );
    }

    const isFav = wishlist.includes(product.id);
    const hasSalePrice = Boolean(selectedVariant.salePrice);
    const inStock = selectedVariant.inStock !== false;

    // Turn a price like "$189.00" into a plain number for cart math
    function toNumber(price) {
        return parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;
    }

    function handleAddToCart() {
        if (!inStock) return;
        const cartItem = {
            id: product.id,
            name: product.title,
            image: gallery[0],
            price: toNumber(selectedVariant.salePrice || selectedVariant.price),
            size: selectedSize,
            color: selectedColor,
        };
        for (let i = 0; i < quantity; i++) {
            addToCart(cartItem);
        }
    }

    return (
        <section className="px-6 md:px-12 lg:px-16 py-8 sm:py-10">
            {/* Breadcrumb */}
            <p className="text-[13px] text-gray-500 mb-6">
                <Link to="/" className="hover:text-black">Home</Link>
                {product.category && <> · <span>{product.category}</span></>}
                {" · "}
                <span className="text-black">{product.title}</span>
            </p>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                {/* Image gallery: up to 4 photos in a 2x2 grid, like the real product photos */}
                <div className="w-full lg:w-1/2">
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {gallery.map((img, i) => (
                            <div key={i} className="relative bg-[#f5f5f5] aspect-square overflow-hidden rounded-md">
                                {i === 0 && (
                                    <div className="absolute top-3 left-3 flex gap-2 z-10">
                                        {!inStock && (
                                            <span className="bg-[#2B2B2B]/90 text-white text-[11px] uppercase px-3 py-1.5 rounded-full">
                                                Out of stock
                                            </span>
                                        )}
                                        {product.isNew && (
                                            <span className="bg-[#2B2B2B]/90 text-white text-[11px] uppercase px-3 py-1.5 rounded-full">
                                                New
                                            </span>
                                        )}
                                    </div>
                                )}
                                {img ? (
                                    <img src={img} alt={`${product.title} ${i + 1}`} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-[12px]">
                                        No image
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div className="w-full lg:w-1/2">
                    <h1 className="text-[28px] sm:text-[36px] font-bold uppercase tracking-wide">{product.title}</h1>

                    <div className="flex items-center gap-3 mt-4">
                        {hasSalePrice ? (
                            <>
                                <span className="text-gray-400 line-through text-[16px]">{selectedVariant.price}</span>
                                <span className="text-[20px] font-medium">{selectedVariant.salePrice}</span>
                            </>
                        ) : (
                            <span className="text-[20px] font-medium">{selectedVariant.price}</span>
                        )}
                        {!inStock && <span className="text-[13px] uppercase text-gray-500">Out of stock</span>}
                    </div>

                    {product.description && (
                        <p className="text-gray-600 mt-5 max-w-lg">{product.description}</p>
                    )}

                    {/* Size picker - full width boxes, like real product pages */}
                    {sizes.length > 0 && (
                        <div className="mt-8">
                            <p className="text-[13px] uppercase tracking-wide font-medium mb-3">Size</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {sizes.map((size) => {
                                    const isSelected = size === selectedSize;
                                    const available = variants.some((v) => (v.size || v.name) === size);
                                    return (
                                        <button
                                            key={size}
                                            onClick={() => chooseSize(size)}
                                            disabled={!available}
                                            className={`text-[14px] uppercase px-4 py-4 border-2 rounded-md transition-colors cursor-pointer ${
                                                isSelected
                                                    ? "border-black font-medium"
                                                    : available
                                                    ? "border-gray-200 text-gray-600 hover:border-black bg-gray-50"
                                                    : "border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed"
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Color picker - small photo swatches */}
                    {colors.length > 0 && (
                        <div className="mt-6">
                            <p className="text-[13px] uppercase tracking-wide font-medium mb-3">
                                Color{selectedColor ? `: ${selectedColor}` : ""}
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {colors.map((colorName) => {
                                    const variant = variants.find((v) => (v.colorName || v.name) === colorName);
                                    const isSelected = colorName === selectedColor;
                                    return (
                                        <button
                                            key={colorName}
                                            onClick={() => chooseColor(colorName)}
                                            title={colorName}
                                            className={`flex flex-col items-center gap-1.5 cursor-pointer group`}
                                        >
                                            <span
                                                style={{ backgroundColor: variant?.colorHex || "#e5e5e5" }}
                                                className={`block w-12 h-12 rounded-md border-2 transition-colors ${
                                                    isSelected ? "border-black" : "border-transparent group-hover:border-gray-300"
                                                }`}
                                            />
                                            <span className={`text-[11px] uppercase ${isSelected ? "font-medium text-black" : "text-gray-500"}`}>
                                                {colorName}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Quantity + actions */}
                    <div className="flex items-center gap-4 mt-8">
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                aria-label="Decrease quantity"
                                className="w-10 h-11 flex items-center justify-center text-lg cursor-pointer"
                            >
                                −
                            </button>
                            <span className="w-8 text-center text-sm">{quantity}</span>
                            <button
                                onClick={() => setQuantity((q) => q + 1)}
                                aria-label="Increase quantity"
                                className="w-10 h-11 flex items-center justify-center text-lg cursor-pointer"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={!inStock}
                            className={`flex-1 font-semibold uppercase text-sm tracking-wide py-4 rounded-md transition-colors ${
                                inStock
                                    ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            {inStock ? "Add to cart" : "Out of stock"}
                        </button>

                        <button
                            onClick={() => toggleWishlist(product.id)}
                            aria-label="Add to wishlist"
                            className="w-11 h-11 shrink-0 rounded-full border border-gray-300 flex items-center justify-center hover:border-black cursor-pointer"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill={isFav ? "black" : "none"}>
                                <path
                                    d="M12 21s-6.7-4.35-9-8.28C.87 9.08 3.15 4.5 7.5 4.5c2.08 0 3.55 1.1 4.5 2.4.95-1.3 2.42-2.4 4.5-2.4 4.35 0 6.63 4.58 4.5 8.22C18.7 16.65 12 21 12 21Z"
                                    stroke="black"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                    <p className="text-[13px] text-gray-500 mt-6">
                        Free shipping on orders over $50 · Lifetime warranty · 30-day returns
                    </p>
                </div>
            </div>
        </section>
    );
}

export default ProductPage;