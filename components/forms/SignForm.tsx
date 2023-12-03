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
import Image from "next/image";
import GLogo from "@public/auth/google-icon-logo-black-and-white.png";
import { cookies } from "next/headers";

interface pageProps {}

const formSchema = z
  .object({
    useremail: z.string().email({
      message: "Please enter a valid email address.",
    }),

    password: z.string().min(8, {
      message: "Password must be at least 8 letters long.",
    }),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const SignForm: FC<pageProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSucc, setIsSucc] = useState(false);
  const router = useRouter();

  const supbase = createClientComponentClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      useremail: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { data, error } = await supbase.auth.signUp({
      email: values.useremail,
      password: values.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (!error) {
      if (typeof window !== "undefined") {
        localStorage.setItem("email", values.useremail);
      }
      setIsLoading(false);
      router.push("/userauth/emailConfi");
    } else return null;
  }

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const handleGoogleSignIn = async () => {
    const { data, error } = await supbase.auth.signInWithOAuth({
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
        <h1 className=" text-2xl font-semibold mb-8 ">
          It's Nice to have you here
        </h1>
        <div className=" w-full mb-4 border-b pb-4">
          <Button
            className="w-full gap-2"
            onClick={handleGoogleSignIn}
            variant="bordered"
            startContent={<Image src={GLogo} alt="google_logo" width={20} />}
          >
            <p className=" font-semibold">Continue with Google</p>
          </Button>
        </div>
        <div className="flex flex-col justify-start items-start gap-6 w-full">
          <FormField
            control={form.control}
            name="useremail"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="amazing@emaple.com"
                    {...field}
                    required
                    variant="bordered"
                    autoComplete="off"
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
              <FormItem className=" w-full">
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
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    variant="bordered"
                    placeholder="Confirm your password"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibilityConfirm}
                      >
                        {isVisibleConfirm ? (
                          <Eye className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisibleConfirm ? "text" : "password"}
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
            isDisabled={isLoading}
            type="submit"
            className="w-full"
          >
            {isLoading ? "Creating new account..." : "Create new account "}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignForm;
