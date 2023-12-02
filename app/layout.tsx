import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextThemesUI from "@/components/Themes/NextThemesUI";
import ThemeProviderNext from "@/components/Themes/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tabs",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextThemesUI>
          <ThemeProviderNext>{children}</ThemeProviderNext>
          <Toaster />
        </NextThemesUI>
      </body>
    </html>
  );
}
