/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/UserContext";
import { updateUser } from "@/services/User";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const ProfileUpdateModal = ({ fetchData }: { fetchData: () => void }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { user } = useUser();

  const upload_preset = "stationary_shop";
  const cloud_name = "dv6fgvj2c";

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    console.log(formData);
    const toastId = toast.loading("Updating Information...", {
      duration: 2000,
    });

    // Remove empty fields
    const updatedData: Record<string, any> = {};
    Object.keys(formData).forEach((key) => {
      if (key === "file") {
        // Check if file exists and has at least one file
        if (formData.file instanceof FileList && formData.file.length > 0) {
          updatedData[key] = formData[key];
        }
      } else if (formData[key] !== "" && formData[key] !== undefined) {
        updatedData[key] = formData[key];
      }
    });

    // Handle Image Upload if file exists
    if (updatedData.file) {
      const imageData = new FormData();
      const rowImage = updatedData.file[0];
      imageData.append("file", rowImage);
      imageData.append("upload_preset", upload_preset);
      imageData.append("cloud_name", cloud_name);

      try {
        const imageUploadResult = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: "POST",
            body: imageData,
          }
        );
        const uploadedImage = await imageUploadResult.json();

        if (uploadedImage.url) {
          updatedData.image = uploadedImage.url; // Store uploaded image URL
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: any) {
        toast.error("Image upload failed!", { id: toastId });
        return;
      }

      delete updatedData.file; // Remove the file field from final data
    }

    // Prepare user data
    const userData = {
      userId: user?.userId,
      data: updatedData,
    };

    // Send update request
    try {
      const res = await updateUser(userData);
      console.log(res);

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        fetchData();
        reset();
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message, { id: toastId });
      setOpen(false);
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gray-900 text-white">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription className="sr-only">
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name:
              </Label>
              <Input
                id="name"
                type="text"
                className="col-span-3"
                {...register("name")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address:
              </Label>
              <Input
                type="text"
                id="address"
                className="col-span-3"
                {...register("address")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone:
              </Label>
              <Input
                type="number"
                id="phone"
                className="col-span-3"
                {...register("phone")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                File:
              </Label>
              <Input
                type="file"
                id="file"
                className="col-span-3"
                {...register("file")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update Profile</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdateModal;
