import { FC } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserNavbar from "@components/Navigations/UserNavbar";
import Dock from "@components/Navigations/Dock";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = async ({ children }) => {
  const cookiestore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiestore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/userauth/login");
  }
  return (
    <div>
      <UserNavbar />
      {children}
      <div className=" absolute bottom-10 left-[50%]  transform -translate-x-1/2 ">
        <Dock />
      </div>
    </div>
  );
};

export default layout;
