"use client";

import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { FC, useEffect } from "react";

interface WeatherProviderProps {
  children: React.ReactNode;
}

const WeatherProvider: FC<WeatherProviderProps> = ({ children }) => {
  const city = getCookie("city");

  useEffect(() => {
    const fetchWeathData = async () => {
      if (city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`;
        axios.get(url).then((response) => {
          setCookie("W_data", JSON.stringify(response.data), {
            maxAge: 2147483647,
          });
        });
      }
    };

    fetchWeathData();
  }, []);

  return <div>{children}</div>;
};

export default WeatherProvider;
