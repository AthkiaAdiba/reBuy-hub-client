/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registrationSchema } from "./registerValidation";
import ImageUploader from "@/components/ui/core/MyImageUploader/ImageUploader";
import ImagePreviewer from "@/components/ui/core/MyImageUploader/ImagePreviewer";
import { useState } from "react";
import { toast } from "sonner";
import { registerUser } from "@/services/AuthService";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });
  const router = useRouter();

  //   const { setIsLoading } = useUser();

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");
  const upload_preset = "stationary_shop";
  const cloud_name = "dv6fgvj2c";

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Registering...", {
      duration: 2000,
    });

    if (imageFiles.length === 0) {
      toast.error("please provide your image!", { id: toastId });
      return;
    }

    const imageData = new FormData();
    imageData.append("file", imageFiles[0]);
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

      if (!uploadedImage.url) {
        toast.error("Image upload failed!", { id: toastId });
        return;
      }

      const registerData = {
        address: data.address,
        email: data.email,
        name: data.name,
        password: data.password,
        phone: data.phone,
        image: uploadedImage.url, // Use the URL directly here
      };

      const res = await registerUser(registerData);

      if (res.success) {
        toast.success(res?.message, { id: toastId });
        router.push("/login");
      } else {
        toast.error(res?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <div className="border-2 border-[#B59175] flex-grow max-w-md w-full font-sans p-5">
      <div className="flex text-3xl font-sans font-bold items-center space-x-4 ">
        TOBEL
        <div>
          <h1 className="text-3xl font-semibold text-[#B59175]">Register</h1>
          <p className="font-extralight text-lg text-[#B59175]">
            Join us today and start your journey!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    className="rounded-none border-[#B59175]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    value={field.value || ""}
                    className="rounded-none border-[#B59175]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value || ""}
                    className="rounded-none border-[#B59175]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    className="rounded-none border-[#B59175]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 ">
            {imagePreview.length > 0 ? (
              <ImagePreviewer
                className="flex flex-wrap gap-4"
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            ) : (
              <div>
                <ImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Your Image"
                  className="w-fit mt-0"
                />
              </div>
            )}
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    value={field.value || ""}
                    className="rounded-none border-[#B59175]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    value={field.value || ""}
                    className="rounded-none border-[#B59175]"
                  />
                </FormControl>

                {passwordConfirm && password !== passwordConfirm ? (
                  <FormMessage> Password does not match </FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          <Button
            disabled={!!passwordConfirm && password !== passwordConfirm}
            type="submit"
            variant="outline"
            className="rounded-none px-8 font-sans py-4 text-[#B59175] border-[#B59175] hover:bg-[#B59175] hover:text-white w-full"
          >
            {isSubmitting ? "Registering...." : "Register"}
          </Button>
        </form>
      </Form>
      <p className="text-lg text-black text-center my-3">
        Already have an account ?
        <Link href="/login" className="text-[#B59175] font-medium">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
