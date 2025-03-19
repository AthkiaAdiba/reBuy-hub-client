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
    <div className="font-sans mb-20">
      <div className="relative">
        <Image
          src={item?.images[0]}
          alt="item image"
          width={500}
          height={1500}
          className="h-[450px]"
        />
        <p className="absolute top-2 right-2 px-2 uppercase text-lg bg-[#B59175] text-white">
          {item?.status}
        </p>
      </div>
      <div className="space-y-3 mt-5">
        <h1 className="text-2xl">{item?.title}</h1>
        <div className="flex justify-between items-center">
          <h1 className="text-xl">{item?.category}</h1>
          <div className="flex items-center gap-3 text-2xl">
            <Link href={`/products/${item?._id}`}>
              <FaEye />
            </Link>
            <button onClick={() => handleAddToWishlist(item)}>
              <FaRegHeart />
            </button>
            <button onClick={() => handleAddProduct(item)}>
              <RiShoppingBag4Line />
            </button>
          </div>
        </div>
        <h1 className="text-xl">$ {item?.price}</h1>
      </div>
    </div>
  );
};

export default ProductCard;
