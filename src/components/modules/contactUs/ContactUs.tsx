"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { createContact } from "@/services/ContactUs";
import { toast } from "sonner";

interface ContactFormData {
  userName: string;
  email: string;
  message: string;
}

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    const toastId = toast.loading("Sending message...", { duration: 2000 });
    try {
      const res = await createContact(data);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        reset();
      }
    } catch (err: Error | unknown) {
      console.error(err instanceof Error ? err.message : "An error occurred");
      toast.error(err instanceof Error ? err.message : "An error occurred", {
        id: toastId,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src="/images/about-us/About-video-img-2048x746.jpg"
          alt="Contact Us Hero"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="px-2 lg:px-16 py-20 md:mt-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Information with Image */}
          <div className="lg:w-1/2">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/images/about-us/Pop-up-img.jpg"
                alt="Office Location"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/30 rounded-lg">
                <div className="p-4 sm:p-6 md:p-8 text-white space-y-4 sm:space-y-6 md:space-y-8">
                  <h2 className="text-2xl sm:text-3xl font-semibold">
                    Contact Information
                  </h2>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 rounded-full bg-white/20">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-medium text-white/80">
                          Phone
                        </h3>
                        <p className="text-sm sm:text-base text-white">
                          +1 (555) 123-4567
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 rounded-full bg-white/20">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-medium text-white/80">
                          Email
                        </h3>
                        <p className="text-sm sm:text-base text-white">
                          contact@rebuyhub.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 rounded-full bg-white/20">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-medium text-white/80">
                          Location
                        </h3>
                        <p className="text-sm sm:text-base text-white">
                          123 Business Avenue, Suite 100
                          <br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-card rounded-lg p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-1">
                  <input
                    type="text"
                    placeholder="Your Name*"
                    {...register("userName", { required: "Name is required" })}
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 py-2"
                  />
                  {errors.userName && (
                    <p className="text-red-500 text-sm">
                      {errors.userName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <input
                    type="email"
                    placeholder="Your Email*"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 py-2"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <textarea
                    placeholder="Your Message*"
                    rows={4}
                    {...register("message", {
                      required: "Message is required",
                    })}
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 py-2"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <Button
                  variant="outline"
                  type="submit"
                  className="w-full rounded-none font-sans py-6 text-[#B59175] border-[#B59175] hover:bg-[#B59175] hover:text-white"
                  size="lg"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
