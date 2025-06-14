"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TList } from "@/types/list";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import AddReviewForm from "./AddReviewForm"; // Import the new component
import AllReviews from "./AllReviews";
import RenderStars from "@/utils/RenderStars";

const ProductDetails = ({ product }: { product: TList }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("reviews");
  //console.log(product);

  const handleAddProduct = (item: TList) => {
    if (!user) {
      router.push("/login");
      throw new Error("Please log in first!");
    }

    if (user?.userId === item?.sellerId) {
      toast.error("It is your Item. You can not buy!");
      return;
    }

    if (item?.status === "sold") {
      toast.error("This item is not available!");
      return;
    }

    // TODO: Integrate quantity into addProduct if your Redux slice supports it
    dispatch(addProduct(item)); // Currently adds one item, update if needed
    toast.success("Your chosen product is added to the cart.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 my-5 font-sans">
      <div>
        <Image
          src={product?.images[0]}
          alt="product image"
          width={800}
          height={800}
          className="w-full object-cover h-96"
        />
        <div className="grid grid-cols-3 gap-4 mt-5">
          {/* Display up to 3 thumbnail images */}
          {product?.images.slice(0, 3).map((image: string, idx: number) => (
            <Image
              key={idx}
              src={image}
              alt="product image"
              width={200}
              height={200}
              className="w-full object-cover h-40"
            />
          ))}
        </div>
      </div>
      <div className="bg-white rounded-md p-6 flex flex-col justify-between">
        <div>
          <h1
            className={`uppercase px-2 mb-4 max-w-[50%] md:max-w-[15%] text-center text-white ${
              product?.status === "sold" ? "bg-red-500" : "bg-[#B59175]"
            }`}
          >
            {product?.status}
          </h1>
          <h2 className="font-bold text-4xl mb-2">
            {product?.title || "Product Title"}
          </h2>
          <h2 className="text-2xl text-gray-700 mb-3">
            {product?.offerPrice && product.offerPrice > 0 ? (
              <div className="flex items-center gap-2">
                <span className="line-through text-gray-500">
                  $ {product?.price || "0.00"}
                </span>
                <span className="text-[#B59175]">
                  $ {(product.price - product.offerPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span>$ {product?.price || "0.00"}</span>
            )}
          </h2>
          {/* Star Rating and Average Ratings */}
          <div className="flex items-center mb-4">
            <div className="flex text-[#B59175] text-xl">
              {RenderStars(product?.averageRating || 0)}
            </div>
            <span className="ml-2 text-gray-600 text-base">
              ({product?.averageRating?.toFixed(1)} Average Rating)
            </span>
          </div>

          <p className="text-gray-600 font-light text-xl mb-6">
            {product?.description}
          </p>
          {/* Product Details*/}
          <div className="text-gray-700 text-lg mb-6">
            <p className="mb-1">
              <span className="font-medium text-black">CONDITION:</span>{" "}
              {product?.condition}
            </p>

            <p className="mb-1">
              <span className="font-medium text-black">CATEGORY:</span>{" "}
              {product?.category?.categoryName}
            </p>
            <p className="mb-1">
              <span className="font-medium text-black">LOCATION:</span>{" "}
              {product?.location}
            </p>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => handleAddProduct(product)}
          variant="outline"
          className="rounded-none px-8 font-sans py-4 text-[#B59175] border-[#B59175] hover:bg-[#B59175] hover:text-white self-start"
        >
          ADD TO CART
        </Button>
      </div>

      {/* Tabbed section for Reviews and Q&A */}
      <div className="lg:col-span-2 mt-8">
        <div className="flex border-b border-gray-300">
          <button
            className={`px-4 py-2 text-lg font-medium ${
              activeTab === "reviews"
                ? "border-b-2 border-[#B59175] text-[#B59175]"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            REVIEWS
          </button>
          <button
            className={`px-4 py-2 text-lg font-medium ${
              activeTab === "q&a"
                ? "border-b-2 border-[#B59175] text-[#B59175]"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("q&a")}
          >
            Q&A
          </button>
        </div>
        <div className="p-4 bg-white rounded-md">
          {activeTab === "reviews" && (
            <div>
              <AllReviews productId={product?._id} />
              <AddReviewForm
                sellerId={product?.sellerId}
                productId={product?._id}
              />
            </div>
          )}
          {activeTab === "q&a" && (
            <div>
              <h3 className="font-bold text-xl mb-2">Questions & Answers</h3>
              <p className="text-gray-600">
                No questions yet. Be the first to ask!
              </p>{" "}
              {/* Dummy data */}
              {/* Add form or components for Q&A here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
