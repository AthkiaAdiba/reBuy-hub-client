"use client";

import { Button } from "@/components/ui/button";
import { deleteReview } from "@/services/ReviewService";
import { TFetchedReview } from "@/types/review";
import { toast } from "sonner";

interface DeleteReviewModalProps {
  review: TFetchedReview | null;
  handleCloseDeleteModal: () => void;
}

const DeleteReviewModal = ({
  review,
  handleCloseDeleteModal,
}: DeleteReviewModalProps) => {
  const handleDeleteReview = async () => {
    if (!review) return;
    const toastId = toast.loading("Deleting review...");
    try {
      const res = await deleteReview(review._id);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete review", { id: toastId });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">Delete Review</h3>
        <p className="mb-6">Are you sure you want to delete this review?</p>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteReview}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
