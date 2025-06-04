/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/services/AuthService";
import { deleteUser } from "@/services/User";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteMyProfileModalProps {
  userId: string;
  handleCloseProfileDeleteModel: () => void;
  setIsLoading: (value: boolean) => void;
}

const DeleteMyProfileModal = ({
  userId,
  handleCloseProfileDeleteModel,
  setIsLoading,
}: DeleteMyProfileModalProps) => {
  const router = useRouter();

  const handleDeleteUser = async () => {
    const toastId = toast.loading("Deleting Your account...", {
      duration: 2000,
    });

    try {
      const res = await deleteUser(userId);
      console.log(res);

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        handleCloseProfileDeleteModel();
        logout();
        setIsLoading(true);
        router.push("/");
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
          Are you sure? You want to delete your account!
        </h2>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCloseProfileDeleteModel}>
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

export default DeleteMyProfileModal;
