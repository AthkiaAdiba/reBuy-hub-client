/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { createSubscription } from "@/services/NewsletterService";
import { toast } from "sonner";

type FormData = {
  userEmail: string;
};

const Newsletter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Adding Subscription...", {
      duration: 2000,
    });

    try {
      const res = await createSubscription(data);

      console.log(res);

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success("You are subscribed now!", { id: toastId });
        reset();
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <div className="mt-32 mb-10 px-2 lg:px-20 relative bg-white rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image Column */}
        <div className="w-full md:w-1/2">
          <div className="h-64 md:h-auto bg-gray-200 flex items-center justify-center text-gray-500">
            <Image
              alt="newsletter"
              width={200}
              height={200}
              src="/newsletter.jpg"
            />
          </div>
        </div>

        {/* Content Column */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-4xl text-[#B59175] font-semibold mb-4">
            SUBSCRIBE
          </h2>
          <p className="text-gray-600 mb-8">
            Sign up to receive all the latest news and updates
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="border-b border-gray-300 pb-2 mb-4 flex items-center">
              <input
                type="email"
                {...register("userEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-0 leading-tight focus:outline-none placeholder:text-gray-500"
                placeholder="E-mail"
                aria-label="Email address"
              />
              <button type="submit" className="flex-shrink-0">
                <ArrowRightIcon
                  className="h-6 w-6 text-gray-400 hover:text-gray-600"
                  aria-hidden="true"
                />
              </button>
            </div>
            {errors.userEmail && (
              <p className="text-red-500 text-sm mt-[-1rem] mb-4">
                {errors.userEmail.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
