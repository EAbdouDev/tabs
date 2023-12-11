"use client";

import { FC, useEffect, useState } from "react";
import Clock from "./Clock";
import Weather from "@components/weather/WeatherCard";
import { Divider, Tooltip } from "@nextui-org/react";
import useFooterInfo from "@hooks/useFooterInfo";
import { useWords } from "@states/editor";
import { usePathname } from "next/navigation";
import { getUser } from "@lib/user";
import { useStatus } from "@states/Status";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  const [userEmail, setUserEmail] = useState<any>("");
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

  const wordCount = useWords((state) => state.wordCount);
  const charCount = useWords((state) => state.charCount);
  const status = useStatus((state) => state.status);
  const Message = useStatus((state) => state.errorMessage);
  const isLoading = useStatus((state) => state.loading);
  const pathName = usePathname();

  const getUserData = async () => {
    const user = await getUser();

    setUserEmail(user.data.user?.email);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className=" flex justify-between items-center p-4">
      <div className=" flex gap-8">
        <h1 className="text-sm opacity-50">Beta v0.0012</h1>
        <div className="flex justify-start items-center gap-2 cursor-pointer ">
          {isLoading ? (
            <div></div>
          ) : (
            <>
              {" "}
              <div
                className={`w-3 h-3 ${
                  status ? "bg-red-500" : "bg-green-500"
                } rounded-full opacity-60`}
              ></div>
              <Tooltip content={Message ? Message : "No errors so far"}>
                <h3>{!status ? "All systems good" : "Error somewhere"}</h3>
              </Tooltip>
            </>
          )}
        </div>
      </div>
      {pathName === "/dashboard/tabsdocs" ? (
        <div className=" flex justify-center items-center gap-4">
          <h3>{wordCount} words</h3>
          <h3>{charCount} Character</h3>
        </div>
      ) : (
        ""
      )}

      {pathName === "/dashboard" ? (
        <div className=" flex justify-center items-center gap-4">
          <h3>{userEmail ? userEmail : "Loading..."}</h3>
        </div>
      ) : (
        ""
      )}

      <div>
        <div className=" opacity-70 flex justify-center items-center gap-4">
          <Weather />
          <Divider orientation="vertical" className="h-5" />
          <Clock />
        </div>
      </div>
    </div>
  );
};

export default Footer;
