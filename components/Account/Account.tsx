"use client";
import { Button, Input } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect, FormEvent, useRef } from "react";
import { Avatar } from "@nextui-org/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Account({ session }: any) {
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState<any>(null);
  const [userDBData, setuserDBData] = useState<any>(null);
  const supabase = createClientComponentClient();
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  // to make user avatar file name unique I added this random string at the end
  function generateRandomString(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }

  const randomString = generateRandomString(10); // Change 10 to the desired length

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();
      setuserDBData(data);
      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setWebsite(data.website);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event: FormEvent, avatarUrl: any) {
    event.preventDefault();

    setLoading(true);
    setIsEditing(false);
    const { user } = session;

    const updates = {
      id: user.id,
      username,

      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
    setDisabled(true);
  }

  let lastClickTime = 0;
  const handleEdit = () => {
    // Detect double-click
    const currentTime = new Date().getTime();
    const clickGap = 300; // Adjust this value based on your requirements
    if (currentTime - (lastClickTime || 0) < clickGap) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
    lastClickTime = currentTime;
  };

  const handleEditAvatarClick = () => {
    // Get the element by ID
    const fileInput = document.getElementById("avatar");

    // Check if the element exists before triggering the click event
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Add your file handling logic here, for example, uploading the selected file
    // You can call your uploadAvatar function here
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Handle the selected file, for example, upload it
      setAvatarUrl(selectedFile);
      console.log("File selected:", selectedFile);
    }
  };

  const deleteOldAvatar = async () => {
    if (userDBData?.avatar_url) {
      const { error: deleteError } = await supabase.storage
        .from("avatars")
        .remove(avatar_url);

      if (deleteError) {
        throw deleteError;
      }

      console.log("Avatar Deleted");
    }
  };
  const uploadAvatar = async (event: any) => {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    setUploading(true);
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${session.user.email}_${randomString}.${fileExt}`;

    const fileSizeInMB = file.size / (1024 * 1024);
    const maxFileSizeInMB = 1;

    if (fileSizeInMB > maxFileSizeInMB) {
      toast({
        title: "Error",
        description: "File size exceeds the 1MB limit.",
        variant: "destructive",
        duration: 5000,
      });

      // Get the element by ID
      const fileInput = document.getElementById("avatar");

      // Check if the element exists before triggering the click event
      if (fileInput) {
        fileInput.click();
      }
      return;
    }

    // delete the old avatar if it's not from google
    await deleteOldAvatar();

    // upload the new one
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) {
      setUploading(false);
      throw uploadError;
    }

    updateAvatarUrl(filePath);
    setAvatarUrl(filePath);
    setUploading(false);
  };

  const updateAvatarUrl = async (url: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: url })
      .eq("id", session.user.id);
    if (error) {
      toast({
        title: "Error",
        description: error.message,

        duration: 9000,
      });
    }
    toast({
      title: "Avatar url updated",

      duration: 9000,
    });
  };

  const handleNameChange = (e: any) => {
    //disable update if no changes

    setUsername(e.target.value);
    setDisabled(false);
  };

  return (
    <div className=" w-full flex flex-col justify-start items-start gap-6 p-4 border rounded-lg max-w-[50rem]">
      <div className="UserAvatar flex justify-start items-center w-full gap-6">
        <Avatar
          src={
            avatar_url?.startsWith("https://lh3.googleusercontent")
              ? avatar_url
              : `https://cgnvjpmyxmkxkslofbfh.supabase.co/storage/v1/object/public/avatars/${avatar_url}`
          }
          radius="lg"
          isBordered
          showFallback
          fallback={
            typeof username === "string"
              ? //@ts-ignore
                username.substring(0, 2).toUpperCase()
              : "User"
          }
          className="w-20 h-20 text-large"
        />
        <Button
          variant="bordered"
          onClick={handleEditAvatarClick}
          type="button"
        >
          Edit Avatar
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          id="avatar"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => uploadAvatar(e)}
          disabled={uploading}
        />

        {avatar_url?.startsWith(session.user.email) ? (
          <div>Local Avatar</div>
        ) : (
          ""
        )}
        {avatar_url?.startsWith("https://lh3.googleusercontent") ? (
          <div className="text-sm">
            Avatar is imported from your Google Account
          </div>
        ) : (
          ""
        )}
      </div>
      <form
        //@ts-expect-error
        onSubmit={updateProfile}
        className="w-full flex flex-col justify-start items-start gap-6"
      >
        <div className=" w-full flex flex-col justify-start items-start gap-2">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="text"
            value={session.user.email}
            isDisabled
            variant="bordered"
            className="w-full"
          />
        </div>
        <div className=" w-full flex flex-col justify-start items-start gap-2">
          <label htmlFor="username">Username</label>
          {isEditing ? (
            <Input
              className="w-full"
              id="username"
              type="text"
              required
              value={username || ""}
              onChange={handleNameChange}
              endContent={
                <button onClick={() => setIsEditing(false)} className="text-sm">
                  Cancel
                </button>
              }
            />
          ) : (
            <h1
              onClick={handleEdit}
              className=" border-2 w-full p-4 rounded-lg"
            >
              {username}
            </h1>
          )}
        </div>

        <div className=" flex justify-end items-end w-full mt-2">
          <Button
            className="button block primary"
            type="submit"
            isDisabled={disabled}
            isLoading={loading}
            color="primary"
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
}
