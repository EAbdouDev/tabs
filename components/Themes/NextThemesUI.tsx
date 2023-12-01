"use client";
import { FC } from "react";
import { NextUIProvider } from "@nextui-org/react";

interface NextThemesProps {
  children: React.ReactNode;
}

const NextThemesUI: FC<NextThemesProps> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default NextThemesUI;
