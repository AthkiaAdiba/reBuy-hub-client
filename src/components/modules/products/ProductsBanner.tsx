import Image from "next/image";

const ProductsBanner = () => {
  return (
    <div className="relative w-full h-[200px] md:h-[300px] lg:h-[400px]">
      <Image
        src="/images/pages_banners/products_page_banner.webp"
        alt="Products Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Our Products
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-center max-w-[600px] px-4">
          Discover our wide range of high-quality products at competitive prices
        </p>
      </div>
    </div>
  );
};

export default ProductsBanner;
