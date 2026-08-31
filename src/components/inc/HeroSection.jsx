import React from 'react'
import { Link } from 'react-router'
import heroBg from "../../assets/hero-bg.webp";
import heroVideo from "../../assets/hero-video.mp4";
function HeroSection() {
  return (
    <>
        <section className="relative min-h-[500px] lg:h-[500px] overflow-hidden flex flex-col md:flex-row justify-between items-center py-12 lg:py-0">
    <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />

    <div className="relative w-full lg:w-1/2 flex justify-center px-6 sm:px-10 lg:px-0">
        <video
            autoPlay
            muted
            loop
            playsInline
            className="w-[80%] sm:w-[65%] md:w-[70%] md:min-w-[300px]  lg:w-[70%] xl:w-[512px] h-auto object-cover"
        >
            <source src={heroVideo} type="video/mp4" />
        </video>
    </div>

    <div className="hero-content relative text-center w-full lg:w-1/2 text-[#EBFFA8] px-6 sm:px-12 lg:px-20 mt-8 lg:mt-0">
        <p className="text-[12px] sm:text-[14px] lg:text-[16px] font-light uppercase">
            [ Break through the noise ]
        </p>

        <p style={{ fontFamily: "Bryant" }} className="text-[32px] sm:text-[48px] lg:text-[64px] xl:text-[80px] font-bold leading-[0.85] pt-6 lg:pt-10">
            <i>Introducing</i>
        </p>

        <p style={{ fontFamily: "Bryant" }} className="text-[32px] sm:text-[48px] lg:text-[64px] xl:text-[80px] font-bold leading-[0.85]">
            <i>City Line</i>
        </p>

        <p className="font-light text-[14px] sm:text-[16px] lg:text-[18px] mt-4">
            Six new lightweight, unstructured bags. Refined and matte on the outside, thoughtfully organized within. Everything you need, nothing you don't.
        </p>

        <div className="pt-6 gap-3 sm:gap-6 flex flex-col sm:flex-row justify-center">
            <Link to="/collections/all" className="text-[12px] lg:text-[16px] w-full sm:w-auto uppercase py-3 px-6 rounded-sm text-center text-[#000000] bg-[#EBFFA8] hover:bg-[#DDF87E]">
                shop now
            </Link>

            <Link to="/city-line" className="text-[12px] lg:text-[16px] w-full sm:w-auto uppercase py-3 px-6 rounded-sm text-center text-[#EBFFA8] border border-[#EBFFA8] bg-transparent hover:text-[#DDF87E] hover:border-[#DDF87E]">
                learn more
            </Link>
        </div>
    </div>
</section>
    </>
  )
}

export default HeroSection