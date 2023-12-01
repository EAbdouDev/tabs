"use client";

import { FC } from "react";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [userEmail, setUserEmail] = useState<any>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserEmail(localStorage.getItem("email"));
    }
  }, []);

  return (
    <div className=" ">
      <div className="flex flex-col justify-start items-start gap-6 bg-[#151515] border rounded-lg p-4 ">
        <Mail className=" w-10 h-10" />
        <h1 className="text-2xl font-semibold text-center">
          Email Confirmation{" "}
        </h1>

        <p>
          We have sent email to{" "}
          <span className=" font-semibold">{userEmail}</span> to confirm the
          validity of our email address. After receicing the email follow the
          link provided to log in.
        </p>
      </div>

      <h1 className="p-4 mt-4">
        Having a problem?{" "}
        <Link
          href={"/"}
          className=" underline opacity-70 hover:opacity-100 transition-all ease-soft-spring"
        >
          Request Help
        </Link>
      </h1>

      <h1 className="p-4 ">
        If you confirmed your email (clicked on the link) and got redirected to
        blank page you can try to{" "}
        <Link
          href={"/userauth/login"}
          className=" underline opacity-70 hover:opacity-100 transition-all ease-soft-spring"
        >
          Log in
        </Link>
      </h1>
    </div>
  );
};

export default page;
