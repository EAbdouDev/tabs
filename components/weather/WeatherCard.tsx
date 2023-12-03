"use client";

import { Tooltip } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const Weather = () => {
  const [city, setCity] = useState(getCookie("city")); // Set a default city
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const cookieData = getCookie("W_data");

    if (cookieData) {
      setData(JSON.parse(cookieData));
    } else {
      // Set default or handle the case when there's no data in the cookie
      setData({});
    }
  }, [city]);

  // Check if data or data.weather is undefined before rendering
  if (!data || !data.weather) {
    return null;
  }

  return (
    <div className=" ">
      {/* Top */}
      <div className=" flex justify-center items-center ">
        {/* <div className="">
          <Image
            src={`http://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`}
            alt="/"
            width="50"
            height="30"
          />
        </div> */}
        <div className=" cursor-pointer">
          <Tooltip content={` ${data.name} - ${data.weather[0]?.main} `}>
            <p className="text-lg">{data.main?.temp?.toFixed(0)}&#176;</p>
          </Tooltip>
          {/* <p className="text-sm ">{data.weather[0]?.main}</p> */}
        </div>
      </div>
      {/* Bottom */}

      {/* <div className="bg-black/50 relative p-8 rounded-md">
        <p className="text-2xl text-center pb-6">Weather in {data.name}</p>
        <div className="flex justify-between text-center">
          <div>
            <p className="font-bold text-2xl">
              {data.main?.feels_like?.toFixed(0)}&#176;
            </p>
            <p className="text-xl">Feels Like</p>
          </div>
          <div>
            <p className="font-bold text-2xl">{data.main?.humidity}%</p>
            <p className="text-xl">Humidity</p>
          </div>
          <div>
            <p className="font-bold text-2xl">
              {data.wind?.speed?.toFixed(0)} MPH
            </p>
            <p className="text-xl">Winds</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Weather;
