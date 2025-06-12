"use client";

import MyButton from "@/components/shared/MyButton";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { subTotalSelector } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

const CartTotals = () => {
  const subTotal = useAppSelector(subTotalSelector);

  return (
    <div className="p-4 md:p-6 mt-6 md:mt-10">
      <h2 className="text-2xl md:text-4xl font-semibold mb-6 md:mb-8 tracking-wide w-full md:w-1/3">
        CART TOTALS
      </h2>

      <div className="space-y-4 md:space-y-6">
        {/* Subtotal */}
        <div className="relative pb-4 border-b border-gray-200">
          <div className="w-full md:w-1/3 flex justify-between items-center">
            <span className="text-base md:text-lg font-medium tracking-wide">
              SUBTOTAL
            </span>
            <span className="text-gray-600 text-base md:text-lg font-medium">
              {currencyFormatter(subTotal)}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="relative pb-6 border-b border-gray-200">
          <div className="w-full md:w-1/3 flex justify-between items-center">
            <span className="text-sm md:text-base font-medium tracking-wide">
              TOTAL
            </span>
            <span className="text-gray-600 font-medium">
              {currencyFormatter(subTotal)}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <Link href="/checkout">
          <div className="w-full md:w-1/3">
            <MyButton label="PROCEED TO CHECKOUT" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CartTotals;
