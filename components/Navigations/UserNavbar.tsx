"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FC, useEffect, useState } from "react";
import UserComp from "./UserComp";
import Image from "next/image";
import Logo from "@public/branding/LogoWithTextDark-01.png";
import Link from "next/link";

interface userNavbarProps {}

const userNavbar: FC<userNavbarProps> = ({}) => {
  const [session, setSession] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className=" border-b py-4 px-12 flex justify-between items-center">
      <div className="Branding">
        <Link href={"/"}>
          <Image src={Logo} alt="Tabs_Logo" width={100} />
        </Link>
      </div>
      <div>{!session ? "" : <UserComp session={session} />}</div>
    </div>
  );
};

export default userNavbar;
