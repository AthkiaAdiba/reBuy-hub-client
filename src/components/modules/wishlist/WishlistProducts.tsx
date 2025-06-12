"use client";

import { wishlistProductsSelector } from "@/redux/features/wishlistSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { TList } from "@/types/list";
import Image from "next/image";
import { X } from "lucide-react";
import { removeFromWishlist } from "@/redux/features/wishlistSlice";
import { addProduct } from "@/redux/features/cartSlice";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { currencyFormatter } from "@/lib/currencyFormatter";

const WishlistProducts = () => {
  const allWishlists = useAppSelector(wishlistProductsSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useUser();

  const handleRemoveProductFromWishlist = (id: string) => {
    dispatch(removeFromWishlist(id));
    toast.success("Product removed from wishlist");
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
    <div className="">
      {allWishlists?.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold">Your wishlist is empty</p>
          <p className="mt-2">
            Looks like your wishlist is on vacation—bring it back to work by
            adding some items!
          </p>
        </div>
      ) : (
        <>
          {/* Header - Hidden on mobile */}
          <div className="hidden md:grid grid-cols-[auto_1fr_120px_120px_120px] gap-4 text-base font-semibold uppercase tracking-wide mb-4 px-2">
            <div></div>
            <div className="pl-32">Product Name</div>
            <div className="text-center">Price</div>
            <div className="text-center">Stock Status</div>
            <div></div>
          </div>

          <div className="h-px bg-gray-200 w-full my-4"></div>

          {allWishlists?.map((wishlist: TList) => (
            <div key={wishlist._id}>
              {/* Desktop View */}
              <div className="hidden md:grid grid-cols-[auto_1fr_120px_120px_120px] gap-4 items-center py-6 px-2">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => handleRemoveProductFromWishlist(wishlist._id)}
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-6">
                  <div className="w-24 h-16 bg-gray-100 flex items-center justify-center">
                    <Image
                      src={
                        wishlist.images[0] ||
                        "/placeholder.svg?height=64&width=96"
                      }
                      alt={wishlist.title}
                      width={96}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <div className="font-medium">{wishlist.title}</div>
                </div>

                <div className="text-center">
                  {currencyFormatter(wishlist.price)}
                </div>
                <div className="text-center text-gray-600">
                  {wishlist.quantity > 0 ? "In stock" : "Out of stock"}
                </div>

                <div className="text-center">
                  <button
                    className="uppercase text-xs tracking-widest font-medium hover:text-[#B59175]"
                    onClick={() => handleAddProductToCart(wishlist)}
                  >
                    Add to cart
                    <div className="h-px bg-[#B59175] w-full"></div>
                  </button>
                </div>
              </div>

              {/* Mobile View */}
              <div className="md:hidden p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 flex items-center justify-center">
                      <Image
                        src={
                          wishlist.images[0] ||
                          "/placeholder.svg?height=64&width=96"
                        }
                        alt={wishlist.title}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">{wishlist.title}</h3>
                      <p className="text-sm text-gray-600">
                        {wishlist.quantity > 0 ? "In stock" : "Out of stock"}
                      </p>
                      <p className="font-medium">
                        {currencyFormatter(wishlist.price)}
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() =>
                      handleRemoveProductFromWishlist(wishlist._id)
                    }
                  >
                    <X size={18} />
                  </button>
                </div>
                <button
                  className="w-full uppercase text-xs tracking-widest font-medium py-2 border-t border-b"
                  onClick={() => handleAddProductToCart(wishlist)}
                >
                  Add to cart
                </button>
              </div>

              <div className="h-px bg-gray-200 w-full"></div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default WishlistProducts;
