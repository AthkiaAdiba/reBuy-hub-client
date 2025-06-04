/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/components/ui/button";
import ImagePreviewer from "@/components/ui/core/MyImageUploader/ImagePreviewer";
import ImageUploader from "@/components/ui/core/MyImageUploader/ImageUploader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateItem } from "@/services/Listings";
import { TList } from "@/types/list";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdateListModal = ({
  item,
  onClose,
  open,
}: {
  item: TList;
  onClose?: () => void;
  open: boolean;
}) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: item?.title,
      description: item?.description,
      price: item?.price,
      condition: item?.condition,
      category: item?.category,
      location: item?.location,
    },
  });

  useEffect(() => {
    reset({
      title: item?.title,
      description: item?.description,
      price: item?.price,
      condition: item?.condition,
      category: item?.category,
      location: item?.location,
    });
  }, [item, reset]);

  const upload_preset = "stationary_shop";
  const cloud_name = "dv6fgvj2c";

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const toastId = toast.loading("Updating Item...", {
      duration: 2000,
    });

    console.log(formData);

    try {
      let uploadedImages: string[] = [];

      if (imageFiles.length > 0) {
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

      const itemData = {
        data: {
          ...formData,
          price: Number(formData.price),
          ...(uploadedImages.length > 0 && { images: uploadedImages }),
        },
        itemId: item?._id,
      };

      const res = await updateItem(itemData);
      console.log(res);

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
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Item</DialogTitle>
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
                {...register("title")}
              />
            </div>

            {/* field 2 */}
            <div>
              <Label htmlFor="description" className="text-right mb-3">
                Description:
              </Label>
              <Textarea {...register("description")} />
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
                {...register("price")}
              />
            </div>

            {/* field 4 */}
            <div>
              <Label htmlFor="condition" className="text-right mb-3">
                Condition:
              </Label>
              <Textarea {...register("condition")} />
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
                {...register("category")}
              />
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
                {...register("location")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateListModal;
