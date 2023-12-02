"use client";
import { FC } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Input } from "@nextui-org/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import GLogo from "@public/auth/google-icon-logo-black-and-white.png";
import Image from "next/image";

interface pageProps {}

const formSchema = z.object({
  useremail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 letters long.",
  }),
});

const LoginForm: FC<pageProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSucc, setIsSucc] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const supabase = createClientComponentClient();

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      useremail: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.useremail,
      password: values.password,
    });

    if (error) {
      setError(true);
      setIsLoading(false);
    } else {
      setError(false);
      router.push("/dashboard");
    }
  }

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" border-2 rounded-lg p-4 w-full "
      >
        <h1 className=" text-2xl font-semibold mb-8 ">Welcome back</h1>

        <div className=" w-full mb-4 border-b pb-4">
          <Button
            className="w-full"
            onClick={handleGoogleSignIn}
            variant="bordered"
            startContent={<Image src={GLogo} alt="google_logo" width={20} />}
          >
            <p className=" font-semibold">Login with Google</p>
          </Button>
        </div>
        <div className="flex flex-col justify-start items-start gap-6 w-full">
          <FormField
            control={form.control}
            name="useremail"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="amazing@emaple.com"
                    {...field}
                    required
                    className=" "
                    variant="bordered"
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
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    variant="bordered"
                    placeholder="Enter your password"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <Eye className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="w-full"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="formFotter flex  justify-center items-center mt-6">
          <Button
            color="primary"
            isLoading={isLoading}
            type="submit"
            className="w-full"
          >
            <p className=" font-bold">Login</p>
          </Button>
        </div>

        {error ? (
          <div className="mt-5 w-full">
            <h1 className=" text-red-600 text-sm">
              There was an error with your E-Mail/Password combination. <br />
              Please try again.
            </h1>
          </div>
        ) : (
          ""
        )}
      </form>
    </Form>
  );
};

export default LoginForm;
