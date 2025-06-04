/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createReview = async (reviewData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    const result = await res.json();

    revalidateTag("reviews");

    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllProductReviews = async (
  productId: string,
  page: any,
  limit: any
): Promise<{ data: any[]; total: number }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/product-reviews/${productId}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["reviews"],
        },
      }
    );
    const data = await res.json();

    return { data: data?.data || [], total: data?.meta?.total || 0 };
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return { data: [], total: 0 };
  }
};
