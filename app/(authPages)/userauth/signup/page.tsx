import SignForm from "@components/forms/SignForm";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <SignForm />
      <h3 className="flex justify-center items-center gap-1 mt-6">
        Already have an account?{" "}
        <Link
          href={"/userauth/login"}
          className=" underline opacity-50 hover:opacity-100 transition-all ease-soft-spring"
        >
          Log in
        </Link>
      </h3>
    </div>
  );
};

export default page;
