"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { addProduct } from "@/redux/features/cartSlice";
import { removeFromWishlist } from "@/redux/features/wishlistSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TList } from "@/types/list";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const WishlistCard = ({ wishlist }: { wishlist: TList }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useUser();

  const handleRemoveProductFromWishlist = (id: string) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddProductToCart = (item: TList) => {
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

    dispatch(addProduct(item));
    toast.success("Your chosen product is added to the cart.");
  };

  return (
    <div className="bg-white rounded-lg flex flex-col md:flex-row lg:flex-row lg:p-5 gap-5 font-sans">
      <div className="h-full w-32 overflow-hidden">
        {wishlist?.images?.[0] && (
          <Image
            src={wishlist.images[0]}
            height={200}
            width={200}
            alt={wishlist.title || "Product image"}
            className="aspect-square object-cover"
          />
        )}
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <h1 className="text-2xl font-semibold">{wishlist?.title}</h1>
        <div className="flex gap-5 my-2">
          <p>
            <span className="text-gray-500">Category:</span>
            <span className="font-semibold">{wishlist?.category}</span>
          </p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between">
          <h2>Price: {currencyFormatter(wishlist?.price)}</h2>
          <div className="flex flex-col md:flex-row lg:flex-row items-center gap-6">
            <Button
              onClick={() => handleAddProductToCart(wishlist)}
              variant="outline"
              className="rounded-none px-8 font-sans py-4 text-[#B59175] border-[#B59175] hover:bg-[#B59175] hover:text-white"
            >
              ADD TO CART
            </Button>
            <button
              onClick={() => handleRemoveProductFromWishlist(wishlist?._id)}
            >
              <Trash className="text-[#B59175]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
