"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const PaginationButton = ({ totalPage }: { totalPage: number }) => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const pathname = usePathname();

  const goToPage = (newPage: number) => {
    setPage(newPage);
    router.push(`${pathname}?page=${newPage}`);
  };

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <button
        onClick={() => goToPage(Math.max(page - 1, 1))}
        disabled={page === 1}
        className={`px-3 py-1 border border-[#B59175] ${
          page === 1
            ? "opacity-50 cursor-not-allowed bg-gray-200"
            : "hover:bg-[#B59175] text-[#B59175] hover:text-white"
        }`}
      >
        Previous
      </button>

      {[...Array(totalPage)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={index}
            onClick={() => goToPage(pageNumber)}
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
        onClick={() => goToPage(Math.min(page + 1, totalPage))}
        disabled={page === totalPage}
        className={`px-3 py-1 border border-[#B59175] ${
          page === totalPage
            ? "opacity-50 cursor-not-allowed bg-gray-200"
            : "hover:bg-[#B59175] text-[#B59175] hover:text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButton;
