import ProductDetails from "@/components/modules/products/ProductDetails";
import { getSingleItem } from "@/services/Listings";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const productData = await getSingleItem(productId);
  const product = productData?.data;

  return (
    <div className="px-2 lg:px-16">
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailsPage;
