// pages/SearchResults.jsx
//
// Opens at /search?q=... after someone submits the header search box.
import { useContext, useMemo } from "react";
import { useSearchParams } from "react-router";
import ProductCard from "../components/Home/ProductCard";
import { DATA } from "../Context/Context";

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = (searchParams.get("q") || "").trim().toLowerCase();
    const { mehsul: allProducts = [] } = useContext(DATA);

    const results = useMemo(() => {
        if (!query) return [];
        return allProducts.filter(
            (p) =>
                p.title?.toLowerCase().includes(query) ||
                p.category?.toLowerCase().includes(query)
        );
    }, [allProducts, query]);

    return (
        <section className="px-6 sm:px-10 md:px-12 lg:px-16 py-12 sm:py-16">
            <h1 className="text-[24px] sm:text-[32px] font-serif">
                {results.length > 0 ? `Search results for "${query}"` : `No results for "${query}"`}
            </h1>

            {results.length === 0 && (
                <p className="text-gray-500 mt-4">Try a different search term or browse our collections.</p>
            )}

            {results.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-10">
                    {results.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default SearchResults;