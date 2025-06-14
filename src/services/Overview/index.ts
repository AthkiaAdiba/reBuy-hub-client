/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";

export const getAdminOverviews = async () => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/overview`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["overview"],
      },
    });
    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getUserOverviews = async () => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/overview/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        next: {
          tags: ["overview"],
        },
      }
    );
    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
