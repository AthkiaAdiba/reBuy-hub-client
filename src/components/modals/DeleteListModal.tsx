/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { deleteItem } from "@/services/Listings";

type DeleteListModalProps = {
  deleteListModalOpen: any;
  item: any;
  handleCloseListDeleteModal: any;
};

const DeleteListModal = ({
  deleteListModalOpen,
  item,
  handleCloseListDeleteModal,
}: DeleteListModalProps) => {
  const handleListDelete = async () => {
    const toastId = toast.loading("Deleting Item...", { duration: 2000 });
    try {
      const res = await deleteItem(item._id);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        handleCloseListDeleteModal();
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message, { id: toastId });
    }
  };

  if (!deleteListModalOpen || !item) return null;
  return (
    <div>
      {deleteListModalOpen && item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-[#23263a] rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {item.title}
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              {item.description}
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCloseListDeleteModal}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleListDelete}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteListModal;
