/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { deleteCategory } from "@/services/Categories";
import { TFetchedCategory } from "@/types/category";
import { toast } from "sonner";

interface DeleteCategoryModalProps {
  handleDeleteCategoryModelClose: () => void;
  category: TFetchedCategory | null;
}

const DeleteCategoryModal = ({
  category,
  handleDeleteCategoryModelClose,
}: DeleteCategoryModalProps) => {
  const handleCategoryDelete = async (id: string) => {
    const toastId = toast.loading("Deleting Category...", { duration: 2000 });
    try {
      const res = await deleteCategory(id);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        handleDeleteCategoryModelClose();
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message, { id: toastId });
    }
  };

  if (!category) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-[#23263a] rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Are you sure? you want to delete {category.categoryName} category!
        </h2>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleDeleteCategoryModelClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleCategoryDelete(category._id)}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
