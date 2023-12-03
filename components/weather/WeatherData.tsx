"use client";
import Image from "next/image";
import axios from "axios";
import { FormEvent, useCallback, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Weather from "./WeatherCard";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function WeatherData() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`;

  const fetchWeather = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCookie("city", city, { maxAge: 2147483647 });

    axios.get(url).then((response) => {
      setWeather(response.data);
      // console.log(response.data);
    });
    setCookie("W_data", JSON.stringify(weather), { maxAge: 2147483647 });
    setLoading(false);
    router.push(pathname + "?" + createQueryString("tab", "tw"));

    const serializedWeatherData = getCookie("W_data");

    if (serializedWeatherData) {
      // Deserialize the string to an object using JSON.parse
      const weatherData = JSON.parse(serializedWeatherData);

      console.log(weatherData);
    }
  };

  if (loading) {
    return "Loading...";
  } else {
    return (
      <div className=" mt-4">
        {/* Search */}
        <div className="w-full">
          <form onSubmit={fetchWeather} className=" w-full">
            <div>
              <Input
                onChange={(e) => setCity(e.target.value)}
                className="w-full"
                type="text"
                placeholder="Search city..."
                variant="bordered"
              />
            </div>
          </form>
        </div>

        {/* Weather */}
        {weather.main && <Weather />}
      </div>
    );
  }
}
