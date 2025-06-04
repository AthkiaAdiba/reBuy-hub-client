/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TFetchedUser } from "@/types/user";
import { userChangeRoleAndStatus } from "@/services/User";

interface ChangeRoleAndStatusModalProps {
  user: TFetchedUser | null;
  handleCloseUserStatusModal: () => void;
}

interface FormData {
  role: string;
  status: string;
}

const ChangeRoleAndStatusModal = ({
  user,
  handleCloseUserStatusModal,
}: ChangeRoleAndStatusModalProps) => {
  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      role: user?.role || "",
      status: user?.status || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("User updating...", {
      duration: 2000,
    });

    const userData = {
      data,
      userId: user?._id,
    };

    try {
      const res = await userChangeRoleAndStatus(userData);

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        handleCloseUserStatusModal();
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-[#23263a] rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Update {user?.name}&apos;s Information
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Role
            </label>
            <select
              {...register("role")}
              className="w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#23263a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00175f]"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#23263a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00175f]"
            >
              <option value="unBan">Unban</option>
              <option value="ban">Ban</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseUserStatusModal}
              className="border-gray-300 dark:border-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#00175f] hover:bg-[#00175f]/90 text-white"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeRoleAndStatusModal;
