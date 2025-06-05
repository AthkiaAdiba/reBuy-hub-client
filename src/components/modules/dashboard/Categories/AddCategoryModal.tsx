/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { createCategory } from "@/services/Categories";

const AddCategoryModal = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const upload_preset = "stationary_shop";
  const cloud_name = "dv6fgvj2c";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFiles([file]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview([reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFiles([]);
    setImagePreview([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const toastId = toast.loading("Adding Category...", {
      duration: 2000,
    });

    if (imageFiles.length === 0) {
      toast.error("Please provide a category image!", { id: toastId });
      return;
    }

    let uploadedImageUrl: string | null = null;

    // Image upload try-catch block
    try {
      const imageData = new FormData();
      imageData.append("file", imageFiles[0]);
      imageData.append("upload_preset", upload_preset);

      const imageUploadResult = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        { method: "POST", body: imageData }
      );

      if (!imageUploadResult.ok) {
        throw new Error("Image upload failed");
      }

      const uploadedImage = await imageUploadResult.json();
      uploadedImageUrl = uploadedImage.url;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Image upload error";
      console.error(errorMessage);
      toast.error(errorMessage, { id: toastId });
      return;
    }

    formData.categoryImage = uploadedImageUrl;

    // API call try-catch block
    try {
      const res = await createCategory(formData);

      console.log(res);

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
        <Button className="bg-[#00175f] text-white">Add Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle className="sr-only">Add New Category</DialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 max-h-[90vh] overflow-y-auto"
        >
          <h2 className="text-2xl font-bold mb-6 text-[#00175f]">
            Add New Category
          </h2>

          {/* Image Upload */}
          <div className="mb-6">
            <div className="border-2 border-dashed border-[#1a2d6d] rounded-xl p-4 text-center">
              {imagePreview.length > 0 ? (
                <div className="relative group">
                  <Image
                    width={500}
                    height={500}
                    src={imagePreview[0]}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-red-500/80 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#1a2d6d] text-white px-6 py-3 rounded-lg"
                  >
                    Upload Image
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <input
                {...register("categoryName", { required: true })}
                placeholder="Category Name"
                className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg"
              />
              {errors.categoryName && (
                <p className="text-red-500">Category Name is required!</p>
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
                clearImage();
              }}
              className="px-6 py-2 cursor-pointer rounded-lg bg-white border-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm lg:text-base bg-[#1a2d6d] text-white cursor-pointer py-1 px-4 lg:px-6 lg:py-2 rounded-lg transition-colors"
            >
              Add Category
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
