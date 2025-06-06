"use client";

import { Button } from "@/components/ui/button";
import { deleteSubscriber } from "@/services/NewsletterService";
import { TFetchedSubscribers } from "@/types/subscriber";
import { toast } from "sonner";

interface DeleteSubscribeModalProps {
  subscriber: TFetchedSubscribers | null;
  handleCloseDeleteModal: () => void;
}

const DeleteSubscribeModal = ({
  subscriber,
  handleCloseDeleteModal,
}: DeleteSubscribeModalProps) => {
  const handleDelete = async () => {
    const toastId = toast.loading("Deleting subscriber...", {
      duration: 2000,
    });

    try {
      if (!subscriber?._id) {
        throw new Error("Subscriber ID is missing");
      }

      const res = await deleteSubscriber(subscriber._id);

      if (!res.success) {
        toast.error(res?.message || "Failed to delete subscriber", {
          id: toastId,
        });
      } else {
        toast.success("Subscriber deleted successfully", { id: toastId });
        handleCloseDeleteModal();
      }
    } catch (err: Error | unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Delete Subscriber</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete the subscriber with email{" "}
          <span className="font-medium">{subscriber?.userEmail}</span>? This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={handleCloseDeleteModal}
            className="hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSubscribeModal;
