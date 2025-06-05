/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";
import { getValidToken } from "@/lib/verifyToken";

export const createCategory = async (categoryData: FieldValues) => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(categoryData),
    });

    const result = await res.json();

    revalidateTag("categories");

    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllCategories = async (page?: any, limit?: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/categories?page=${page}&limit=${limit}`,
      {
        next: {
          tags: ["categories"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleCategory = async (categoryId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/categories/${categoryId}`,
      {
        next: {
          tags: ["categories"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateCategory = async (data: any) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/categories/${data.categoryId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data?.data),
      }
    );

    const result = await res.json();

    revalidateTag("categories");

    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const deleteCategory = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/categories/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    const result = await res.json();

    revalidateTag("categories");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
