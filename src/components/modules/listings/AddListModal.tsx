/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImagePreviewer from "@/components/ui/core/MyImageUploader/ImagePreviewer";
import ImageUploader from "@/components/ui/core/MyImageUploader/ImageUploader";
import { toast } from "sonner";
import { createItem } from "@/services/Listings";

const AddListModal = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
      });

      //   console.log(res);

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        reset();
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gray-900 text-white">Add Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
          <DialogDescription className="sr-only">
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* field 1 */}
            <div>
              <Label htmlFor="title" className="text-right mb-3">
                Item Title:
              </Label>
              <Input
                id="title"
                type="text"
                className="col-span-3"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500">Item title is required!</p>
              )}
            </div>

            {/* field 2 */}
            <div>
              <Label htmlFor="description" className="text-right mb-3">
                Description:
              </Label>
              <Textarea
                placeholder="Write item description"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="text-red-500">Item description is required!</p>
              )}
            </div>

            {/* field 3 */}
            <div>
              <Label htmlFor="price" className="text-right mb-3">
                Price:
              </Label>
              <Input
                type="number"
                id="price"
                className="col-span-3"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <p className="text-red-500">Item price is required!</p>
              )}
            </div>

            {/* field 4 */}
            <div>
              <Label htmlFor="condition" className="text-right mb-3">
                Condition:
              </Label>
              <Textarea
                placeholder="Write item condition"
                {...register("condition", { required: true })}
              />
              {errors.condition && (
                <p className="text-red-500">Item condition is required!</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 ">
              <ImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Your Image"
                className="w-fit mt-0"
              />
              <ImagePreviewer
                className="flex flex-wrap gap-4"
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>

            {/* field 5 */}
            <div>
              <Label htmlFor="category" className="text-right mb-3">
                Item Category:
              </Label>
              <Input
                id="category"
                type="text"
                className="col-span-3"
                {...register("category", { required: true })}
              />
              {errors.category && (
                <p className="text-red-500">Item category is required!</p>
              )}
            </div>

            {/* field 6 */}
            <div>
              <Label htmlFor="location" className="text-right mb-3">
                Item Location:
              </Label>
              <Input
                id="location"
                type="text"
                className="col-span-3"
                {...register("location", { required: true })}
              />
              {errors.location && (
                <p className="text-red-500">Item location is required!</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddListModal;
