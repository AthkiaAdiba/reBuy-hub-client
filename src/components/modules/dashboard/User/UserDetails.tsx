/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUser } from "@/context/UserContext";
import { getSingleUser } from "@/services/User";
import { TFetchedUser } from "@/types/user";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import ProfileUpdateModal from "./ProfileUpdateModal";
import { Button } from "@/components/ui/button";
import DeleteMyProfileModal from "./DeleteMyProfileModal";

interface ApiResponse {
  success: boolean;
  message: string;
  data: TFetchedUser;
}

const UserDetails = () => {
  const { user, setIsLoading } = useUser();
  const [isLoadingOfData, setIsLoadingOfData] = useState(false);
  const [deleteMyProfileModalOpen, setDeleteMyProfileModalOpen] =
    useState(false);
  const [userData, setUserData] = useState<TFetchedUser | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoadingOfData(true);
    try {
      if (user?.userId) {
        const res = (await getSingleUser(user.userId)) as ApiResponse;
        setUserData(res?.data);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoadingOfData(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCloseProfileDeleteModel = () => {
    setDeleteMyProfileModalOpen(false);
    setUserId(null);
  };

  // const handleDeleteUser = async (id: string) => {
  //   const toastId = toast.loading("Deleting Your account...", {
  //     duration: 2000,
  //   });

  //   try {
  //     const res = await deleteUser(id);
  //     // console.log(res);

  //     if (!res.success) {
  //       toast.error(res?.message, { id: toastId });
  //     } else {
  //       toast.success(res?.message, { id: toastId });
  //       logout();
  //       setIsLoading(true);
  //       router.push("/");
  //     }
  //   } catch (err: any) {
  //     console.error(err.message);
  //     toast.error(err.message, { id: toastId });
  //   }
  // };

  return (
    <div>
      <div className="mt-0 lg:mt-10 flex justify-center items-center">
        {!isLoadingOfData && (
          <div className="bg-white shadow-lg rounded-2xl w-full md:w-3/4 lg:w-4/5 xl:w-2/4">
            <Image
              alt="profile"
              src="/profilebg.jpg"
              width={500}
              height={500}
              className="w-full mb-4 rounded-t-lg h-36"
            />
            <div className="flex flex-col items-center justify-center p-4 -mt-16">
              <a href="#" className="relative block">
                <Image
                  alt="profile"
                  width={150}
                  height={150}
                  src={userData?.image || "/profile.jpg"}
                  className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
                />
              </a>

              <p className="p-2 uppercase px-4 text-xs text-white bg-gray-900 rounded-full">
                {userData?.role}
              </p>
              <div className="w-full space-y-2 p-2 mt-4 rounded-lg">
                {/* first row */}
                <div className="flex flex-wrap items-center justify-between text-lg text-black dark:text-white">
                  <p className="flex flex-col md:flex-row lg:flex-row font-semibold">
                    Name:
                    <span className="text-gray-600 ml-2 dark:text-white">
                      {userData?.name}
                    </span>
                  </p>
                  <p className="flex flex-col md:flex-row lg:flex-row font-semibold">
                    Email:
                    <span className="text-gray-600 ml-2 dark:text-white">
                      {userData?.email}
                    </span>
                  </p>
                </div>
                {/* second row */}
                <div className="flex flex-wrap items-center justify-between text-lg text-black dark:text-white">
                  <p className="flex flex-col md:flex-row lg:flex-row font-semibold">
                    Address:
                    <span className="text-gray-600 ml-2 dark:text-white">
                      {userData?.address}
                    </span>
                  </p>
                  <p className="flex flex-col md:flex-row lg:flex-row font-semibold">
                    Phone:
                    <span className="text-start text-gray-600 ml-2 dark:text-white">
                      {userData?.phone}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mb-3 mr-3">
              <div>
                <ProfileUpdateModal fetchData={fetchData} />
              </div>
              <div>
                <Button
                  onClick={() => {
                    if (userData?._id) {
                      setDeleteMyProfileModalOpen(true);
                      setUserId(userData._id);
                    }
                  }}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete my account */}
      {deleteMyProfileModalOpen && userId && (
        <DeleteMyProfileModal
          userId={userId}
          handleCloseProfileDeleteModel={handleCloseProfileDeleteModel}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
};

export default UserDetails;
