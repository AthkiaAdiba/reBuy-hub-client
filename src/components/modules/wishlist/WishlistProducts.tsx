"use client";

import { wishlistProductsSelector } from "@/redux/features/wishlistSlice";
import { useAppSelector } from "@/redux/hooks";
import { TList } from "@/types/list";
import WishlistCard from "./WishlistCard";

const WishlistProducts = () => {
  const allWishlists = useAppSelector(wishlistProductsSelector);
  console.log(allWishlists);

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md h-full p-2 lg:p-10 space-y-5">
      {allWishlists?.length === 0 && (
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold">Your wishlist is empty</p>
          <p className="mt-2">
            Looks like your wishlist is on vacation—bring it back to work by
            adding some items!
          </p>
        </div>
      )}
      {allWishlists?.map((wishlist: TList) => (
        <WishlistCard key={wishlist._id} wishlist={wishlist} />
      ))}
    </div>
  );
};

export default WishlistProducts;
