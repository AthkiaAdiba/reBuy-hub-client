"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Address = () => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { user } = useUser();
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setAddress(data.address);
    setPhone(data.phone);
  };

  return (
    <div className="p-5 col-span-4 shadow-lg font-sans mb-10 mt-14 space-y-2">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Label htmlFor="name" className="text-xl font-semibold">
          Name:
        </Label>
        <Input
          className="bg-white rounded-none shadow-md mt-2"
          type="text"
          id="name"
          defaultValue={user?.name}
          disabled={true}
        />
        <Label htmlFor="email" className="text-xl font-semibold">
          Email:
        </Label>
        <Input
          className="bg-white rounded-none shadow-md mt-2"
          type="email"
          id="email"
          defaultValue={user?.userEmail}
          disabled={true}
        />
        <Label htmlFor="address" className="text-xl font-semibold">
          Shipping Address:
        </Label>
        <Input
          className="bg-white rounded-none shadow-md mt-2"
          type="text"
          id="address"
          defaultValue={user?.address}
          {...register("address")}
        />
        <Label htmlFor="phone" className="text-xl font-semibold">
          Phone:
        </Label>
        <Input
          className="bg-white rounded-none shadow-md mt-2"
          type="number"
          id="phone"
          defaultValue={user?.phone}
          {...register("phone")}
        />
        <Button
          type="submit"
          variant="ghost"
          className="rounded-none border-2 px-8 font-sans py-4 text-[#B59175] border-[#B59175] hover:bg-[#B59175] hover:text-white w-full"
        >
          Update Information
        </Button>
      </form>
    </div>
  );
};

export default Address;
