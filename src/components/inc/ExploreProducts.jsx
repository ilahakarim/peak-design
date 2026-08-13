import { Link } from "react-router";

const exploreItems = [
    { label: "Travel", slug: "travel", image:"Featured-Travel.webp"},
    { label: "Packing Cubes", slug: "packing-cubes",image:"Featured-Packing-Cubes.webp" },
    { label: "Outdoor", slug: "outdoor",image:"Featured-Outdoor.webp" },
    { label: "Phone Cases", slug: "phone-cases",image:"Featured-Phone-Cases.webp" },
    { label: "Wallets", slug: "wallets" ,image:"Featured-Travel.webp"},
    { label: "Motorcycle", slug: "motorcycle",image:"Featured-Moto.webp" },
    { label: "Straps", slug: "straps" ,image:"Featured-Straps.webp"},
    { label: "Clips", slug: "clips" ,image:"Featured-Clips.webp"},
    { label: "Tripods", slug: "tripods",image:"Featured-Tripods.webp" },
];

const ExploreProducts = () => {
    return (
        <section className="px-6 md:px-12 lg:px-16 pt-12 sm:pt-16 m-auto pb-0">
            <h2 className="text-[28px] sm:text-[36px] lg:text-[48px] font-serif flex items-center gap-4 mb-8 sm:mb-10">
                Explore our products
                <span className="inline-block w-14 sm:w-20 lg:w-24 border-t border-black"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {exploreItems.map((item) => (
                    <Link
                        key={item.slug}
                        to={`/collections/${item.slug}`}
                        className="group relative aspect-[4/3] overflow-hidden rounded-sm block"
                    >
                        <img
                            src={`/image/explore/${item.image}`}
                            alt={item.label}
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                        <span className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 text-white uppercase text-[20px] sm:text-[24px] lg:text-[28px] font-medium tracking-wide">
                            {item.label}
                        </span>

                        <span className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ExploreProducts;