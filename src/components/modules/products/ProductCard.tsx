"use client";
import { useUser } from "@/context/UserContext";
import { addProduct } from "@/redux/features/cartSlice";
import { addToWishlist } from "@/redux/features/wishlistSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TList } from "@/types/list";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { toast } from "sonner";

const ProductCard = ({ item }: { item: TList }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useUser();

  const handleAddProduct = (product: TList) => {
    if (!user) {
      router.push("/login");
      throw new Error("Please log in first!");
    }

    if (user?.userId === item?.sellerId) {
      toast.error("It is your Item. You can not buy!");
      return;
    }

    if (product?.status === "sold") {
      toast.error("This item is not available!");
      return;
    }

    dispatch(addProduct(product));
    toast.success("Your chosen product is added to the cart.");
  };

  const handleAddToWishlist = (product: TList) => {
    if (user?.userId === item?.sellerId) {
      toast.error("It is your Item. You can not save to wishlist!");
      return;
    }

    if (product?.status === "sold") {
      toast.error("This item is not available!");
      return;
    }

    dispatch(addToWishlist(product));
    toast.success("Your chosen product is added to the wishlist.");
  };

  return (
    <div className="group relative bg-white transition-all duration-300 hover:shadow-lg overflow-hidden h-[400px]">
      {/* Image Container */}
      <div className="relative h-full overflow-hidden">
        <Image
          src={item?.images[0]}
          alt={item?.title || "Product image"}
          width={500}
          height={1500}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`px-3 py-1 text-sm font-medium uppercase ${
              item?.status === "sold"
                ? "bg-red-500 text-white"
                : "bg-[#B59175] text-white"
            }`}
          >
            {item?.status}
          </span>
        </div>

        {/* Product Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-10">
          <Link href={`/products/${item?._id}`}>
            <h3 className="text-xl font-semibold mb-2 hover:text-[#B59175] transition-colors">
              {item?.title}
            </h3>
          </Link>
          <div className="flex justify-between items-center mb-12">
            <span className="text-sm">{item?.category}</span>
            <span className="text-lg font-semibold">${item?.price}</span>
          </div>
        </div>

        {/* Quick Actions - Now at bottom and always visible */}
        <div className="absolute bottom-4 left-0 right-0 z-10">
          <div className="flex justify-center gap-6">
            <Link
              href={`/products/${item?._id}`}
              className="text-white hover:text-[#B59175] transition-colors bg-black/30 p-2 rounded-full"
            >
              <FaEye className="w-5 h-5" />
            </Link>
            <button
              onClick={() => handleAddToWishlist(item)}
              className="text-white hover:text-[#B59175] transition-colors bg-black/30 p-2 rounded-full"
            >
              <FaRegHeart className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleAddProduct(item)}
              className="text-white hover:text-[#B59175] transition-colors bg-black/30 p-2 rounded-full"
            >
              <RiShoppingBag4Line className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
