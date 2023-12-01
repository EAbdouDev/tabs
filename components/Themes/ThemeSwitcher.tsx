"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="w-full"
    >
      {resolvedTheme === "dark" ? (
        <p className="dark:hover:bg-[#313131]  flex justify-start items-center gap-2 w-full hover:bg-slate-100  px-2 py-2 rounded-lg transition-all ease-in-out text-sm lg:text-base ">
          <p className="text-xl xl:text-2xl" title="Switch to light mode">
            <HiOutlineSun />
          </p>{" "}
        </p>
      ) : (
        <p className="dark:hover:bg-[#313131] flex justify-start items-center gap-2 w-full hover:bg-slate-100  px-2 py-2 rounded-lg transition-all ease-in-out text-sm lg:text-base ">
          <p className=" text-xl xl:text-2xl" title="Switch to dark mode">
            <HiOutlineMoon />
          </p>{" "}
        </p>
      )}
    </button>
  );
}
