import { TList } from "@/types/list";
import ProductCard from "../../products/ProductCard";
import Link from "next/link";
import MyButton from "@/components/shared/MyButton";

const FeaturedLists = ({ allItems }: { allItems: TList[] }) => {
  return (
    <div className="px-2 lg:px-16 mt-48">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold font-sans mb-14">Featured Items</h1>
        <Link href="/products">
          <MyButton label="All Items" />
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {allItems?.slice(0, 6)?.map((item) => (
          <ProductCard key={item?._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedLists;
