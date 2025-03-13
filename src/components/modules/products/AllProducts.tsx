import { TList } from "@/types/list";
import ProductCard from "./ProductCard";

const AllProducts = ({ allItems }: { allItems: TList[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {allItems?.map((item) => (
        <ProductCard key={item?._id} item={item} />
      ))}
    </div>
  );
};

export default AllProducts;
