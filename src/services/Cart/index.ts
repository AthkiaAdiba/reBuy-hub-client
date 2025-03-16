/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { getValidToken } from "@/lib/verifyToken";
import { TOrder } from "@/types/order";

export const createOrder = async (order: TOrder) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(order),
      }
    );

    const result = await res.json();

    revalidateTag("order");

    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const verifyOrder = async (query: any) => {
  const token = await getValidToken();
  const params = new URLSearchParams();

  if (query?.order_id) {
    params.append("order_id", query?.order_id.toString());
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/transactions/verify?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        next: {
          tags: ["order"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
