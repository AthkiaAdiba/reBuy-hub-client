import ProductCard from "../../products/ProductCard";
import Link from "next/link";
import MyButton from "@/components/shared/MyButton";
import { TList } from "@/types/list";

const FeaturedLists = ({ allItems }: { allItems: TList[] }) => {
  return (
    <section className="px-2 lg:px-16 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-4xl font-bold font-sans mb-4">Featured Items</h2>
          <p className="text-gray-600 max-w-2xl">
            Discover our handpicked selection of premium products, carefully
            curated to bring you the best in quality and style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allItems?.slice(0, 6)?.map((item) => (
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
