// pages/InfoPage.jsx
// Footer-dəki bütün "About / Support / Contact" linklərinin açdığı ümumi səhifə.
// Hər link öz "slug"-una görə aşağıdakı "pages" obyektindən məlumat götürür.
import { useParams, Link } from "react-router";

const pages = {
  "careers": {
    title: "Careers",
    tagline: "[ Join the team ]",
    image: "/image/promo/factory.webp",
    text: "We're always looking for people who care about good design and doing things the right way. Explore open roles across design, engineering, and operations.",
  },
  "retail-store": {
    title: "Find a Retail Store",
    tagline: "[ Shop in person ]",
    image: "/image/promo/retailer.webp",
    text: "Get hands-on with our gear at a retailer near you. Use the store locator in the footer to find your closest location.",
  },
  "taking-action": {
    title: "Taking Action",
    tagline: "[ Fair Trade + Sustainability ]",
    image: "/image/promo/factory.webp",
    text: "Every bag we make is Fair Trade certified. We're committed to fair wages, safe working conditions, and reducing our environmental footprint.",
  },
  "field-notes": {
    title: "Field Notes",
    tagline: "[ Stories from the field ]",
    image: "/image/city-line/person-walking.webp",
    text: "Real stories from photographers, travelers, and everyday adventurers who put our gear to the test.",
  },
  "ambassadors": {
    title: "Ambassadors",
    tagline: "[ Meet the crew ]",
    image: "/image/city-line/person-walking1.webp",
    text: "Meet the photographers and creators who represent Peak Design around the world.",
  },
  "collaborate": {
    title: "Collaborate With Us",
    tagline: "[ Let's build something ]",
    image: "/image/city-line/person-walking2.webp",
    text: "Have an idea for a collaboration? We'd love to hear from you — reach out and tell us more.",
  },
  "become-dealer": {
    title: "Become a Dealer",
    tagline: "[ Partner with us ]",
    image: "/image/promo/retailer.webp",
    text: "Interested in carrying Peak Design gear in your store? Apply to become an authorized dealer.",
  },
  "find-your-peak": {
    title: "#FindYourPeak",
    tagline: "[ Share your adventure ]",
    image: "/image/city-line/collage.webp",
    text: "Tag your photos with #FindYourPeak to be featured on our channels.",
  },
  "support-center": {
    title: "Support Center",
    tagline: "[ We're here to help ]",
    image: "/image/promo/factory.webp",
    text: "Browse FAQs, warranty info, and guides — or reach out to our support team directly.",
  },
  "track-order": {
    title: "Track Your Order",
    tagline: "[ Where's my package? ]",
    image: "/image/promo/retailer.webp",
    text: "Enter your order number and email from your confirmation email to see the latest shipping status.",
  },
  "returns": {
    title: "Returns",
    tagline: "[ 30-day returns ]",
    image: "/image/promo/factory.webp",
    text: "Not the right fit? Return any unused product within 30 days for a full refund.",
  },
  "shipping": {
    title: "Shipping",
    tagline: "[ Fast, worldwide ]",
    image: "/image/promo/retailer.webp",
    text: "We ship worldwide. Most orders arrive within 3–7 business days depending on your location.",
  },
  "warranty": {
    title: "Lifetime Warranty",
    tagline: "[ Built to last ]",
    image: "/image/promo/factory.webp",
    text: "Every product we make is backed by our lifetime warranty against manufacturing defects.",
  },
  "product-registration": {
    title: "Product Registration",
    tagline: "[ Register your gear ]",
    image: "/image/promo/retailer.webp",
    text: "Register your product to activate your warranty and stay updated on care tips.",
  },
  "corporate-sales": {
    title: "Corporate Sales",
    tagline: "[ Gear up your team ]",
    image: "/image/promo/factory.webp",
    text: "Outfitting a team or event? Contact us for bulk pricing and custom branding options.",
  },
  "privacy-policy": {
    title: "Privacy Policy",
    tagline: "[ Your data, protected ]",
    image: "/image/promo/factory.webp",
    text: "We respect your privacy. We only collect the information needed to process orders and improve your experience.",
  },
  "terms-of-service": {
    title: "Terms of Service",
    tagline: "[ The fine print ]",
    image: "/image/promo/retailer.webp",
    text: "By using our site, you agree to our terms — fair use, accurate info, and respecting our content and trademarks.",
  },
};

function InfoPage() {
  const { slug } = useParams();
  const page = pages[slug];

  if (!page) {
    return <p className="text-center py-24 text-gray-400">Page not found</p>;
  }

  return (
    <div>
      <section className="relative h-[400px] sm:h-[480px] w-full overflow-hidden bg-gray-900">
        <img src={page.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <p className="uppercase text-[13px] tracking-widest">{page.tagline}</p>
          <h1 className="text-[36px] sm:text-[52px] font-serif mt-3">{page.title}</h1>
        </div>
      </section>

      <section className="px-6 sm:px-10 md:px-16 py-14 sm:py-16 max-w-2xl mx-auto text-center">
        <p className="text-[16px] text-gray-600 leading-relaxed">{page.text}</p>

        <Link
          to="/collections/all"
          className="inline-block mt-8 uppercase text-[13px] font-medium bg-black text-white px-8 py-3.5 hover:bg-gray-800 transition-colors"
        >
          Shop All Products
        </Link>
      </section>
    </div>
  );
}

export default InfoPage;