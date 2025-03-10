import { brands } from "@/constants/brands";

const Brands = () => {
  return (
    <div className="mt-40 mb-10 px-2 lg:px-16 grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-6">
      {brands?.map((brand) => (
        <div key={brand?.id}>{brand.image}</div>
      ))}
    </div>
  );
};

export default Brands;
