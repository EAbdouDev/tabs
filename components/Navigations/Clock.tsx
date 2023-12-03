"use client";

import { FC, useEffect, useState } from "react";
import moment from "moment";

interface ClockProps {}

const Clock: FC<ClockProps> = ({}) => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return;

    () => clearInterval(interval);
  }, []);

  function formatDate(date: any) {
    return moment(date).format("DD/MM/YYYY • hh:mm A");
  }
  return <div> {formatDate(dateTime)}</div>;
};

export default Clock;
