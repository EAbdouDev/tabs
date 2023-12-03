"use client";

import { FC } from "react";
import Clock from "./Clock";
import Weather from "@components/weather/WeatherCard";
import { Divider } from "@nextui-org/react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
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

  return (
    <div className=" flex justify-between items-center p-4">
      <div>
        <h1 className="text-sm opacity-50">
          Beta v1.0 - client x{randomString}
        </h1>
      </div>
      <div>2</div>
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
