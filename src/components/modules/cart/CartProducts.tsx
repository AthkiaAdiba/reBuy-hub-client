"use client";

import Image from "next/image";
import { TList } from "@/types/list";
import CartProductCard from "./CartProductCard";
import { useAppSelector } from "@/redux/hooks";
import { orderedProductsSelector } from "@/redux/features/cartSlice";

const CartProducts = () => {
  const allItems = useAppSelector(orderedProductsSelector);

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md lg:col-span-8 h-full row-span-3 p-2 lg:p-10 space-y-5">
      {allItems?.length === 0 && (
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold">Your cart is empty</p>
          <p className="mt-2">
            Looks like your cart is on vacation—bring it back to work by adding
            some items!
          </p>
          <div className="flex justify-center items-center ">
            <Image
              src="/empty-cart (1).png"
              width={500}
              height={500}
              alt="empty cart"
            />
          </div>
        </div>
      )}
      {allItems?.map((product: TList) => (
        <CartProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default CartProducts;
