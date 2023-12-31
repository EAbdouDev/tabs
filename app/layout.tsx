import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextThemesUI from "@/components/Themes/NextThemesUI";
import ThemeProviderNext from "@/components/Themes/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

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
          <ThemeProviderNext>
            <NextTopLoader
              color="#0a5ffc"
              initialPosition={0.08}
              crawlSpeed={200}
              showSpinner={false}
              height={3}
              crawl={true}
              easing="ease-in-out"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
              zIndex={1600}
            />
            {children}
          </ThemeProviderNext>
          <Toaster />
        </NextThemesUI>
      </body>
    </html>
  );
}
