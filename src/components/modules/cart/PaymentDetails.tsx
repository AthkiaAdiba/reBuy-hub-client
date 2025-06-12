/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
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

const PaymentDetails = () => {
  const sunTotal = useAppSelector(subTotalSelector);
  const allItems = useAppSelector(orderedProductsSelector);
  const order = useAppSelector(orderSelector);
  const cartProducts = useAppSelector(orderedProductsSelector);
  const user = useUser();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const address = useAppSelector(addressSelector);
  const phone = useAppSelector(phoneSelector);

  const handleOrder = async () => {
    const orderLoading = toast.loading("Order is being placed..", {
      duration: 2000,
    });
    try {
      if (!user?.user) {
        router.push("/login");
        throw new Error("Please log in first!");
      }

      if (cartProducts?.length === 0) {
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
    <div className="border-2 border-white bg-background brightness-105 col-span-4 h-fit p-5 shadow-lg">
      <h1 className="text-2xl font-bold">Payment Details</h1>
      <div className="space-y-2 mt-4">
        <div className="flex justify-between text-2xl">
          <p className="text-2xl">Total Item</p>
          <p className="font-semibold">{allItems?.length}</p>
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-lg">Subtotal</p>
          <p className="font-semibold">{currencyFormatter(sunTotal)}</p>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <p className="text-lg">Grand Total</p>
        <p className="font-semibold">{currencyFormatter(sunTotal)}</p>
      </div>
      <Button
        onClick={handleOrder}
        variant="ghost"
        className="rounded-none border-2 px-8 font-sans py-4 text-[#B59175] border-[#B59175] hover:bg-[#B59175] hover:text-white w-full"
      >
        Order Now
      </Button>
    </div>
  );
};

export default PaymentDetails;
