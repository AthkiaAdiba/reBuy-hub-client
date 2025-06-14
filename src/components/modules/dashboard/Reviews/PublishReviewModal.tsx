"use client";

import { Button } from "@/components/ui/button";
import { updateReviewStatus } from "@/services/ReviewService";
import { TFetchedReview } from "@/types/review";
import { toast } from "sonner";

interface PublishReviewModalProps {
  review: TFetchedReview | null;
  handleClosePublishModal: () => void;
}

const PublishReviewModal = ({
  review,
  handleClosePublishModal,
}: PublishReviewModalProps) => {
  const handlePublishReview = async () => {
    if (!review) return;
    const toastId = toast.loading("Publishing review...");
    try {
      const res = await updateReviewStatus(review._id);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        handleClosePublishModal();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish review", { id: toastId });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">Publish Review</h3>
        <p className="mb-6">Are you sure you want to publish this review?</p>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={handleClosePublishModal}>
            Cancel
          </Button>
          <Button variant="default" onClick={handlePublishReview}>
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublishReviewModal;
