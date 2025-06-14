/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Star } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { createReview } from "@/services/ReviewService";
import { toast } from "sonner";

type FormData = {
  rating: number;
  review: string;
  userName: string;
  userEmail: string;
};

type addReviewProp = {
  sellerId: string;
  productId: string;
};

//     "sellerId": "67cd57d44b1c1abaaca55f79",
//     "productId": "67d00ab5ba0e4b9c328456fb"

export default function ReviewForm({ sellerId, productId }: addReviewProp) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const { user } = useUser();

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Adding Your review...", {
      duration: 2000,
    });

    if (rating < 1) {
      toast.error("Please provide a rating", { id: toastId });
      return;
    }

    const reviewData = {
      userName: data?.userName || user?.name,
      userEmail: data?.userEmail || user?.userEmail,
      userImage: user?.image || "",
      rating: rating,
      review: data?.review,
      sellerId,
      productId,
    };

    try {
      const res = await createReview(reviewData);
      console.log(res);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        reset();
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <div className="pt-12">
      <h1 className="text-3xl font-semibold mb-6">ADD A REVIEW</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-gray-600 mb-4">
          Your email address will not be published. Required fields are marked *
        </p>

        <div className="mb-6">
          <label className="block mb-3">Your Rating*</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 cursor-pointer ${
                  (hoverRating || rating) >= star
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <textarea
            {...register("review", { required: true })}
            placeholder="Your Review*"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 py-2"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <input
              type="text"
              placeholder="Your Name*"
              {...register("userName", { required: true })}
              className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 py-2"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email*"
              {...register("userEmail", { required: true })}
              className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 py-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="border border-[#B59175] text-[#B59175] hover:bg-[#B59175] hover:text-white px-8 py-2 transition-colors duration-300"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
