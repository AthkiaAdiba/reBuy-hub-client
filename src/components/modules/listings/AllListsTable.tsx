/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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
import { MdDelete, MdEdit, MdSwapHoriz } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ConfirmModal from "../../modals/ConfirmModal";
import DeleteListModal from "@/components/modals/DeleteListModal";
import { TFetchedCategory } from "@/types/category";
import { IoIosPricetags } from "react-icons/io";
import AddOfferPriceModal from "./AddOfferPriceModal";

const AllListsTable = ({
  allItemsOfOwner,
  categories,
}: {
  allItemsOfOwner: TList[];
  categories: TFetchedCategory[];
}) => {
  const [deleteListModalOpen, setDeleteListModalOpen] = useState<{
    open: boolean;
    id: string | null;
  }>({ open: false, id: null });

  const [statusModalOpen, setStatusModalOpen] = useState<{
    open: boolean;
    id: string | null;
  }>({ open: false, id: null });

  const [isAddOfferPriceModalOpen, setIsAddOfferPriceModalOpen] =
    useState(false);

  const [updateModalOpen, setUpdateModalOpen] = useState<{
    open: boolean;
    item: TList | null;
  }>({ open: false, item: null });

  const [item, setItem] = useState<TList | null>(null);

  const handleStatusChange = async (id: string) => {
    setStatusModalOpen({ open: true, id });
  };

  const handleAddOrRemoveOfferPriceModalClose = () => {
    setIsAddOfferPriceModalOpen(false);
    setItem(null);
  };

  const confirmStatusChange = async () => {
    if (!statusModalOpen.id) return;
    const toastId = toast.loading("Updating Item Status...", {
      duration: 2000,
    });
    try {
      const res = await updateItemStatus(statusModalOpen.id);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message, { id: toastId });
    }
    setStatusModalOpen({ open: false, id: null });
  };

  const handleDeleteItem = async (item: TList) => {
    setItem(item);
    setDeleteListModalOpen({ open: true, id: item._id });
  };

  const confirmDelete = async () => {
    if (!deleteListModalOpen.id) return;
    const toastId = toast.loading("Deleting Item...", { duration: 2000 });
    try {
      const res = await deleteItem(deleteListModalOpen.id);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message, { id: toastId });
    }
    setDeleteListModalOpen({ open: false, id: null });
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#00175f] hover:bg-[#00175f]">
              <TableHead className="text-white">Image</TableHead>
              <TableHead className="text-white">Title</TableHead>
              <TableHead className="text-white">Price</TableHead>
              <TableHead className="text-white">Offer Price</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allItemsOfOwner?.map((item) => (
              <TableRow key={item?._id}>
                <TableCell className="py-2 px-3 align-middle">
                  <div className="relative h-12 w-12">
                    <Image
                      src={item?.images[0]}
                      alt={item?.title}
                      width={200}
                      height={200}
                      className="object-cover rounded-md"
                    />
                  </div>
                </TableCell>
                <TableCell className="py-2 px-3 align-middle">
                  {item?.title}
                </TableCell>
                <TableCell className="py-2 px-3 align-middle">
                  ${item?.price}
                </TableCell>
                <TableCell className="py-2 px-3 align-middle">
                  ${item?.offerPrice}
                </TableCell>
                <TableCell className="py-2 px-3 align-middle">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item?.status === "available"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item?.status}
                  </span>
                </TableCell>
                <TableCell className="py-2 px-3 align-middle">
                  <div className="flex items-center justify-end gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-[#00175f]/60 text-gray-500 dark:text-gray-300 hover:text-[#010527] transition-colors h-8 w-8"
                            onClick={() =>
                              setUpdateModalOpen({ open: true, item })
                            }
                          >
                            <MdEdit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit List</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteItem(item)}
                            className="hover:bg-[#00175f]/60 text-gray-500 dark:text-gray-300 hover:text-[#010527] transition-colors h-8 w-8"
                          >
                            <MdDelete className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete List</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleStatusChange(item?._id)}
                            className="hover:bg-[#00175f]/60 text-gray-500 dark:text-gray-300 hover:text-[#010527] transition-colors h-8 w-8"
                          >
                            <MdSwapHoriz className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Change Status</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setIsAddOfferPriceModalOpen(true);
                              setItem(item);
                            }}
                            className="hover:bg-[#00175f]/60 text-gray-500 dark:text-gray-300 hover:text-[#010527] transition-colors h-8 w-8"
                          >
                            <IoIosPricetags className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add Or Remove OfferPrice</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={deleteListModalOpen.open}
        onClose={() => setDeleteListModalOpen({ open: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
      />
      {/* Status Update Confirmation Modal */}
      <ConfirmModal
        open={statusModalOpen.open}
        onClose={() => setStatusModalOpen({ open: false, id: null })}
        onConfirm={confirmStatusChange}
        title="Change Status"
        description="Are you sure you want to change the status of this item?"
      />
      {/* Update Modal */}
      {updateModalOpen.item && (
        <UpdateListModal
          item={updateModalOpen.item}
          open={updateModalOpen.open}
          onClose={() => setUpdateModalOpen({ open: false, item: null })}
          categories={categories}
        />
      )}

      <DeleteListModal
        deleteListModalOpen={deleteListModalOpen.open}
        item={item}
        handleCloseListDeleteModal={() =>
          setDeleteListModalOpen({ open: false, id: null })
        }
      />

      {/* Add or Remove Offer price */}
      {isAddOfferPriceModalOpen && item && (
        <AddOfferPriceModal
          item={item}
          handleAddOrRemoveOfferPriceModalClose={
            handleAddOrRemoveOfferPriceModalClose
          }
        />
      )}
    </div>
  );
};

export default AllListsTable;
