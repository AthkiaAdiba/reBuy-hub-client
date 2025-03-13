import AllProducts from "@/components/modules/products/AllProducts";
import FilterSidebar from "@/components/modules/products/FilterSidebar";
import { getAllItems, getAllItemsToGetCategories } from "@/services/Listings";

type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const { data: allItems } = await getAllItems(query);
  const { data: allItemsForCategories } = await getAllItemsToGetCategories();
  return (
    <div className="flex flex-col md:flex-row lg:flex-row gap-6 px-2 lg:px-16 mt-10">
      <FilterSidebar allItems={allItemsForCategories} />
      <AllProducts allItems={allItems} />
    </div>
  );
};

export default ProductsPage;
