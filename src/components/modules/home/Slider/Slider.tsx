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
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import MyButton from "@/components/shared/MyButton";
import Link from "next/link";

const Slider = () => {
  return (
    <div>
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
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className={`${styles.slide} ${styles.slide1}`}>
            <div className="flex justify-center items-center">
              <div>
                <h2 className="text-white text-3xl md:text-7xl font-mono">
                  LOUNGE AESTHETIC
                </h2>
                <Link href="/products">
                  <div className="flex justify-center mt-5">
                    <MyButton label="DISCOVER" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`${styles.slide} ${styles.slide2}`}>
            <div className="flex justify-center items-center">
              <div>
                <h2 className="text-white text-2xl md:text-7xl font-mono">
                  NEVADA COLLECTION
                </h2>
                <Link href="/products">
                  <div className="flex justify-center mt-5">
                    <MyButton label="DISCOVER" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styles.slide} ${styles.slide3}`}>
            <div className="flex justify-center items-center">
              <div>
                <h2 className="text-white text-3xl md:text-7xl font-mono">
                  GRACEFULLY CHIC
                </h2>
                <Link href="/products">
                  <div className="flex justify-center mt-5">
                    <MyButton label="DISCOVER" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
