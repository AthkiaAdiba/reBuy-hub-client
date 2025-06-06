/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ImagePreviewer from "@/components/ui/core/MyImageUploader/ImagePreviewer";
import ImageUploader from "@/components/ui/core/MyImageUploader/ImageUploader";
import { toast } from "sonner";
import { createItem } from "@/services/Listings";
import { TFetchedCategory } from "@/types/category";

const AddListModal = ({ categories }: { categories: TFetchedCategory[] }) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const categoriesOptions = categories?.map((category) => ({
    value: category._id,
    label: category.categoryName,
  }));

  const upload_preset = "stationary_shop";
  const cloud_name = "dv6fgvj2c";

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const toastId = toast.loading("Adding Item...", {
      duration: 2000,
    });

    if (imageFiles.length < 3) {
      toast.error("please provide at least 3 images!", { id: toastId });
      return;
    }

    try {
      const uploadedImages = await Promise.all(
        imageFiles.map(async (imageFile: File) => {
          try {
            const imageData = new FormData();
            imageData.append("file", imageFile);
            imageData.append("upload_preset", upload_preset);

            const imageUploadResult = await fetch(
              `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
              { method: "POST", body: imageData }
            );

            if (!imageUploadResult.ok) {
              throw new Error("Image upload failed");
            }

            const uploadedImage = await imageUploadResult.json();
            return uploadedImage.url;
          } catch (error) {
            console.error("Error uploading image:", error);
            return null;
          }
        })
      );

      // Remove null values if any upload failed
      const validImages = uploadedImages.filter((url) => url !== null);

      if (validImages.length < 3) {
        toast.error("Some images failed to upload. Please try again.", {
          id: toastId,
        });
        return;
      }

      formData.images = validImages; // Assign uploaded URLs

      const res = await createItem({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        reset();
        setOpen(false);
        setImageFiles([]);
        setImagePreview([]);
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#00175f] text-white">Add Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle className="sr-only">Add New Item</DialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 max-h-[90vh] overflow-y-auto"
        >
          <h2 className="text-2xl font-bold mb-6 text-[#00175f]">
            Add New Item
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
                {...register("title", { required: true })}
                placeholder="Item Title"
                className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg"
              />
              {errors.title && (
                <p className="text-red-500">Item title is required!</p>
              )}
            </div>

            <div className="space-y-4">
              <textarea
                {...register("description", { required: true })}
                placeholder="Item Description"
                className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg min-h-[100px]"
              />
              {errors.description && (
                <p className="text-red-500">Item description is required!</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <input
                  type="number"
                  {...register("price", { required: true })}
                  placeholder="Price"
                  className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg"
                />
                {errors.price && (
                  <p className="text-red-500">Item price is required!</p>
                )}
              </div>

              <div className="space-y-4">
                <input
                  type="number"
                  {...register("quantity", { required: true })}
                  placeholder="Quantity"
                  className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg"
                />
                {errors.quantity && (
                  <p className="text-red-500">Item quantity is required!</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <textarea
                {...register("condition", { required: true })}
                placeholder="Item Condition"
                className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg min-h-[100px]"
              />
              {errors.condition && (
                <p className="text-red-500">Item condition is required!</p>
              )}
            </div>

            <div className="space-y-4">
              <select
                {...register("category", { required: true })}
                className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg"
              >
                <option value="">Select a category</option>
                {categoriesOptions?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500">Item category is required!</p>
              )}
            </div>

            <div className="space-y-4">
              <input
                {...register("location", { required: true })}
                placeholder="Item Location"
                className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg"
              />
              {errors.location && (
                <p className="text-red-500">Item location is required!</p>
              )}
            </div>
          </div>

          {/* Form Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
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
              Add Item
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddListModal;
