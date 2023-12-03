"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FC, useEffect, useState } from "react";
import UserComp from "./UserComp";
import Image from "next/image";
import Logo from "@public/branding/LogoWithTextDark-01.png";
import Link from "next/link";
import { Badge } from "@components/ui/badge";

interface userNavbarProps {}

const userNavbar: FC<userNavbarProps> = ({}) => {
  const [session, setSession] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    const getUserEmail = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
      }
      setUserEmail(user.user?.email);
    };

    getUserEmail();
  }, []);

  return (
    <div className=" border-b py-4 px-12 flex justify-between items-center">
      <div className="Branding flex justify-center items-center gap-4">
        <Link href={"/dashboard"} className=" ">
          <Image src={Logo} alt="Tabs_Logo" width={100} />
        </Link>

        <Badge>{userEmail}</Badge>
      </div>
      <div>{!session ? "" : <UserComp session={session} />}</div>
    </div>
  );
};

export default userNavbar;
