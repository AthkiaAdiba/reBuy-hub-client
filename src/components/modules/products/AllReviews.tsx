/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { getAllProductReviews } from "@/services/ReviewService";
import Image from "next/image";

const AllReviews = ({ productId }: { productId: string }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 3;

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await getAllProductReviews(productId, page, limit);
        if (response?.data) {
          setReviews(response.data);
          setTotalPages(Math.ceil((response?.total || 0) / limit));
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, page, limit]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">All Reviews</h1>

      {/* Skeleton Loader */}
      {loading ? (
        [...Array(limit)].map((_, idx) => (
          <div key={idx} className="flex gap-5 pb-8 animate-pulse">
            <div className="w-[100px] h-[100px] bg-gray-300 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-300 rounded w-full" />
            </div>
          </div>
        ))
      ) : reviews.length > 0 ? (
        reviews.map((review: any, idx: number) => (
          <div key={idx} className="flex gap-5 pb-8">
            <Image
              alt="User Image"
              width={100}
              height={100}
              className="rounded"
              src={
                review?.userImage ||
                "https://res.cloudinary.com/dv6fgvj2c/image/upload/v1747578052/wh4fmh2sy2xo0eg3eu7h.jpg"
              }
            />
            <div>
              {/* Star Rating */}
              <div className="text-gray-500 text-xl">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                ))}
              </div>

              <p className="text-xs text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
              <p className="font-medium">{review?.userName}</p>
              <p className="text-base text-gray-600">{review?.review}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews found.</p>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-3 py-1 border border-[#B59175] ${
              page === 1
                ? "opacity-50 cursor-not-allowed bg-gray-200"
                : "hover:bg-[#B59175] text-[#B59175] hover:text-white"
            }`}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={index}
                onClick={() => setPage(pageNumber)}
                className={`px-3 py-1 border border-[#B59175] ${
                  page === pageNumber
                    ? "bg-[#B59175] text-white"
                    : "hover:bg-blue-100"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-3 py-1 border border-[#B59175] ${
              page === totalPages
                ? "opacity-50 cursor-not-allowed bg-gray-200"
                : "hover:bg-[#B59175] text-[#B59175] hover:text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllReviews;
