import { TList } from "@/types/list";
import ProductCard from "./ProductCard";

const SuggestedProducts = ({
  suggestedProducts,
}: {
  suggestedProducts: TList[];
}) => {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {suggestedProducts?.slice(0, 4)?.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedProducts;
