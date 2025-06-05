"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { updateCategory } from "@/services/Categories";
import { TFetchedCategory } from "@/types/category";
import { toast } from "sonner";
import Image from "next/image";

interface UpdateCategoryModalProps {
  isUpdateCategoryModalOpen: boolean;
  handleUpdateCategoryModelClose: () => void;
  category: TFetchedCategory | null;
}

const UpdateCategoryModal = ({
  isUpdateCategoryModalOpen,
  handleUpdateCategoryModelClose,
  category,
}: UpdateCategoryModalProps) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      categoryName: category?.categoryName || "",
    },
  });

  useEffect(() => {
    reset({
      categoryName: category?.categoryName || "",
    });
    setImagePreview(category?.categoryImage ? [category.categoryImage] : []);
    setImageFiles([]);
  }, [category, reset, isUpdateCategoryModalOpen]);

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
    const toastId = toast.loading("Updating Category...", { duration: 2000 });
    let uploadedImageUrl = category?.categoryImage || null;

    // If a new image is selected, upload it
    if (imageFiles.length > 0) {
      try {
        const imageData = new FormData();
        imageData.append("file", imageFiles[0]);
        imageData.append("upload_preset", upload_preset);
        const imageUploadResult = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          { method: "POST", body: imageData }
        );
        if (!imageUploadResult.ok) throw new Error("Image upload failed");
        const uploadedImage = await imageUploadResult.json();
        uploadedImageUrl = uploadedImage.url;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Image upload error";
        toast.error(errorMessage, { id: toastId });
        return;
      }
    }

    // Prepare data for update
    const updateData = {
      categoryName: formData.categoryName,
      categoryImage: uploadedImageUrl,
    };

    try {
      const res = await updateCategory({
        data: updateData,
        categoryId: category?._id,
      });
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        reset();
        setImageFiles([]);
        setImagePreview([]);
        handleUpdateCategoryModelClose();
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      toast.error(errorMessage, { id: toastId });
    }
  };

  if (!isUpdateCategoryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
          onClick={() => {
            handleUpdateCategoryModelClose();
            reset();
            clearImage();
          }}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-[#00175f]">
          Update Category
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload */}
          <div>
            <div className="border-2 border-dashed border-[#1a2d6d] rounded-xl p-4 text-center">
              {imagePreview.length > 0 ? (
                <div className="relative inline-block">
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
          {/* Category Name */}
          <div>
            <input
              {...register("categoryName")}
              placeholder="Category Name"
              className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg"
            />
          </div>
          {/* Form Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => {
                handleUpdateCategoryModelClose();
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
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
