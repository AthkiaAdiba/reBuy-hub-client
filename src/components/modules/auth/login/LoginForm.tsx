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
import { loginSchema } from "./loginValidation";
import { toast } from "sonner";
import { loginUser } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { setIsLoading } = useUser();

  const {
    formState: { isSubmitting },
  } = form;

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const handleAdminCredentials = () => {
    form.setValue("email", "athkia@gmail.com");
    form.setValue("password", "123456");
  };

  const handleUserCredentials = () => {
    form.setValue("email", "tina@gmail.com");
    form.setValue("password", "athkia");
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging...", {
      duration: 2000,
    });
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res.success) {
        toast.success(res?.message, { id: toastId });

        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message, { id: toastId });
      }
    } catch (err: any) {
      toast.error(err, { id: toastId });
    }
  };

  return (
    <div className="border-2 border-[#B59175] flex-grow max-w-md w-full p-5 font-sans">
      <div className="flex text-3xl font-sans font-bold items-center space-x-4">
        TOBEL
        <div>
          <h1 className="text-3xl font-semibold text-[#B59175]">Login</h1>
          <p className="font-extralight text-lg text-[#B59175]">
            Welcome back!
          </p>
        </div>
      </div>
      <div className="flex gap-2 my-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleAdminCredentials}
          className="rounded-none px-4 font-sans py-2 text-[#B59175] border-[#B59175] hover:bg-[#B59175] hover:text-white flex-1"
        >
          Admin Credentials
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleUserCredentials}
          className="rounded-none px-4 font-sans py-2 text-[#B59175] border-[#B59175] hover:bg-[#B59175] hover:text-white flex-1"
        >
          User Credentials
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
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

          <div>
            <Button
              // disabled={recaptchaStatus ? false : true}
              type="submit"
              variant="outline"
              className="rounded-none px-8 font-sans py-4 text-[#B59175] border-[#B59175] hover:bg-[#B59175] hover:text-white w-full"
            >
              {isSubmitting ? "Logging...." : "Login"}
            </Button>
          </div>
        </form>
      </Form>
      <p className="text-lg text-black text-center my-3">
        Do not any account ?
        <Link href="/register" className="text-[#B59175] font-medium">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
