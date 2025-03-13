/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";
import { getValidToken } from "@/lib/verifyToken";

export const createItem = async (itemData: FieldValues) => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(itemData),
    });

    const result = await res.json();

    revalidateTag("item");

    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllItems = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  const params = new URLSearchParams();

  if (query?.price) {
    params.append("price", query?.price.toString());
  }

  if (query?.category) {
    params.append("category", query?.category.toString());
  }

  if (query?.status) {
    params.append("status", query?.status.toString());
  }

  if (query?.searchTerm) {
    params.append("searchTerm", query?.searchTerm.toString());
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings?${params}`,
      {
        next: {
          tags: ["item"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllItemsToGetCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
      next: {
        tags: ["item"],
      },
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllItemsOfOwner = async () => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/owner-items`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        next: {
          tags: ["item"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleItem = async (itemId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${itemId}`,
      {
        next: {
          tags: ["item"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateItem = async (data: any) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${data.itemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data?.data),
      }
    );

    const result = await res.json();

    revalidateTag("item");

    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateItemStatus = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}/status-change`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const result = await res.json();

    revalidateTag("item");

    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const deleteItem = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    const result = await res.json();

    revalidateTag("item");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
