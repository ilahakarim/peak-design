import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import ProductCard from "../components/inc/ProductCard";

const API_URL = "https://6a77021263e9caf860c33e8d.mockapi.io/products";

const slugToCategory = {
    travel: "TRAVEL",
    "packing-cubes": "TRAVEL",     
    outdoor: "OUTDOOR",
    "phone-cases": "MOBILE",         
    wallets: "WALLETS",
    motorcycle: "MOTO",            
    straps: "CAMERA GEAR",         
    clips: "CAMERA GEAR",         
    tripods: "CAMERA GEAR",       
};

const CollectionPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                const targetCategory = slugToCategory[category] || category.toUpperCase();
                setProducts(data.filter((p) => p.category === targetCategory));
                setLoading(false);
            });
    }, [category]);

    const pageTitle = category
        ?.split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    return (
        <section className="px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
            <Link to="/" className="text-sm text-gray-500 hover:text-black">
                ← Back to Home
            </Link>

            <h1 className="text-[32px] sm:text-[44px] lg:text-[56px] font-serif mt-4 mb-8 sm:mb-10">
                {pageTitle}
            </h1>

            {loading ? (
                <p className="text-center text-gray-400 py-16">Yüklənir...</p>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-400 py-16">
                    Bu kateqoriyada hələ məhsul yoxdur
                </p>
            )}
        </section>
    );
};

export default CollectionPage;