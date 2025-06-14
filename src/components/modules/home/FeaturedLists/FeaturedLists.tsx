import ProductCard from "../../products/ProductCard";
import Link from "next/link";
import MyButton from "@/components/shared/MyButton";
import { TList } from "@/types/list";

const FeaturedLists = ({ allItems }: { allItems: TList[] }) => {
  return (
    <section className="px-2 lg:px-16 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-center text-3xl md:text-5xl font-light mb-12">
            <span className="text-[#D6C3A1] italic font-semibold mr-2">
              Featured
            </span>
            <span className="text-gray-900 font-normal">Items</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allItems?.slice(0, 8)?.map((item) => (
            <ProductCard key={item?._id} item={item} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/products">
            <MyButton label="View All Products" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLists;
