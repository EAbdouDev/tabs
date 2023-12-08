"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export const getUser = async () => {
  const user = await supabase.auth.getUser();

  return user;
};
