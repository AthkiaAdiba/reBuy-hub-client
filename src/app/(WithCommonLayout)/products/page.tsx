import AllProducts from "@/components/modules/products/AllProducts";
import FilterSidebar from "@/components/modules/products/FilterSidebar";
import ProductsBanner from "@/components/modules/products/ProductsBanner";
import { getAllCategories } from "@/services/Categories";
import { getAllItems } from "@/services/Listings";

type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const page = query?.page;
  const limit = 9;
  const { data: allItems, meta } = await getAllItems(query, page, limit);
  const { data: categories } = await getAllCategories();

  return (
    <div className="pt-16 md:pt-16 lg:pt-32">
      <ProductsBanner />
      <div className="flex flex-col md:flex-row lg:flex-row gap-6 px-2 lg:px-16 pt-28">
        <FilterSidebar categories={categories} />
        <AllProducts allItems={allItems} meta={meta} />
      </div>
    </div>
  );
};

export default ProductsPage;
