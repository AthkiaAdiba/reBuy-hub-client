import PaginationButton from "@/components/shared/PaginationButton";
import ProductCard from "./ProductCard";
import { TList, TMeta } from "@/types/list";

const AllProducts = ({
  allItems,
  meta,
}: {
  allItems: TList[];
  meta: TMeta;
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {allItems?.map((item) => (
          <ProductCard key={item?._id} item={item} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <PaginationButton totalPage={meta?.totalPage} />
      </div>
    </div>
  );
};

export default AllProducts;
