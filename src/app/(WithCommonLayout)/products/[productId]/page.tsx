import ProductDetails from "@/components/modules/products/ProductDetails";
import SuggestedProducts from "@/components/modules/products/SuggestedProducts";
import { getAllItems, getSingleItem } from "@/services/Listings";
import { TList } from "@/types/list";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const productData = await getSingleItem(productId);
  const product = productData?.data;
  const { data: allItems } = await getAllItems();

  const suggestedProducts = allItems?.filter(
    (item: TList) =>
      item.category._id === product.category._id && item._id !== product._id
  );

  return (
    <div className="px-2 lg:px-16 pt-16 md:pt-[12%]">
      <ProductDetails product={product} />
      <SuggestedProducts suggestedProducts={suggestedProducts} />
    </div>
  );
};

export default ProductDetailsPage;
