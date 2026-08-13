import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import logo from "../../assets/home-logo.png"

function MegaMenu({ category, isOpen }) {
   return (
      <div
         className={`absolute left-0 top-full w-full origin-top border-t border-slate-200 bg-white shadow-lg transition-all duration-200 ${
            isOpen
               ? 'opacity-100 scale-y-100 pointer-events-auto'
               : 'opacity-0 scale-y-95 pointer-events-none'
         }`}
      >
         <div className="max-w-[1800px] mx-auto px-8 py-10">
            <div className="grid grid-cols-3 gap-x-4 gap-y-8 md:grid-cols-4 lg:grid-cols-6">
               {(category.items ?? []).map((item) => (
   <a key={item.label} href={item.href} className="group/card relative flex aspect-[3/4] w-full items-end justify-center overflow-hidden rounded-md border border-slate-200">
      {item.image ? (
         <img
            src={item.image}
            alt=""
            className="absolute inset-0 h-[200px] w-full object-cover transition-transform duration-300 group-hover/card:scale-110"
         />
      ) : (
         <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
            <svg
               className="size-8 stroke-slate-300"
               viewBox="0 0 24 24"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
               <circle cx="9" cy="9" r="2" strokeWidth="1.5" />
               <path d="M21 15l-5-5-9 9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
         </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover/card:from-black/85" />
      <span className="relative z-10 pb-4 px-3 text-center font-[Geist,Geist_Fallback,sans-serif] text-sm font-semibold uppercase tracking-wide text-white">
         {item.label}
      </span>
   </a>
))}

               <a
                  href={category.href}
   className="group/card relative col-span-2 row-span-1 flex aspect-[3/4] items-end justify-center overflow-hidden rounded-md border border-slate-200 sm:col-span-1"
>
   {category.shopAllImage && (
      <img
         src={category.shopAllImage}
         alt=""
         className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-110"
      />
   )}
   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover/card:from-black/85" />
   <span className="relative z-10 pb-4 px-4 text-center font-[Geist,Geist_Fallback,sans-serif] text-base font-semibold uppercase leading-tight text-white">
      {category.shopAllLabel}
   </span>
</a>
            </div>
         </div>
      </div>
   );
}

function Header() {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const lastFocusedElementRef = useRef(null);

   const [navItems, setNavItems] = useState([]);
   const [isNavLoading, setIsNavLoading] = useState(true);
   const [navError, setNavError] = useState(null);

   useEffect(() => {
      let isCancelled = false;

      const loadNavItems = async () => {
         try {
            setIsNavLoading(true);
            setNavError(null);

            const response = await fetch('https://6a6e506da7e173d95e4518dd.mockapi.io/navigation');

            if (!response.ok) {
               throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();

            if (!isCancelled) {
               setNavItems(data);
            }
         } catch (error) {
            if (!isCancelled) {
               setNavError(error);
            }
         } finally {
            if (!isCancelled) {
               setIsNavLoading(false);
            }
         }
      };

      loadNavItems();

      return () => {
         isCancelled = true;
      };
   }, []);

   const [openCategory, setOpenCategory] = useState(null);
   const closeTimeoutRef = useRef(null);

   const openCategoryMenu = (label) => {
      if (closeTimeoutRef.current) {
         clearTimeout(closeTimeoutRef.current);
         closeTimeoutRef.current = null;
      }
      setOpenCategory(label);
   };

   const scheduleCloseCategoryMenu = () => {
      closeTimeoutRef.current = setTimeout(() => {
         setOpenCategory(null);
      }, 200);
   };

   useEffect(() => {
      return () => {
         if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
         }
      };
   }, []);

   const openMenu = () => {
      lastFocusedElementRef.current = document.activeElement;
      setIsMenuOpen(true);
      setTimeout(() => {
         menuRef.current?.focus();
      }, 0);
   };

   const closeMenu = () => {
      setIsMenuOpen(false);

      setTimeout(() => {
         lastFocusedElementRef.current?.focus();
      }, 0);
   };

   useEffect(() => {
      const handleEscapeKey = (e) => {
         if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
         }
      };

      document.addEventListener('keydown', handleEscapeKey);

      return () => {
         document.removeEventListener('keydown', handleEscapeKey);
      };
   }, [isMenuOpen]);
  
  return (
    <>
       <header className="sticky top-0 z-50">
         <div className="px-8 py-2.5 bg-black">
            <div className="max-w-7xl mx-auto flex items-center justify-center lg:justify-between uppercase text-white text-xs">

              <Link to="/mission"className="hidden lg:flex tracking-widest relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full flex gap-[5px]"> 
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.7998 1V9.20021" stroke="white" strokeMiterlimit="10"></path>
                <path d="M15 9.2002H6.7998" stroke="white" strokeMiterlimit="10"></path>
                <path d="M12.5996 15L6.7998 9.2002" stroke="white" strokeMiterlimit="10"></path>
                <path d="M6.79978 9.20017L1 3.40039" stroke="white" strokeMiterlimit="10"></path>
                <path d="M12.5996 15L6.7998 9.2002" stroke="white" strokeMiterlimit="10"></path>
                <path d="M6.79978 9.20017L1 3.40039" stroke="white" strokeMiterlimit="10"></path>
                <path d="M6.7998 9.20017L12.5996 3.40039" stroke="white" strokeMiterlimit="10"></path>
              </svg>Our Mission
              </Link>

               <p className="tracking-wide">
                FAST SHIPPING • LIFETIME WARRANTY • 30-DAY RETURNS
               </p>

               <Link to="/store" className="hidden lg:flex tracking-wide relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full flex gap-[5px]">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f7f7f7" viewBox="0 0 256 256"><path d="M200,224H150.54A266.56,266.56,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25a88,88,0,0,0-176,0c0,31.4,14.51,64.68,42,96.25A266.56,266.56,0,0,0,105.46,224H56a8,8,0,0,0,0,16H200a8,8,0,0,0,0-16ZM56,104a72,72,0,0,1,144,0c0,57.23-55.47,105-72,118C111.47,209,56,161.23,56,104Zm112,0a40,40,0,0,0-40-40A40,40,0,0,0,168,104Zm-64,0a24,24,0,1,1,24,24A24,24,0,0,1,104,104Z"></path>
               </svg>
               Find A Store
               </Link>

            </div>
         </div>
          <nav className="flex py-2 px-4 md:px-8 bg-white border-slate-300 min-h-[68px] relative z-20" aria-label="Main navigation">
            <div className="max-w-[1800px] m-auto flex items-center justify-between md:gap-4 w-full">
              <div className="flex items-center gap-3 lg:hidden">
                <button type="button"aria-controls="collapseMenu" aria-expanded={isMenuOpen} aria-haspopup="true"id="toggleOpen"
                      onClick={openMenu} className="cursor-pointer lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                      <svg className="size-7 fill-slate-900" aria-hidden="true" viewBox="0 0 20 20"xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                      </svg>
                </button>
                <button className="p-2.5 rounded-md md:hidden lg:hidden justify-self-start">
                          <svg className="_icon_rlv6z_1" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M42.6027 40.4802L33.2146 31.0939C35.9356 27.8271 37.2925 23.6371 37.0029 19.3953C36.7133 15.1536 34.7995 11.1868 31.6597 8.32014C28.5199 5.45348 24.3958 3.90767 20.1453 4.00427C15.8948 4.10087 11.8451 5.83244 8.83878 8.83878C5.83244 11.8451 4.10087 15.8948 4.00427 20.1453C3.90767 24.3958 5.45348 28.5199 8.32014 31.6597C11.1868 34.7995 15.1536 36.7133 19.3953 37.0029C23.6371 37.2925 27.8271 35.9356 31.0939 33.2146L40.4802 42.6027C40.6196 42.7421 40.785 42.8526 40.9671 42.928C41.1492 43.0035 41.3444 43.0423 41.5414 43.0423C41.7385 43.0423 41.9337 43.0035 42.1158 42.928C42.2979 42.8526 42.4633 42.7421 42.6027 42.6027C42.7421 42.4633 42.8526 42.2979 42.928 42.1158C43.0035 41.9337 43.0423 41.7385 43.0423 41.5414C43.0423 41.3444 43.0035 41.1492 42.928 40.9671C42.8526 40.785 42.7421 40.6196 42.6027 40.4802ZM7.04144 20.5414C7.04144 17.8714 7.83321 15.2613 9.3166 13.0412C10.8 10.8212 12.9084 9.09085 15.3752 8.06907C17.842 7.04729 20.5564 6.77994 23.1752 7.30084C25.7939 7.82174 28.1994 9.10749 30.0874 10.9955C31.9754 12.8835 33.2611 15.289 33.782 17.9077C34.3029 20.5265 34.0356 23.2409 33.0138 25.7077C31.992 28.1745 30.2617 30.2829 28.0416 31.7663C25.8216 33.2497 23.2115 34.0414 20.5414 34.0414C16.9622 34.0375 13.5308 32.6139 10.9999 30.083C8.46901 27.5521 7.04541 24.1206 7.04144 20.5414Z" fill="currentcolor"></path></svg>
                </button>
              </div>
               <Link to="/"className="min-w-9 justify-center">
                  <img src={logo} alt="logo" className="h-9 w-auto"/>
               </Link>
            <div id="collapseMenu" ref={menuRef} tabIndex={-1} className={`${isMenuOpen ? "block" : "hidden"} lg:block max-lg:bg-white max-lg:border-l 
            max-lg:border-slate-300 max-lg:w-1/2 max-lg:fixed max-lg:top-0 max-lg:right-0 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto max-sm:w-full z-50 outline-none`}>
                  <div className="py-2 px-4 flex justify-between items-center border-b border-slate-300 sticky top-0 bg-white lg:hidden max-lg:min-h-[68px]">
                     <button type="button" aria-controls="collapseMenu" onClick={closeMenu} id="toggleClose"className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                        <span className="sr-only">Close main menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg"
                           className="size-4 fill-slate-900"
                           aria-hidden="true"
                           viewBox="0 0 329.269 329">
                           <path d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 
                           8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 
                           128.216 128.214a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0"
                            data-original="#000000"/>
                        </svg>
                     </button>
                  </div>
                  <ul className="flex flex-col gap-8 font-semibold text-sm text-[#1a211e] lg:flex-row max-lg:p-6">
                     {isNavLoading && (
                        <li className="flex items-center py-6 text-sm text-slate-400">Loading menu…</li>
                     )}
                     {navError && !isNavLoading && (
                        <li className="flex items-center py-6 text-sm text-red-500">Menu unavailable</li>
                     )}
                    {navItems.map((category) => {
                     const hasDropdown = Array.isArray(category.items) && category.items.length > 0;
                     return (
                        <li
                           key={category.label}
                           {...(hasDropdown && {
                              onMouseEnter: () => openCategoryMenu(category.label),
                              onMouseLeave: scheduleCloseCategoryMenu,
                              onFocus: () => openCategoryMenu(category.label),
                              onBlur: scheduleCloseCategoryMenu,
                           })}
                        >
                           <a href={category.href}
                              className="relative flex h-full items-center py-6 font-[Geist,Geist_Fallback,sans-serif] text-base leading-[120%] font-light border-b-2 border-transparent hover:border-black hover:font-medium focus-visible:border-black focus-visible:font-medium">
                              {category.label}
                           </a>
                           {hasDropdown && (
                              <MegaMenu category={category} isOpen={openCategory === category.label} />
                           )}
                        </li>
                     );
                  })}
                  </ul>
            </div>
               <div className="flex items-center gap-6 justify-self-end">
                
                 <form className="hidden md:block md:w-[450px] lg:w-[clamp(300px,26vw,600px)] min-w-0" role="search">
                  <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black">
                    <label htmlFor="search" className="sr-only">Search</label>
                    <input type="search" id="search" placeholder="Search..." required
                        className="text-sm text-slate-900 w-full outline-none" />
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" className="size-4 fill-slate-400 ml-auto"
                        aria-hidden="true">
                        <path
                          d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                        </path>
                    </svg>
                  </div>
                </form>
              <Link to="/account"className="flex h-full items-center py-6 border-b-2 border-transparent hover:border-black transition-all duration-200">
                <svg className="_icon_rlv6z_1" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M9.28297 31.2824C11.0646 29.5009 13.481 28.5 16.0005 28.5H32.0005C34.52 28.5 36.9365 29.5009 38.718 31.2824C40.4996 33.064 41.5005 35.4805 41.5005 38V43.5H38.5005V38C38.5005 36.2761 37.8156 34.6228 36.5966 33.4038C35.3777 32.1849 33.7244 31.5 32.0005 31.5H16.0005C14.2767 31.5 12.6233 32.1848 11.4043 33.4037C11.4043 33.4038 11.4043 33.4037 11.4043 33.4037M11.4043 33.4037C10.1853 34.6227 9.50049 36.2761 9.50049 38V43.5H6.50049V38C6.50049 35.4805 7.50141 33.064 9.28297 31.2824" fill="currentcolor" fillRule="evenodd"></path><path clipRule="evenodd" d="M14.5005 14C14.5005 8.75329 18.7538 4.5 24.0005 4.5C29.2472 4.5 33.5005 8.75329 33.5005 14C33.5005 19.2467 29.2472 23.5 24.0005 23.5C18.7538 23.5 14.5005 19.2467 14.5005 14ZM24.0005 7.5C20.4106 7.5 17.5005 10.4101 17.5005 14C17.5005 17.5899 20.4106 20.5 24.0005 20.5C27.5904 20.5 30.5005 17.5899 30.5005 14C30.5005 10.4101 27.5904 7.5 24.0005 7.5Z" fill="currentcolor" fillRule="evenodd"></path></svg>
              </Link> 
              <Link to="/"className="flex h-full items-center py-6 border-b-2 border-transparent hover:border-black transition-all duration-200">
                <svg width="24"height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-6.7-4.35-9-8.28C.87 9.08 3.15 4.5 7.5 4.5c2.08 0 3.55 1.1 4.5 2.4.95-1.3 2.42-2.4 4.5-2.4 4.35 0 6.63 4.58 4.5 8.22C18.7 16.65 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link to="/"className="flex h-full items-center py-6 border-b-2 border-transparent hover:border-black transition-all duration-200">
                <svg className="_icon_rlv6z_1" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M16.2445 30.1224C13.3534 30.1224 10.9724 32.5034 10.9724 35.3945C10.9724 38.2857 13.3534 40.6667 16.2445 40.6667C19.1357 40.6667 21.5166 38.2857 21.5166 35.3945C21.5166 32.5034 19.1357 30.1224 16.2445 30.1224ZM16.2445 38.1156C14.7139 38.1156 13.5234 36.9252 13.5234 35.3945C13.5234 33.8639 14.7139 32.6735 16.2445 32.6735C17.7751 32.6735 18.9656 33.8639 18.9656 35.3945C18.9656 36.9252 17.7751 38.1156 16.2445 38.1156Z" fill="currentcolor"></path><path d="M33.4221 30.1224C30.5309 30.1224 28.15 32.5034 28.15 35.3945C28.15 38.2857 30.5309 40.6667 33.4221 40.6667C36.3133 40.6667 38.6942 38.2857 38.6942 35.3945C38.6942 32.5034 36.3133 30.1224 33.4221 30.1224ZM33.4221 38.1156C31.8915 38.1156 30.701 36.9252 30.701 35.3945C30.701 33.8639 31.8915 32.6735 33.4221 32.6735C34.9527 32.6735 36.1432 33.8639 36.1432 35.3945C36.1432 36.9252 34.9527 38.1156 33.4221 38.1156Z" fill="currentcolor"></path><path d="M10.6327 7.33337H5.36054C4.5102 7.33337 4 7.84358 4 8.52385C4 9.20412 4.5102 9.88439 5.36054 9.88439H11.1429L14.2041 27.7415H33.7619L43.1156 7.33337H17.6054H10.6327ZM32.0612 25.1905H16.2449L13.5238 9.88439H17.6054H39.2041L32.0612 25.1905Z" fill="currentcolor"></path></svg>
              </Link>   
                  
               </div>
            </div>
         </nav>
      </header>
    </>
  )
}

export default Header