"use client";

import PagesHeader from "@components/Navigations/PagesHeader";
import TextEditor from "@components/docsComp/Editor";
import { Input } from "@nextui-org/react";
import { useFileName } from "@states/editor";
import { getCookie, setCookie } from "cookies-next";
import { File, Folder } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const fileName = useFileName((state) => state.fileName);
  const updateFileName = useFileName((state) => state.updateFileName);

  const [isEditing, setIsEditing] = useState(false);

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

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      setCookie("_fileName", fileName);
    }
  };

  const fileNameCookies = getCookie("_fileName");

  useEffect(() => {
    if (typeof window !== "undefined" && !fileName) {
      updateFileName("Untitled");
    }
    if (fileNameCookies) {
      updateFileName(fileNameCookies);
    }
  }, []);

  return (
    <div className="">
      <header className=" flex justify-between items-center">
        <PagesHeader text="Tabs Fast Docs" />
        <div className=" flex justify-start items-center gap-2 bg-[#202020] w-fit border py-2 px-4 rounded-lg cursor-text">
          {isEditing ? (
            <Input
              className="w-full"
              id="username"
              type="text"
              variant="faded"
              required
              onKeyDown={handleEnter}
              value={fileName || ""}
              placeholder="Amazing M..."
              onChange={(e) => updateFileName(e.currentTarget.value)}
              endContent={
                <button onClick={() => setIsEditing(false)} className="text-sm">
                  Cancel
                </button>
              }
            />
          ) : (
            <div
              onClick={handleEdit}
              className="flex justify-center items-center gap-2"
            >
              <File className="w-5 h-5" />
              {fileName === "" || fileNameCookies === "" ? (
                <h3>Untitled</h3>
              ) : (
                <h3>{fileNameCookies ? fileNameCookies : fileName}</h3>
              )}
            </div>
          )}
        </div>
      </header>
      <div className=" mt-10">
        <TextEditor />
      </div>
    </div>
  );
};

export default page;
