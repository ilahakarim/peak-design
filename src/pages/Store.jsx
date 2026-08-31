// pages/Store.jsx
// Footer-dəki SF | LA | NY | PDX | TK | CZ linklərinin açdığı səhifə.
// Sadəlik üçün mağaza məlumatları burada sabit (hardcoded) saxlanılır.
import { useParams, Link } from "react-router";

const stores = {
  sf: { name: "San Francisco", address: "529 Hayes St, San Francisco, CA 94102" },
  la: { name: "Los Angeles", address: "8250 Beverly Blvd, Los Angeles, CA 90048" },
  ny: { name: "New York", address: "62 Greene St, New York, NY 10012" },
  pdx: { name: "Portland", address: "421 SW 10th Ave, Portland, OR 97205" },
  tk: { name: "Tokyo", address: "3 Chome, Shibuya, Tokyo, Japan" },
  cz: { name: "Christchurch", address: "123 Cashel St, Christchurch, New Zealand" },
};

function Store() {
  const { slug } = useParams();
  const store = stores[slug];

  if (!store) {
    return <p className="text-center py-24 text-gray-400">Mağaza tapılmadı</p>;
  }

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(store.address)}&output=embed`;

  return (
    <div>
      {/* Hero - şəkli özün /image/store/ altına qoyub buradan dəyiş */}
      <section className="relative h-screen w-full overflow-hidden bg-gray-900">
        <img
          src={`/image/store/${slug}.webp`}
          alt={store.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <p className="uppercase text-[13px] tracking-[0.25em]">Peak Design</p>
          <h1 className="text-[48px] sm:text-[72px] lg:text-[88px] font-serif mt-3 leading-none">
            {store.name}
          </h1>
          <p className="mt-5 text-[15px] sm:text-[16px] text-white/85">{store.address}</p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-9">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black uppercase text-[13px] font-semibold tracking-wide px-8 py-4 hover:bg-gray-200 transition-colors"
            >
              Get Directions
            </a>
            <button
              className="bg-white text-black uppercase text-[13px] font-semibold tracking-wide px-8 py-4 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              See Store Events
            </button>
          </div>
        </div>
      </section>

      {/* Xəritə - bütün ekranı tutan böyük xəritə */}
      <section className="w-full h-screen">
        <iframe
          title={`${store.name} map`}
          src={mapUrl}
          className="w-full h-full border-0"
          loading="lazy"
        ></iframe>
      </section>

      {/* Alt CTA */}
      <section className="px-6 sm:px-10 md:px-16 py-14 sm:py-16 text-center border-t border-gray-100">
        <h2 className="text-[26px] sm:text-[34px] font-serif">Come say hello.</h2>
        <p className="text-[15px] text-gray-500 mt-3 max-w-md mx-auto">
          Try the gear in person before you buy, or just come hang out.
        </p>
        <Link
          to="/collections/all"
          className="inline-block mt-7 uppercase text-[13px] font-medium bg-black text-white px-8 py-3.5 hover:bg-gray-800 transition-colors"
        >
          Shop All Products
        </Link>
      </section>
    </div>
  );
}

export default Store;