"use client";
import { Button } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface userNavbarProps {}

const UserNavbar: FC<userNavbarProps> = ({}) => {
  const supbase = createClientComponentClient();
  const router = useRouter();

  const handleSignout = async () => {
    await supbase.auth.signOut();
    router.push("/");
  };
  return (
    <div>
      <Button variant="bordered" color="danger" onClick={handleSignout}>
        Logout
      </Button>
    </div>
  );
};

export default UserNavbar;
