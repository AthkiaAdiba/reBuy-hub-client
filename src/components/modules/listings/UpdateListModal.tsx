/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import ImagePreviewer from "@/components/ui/core/MyImageUploader/ImagePreviewer";
import ImageUploader from "@/components/ui/core/MyImageUploader/ImageUploader";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { updateItem } from "@/services/Listings";
import { TList } from "@/types/list";
import { TFetchedCategory } from "@/types/category";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdateListModal = ({
  item,
  onClose,
  open,
  categories,
}: {
  item: TList;
  onClose?: () => void;
  open: boolean;
  categories: TFetchedCategory[];
}) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: item?.title,
      description: item?.description,
      price: item?.price,
      quantity: item?.quantity,
      condition: item?.condition,
      category: item?.category?._id,
      location: item?.location,
    },
  });

  const categoriesOptions = categories?.map((category) => ({
    value: category._id,
    label: category.categoryName,
  }));

  useEffect(() => {
    reset({
      title: item?.title,
      description: item?.description,
      price: item?.price,
      quantity: item?.quantity,
      condition: item?.condition,
      category: item?.category?._id,
      location: item?.location,
    });
  }, [item, reset]);

  const upload_preset = "stationary_shop";
  const cloud_name = "dv6fgvj2c";

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const toastId = toast.loading("Updating Item...", {
      duration: 2000,
    });

    try {
      let uploadedImages: string[] = [];

      if (imageFiles.length > 0) {
        if (imageFiles.length !== 3) {
          toast.error("Please upload exactly 3 images for your item", {
            id: toastId,
          });
        }

        uploadedImages = await Promise.all(
          imageFiles.map(async (imageFile) => {
            const imageData = new FormData();
            imageData.append("file", imageFile);
            imageData.append("upload_preset", upload_preset);

            const res = await fetch(
              `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
              { method: "POST", body: imageData }
            );

            if (!res.ok) throw new Error("Image upload failed");

            const uploadedImage = await res.json();
            return uploadedImage.url;
          })
        );

        if (uploadedImages.length === 0) {
          throw new Error("Images failed to upload. Please try again.");
        }
      }

      // Only include fields that have been changed
      const updatedFields: any = {};
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== undefined && formData[key] !== "") {
          updatedFields[key] = formData[key];
        }
      });

      const itemData = {
        data: {
          ...updatedFields,
          ...(updatedFields.price && { price: Number(updatedFields.price) }),
          ...(updatedFields.quantity && {
            quantity: Number(updatedFields.quantity),
          }),
          ...(uploadedImages.length > 0 && { images: uploadedImages }),
        },
        itemId: item?._id,
      };

      const res = await updateItem(itemData);

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        reset();
        onClose?.();
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle className="sr-only">Update Item</DialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 max-h-[90vh] overflow-y-auto"
        >
          <h2 className="text-2xl font-bold mb-6 text-[#00175f]">
            Update Item
          </h2>

          {/* Image Upload */}
          <div className="mb-6">
            <div className="border-2 border-dashed border-[#1a2d6d] rounded-xl p-4">
              <ImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Your Images"
                className="w-fit mt-0"
              />
              <ImagePreviewer
                className="flex flex-wrap gap-4 mt-4"
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <input
                {...register("title")}
                placeholder="Item Title"
                className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg"
              />
            </div>

            <div className="space-y-4">
              <textarea
                {...register("description")}
                placeholder="Item Description"
                className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <input
                  type="number"
                  {...register("price")}
                  placeholder="Price"
                  className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg"
                />
              </div>

              <div className="space-y-4">
                <input
                  type="number"
                  {...register("quantity")}
                  placeholder="Quantity"
                  className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <textarea
                {...register("condition")}
                placeholder="Item Condition"
                className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg min-h-[100px]"
              />
            </div>

            <div className="space-y-4">
              <select
                {...register("category")}
                className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg"
              >
                <option value="">Select a category</option>
                {categoriesOptions?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <input
                {...register("location")}
                placeholder="Item Location"
                className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg"
              />
            </div>
          </div>

          {/* Form Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                onClose?.();
                reset();
                setImageFiles([]);
                setImagePreview([]);
              }}
              className="px-6 py-2 cursor-pointer rounded-lg bg-white border-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm lg:text-base bg-[#1a2d6d] text-white cursor-pointer py-1 px-4 lg:px-6 lg:py-2 rounded-lg transition-colors"
            >
              Update Item
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateListModal;
