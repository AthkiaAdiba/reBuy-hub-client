/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { deleteUser } from "@/services/User";
import { toast } from "sonner";
import { TFetchedUser } from "@/types/user";

interface DeleteUserModalProps {
  user: TFetchedUser | null;
  handleCloseDeleteUserModal: () => void;
}

const DeleteUserModal = ({
  user,
  handleCloseDeleteUserModal,
}: DeleteUserModalProps) => {
  const handleDeleteUser = async () => {
    if (!user?._id) {
      toast.error("User ID is missing");
      return;
    }

    const toastId = toast.loading("Deleting User account...", {
      duration: 2000,
    });

    try {
      const res = await deleteUser(user._id);
      //console.log(res);

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        handleCloseDeleteUserModal();
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-[#23263a] rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Are you sure? You want to delete {user?.name}!
        </h2>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCloseDeleteUserModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteUser}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
