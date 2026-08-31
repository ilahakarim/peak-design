// pages/CityLine.jsx
// "Learn more" düyməsinin apardığı hekayə səhifəsi.
// Mövcud şəkillərdən (hero-bg, city-line qovluğu) istifadə edir ki, boş görünməsin.
import { Link } from "react-router";
import heroBg from "../assets/hero-bg.webp";

const highlights = [
    {
        tagline: "[ LIGHTWEIGHT ]",
        heading: "Barely there, always ready.",
        description:
            "City Line trades bulk for a soft-shell, unstructured build — so it moves with you instead of against you.",
        image: "/image/city-line/person-walking.webp",
    },
    {
        tagline: "[ ORGANIZED ]",
        heading: "A place for everything.",
        description:
            "Dedicated laptop sleeves, quick-access pockets, and a clean interior layout keep daily essentials sorted without adding weight.",
        image: "/image/city-line/person-walking1.webp",
    },
    {
        tagline: "[ REFINED ]",
        heading: "Matte outside. Considered inside.",
        description:
            "A muted, technical finish available in three exclusive colorways — Eclipse, Lapis, and Stone — built to look as good in the studio as on the street.",
        image: "/image/city-line/person-walking2.webp",
    },
];

function CityLine() {
    return (
        <div>
            {/* Hero */}
            <section className="relative min-h-[480px] lg:h-[560px] overflow-hidden flex items-center justify-center text-center px-6">
                <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/45" />
                <div className="relative text-[#EBFFA8] max-w-2xl">
                    <p className="text-[12px] sm:text-[14px] font-light uppercase tracking-widest">
                        [ The story behind ]
                    </p>
                    <h1
                        style={{ fontFamily: "Bryant" }}
                        className="text-[40px] sm:text-[56px] lg:text-[72px] font-bold leading-[0.9] mt-4"
                    >
                        <i>City Line</i>
                    </h1>
                    <p className="font-light text-[15px] sm:text-[17px] mt-6">
                        Six new lightweight, unstructured bags. Refined and matte on the outside,
                        thoughtfully organized within.
                    </p>
                    <Link
                        to="/collections/city"
                        className="inline-block mt-8 uppercase text-[12px] sm:text-[13px] font-medium bg-[#EBFFA8] text-black px-8 py-3.5 hover:bg-[#DDF87E] transition-colors"
                    >
                        Shop City Line
                    </Link>
                </div>
            </section>

            {/* Feature blocks */}
            {highlights.map((item, i) => (
                <section
                    key={item.heading}
                    className={`flex flex-col ${
                        i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                    } w-full overflow-hidden`}
                >
                    <div className="relative w-full md:w-1/2 h-[350px] sm:h-[450px] md:h-[520px] shrink-0 overflow-hidden">
                        <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="bg-[#EEF1F0] w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-16 py-14 md:py-0">
                        <p className="text-[12px] sm:text-[13px] uppercase tracking-widest text-gray-600">
                            {item.tagline}
                        </p>
                        <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-serif leading-[1.05] mt-4">
                            {item.heading}
                        </h2>
                        <p className="text-[15px] sm:text-[16px] text-gray-600 mt-5 max-w-md">
                            {item.description}
                        </p>
                    </div>
                </section>
            ))}

            {/* Closing CTA */}
            <section className="bg-black text-white px-6 sm:px-10 md:px-16 py-16 sm:py-20 text-center">
                <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-serif">
                    Ready to travel lighter?
                </h2>
                <p className="text-[15px] sm:text-[16px] text-white/70 mt-4 max-w-xl mx-auto">
                    Explore the full City Line collection — six bags, three colorways, endless everyday use.
                </p>
                <Link
                    to="/collections/city"
                    className="inline-block mt-8 uppercase text-[12px] sm:text-[13px] font-medium border border-white px-8 py-3.5 hover:bg-white hover:text-black transition-colors"
                >
                    Shop the collection
                </Link>
            </section>
        </div>
    );
}

export default CityLine;