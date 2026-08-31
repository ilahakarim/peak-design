// pages/CollectionPage.jsx
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ProductCard from "../components/inc/ProductCard";
import { DATA } from "../Context/Context";
import { bannerImages, categoryMap, filtersConfig, getBannerTitle, bagsShopAllCategories } from "./Collectionsconfig";

function CollectionPage() {
    const { slug } = useParams();
    const { mehsul = [] } = useContext(DATA);

    const [sortBy, setSortBy] = useState("featured");
    const [openFilter, setOpenFilter] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [onlySale, setOnlySale] = useState(false);

    // Kateqoriya dəyişəndə filterləri sıfırlayırıq
    useEffect(() => {
        setSelectedFilters({});
        setOpenFilter(null);
        setOnlySale(false);
    }, [slug]);

    if (!slug) {
        return <p>Kateqoriya tapılmadı</p>;
    }

    // "all" - "Shop Now" düyməsinin apardığı yer - bütün məhsulları,
    // heç bir kateqoriyaya görə filtrləmədən göstərir
    const bannerTitle = slug === "all" ? "All Products" : getBannerTitle(slug);
    const groups = filtersConfig[slug] || [];

    // Bu kateqoriyaya aid məhsulları seçirik
    const categoryName = categoryMap[slug] || slug.split("-").join(" ").toUpperCase();

    // Sale səhifəsi başqa cürdür - kateqoriyaya yox, endirimli olub-olmamasına baxır
    // Bags səhifəsinin "Shop All" hissəsi isə 3 kateqoriyanı birləşdirir (CITY, EVERYDAY, OUTDOOR)
    // "all" bütün kateqoriyaları, heç bir filtrasiya olmadan göstərir
    // Qalan hər şey ya "category", ya "subCategory", ya da "bagType" sahəsinə görə tapılır
    function isOnSale(item) {
        if (item.isSale === true) return true;
        return (item.variants || []).some((v) => Boolean(v.salePrice));
    }

    let products;
    if (slug === "all") {
        products = mehsul;
    } else if (slug === "sale") {
        products = mehsul.filter(isOnSale);
    } else if (slug === "bags") {
        products = mehsul.filter((item) => bagsShopAllCategories.includes(item.category));
    } else {
        products = mehsul.filter(
            (item) =>
                item.category === categoryName ||
                item.subCategory === categoryName ||
                (item.bagType && item.bagType.toUpperCase() === categoryName)
        );
    }

    // Qiymətin ilk hissəsini rəqəmə çevirir ("$179.95 - $199.95" -> 179.95)
    // Variantlı məhsullarda üstdə "price" olmur, o zaman ilk variantın qiymətinə baxırıq
    function getFirstPrice(item) {
        const priceText = item.price || item.variants?.[0]?.price || "$0";
        const price = priceText.replace("$", "").split(" - ")[0];
        return parseFloat(price) || 0;
    }

    // Filter seçmək / silmək
    function toggleValue(groupKey, value) {
        setSelectedFilters((prev) => {
            const oldValues = prev[groupKey] || [];
            const isSelected = oldValues.includes(value);

            const newValues = isSelected
                ? oldValues.filter((item) => item !== value)
                : [...oldValues, value];

            return { ...prev, [groupKey]: newValues };
        });
    }

    function handleFilterClick(groupKey) {
        setOpenFilter(openFilter === groupKey ? null : groupKey);
    }

    // Məhsulları seçilmiş filterlərə görə süzürük
    let filteredProducts = products;
    Object.keys(selectedFilters).forEach((groupKey) => {
        const values = selectedFilters[groupKey];
        if (values && values.length > 0) {
            filteredProducts = filteredProducts.filter((item) => values.includes(item[groupKey]));
        }
    });

    if (onlySale) {
        filteredProducts = filteredProducts.filter(isOnSale);
    }

    // Qiymətə görə sıralama
    let sortedProducts = [...filteredProducts];
    if (sortBy === "priceLow") {
        sortedProducts.sort((a, b) => getFirstPrice(a) - getFirstPrice(b));
    }
    if (sortBy === "priceHigh") {
        sortedProducts.sort((a, b) => getFirstPrice(b) - getFirstPrice(a));
    }

    // Seçilmiş filterlərin ümumi sayı
    let totalSelected = 0;
    Object.keys(selectedFilters).forEach((groupKey) => {
        totalSelected += selectedFilters[groupKey].length;
    });

    return (
        <div>
            {/* Banner */}
            <section className="relative h-[400px] sm:h-[450px] w-full overflow-hidden bg-gray-900">
                {bannerImages[slug] ? (
                    <img src={bannerImages[slug]} alt="" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800" />
                )}
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10 h-full flex flex-col justify-end px-6 sm:px-10 md:px-16 pb-10 text-white">
                    <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-bold uppercase leading-none">
                        {bannerTitle}
                    </h1>
                </div>
            </section>

            {/* Filter sətri */}
            <div className="border-b border-gray-200">
                <div className="flex flex-wrap items-center gap-3 px-6 sm:px-10 md:px-16 py-5 text-[13px] uppercase">
                    <span className="border border-gray-300 rounded-full px-4 py-2">
                        Filters ({totalSelected})
                    </span>

                    {groups.map((group) => (
                        <button
                            key={group.key}
                            onClick={() => handleFilterClick(group.key)}
                            className="border border-gray-300 rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer"
                        >
                            {group.label}
                            {openFilter === group.key ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </button>
                    ))}

                    <button
                        onClick={() => setOnlySale(!onlySale)}
                        className={`rounded-full px-4 py-2 border transition-colors cursor-pointer ${
                            onlySale ? "bg-green-600 text-white border-green-600" : "border-gray-300"
                        }`}
                    >
                        Sale
                    </button>

                    <div className="ml-auto flex items-center gap-4">
                        <span className="text-gray-500 normal-case">{sortedProducts.length} items</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-300 rounded-full px-4 py-2 cursor-pointer"
                        >
                            <option value="featured">Featured</option>
                            <option value="priceLow">Price: Low to High</option>
                            <option value="priceHigh">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Açılan filter paneli */}
                {groups.map((group) => {
                    if (openFilter !== group.key) return null;
                    const selectedInGroup = selectedFilters[group.key] || [];

                    return (
                        <div key={group.key} className="px-6 sm:px-10 md:px-16 py-6 border-t border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {group.options.map((option) => (
                                <label key={option} className="flex items-center gap-2 text-[15px] cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedInGroup.includes(option)}
                                        onChange={() => toggleValue(group.key, option)}
                                        className="cursor-pointer"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    );
                })}
            </div>

            {/* Məhsullar */}
            <section className="px-6 sm:px-10 md:px-16 py-12">
                {mehsul.length === 0 && (
                    <p className="text-center text-gray-400 py-16">Yüklənir...</p>
                )}

                {mehsul.length > 0 && sortedProducts.length === 0 && (
                    <p className="text-center text-gray-400 py-16">Bu kateqoriyada hələ məhsul yoxdur</p>
                )}

                {mehsul.length > 0 && sortedProducts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {sortedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default CollectionPage;