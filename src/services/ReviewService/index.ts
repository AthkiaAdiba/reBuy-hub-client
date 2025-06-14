/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
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

export const getAllMyProductsReviews = async () => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/my-products-review`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        next: {
          tags: ["reviews"],
        },
      }
    );
    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateReviewStatus = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/${id}/status-change`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await res.json();

    revalidateTag("reviews");

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const deleteReview = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    const result = await res.json();

    revalidateTag("reviews");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
