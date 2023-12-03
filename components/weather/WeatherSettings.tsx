"use client";
import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import WeatherData from "./WeatherData";
import { getCookie } from "cookies-next";
import { Badge } from "@components/ui/badge";

interface WeatherSettingsProps {}

const WeatherSettings: FC<WeatherSettingsProps> = ({}) => {
  const [city, setCity] = useState<any>("");

  useEffect(() => {
    const cityInCooike = getCookie("city");
    setCity(cityInCooike);
  }, [city]);

  return (
    <div className=" w-full">
      <div className=" mb-10">
        <h1 className=" text-2xl font-semibold">Weather Settings</h1>
      </div>

      <div>
        {city ? (
          <div>
            <h1 className=" text-xl flex justify-start items-center gap-4">
              Your city: <Badge className=" text-lg">{city}</Badge>
            </h1>
          </div>
        ) : (
          <h1>No City to Show</h1>
        )}
      </div>

      <div className=" mt-8 flex justify-start items-center gap-8">
        <Dialog>
          <DialogTrigger className=" text-lg bg-[#161616] px-3 py-2 rounded-xl hover:opacity-75 transition-all ease-soft-spring">
            Change City
          </DialogTrigger>
          <DialogContent className=" max-h-[50rem] max-w-[50rem] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add new city</DialogTitle>
            </DialogHeader>

            <WeatherData />
          </DialogContent>
        </Dialog>

        <h1 className=" text-sm opacity-40">
          Refresh the page when changing the city
        </h1>
      </div>
    </div>
  );
};

export default WeatherSettings;
