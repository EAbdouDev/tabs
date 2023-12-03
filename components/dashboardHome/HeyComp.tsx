"use client";

import { FC, useEffect, useState } from "react";
import moment from "moment";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface HeyCompProps {}

const HeyComp: FC<HeyCompProps> = ({}) => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return;

    () => clearInterval(interval);
  }, []);

  function formatDate(date: any) {
    return moment(date).format("A");
  }

  const isAm = formatDate(dateTime) === "AM";

  const supabase = createClientComponentClient();

  return (
    <h1 className=" w-fit text-xl md:text-2xl 2xl:text-3xl font-semibold ">
      {isAm ? "Good Morning 👋" : "Good Evening 👋"}
    </h1>
  );
};

export default HeyComp;
