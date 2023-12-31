"use client";

import { FC } from "react";
import Logo from "@public/branding/LogoWithTextDark-01.png";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface HomeNavBarProps {}

const HomeNavBar: FC<HomeNavBarProps> = ({}) => {
  const supbase = createClientComponentClient();

  const [userID, setuserID] = useState<any>(null);
  const [userOrg, setuserORG] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supbase.auth.getUser();
      setuserID(user?.id);
    }

    getUser();

    setLoading(false);
  }, []);

  return (
    <div className="Container_Home_Nav py-4 px-12 flex justify-between items-center">
      <div className="Branding">
        <Link href={"/"}>
          <Image src={Logo} alt="Tabs_Logo" width={100} />
        </Link>
      </div>

      <div className="Links">
        <ul className="flex justify-center items-center gap-7">
          <Link href={"/about"}>What is Tabs?</Link>
          <Link href={"/about"}>Products & Features</Link>
        </ul>
      </div>

      <div className="User">
        {loading ? (
          ""
        ) : (
          <div>
            {userID ? (
              <Link href={`/dashboard`}>Dashboard</Link>
            ) : (
              <Link href={"/userauth/login"}>Login</Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeNavBar;
