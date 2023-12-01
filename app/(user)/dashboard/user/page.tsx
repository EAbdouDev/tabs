import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const cookiestore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiestore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/userauth/login");
  }

  //   const { data, error } = await supabase
  //     .from("profiles")
  //     .select("*")
  //     .eq("id", user.id);

  //   console.log(data);

  return (
    <div>
      {/* user:{" "}
      {data?.map((u) => (
        <img src={u.avatar_url} alt="s" width={100} />
      ))}{" "} */}
    </div>
  );
};

export default page;
