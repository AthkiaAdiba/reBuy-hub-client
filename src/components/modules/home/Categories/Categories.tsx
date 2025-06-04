"use client";

import Image from "next/image";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type TCategorySlide = {
  id: number;
  categoryName: string;
  image: string;
};

const categoriesSlides: TCategorySlide[] = [
  {
    id: 1,
    categoryName: "Chairs",
    image: "/images/categories/armchair1.jpg",
  },
  {
    id: 2,
    categoryName: "Bedroom",
    image: "/images/categories/bedroom.webp",
  },
  {
    id: 3,
    categoryName: "Dinning Room",
    image: "/images/categories/diningroom.webp",
  },
  {
    id: 4,
    categoryName: "Garden",
    image: "/images/categories/garden.jpg",
  },
  {
    id: 5,
    categoryName: "Kitchen",
    image: "/images/categories/kitchen.jpg",
  },
  {
    id: 6,
    categoryName: "Lamps",
    image: "/images/categories/lamps.webp",
  },
  {
    id: 7,
    categoryName: "Living Room",
    image: "/images/categories/livingroom.jpg",
  },
  {
    id: 8,
    categoryName: "Office",
    image: "/images/categories/office.webp",
  },
  {
    id: 9,
    categoryName: "Vase",
    image: "/images/categories/vase.jpg",
  },
];

const Categories = () => {
  const ref = useRef(null);

  return (
    <div className="md:w-[90%] w-[95%] mx-auto pt-32">
      <div className="container mx-auto px-4" ref={ref}>
        <h2 className="text-3xl md:text-4xl font-bold text-[#B59175] mb-8">
          Shop by Category
        </h2>

        <div className="relative">
          <Swiper
            navigation={{
              prevEl: ".prevCategory",
              nextEl: ".nextCategory",
            }}
            loop={true}
            speed={600}
            modules={[Navigation]}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 12,
              },
              1400: {
                slidesPerView: 7,
                spaceBetween: 14,
              },
            }}
            style={{ padding: "40px 0" }}
            className="pl-8"
          >
            {categoriesSlides.map((category) => (
              <SwiperSlide key={category.id}>
                <div className="flex flex-col items-center justify-center cursor-pointer group">
                  <div className="relative">
                    <div className="rounded-full overflow-hidden border-4 border-[#B59175] transition-all duration-300 group-hover:border-[#8B6B5A] w-[280px] h-[280px] group-hover:rotate-3">
                      <Image
                        src={category.image}
                        alt={category.categoryName}
                        height={280}
                        width={280}
                        className="rounded-full object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#B59175]/90 via-[#B59175]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                        <h3 className="text-white text-2xl font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {category.categoryName}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="prevCategory absolute top-1/2 -left-4 transform -translate-y-1/2 z-10">
            <button className="w-16 h-16 flex items-center justify-center bg-white/80 backdrop-blur-sm border-2 border-[#B59175] rounded-full shadow-lg hover:bg-[#B59175] transition-all duration-300 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 fill-[#B59175] group-hover:fill-white transition-colors duration-300"
                viewBox="0 0 24 24"
              >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
          </div>

          <div className="nextCategory absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
            <button className="w-16 h-16 flex items-center justify-center bg-white/80 backdrop-blur-sm border-2 border-[#B59175] rounded-full shadow-lg hover:bg-[#B59175] transition-all duration-300 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 fill-[#B59175] group-hover:fill-white transition-colors duration-300"
                viewBox="0 0 24 24"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
