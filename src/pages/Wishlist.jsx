// pages/Wishlist.jsx
import { useContext } from "react";
import { Link } from "react-router";
import ProductCard from "../components/inc/ProductCard";
import { DATA } from "../Context/Context";

function Wishlist() {
    const { mehsul = [], wishlist = [] } = useContext(DATA);

    const favProducts = mehsul.filter((item) => wishlist.includes(item.id));

    return (
        <div className="px-6 sm:px-10 md:px-16 py-12">
            <h1 className="text-[28px] sm:text-[36px] font-serif mb-8">Sevimlilər</h1>

            {favProducts.length === 0 ? (
                <div className="text-center py-24">
                    <p className="text-gray-500 font-light mb-4">Sevimlilər siyahınız boşdur.</p>
                    <Link to="/" className="underline font-light">Alış-verişə davam et</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {favProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Wishlist;