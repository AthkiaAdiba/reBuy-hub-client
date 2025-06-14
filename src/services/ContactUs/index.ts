/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";
import { getValidToken } from "@/lib/verifyToken";

export const createContact = async (contactData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contact-us`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    const result = await res.json();

    revalidateTag("contacts");

    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllContacts = async (page?: any, limit?: any) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/contact-us?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["contacts"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleContact = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/contact-us/${id}`,
      {
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["contacts"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateContact = async (data: any) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/contact-us/${data.id}`,
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

    revalidateTag("contacts");

    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const deleteContact = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/contact-us/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    const result = await res.json();

    revalidateTag("contacts");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
