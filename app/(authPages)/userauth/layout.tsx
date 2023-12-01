import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import Logo from "@public/branding/LogoWithTextDark-01.png";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className=" overflow-hidden">
      <div className="p-4 w-fit">
        <Link href={"/"}>
          <Image src={Logo} alt="Tabs_Logo" width={100} />
        </Link>
      </div>
      <div className="flex justify-center items-center mt-32">
        <div className="w-full max-w-[30rem]  ">{children}</div>
      </div>
    </div>
  );
};

export default layout;
