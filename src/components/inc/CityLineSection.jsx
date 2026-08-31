import useAutoSlide from "../../hooks/useAutoSlide";

const CityLineSection = ({
    heading = "Three colors you'll only find with us.",
    tagline = "[ CITY LINE ] EXCLUSIVE",
    description = "City Line bags in Eclipse, Lapis, and Stone are only available at peakdesign.com and Peak Design stores.",
    buttonText = "SHOP NOW",
    buttonHref = "/collections/city",
}) => {
    const images = [
        "/image/city-line/person-walking.webp",
        "/image/city-line/person-walking1.webp",
        "/image/city-line/person-walking2.webp",
    ];

    const { activeIndex, sectionRef } = useAutoSlide(images.length);

    return (
        <section ref={sectionRef} className="w-full overflow-hidden md:px-12 py-8 px-6 sm:py-10 md:py-12 lg:py-16 lg:px-16">
            <div className="flex flex-col md:flex-row w-full mx-auto">

                <div className="relative w-full md:w-1/2 min-w-0 h-[350px] sm:h-[450px] md:h-auto overflow-hidden shrink-0">
                    {images.map((src, i) => (
                        <img
                            key={src}
                            src={src}
                            alt=""
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                                activeIndex === i ? "opacity-100" : "opacity-0"
                            }`}
                        />
                    ))}
                </div>

                <div className="bg-[#EEF1F0] w-full md:w-1/2 min-w-0 flex flex-col justify-center px-6 sm:px-10 md:px-8 lg:px-10 xl:px-14 2xl:px-16 py-10 sm:py-12 md:py-10 lg:py-14 xl:py-16 2xl:py-20">
                    <div className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[260px] lg:max-w-[300px] xl:max-w-[340px] 2xl:max-w-[390px] mb-6 sm:mb-8 lg:mb-10 self-center md:self-start">
                        <img
                            src="/image/city-line/collage.webp"
                            alt=""
                            className="block w-full max-w-full h-auto object-contain"
                        />
                    </div>

                    <p className="w-full max-w-full text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px] uppercase tracking-wide text-gray-600 text-center md:text-left break-words">
                        {tagline}
                    </p>

                    <h2 className="w-full max-w-full text-[26px] sm:text-[30px] md:text-[28px] lg:text-[34px] xl:text-[42px] 2xl:text-[50px] font-serif leading-[1.05] mt-3 sm:mt-4 text-center md:text-left break-words">
                        {heading}
                    </h2>

                    <p className="w-full max-w-[500px] text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[17px] text-gray-600 mt-4 sm:mt-5 text-center md:text-left mx-auto md:mx-0 break-words">
                        {description}
                    </p>

                    <a href={buttonHref}
                        className="inline-block w-fit max-w-full uppercase text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px] font-medium bg-[#1A1A1A] text-white px-6 sm:px-8 lg:px-9 py-3 sm:py-4 mt-6 sm:mt-8 hover:bg-black transition-colors mx-auto md:mx-0 whitespace-nowrap">
                        {buttonText}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CityLineSection;