import { FC } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserNavbar from "@components/Navigations/UserNavbar";

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
    </div>
  );
};

export default layout;
