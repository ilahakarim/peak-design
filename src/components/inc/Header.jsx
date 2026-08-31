import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import logo from "../../assets/home-logo.png"
import Cart from './Cart';
import { DATA } from '../../Context/Context';

// Desktop: full-width menu that opens when you hover a category
function MegaMenu({ category, isOpen }) {
  if (!category) return null;

  return (

    <div className={`absolute left-0 top-full w-full border-t border-slate-200 bg-white shadow-lg transition-opacity duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
      <div className="max-w-[1800px] mx-auto px-8 py-10 grid grid-cols-3 gap-x-4 gap-y-8 md:grid-cols-4 lg:grid-cols-6">
        {category.items?.map((item) => (
          <Link key={item.label} to={item.href} className="group/card relative flex aspect-[3/4] items-end justify-center overflow-hidden rounded-md border border-slate-200">
            {item.image ? (
              <img src={item.image} alt="" className="absolute inset-0 h-[200px] w-full object-cover transition-transform duration-300 group-hover/card:scale-110" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                <svg className="size-8 stroke-slate-300" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
                  <circle cx="9" cy="9" r="2" strokeWidth="1.5" />
                  <path d="M21 15l-5-5-9 9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="relative z-10 pb-4 px-3 text-center text-sm font-semibold uppercase tracking-wide text-white">{item.label}</span>
          </Link>
        ))}

        <Link to={category.href} className="group/card relative flex aspect-[3/4] items-end justify-center overflow-hidden rounded-md border border-slate-200">
          {category.shopAllImage && <img src={category.shopAllImage} alt="" className="absolute inset-0 h-full w-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="relative z-10 pb-4 px-4 text-center text-base font-semibold uppercase text-white">{category.shopAllLabel}</span>
        </Link>
      </div>
    </div>
  );
}

// Mobile: accordion list that opens when you tap a category
function MobileAccordionItem({ category, isOpen, onToggle, onNavigate }) {
  const hasItems = category.items && category.items.length > 0;

  if (!hasItems) {
    return (
      <Link
        to={category.href}
        onClick={onNavigate}
        className="flex items-center justify-between py-4 text-base font-light"
      >
        {category.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-base font-light text-left cursor-pointer"
      >
        {category.label}
        <svg
          className={`size-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[1000px]" : "max-h-0"}`}>
        <div className="flex flex-col gap-1 pb-3">
          {category.items.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 py-2 pl-2 text-sm text-slate-600"
            >
              {item.image && (
                <img src={item.image} alt="" className="w-10 h-10 rounded object-cover shrink-0" />
              )}
              {item.label}
            </Link>
          ))}

          <Link
            to={category.href}
            onClick={onNavigate}
            className="py-2 pl-2 text-sm font-medium underline"
          >
            {category.shopAllLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}


function Header() {
  const { cart, wishlist } = useContext(DATA);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null); // desktop hover
  const closeMenuTimer = useRef(null);

  function cancelCloseMenu() {
    if (closeMenuTimer.current) {
      clearTimeout(closeMenuTimer.current);
      closeMenuTimer.current = null;
    }
  }

  function scheduleCloseMenu() {
    cancelCloseMenu();
    closeMenuTimer.current = setTimeout(() => setOpenCategory(null), 200);
  }

  useEffect(() => {
    return () => cancelCloseMenu();
  }, []);

  const [openMobileCategory, setOpenMobileCategory] = useState(null); // mobile accordion
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadNav() {
      const res = await fetch('https://api-vercel-master.onrender.com/api/navigation');
      const data = await res.json();
      setNavItems(data);
      setLoading(false);
    }
    loadNav();
  }, []);

  const activeCategory = navItems.find((category) => category.label === openCategory);

  function toggleMobileCategory(label) {
    setOpenMobileCategory((prev) => (prev === label ? null : label));
  }

  function closeMobileMenu() {
    setIsMenuOpen(false);
    setOpenMobileCategory(null);
  }

  // Send the shopper to the search results page for whatever they typed
  function handleSearchSubmit(e) {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    navigate(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="px-8 py-2.5 bg-black">
        <div className="max-w-7xl mx-auto flex items-center justify-center lg:justify-between uppercase text-white text-xs">
          <Link to="/mission" className="hidden lg:flex tracking-widest gap-[5px]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6.7998 1V9.20021" stroke="white" strokeMiterlimit="10" />
              <path d="M15 9.2002H6.7998" stroke="white" strokeMiterlimit="10" />
              <path d="M12.5996 15L6.7998 9.2002" stroke="white" strokeMiterlimit="10" />
              <path d="M6.79978 9.20017L1 3.40039" stroke="white" strokeMiterlimit="10" />
              <path d="M6.7998 9.20017L12.5996 3.40039" stroke="white" strokeMiterlimit="10" />
            </svg>
            Our Mission
          </Link>

          <p className="tracking-wide">FAST SHIPPING • LIFETIME WARRANTY • 30-DAY RETURNS</p>

          <Link to="/store" className="hidden lg:flex tracking-wide gap-[5px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f7f7f7" viewBox="0 0 256 256">
              <path d="M200,224H150.54A266.56,266.56,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25a88,88,0,0,0-176,0c0,31.4,14.51,64.68,42,96.25A266.56,266.56,0,0,0,105.46,224H56a8,8,0,0,0,0,16H200a8,8,0,0,0,0-16ZM56,104a72,72,0,0,1,144,0c0,57.23-55.47,105-72,118C111.47,209,56,161.23,56,104Zm112,0a40,40,0,0,0-40-40A40,40,0,0,0,168,104Zm-64,0a24,24,0,1,1,24,24A24,24,0,0,1,104,104Z" />
            </svg>
            Find A Store
          </Link>
        </div>
      </div>

      <nav className="flex py-2 px-4 md:px-8 bg-white min-h-[68px] relative z-20">
        <div className="max-w-[1800px] m-auto flex items-center justify-between md:gap-4 w-full">

          <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu" className="lg:hidden cursor-pointer">
            <svg className="size-7 fill-slate-900" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>

          <Link to="/" className="min-w-9">
            <img src={logo} alt="logo" className="h-9 w-auto" />
          </Link>

          <div
            className={`${isMenuOpen ? "block" : "hidden"} lg:block max-lg:bg-white max-lg:w-1/2 max-lg:fixed max-lg:top-0 max-lg:right-0 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto max-sm:w-full z-50`}
          >
            <div className="py-2 px-4 flex justify-between items-center border-b lg:hidden">
              <button onClick={closeMobileMenu} aria-label="Close menu" className="cursor-pointer">
                <svg className="size-4 fill-slate-900" viewBox="0 0 329.269 329">
                  <path d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.27 21.27 0 0 0 15.082-6.25c8.343-8.34 8.343-21.824 0-30.164z" />
                </svg>
              </button>
            </div>

            {/* Mobile: accordion list */}
            <ul className="flex flex-col gap-0 font-semibold text-sm lg:hidden max-lg:p-6">
              {loading && <li className="py-6 text-slate-400">Loading menu…</li>}

              {navItems.map((category) => (
                <li key={category.label} className="border-b border-slate-100 last:border-0">
                  <MobileAccordionItem
                    category={category}
                    isOpen={openMobileCategory === category.label}
                    onToggle={() => toggleMobileCategory(category.label)}
                    onNavigate={closeMobileMenu}
                  />
                </li>
              ))}
            </ul>

            {/* Desktop: menu that opens on hover */}
            <ul className="hidden lg:flex gap-8 font-semibold text-sm">
              {loading && <li className="py-6 text-slate-400">Loading menu…</li>}

              {navItems.map((category) => (
                <li
                  key={category.label}
                  onMouseEnter={() => {
                    cancelCloseMenu();
                    if (category.label === "Wallets" || category.label === "Sale") {
                      setOpenCategory(null);
                    } else {
                      setOpenCategory(category.label);
                    }
                  }}
                  onMouseLeave={scheduleCloseMenu}
                >
                  <Link
                    to={category.href}
                    className="flex h-full items-center py-6 text-base font-light border-b-2 border-transparent hover:border-black hover:font-medium"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div onMouseEnter={cancelCloseMenu} onMouseLeave={scheduleCloseMenu}>
              <MegaMenu category={activeCategory} isOpen={!!activeCategory} />
            </div>
          </div>

          <div className="flex items-center gap-6">
  <form onSubmit={handleSearchSubmit} className="hidden md:block md:w-[450px] lg:w-[clamp(300px,26vw,600px)]" role="search">
    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-white outline outline-slate-300">
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="text-sm w-full outline-none"
      />
      <button type="submit" aria-label="Search" className="ml-auto shrink-0 cursor-pointer">
        <svg viewBox="0 0 192.904 192.904" className="size-4 fill-slate-400">
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
        </svg>
      </button>
    </div>
  </form>

  <Link to="/login" className="flex items-center py-6 border-b-2 border-transparent hover:border-black">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 21C4 16.58 7.58 13 12 13C16.42 13 20 16.58 20 21"stroke="currentColor"strokeWidth="1.8"strokeLinecap="round"
      />
    </svg>
  </Link>

  <Link to="/wishlist" className="relative flex items-center py-6 border-b-2 border-transparent hover:border-black">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s-6.7-4.35-9-8.28C.87 9.08 3.15 4.5 7.5 4.5c2.08 0 3.55 1.1 4.5 2.4.95-1.3 2.42-2.4 4.5-2.4 4.35 0 6.63 4.58 4.5 8.22C18.7 16.65 12 21 12 21Z"stroke="currentColor"strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"
      />
    </svg>

    {wishlistCount > 0 && (
      <span className="absolute top-3 right-[-6px] bg-black text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
        {wishlistCount}
      </span>
    )}
  </Link>


<button onClick={() => setIsCartOpen(true)} aria-label="Open cart" className="relative flex items-center py-6 border-b-2 border-transparent hover:border-black cursor-pointer">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M5 6H7L9 17H19L21 9H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="20" r="1.2" fill="currentColor" />
    <circle cx="17" cy="20" r="1.2" fill="currentColor" />
  </svg>

  {cartCount > 0 && (
    <span className="absolute top-3 right-[-6px] bg-black text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
      {cartCount}
    </span>
  )}
</button>
</div>
        </div>
      </nav>
   
<Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}

export default Header;