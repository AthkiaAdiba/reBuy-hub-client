/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import MyButton from "@/components/shared/MyButton";
import { useUser } from "@/context/UserContext";
import { currencyFormatter } from "@/lib/currencyFormatter";
import {
  addressSelector,
  clearCart,
  orderedProductsSelector,
  orderSelector,
  phoneSelector,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createOrder } from "@/services/Cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const OrderDetails = () => {
  const allItems = useAppSelector(orderedProductsSelector);
  const subTotal = useAppSelector(subTotalSelector);
  const address = useAppSelector(addressSelector);
  const phone = useAppSelector(phoneSelector);
  const user = useUser();
  const router = useRouter();
  const order = useAppSelector(orderSelector);
  const dispatch = useAppDispatch();

  const handlePlaceOrder = async () => {
    const orderLoading = toast.loading("Order is being placed..", {
      duration: 2000,
    });
    try {
      if (!user?.user) {
        router.push("/login");
        throw new Error("Please log in first!");
      }

      if (allItems?.length === 0) {
        throw new Error("Cart is empty, Please select products!");
      }

      if (!address) {
        throw new Error("Address is missing!");
      }

      if (!phone) {
        throw new Error("Phone number is missing!");
      }

      const res = await createOrder(order);
      console.log(res?.data?.payment?.checkout_url);

      if (res.success) {
        toast.success(res.message, { id: orderLoading });
        dispatch(clearCart());
        router.push(res?.data?.payment?.checkout_url);
      } else {
        toast.error(res.message, { id: orderLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };

  return (
    <div>
      {/* Header with cart icon */}
      <div className="pt-8 pb-4">
        <h1 className="text-3xl font-light tracking-wide text-gray-900">
          YOUR ORDER
        </h1>
      </div>

      <div className="pt-8 pb-8">
        {/* Product header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-800">
          <span className="text-lg font-medium text-gray-900 tracking-wide">
            PRODUCT
          </span>
          <span className="text-sm font-medium text-gray-900 tracking-wide">
            SUBTOTAL
          </span>
        </div>

        {/* Product items */}
        <div className="space-y-6 py-6">
          {allItems?.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center py-4 border-b border-gray-800"
            >
              <span className="text-gray-600">
                {item?.title} × {item?.productTotalQuantity}
              </span>
              <span className="text-gray-600">
                {currencyFormatter(item?.productTotalPrice)}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-6">
          <span className="text-lg font-medium text-gray-900 tracking-wide">
            TOTAL
          </span>
          <span className="text-gray-900 font-semibold text-lg">
            {currencyFormatter(subTotal)}
          </span>
        </div>
      </div>
      <div onClick={handlePlaceOrder}>
        <MyButton label="PLACE ORDER" />
      </div>
    </div>
  );
};

export default OrderDetails;
