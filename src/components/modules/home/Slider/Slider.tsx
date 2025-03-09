"use client";
import styles from "./Slider.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";

const Slider = () => {
  return (
    <div className="px-2 lg:px-16 mt-10">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className={`${styles.slide} ${styles.slide1}`}>
            <div className="flex items-center">
              <div className="ml-[5%] font-roboto text-white">
                <h2 className="mb-6 text-3xl lg:text-5xl font-bold">France</h2>
                <p className="text-lg lg:text-2xl w-full md:w-[80%] lg:w-[45%] font-barlow font-medium">
                  Rich in history, art, and cuisine. Famous for iconic landmarks
                  like the Eiffel Tower, exquisite wines, and a diverse cultural
                  tapestry spanning from Paris to Provence.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styles.slide} ${styles.slide2}`}>
            <div className="flex items-center">
              <div className="ml-[5%] font-roboto text-white">
                <h2 className="mb-6 text-3xl lg:text-5xl font-bold">France</h2>
                <p className="text-lg lg:text-2xl w-full md:w-[80%] lg:w-[45%] font-barlow font-medium">
                  Rich in history, art, and cuisine. Famous for iconic landmarks
                  like the Eiffel Tower, exquisite wines, and a diverse cultural
                  tapestry spanning from Paris to Provence.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styles.slide} ${styles.slide3}`}>
            <div className="flex items-center">
              <div className="ml-[5%] font-roboto text-white">
                <h2 className="mb-6 text-3xl lg:text-5xl font-bold">France</h2>
                <p className="text-lg lg:text-2xl w-full md:w-[80%] lg:w-[45%] font-barlow font-medium">
                  Rich in history, art, and cuisine. Famous for iconic landmarks
                  like the Eiffel Tower, exquisite wines, and a diverse cultural
                  tapestry spanning from Paris to Provence.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
