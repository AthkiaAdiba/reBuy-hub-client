"use client";

import { currencyFormatter } from "@/lib/currencyFormatter";
import { removeProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TList } from "@/types/list";
import { Trash } from "lucide-react";
import Image from "next/image";

const CartProductCard = ({ product }: { product: TList }) => {
  const dispatch = useAppDispatch();

  const handleRemoveProductFromCart = (id: string) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="bg-white rounded-lg flex p-5 gap-5 font-sans">
      <div className="h-full w-32 overflow-hidden">
        {product?.images?.[0] && (
          <Image
            src={product.images[0]}
            height={200}
            width={200}
            alt={product.title || "Product image"}
            className="aspect-square object-cover"
          />
        )}
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <h1 className="text-2xl font-semibold">{product?.title}</h1>
        <div className="flex gap-5 my-2">
          <p>
            <span className="text-gray-500">Category:</span>
            <span className="font-semibold">
              {product?.category?.categoryName}
            </span>
          </p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between">
          <h2>Price: {currencyFormatter(product?.price)}</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => handleRemoveProductFromCart(product?._id)}>
              <Trash className="text-[#B59175]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
