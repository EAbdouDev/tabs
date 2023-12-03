"use client";

import { Button } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteAccountProps {}

const DeleteAccount: FC<DeleteAccountProps> = ({}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const deleteUserAccount = async () => {
    const { data: user } = await supabase.auth.getUser();
    const userId = user.user?.id;

    if (userId) {
      const { data, error } = await supabase.auth.admin.deleteUser(userId);
      if (error) {
        console.log("Can't delete User:", error);
      }

      //   router.push("/userauth/login");
    }
  };

  return (
    <div className=" border border-red-700  w-full flex flex-col justify-start items-start gap-6 p-4  rounded-lg max-w-[50rem] opacity-90 ">
      <h1 className="text-xl font-medium">Danger Zone</h1>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="faded"
            className=" bg-red-700 text-white border-red-700"
          >
            Delete my account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className=" mt-2">
            <AlertDialogCancel className=" border-none bg-white text-black">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteUserAccount}
              className=" bg-transparent text-red-600 hover:bg-transparent hover:text-red-700"
            >
              Delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <h3 className="  opacity-50">
        Delete my account, all of its data. you can't recover your account after
        deleting .
      </h3>
    </div>
  );
};

export default DeleteAccount;
