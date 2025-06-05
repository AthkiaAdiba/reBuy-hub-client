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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TFetchedCategory } from "@/types/category";
import Image from "next/image";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import UpdateCategoryModal from "./UpdateCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

const CategoriesTable = ({
  categories,
}: {
  categories: TFetchedCategory[];
}) => {
  const [category, setCategory] = useState<TFetchedCategory | null>(null);
  const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] =
    useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);

  const handleUpdateCategoryModelClose = () => {
    setIsUpdateCategoryModalOpen(false);
    setCategory(null);
  };

  const handleDeleteCategoryModelClose = () => {
    setIsDeleteCategoryModalOpen(false);
    setCategory(null);
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#00175f] hover:bg-[#00175f]">
              <TableHead className="text-white">Image</TableHead>
              <TableHead className="text-white">Category Name</TableHead>
              <TableHead className="text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category) => (
              <TableRow key={category?._id}>
                <TableCell className="py-2 px-3 align-middle">
                  <div className="relative h-12 w-12 overflow-hidden">
                    <Image
                      src={category?.categoryImage}
                      alt={category?.categoryName}
                      width={48}
                      height={48}
                      className="object-cover rounded-md w-12 h-12"
                    />
                  </div>
                </TableCell>
                <TableCell className="py-2 px-3 align-middle">
                  {category?.categoryName}
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
                            onClick={() => {
                              setIsUpdateCategoryModalOpen(true);
                              setCategory(category);
                            }}
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
                            onClick={() => {
                              setIsDeleteCategoryModalOpen(true);
                              setCategory(category);
                            }}
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
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Update Modal */}
      {isUpdateCategoryModalOpen && (
        <UpdateCategoryModal
          isUpdateCategoryModalOpen={isUpdateCategoryModalOpen}
          handleUpdateCategoryModelClose={handleUpdateCategoryModelClose}
          category={category}
        />
      )}

      {isDeleteCategoryModalOpen && category && (
        <DeleteCategoryModal
          category={category}
          handleDeleteCategoryModelClose={handleDeleteCategoryModelClose}
        />
      )}
    </div>
  );
};

export default CategoriesTable;
