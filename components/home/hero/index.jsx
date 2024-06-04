"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "./hero.css";

// import required modules
import { Autoplay } from "swiper/modules";

const Hero = () => {
  return (
    <>
      <div className="">
        <Swiper
          autoplay={true}
          loop={true}
          pagination={true}
          modules={[Autoplay]}
          className="h-full"
        >
          <SwiperSlide>
            <Link href="#">
              <img
                src="/images/home/hero/1.jpg"
                alt="hero1"
                className="w-full h-full"
              />
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link href="#">
              <img
                src="/images/home/hero/2.png"
                alt="hero1"
                className="w-full h-full"
              />
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};
export default Hero;
