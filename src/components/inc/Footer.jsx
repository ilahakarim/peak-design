
const Footer = () => {
    return (
        <footer className="w-full bg-white text-[#1d2522] border-t border-gray-200">

            {/* STORE */}
            <div className="px-6 sm:px-8 md:px-12 lg:px-16 pt-16 md:pt-20">
                <h2 className="text-[24px] md:text-[28px] font-medium tracking-tight">
                    VISIT A PD STORE
                </h2>

                <div className="flex flex-wrap items-center gap-5 md:gap-6 mt-7 text-[16px]">
                    <a href="#" className="hover:underline">SF</a>
                    <span>|</span>
                    <a href="#" className="hover:underline">LA</a>
                    <span>|</span>
                    <a href="#" className="hover:underline">NY</a>
                    <span>|</span>
                    <a href="#" className="hover:underline">PDX</a>
                    <span>|</span>
                    <a href="#" className="hover:underline">TK</a>
                    <span>|</span>
                    <a href="#" className="hover:underline">CZ</a>
                </div>
            </div>


            {/* NEWSLETTER */}
            <div className="px-6 sm:px-8 md:px-12 lg:px-16 mt-16 md:mt-20">
                <h2 className="text-[24px] md:text-[28px] font-medium tracking-tight">
                    SUBSCRIBE TO NEWSLETTER
                </h2>

                <p className="mt-10 text-[17px] md:text-[18px]">
                    Be the first to know about new products, events, and sales.
                </p>

                <div className="flex flex-col md:flex-row gap-4 mt-10">
                    <input
                        type="email"
                        placeholder="Your email"
                        className="h-[48px] md:h-[50px] flex-1 border border-gray-300 px-4 text-[17px] outline-none focus:border-gray-500"
                    />

                    <button className="h-[48px] md:h-[50px] bg-[#17201d] text-white px-7 text-[15px] font-semibold rounded-[4px] hover:opacity-90 transition">
                        SIGN ME UP
                    </button>
                </div>
            </div>


            {/* LINKS */}
            <div className="px-6 sm:px-8 md:px-12 lg:px-16 mt-12 md:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16">

                {/* ABOUT */}
                <div>
                    <h3 className="text-[24px] md:text-[27px] font-medium mb-7">
                        ABOUT
                    </h3>

                    <div className="flex flex-col gap-4 text-[16px]">
                        <a href="#" className="hover:underline">Our Mission</a>
                        <a href="#" className="hover:underline">Careers</a>
                        <a href="#" className="hover:underline">Find a Retail Store</a>
                        <a href="#" className="hover:underline">Impact Report</a>
                        <a href="#" className="hover:underline">Taking Action</a>
                        <a href="#" className="hover:underline">Field Notes</a>
                        <a href="#" className="hover:underline">Ambassadors</a>
                        <a href="#" className="hover:underline">Films</a>
                        <a href="#" className="hover:underline">Collaborate With Us</a>
                        <a href="#" className="hover:underline">Become a Dealer</a>
                        <a href="#" className="hover:underline">#FindYourPeak</a>
                    </div>
                </div>


                {/* SUPPORT */}
                <div>
                    <h3 className="text-[24px] md:text-[27px] font-medium mb-7">
                        SUPPORT
                    </h3>

                    <div className="flex flex-col gap-4 text-[16px]">
                        <a href="#" className="hover:underline">Support Center</a>
                        <a href="#" className="hover:underline">Track Your Order</a>
                        <a href="#" className="hover:underline">Returns</a>
                        <a href="#" className="hover:underline">Shipping</a>
                        <a href="#" className="hover:underline">Lifetime Warranty</a>
                        <a href="#" className="hover:underline">Product Registration</a>
                        <a href="#" className="hover:underline">Corporate Sales</a>
                        <a href="#" className="hover:underline">PD Expert Program</a>
                        <a href="#" className="hover:underline">Military/Students</a>
                        <a href="#" className="hover:underline">Contact Us</a>
                    </div>
                </div>


                {/* SHOP */}
                <div>
                    <h3 className="text-[24px] md:text-[27px] font-medium mb-7">
                        SHOP
                    </h3>

                    <div className="flex flex-col gap-4 text-[16px]">
                        <a href="#" className="hover:underline">Camera Gear</a>
                        <a href="#" className="hover:underline">Bags</a>
                        <a href="#" className="hover:underline">Bag Accessories</a>
                        <a href="#" className="hover:underline">Mobile</a>
                        <a href="#" className="hover:underline">Tripods</a>
                        <a href="#" className="hover:underline">Wallets</a>
                        <a href="#" className="hover:underline">Sale</a>
                        <a href="#" className="hover:underline">Gift Cards</a>
                    </div>
                </div>

            </div>


            {/* BOTTOM */}
            <div className="px-6 sm:px-8 md:px-12 lg:px-16 mt-20">

                {/* PEAK SHAPE */}
                <div className="border-b border-gray-300 relative">
                    <div className="absolute -bottom-[1px] left-0 bg-[#1d2522] w-[80px] h-[28px] [clip-path:polygon(15%_0,85%_0,100%_100%,0_100%)]">
                    </div>
                </div>


                {/* SOCIAL + LEGAL */}
                <div className="flex flex-col md:flex-row justify-between gap-10 pt-10 pb-12">

                    {/* SOCIAL */}
                    <div className="flex items-center gap-7">


    <a href="#" aria-label="Instagram" className="text-[#1d2522]">
        <svg
            width="31"
            height="31"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
    </a>


    <a href="#" aria-label="Facebook" className="text-[#1d2522]">
        <svg
            width="31"
            height="31"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.6.4-1 1-1z" />
        </svg>
    </a>


    {/* YouTube */}
    <a href="#" aria-label="YouTube" className="text-[#1d2522]">
        <svg
            width="34"
            height="31"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <rect x="3" y="5" width="18" height="14" rx="4" />
            <path
                d="M10 9l5 3-5 3V9z"
                fill="currentColor"
                stroke="none"
            />
        </svg>
    </a>


    {/* TikTok */}
    <a href="#" aria-label="TikTok" className="text-[#1d2522]">
        <svg
            width="31"
            height="31"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <path d="M15 4v10.5a4.5 4.5 0 1 1-4-4.47" />
            <path d="M15 4c.5 2.2 2 3.8 4 4.3" />
        </svg>
    </a>


    <a href="#" aria-label="Reddit" className="text-[#1d2522]">
        <svg
            width="32"
            height="31"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <circle cx="12" cy="12" r="9" />
            <circle cx="9" cy="12" r="1" fill="currentColor" />
            <circle cx="15" cy="12" r="1" fill="currentColor" />
            <path d="M8 15c1.2 1 2.5 1.5 4 1.5s2.8-.5 4-1.5" />
            <path d="M14 7l1-3 3 1" />
        </svg>
    </a>

</div>

                    {/* LEGAL */}
                    <div className="flex flex-wrap gap-8 text-[16px]">
                        <a href="#" className="hover:underline">
                            Privacy Policy
                        </a>

                        <a href="#" className="hover:underline">
                            Terms of Use
                        </a>

                        <a href="#" className="hover:underline">
                            Accessibility
                        </a>
                    </div>
                </div>


                {/* COPYRIGHT */}
                <div className="border-t border-gray-300 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* LOGO */}
                    <div className="flex items-center gap-5">
                        <div className="text-[35px] font-bold tracking-[-8px]">
                            ◇◇
                        </div>

                        <p className="text-gray-500 text-[17px]">
                            © 2026 Peak Design | All Rights Reserved
                        </p>
                    </div>


                    {/* CERTIFICATIONS */}
                    <div className="flex items-center gap-5">

                        <div className="w-[48px] h-[60px] bg-[#1d2522] text-white flex items-center justify-center text-center text-[8px] font-bold">
                            CLIMATE<br />
                            LABEL
                        </div>

                        <div className="w-[48px] h-[60px] border-2 border-[#1d2522] rounded-full flex flex-col items-center justify-center">
                            <span className="text-[26px] font-bold">B</span>
                            <span className="text-[6px]">CORPORATION</span>
                        </div>

                        <div className="w-[48px] h-[60px] bg-[#1d2522] text-white flex items-center justify-center text-center text-[7px] font-bold">
                            THE<br />
                            CONSERVATION<br />
                            ALLIANCE
                        </div>

                        <div className="w-[60px] h-[60px] border border-gray-300 flex items-center justify-center text-center text-[8px] font-bold">
                            FOR THE<br />
                            PLANET
                        </div>

                    </div>
                </div>

            </div>

        </footer>
    );
};

export default Footer;