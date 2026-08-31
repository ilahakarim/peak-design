import { useState } from "react";

const CompanyPromoSections = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <>
  
            <section className="w-full overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 ">
                <div className="flex flex-col md:flex-row w-full rounded-xl overflow-hidden">
                    <div className="relative w-full md:w-2/3 h-[350px] sm:h-[450px] md:h-auto shrink-0 overflow-hidden">
                        <img
                            src="/image/promo/factory.webp"
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>

                    <div className="bg-black text-white w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-8 lg:px-12 xl:px-16 py-10 md:py-12 lg:py-14">
                        <p className="text-[12px] sm:text-[13px] lg:text-[14px] uppercase tracking-wide opacity-80">
                            Featured
                        </p>

                        <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] xl:text-[48px] font-serif leading-[1.1] mt-3 sm:mt-4">
                            At the expense of nobody.
                        </h2>

                        <p className="text-[14px] sm:text-[15px] lg:text-[16px] mt-4 sm:mt-5 max-w-md opacity-80">
                            All of our bags are Fair Trade certified. Learn how we inspired our new Philippines factory to be the first Fair Trade factory in the country.
                        </p>

                        <button
                            onClick={() => setIsVideoOpen(true)}
                            className="inline-flex items-center gap-2 w-fit uppercase text-[12px] sm:text-[13px] lg:text-[14px] font-medium border border-white px-6 sm:px-8 py-3 sm:py-4 mt-6 sm:mt-8 hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            Watch the film ▷
                        </button>
                    </div>
                </div>
            </section>


            <section className="w-full overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16">
                <div className="flex flex-col md:flex-row w-full">
                    <div className="bg-[#EEF1F0] text-[#1A1A1A] w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-8 lg:px-12 xl:px-16 py-10 md:py-12 lg:py-14">
                        <p className="text-[12px] sm:text-[13px] lg:text-[14px] uppercase tracking-wide">
                            Find a retailer
                        </p>

                        <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] xl:text-[48px] font-serif leading-[1.1] mt-3 sm:mt-4">
                            Feel the <i>difference</i> in person.
                        </h2>

                        <p className="text-[14px] sm:text-[15px] lg:text-[16px] mt-4 sm:mt-5 max-w-md text-gray-600">
                            Get hands-on with thoughtfully designed gear at a retailer near you.
                        </p>

                        <input
                            type="text"
                            placeholder="Enter your location"
                            className="mt-6 w-full max-w-md px-4 py-3 border border-gray-300 bg-transparent text-sm outline-none focus:border-black transition-colors"
                        />
                    </div>

                    <div className="relative w-full md:w-1/2 h-[350px] sm:h-[450px] md:h-auto shrink-0 overflow-hidden">
                        <img
                            src="/image/promo/retailer.webp"
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Video popup */}
            {isVideoOpen && (
                <div
                    onClick={() => setIsVideoOpen(false)}
                    className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center px-4"
                >
                    <button
                        onClick={() => setIsVideoOpen(false)}
                        className="absolute top-6 right-6 text-white text-3xl cursor-pointer"
                    >
                        ✕
                    </button>

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-4xl aspect-video"
                    >
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/w8t06FGJz6E?start=1&autoplay=1"
                            title="At The Expense Of Nobody"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
};

export default CompanyPromoSections;