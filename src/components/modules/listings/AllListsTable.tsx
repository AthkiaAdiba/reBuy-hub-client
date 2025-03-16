/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TList } from "@/types/list";
import Image from "next/image";
import UpdateListModal from "./UpdateListModal";
import { toast } from "sonner";
import { deleteItem, updateItemStatus } from "@/services/Listings";

const AllListsTable = ({ allItemsOfOwner }: { allItemsOfOwner: TList[] }) => {
  const handleStatusChange = async (id: string) => {
    const toastId = toast.loading("Updating Item Status...", {
      duration: 2000,
    });

    try {
      const res = await updateItemStatus(id);
      // console.log(res);

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message, { id: toastId });
    }
  };

  const handleDeleteItem = async (id: string) => {
    const toastId = toast.loading("Deleting Item...", {
      duration: 2000,
    });

    try {
      const res = await deleteItem(id);
      console.log(res);

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold pb-10 text-center">All Lists</h1>
      <div className="mr-2 lg:mr-5 overflow-x-auto">
        <Table className="border-2 mb-5 lg:mb-10">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>List title</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allItemsOfOwner?.map((item: TList) => (
              <TableRow key={item._id}>
                <TableCell className="text-2xl md:text-xs lg:text-base">
                  {item?.title}
                </TableCell>
                <TableCell>
                  <Image
                    src={item?.images[0]}
                    width={100}
                    height={100}
                    alt="List image"
                    className="w-14 h-14"
                  />
                </TableCell>
                <TableCell className="text-2xl md:text-xs lg:text-base">
                  {item?.category}
                </TableCell>
                <TableCell className="text-2xl md:text-xs lg:text-base">
                  {item?.price}
                </TableCell>
                <TableCell className="uppercase text-2xl md:text-xs lg:text-base">
                  <p
                    className={`${
                      item?.status === "available"
                        ? "bg-green-500"
                        : "bg-red-500"
                    } text-center rounded-md`}
                  >
                    {item?.status}
                  </p>
                </TableCell>
                <TableCell>
                  <UpdateListModal item={item} />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteItem(item?._id)}>
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleStatusChange(item?._id)}>
                    Status Change
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllListsTable;
