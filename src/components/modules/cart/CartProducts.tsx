/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { TList } from "@/types/list";
import { useAppSelector } from "@/redux/hooks";
import { orderedProductsSelector } from "@/redux/features/cartSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Minus, Plus } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { removeProduct, updateQuantity } from "@/redux/features/cartSlice";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { toast } from "sonner";

const CartProducts = () => {
  const allItems = useAppSelector(orderedProductsSelector);
  const dispatch = useAppDispatch();

  const handleRemoveProduct = (id: string) => {
    dispatch(removeProduct(id));
  };

  const handleQuantityChange = (
    id: string,
    newQuantity: number,
    availableQuantity: number
  ) => {
    if (newQuantity < 1) return;
    if (newQuantity > availableQuantity) {
      toast.error(`Only ${availableQuantity} items available in stock`);
      return;
    }
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const getItemPrice = (item: TList) => {
    return item.offerPrice > 0 ? item.price - item.offerPrice : item.price;
  };

  return (
    <div className="w-full overflow-x-auto">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 p-4 md:p-6 border-b border-gray-200 min-w-[800px]">
        <div className="col-span-1"></div>
        <div className="col-span-4">
          <h3 className="text-sm font-medium text-gray-900 tracking-wider">
            PRODUCT
          </h3>
        </div>
        <div className="col-span-2">
          <h3 className="text-sm font-medium text-gray-900 tracking-wider">
            PRICE
          </h3>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col">
            <h3 className="text-sm font-medium text-gray-900 tracking-wider">
              QUANTITY
            </h3>
            {allItems?.length > 0 && (
              <span className="text-xs text-gray-500 mt-1">
                Total Items: {allItems?.length}
              </span>
            )}
          </div>
        </div>
        <div className="col-span-2">
          <h3 className="text-sm font-medium text-gray-900 tracking-wider">
            SUBTOTAL
          </h3>
        </div>
      </div>

      {/* Empty cart state */}
      {allItems?.length === 0 && (
        <div className="text-center text-gray-500 p-4 md:p-8">
          <p className="text-lg font-semibold">Your cart is empty</p>
          <p className="mt-2">
            Looks like your cart is on vacation—bring it back to work by adding
            some items!
          </p>
          <div className="flex justify-center items-center mt-4">
            <Image
              src="/empty-cart (1).png"
              width={500}
              height={500}
              alt="empty cart"
              className="w-full max-w-[300px] md:max-w-[500px]"
            />
          </div>
        </div>
      )}

      {/* Cart items */}
      {allItems?.map((item: any) => (
        <div key={item._id} className="min-w-[800px]">
          <div className="grid grid-cols-12 gap-4 p-4 md:p-6 items-center">
            {/* Remove button */}
            <div className="col-span-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveProduct(item._id)}
                className="p-1 h-auto"
              >
                <X className="w-4 h-4 text-gray-400" />
              </Button>
            </div>

            {/* Product info */}
            <div className="col-span-4 flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0">
                <Image
                  src={item?.images?.[0] || "/placeholder.svg"}
                  alt={item.title || "Product image"}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 tracking-wider">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-500">
                  {item.category?.categoryName}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Available in stock: {item.quantity}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="col-span-2">
              <div className="flex flex-col">
                {item.offerPrice > 0 ? (
                  <>
                    <span className="text-sm text-gray-600 line-through">
                      {currencyFormatter(item.price)}
                    </span>
                    <span className="text-sm text-[#B59175] font-medium">
                      {currencyFormatter(getItemPrice(item))}
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-gray-600">
                    {currencyFormatter(item.price)}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity controls */}
            <div className="col-span-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleQuantityChange(
                      item._id,
                      item.productTotalQuantity - 1,
                      item.quantity
                    )
                  }
                  className="w-8 h-8 p-0 border-gray-300"
                >
                  <Minus className="w-3 h-3" />
                </Button>

                <Input
                  type="number"
                  value={item.productTotalQuantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item._id,
                      parseInt(e.target.value) || 1,
                      item.quantity
                    )
                  }
                  className="w-16 h-8 text-center border-gray-300"
                  min="1"
                  max={item.quantity}
                />

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleQuantityChange(
                      item._id,
                      item.productTotalQuantity + 1,
                      item.quantity
                    )
                  }
                  className="w-8 h-8 p-0 border-gray-300"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="col-span-2">
              <span className="text-sm text-gray-600">
                {currencyFormatter(
                  getItemPrice(item) * item.productTotalQuantity
                )}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartProducts;
