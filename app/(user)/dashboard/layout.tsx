import { FC } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserNavbar from "@components/Navigations/UserNavbar";
import Dock from "@components/Navigations/Dock";
import Footer from "@components/Navigations/Footer";
import WeatherProvider from "@components/Themes/WeatherProvider";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = async ({ children }) => {
  const cookiestore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiestore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/userauth/login");
  }
  return (
    <WeatherProvider>
      <div className="min-h-screen flex flex-col h-screen">
        <header className="">
          {" "}
          <UserNavbar />
        </header>
        {/* <!-- main container --> */}
        <div className="flex-1 flex flex-row overflow-y-hidden">
          <main className="flex-1  overflow-y-auto p-6 border-l">
            {children}
          </main>

          <nav className="order-first sm:w-24  overflow-y-auto flex justify-center items-center">
            <Dock />
          </nav>

          <aside className="sm:w-64 hidden lg:flex   overflow-y-auto border-l p-2">
            <h1 className=" text-lg font-medium">Recent Events </h1>
          </aside>
        </div>
        {/* <!-- end main container --> */}

        <footer className=" border-t h-14 overflow-hidden">
          <Footer />
        </footer>
      </div>
    </WeatherProvider>
  );
};

export default layout;
