"use client";

import { TFetchedReview } from "@/types/review";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdDelete, MdPublish } from "react-icons/md";
import Image from "next/image";
import DeleteReviewModal from "./DeleteReviewModal";
import PublishReviewModal from "./PublishReviewModal";

const ReviewsTable = ({ reviews }: { reviews: TFetchedReview[] }) => {
  const [selectedReview, setSelectedReview] = useState<TFetchedReview | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedReview(null);
  };

  const handleClosePublishModal = () => {
    setIsPublishModalOpen(false);
    setSelectedReview(null);
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold mb-8">My Products Reviews</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#00175f] hover:bg-[#00175f]">
              <TableHead className="text-white">User</TableHead>
              <TableHead className="text-white">Review</TableHead>
              <TableHead className="text-white">Rating</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews?.map((review) => (
              <TableRow key={review._id}>
                <TableCell className="py-2 px-3 align-middle">
                  <div className="flex items-center gap-2">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={
                          review.userImage ||
                          "https://res.cloudinary.com/dv6fgvj2c/image/upload/v1745214950/profile4.avif.avif"
                        }
                        alt={review.userName}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{review.userName}</p>
                      <p className="text-sm text-gray-500">
                        {review.userEmail}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2 px-3 align-middle">
                  <p className="line-clamp-2">{review.review}</p>
                </TableCell>
                <TableCell className="py-2 px-3 align-middle">
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{review.rating}</span>
                  </div>
                </TableCell>
                <TableCell className="py-2 px-3 align-middle">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      review.publishedStatus === "Published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {review.publishedStatus}
                  </span>
                </TableCell>
                <TableCell className="py-2 px-3 align-middle">
                  {new Date(review.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="py-2 px-3 align-middle">
                  <div className="flex items-center justify-end gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedReview(review);
                              setIsPublishModalOpen(true);
                            }}
                            className="hover:bg-[#00175f]/60 text-gray-500 dark:text-gray-300 hover:text-[#010527] transition-colors h-8 w-8"
                          >
                            <MdPublish className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Publish Review</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedReview(review);
                              setIsDeleteModalOpen(true);
                            }}
                            className="hover:bg-[#00175f]/60 text-gray-500 dark:text-gray-300 hover:text-[#010527] transition-colors h-8 w-8"
                          >
                            <MdDelete className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Review</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Review Modal */}
      {isDeleteModalOpen && (
        <DeleteReviewModal
          review={selectedReview}
          handleCloseDeleteModal={handleCloseDeleteModal}
        />
      )}

      {/* Publish Review Modal */}
      {isPublishModalOpen && (
        <PublishReviewModal
          review={selectedReview}
          handleClosePublishModal={handleClosePublishModal}
        />
      )}
    </div>
  );
};

export default ReviewsTable;
