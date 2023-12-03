import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

async function getUser(user: any) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: userData } = await supabase
    .from("profiles")
    .select("id, email")
    .eq("id", user)
    .single();

  return userData;
}

export async function generateMetadata({
  params,
}: {
  params: { userID: any };
}) {
  return {
    title: `User `,
  };
}
export default async function Note({ params }: { params: { user: any } }) {
  const user = await getUser(params.user);

  return <main>Hello {params.user}</main>;
}
