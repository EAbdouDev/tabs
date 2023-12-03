"use client";
import { FC, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import * as NProgress from "nprogress";
import { usePathname, useRouter } from "next/navigation";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProviderNext: FC<ThemeProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    NProgress.done();
  }, [pathname, router]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderNext;
