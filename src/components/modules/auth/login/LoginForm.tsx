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

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  //   const [recaptchaStatus, setRecaptchaStatus] = useState(false);

  const {
    formState: { isSubmitting },
  } = form;

  //   const searchParams = useSearchParams();
  //   const redirect = searchParams.get("redirectPath");
  //   const router = useRouter();

  //   const handleRecaptcha = async (value: string | null) => {
  //     try {
  //       const res = await reCaptchaTokenVerification(value!);
  //       setIsLoading(true);

  //       if (res.success) {
  //         setRecaptchaStatus(true);
  //       }
  //     } catch (err: any) {
  //       console.error(err);
  //     }
  //   };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    // try {
    //   const res = await loginUser(data);
    //   if (res.success) {
    //     toast.success(res?.message);

    //     if (redirect) {
    //       router.push(redirect);
    //     } else {
    //       router.push("/profile");
    //     }
    //   } else {
    //     toast.error(res?.message);
    //   }
    // } catch (err: any) {
    //   console.error(err);
    // }
  };

  return (
    <div className="border-2 border-[#B59175] flex-grow max-w-md w-full p-5 font-sans">
      <div className="flex items-center space-x-4 ">
        Logo
        <div>
          <h1 className="text-3xl font-semibold text-[#B59175]">Login</h1>
          <p className="font-extralight text-lg text-[#B59175]">
            Welcome back!
          </p>
        </div>
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

          {/* <div className="flex w-full mt-5">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string}
              onChange={handleRecaptcha}
              className="mx-auto"
            />
          </div> */}

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
