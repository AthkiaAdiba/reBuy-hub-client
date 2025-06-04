/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { getValidToken } from "@/lib/verifyToken";

export const createSubscription = async (data: { userEmail: string }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    revalidateTag("subscriptions");

    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllSubscribedUsers = async () => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subscribe`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["subscriptions"],
      },
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
