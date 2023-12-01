import LoginForm from "@components/forms/loginForm";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import Logo from "@public/branding/LogoWithTextDark-01.png";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      {" "}
      <LoginForm />
      <h3 className="flex justify-center items-center gap-1 mt-6">
        Don't have an account?{" "}
        <Link
          href={"/userauth/signup"}
          className=" underline opacity-50 hover:opacity-100 transition-all ease-soft-spring"
        >
          Create new account
        </Link>
      </h3>
    </div>
  );
};

export default page;
