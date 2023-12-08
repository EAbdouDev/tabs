"use client";

import Account from "@components/Settings/Account";
import AcoountSkel from "@components/Settings/AcoountSkel";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FC, useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import DeleteAccount from "@components/Settings/DeleteAccount";
import WeatherData from "@components/weather/WeatherData";
import WeatherSettings from "@components/weather/WeatherSettings";
import { useSearchParams } from "next/navigation";
import Weather from "@components/weather/WeatherCard";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [session, setSession] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState<any>("Profile");
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      <div className="Header container p-6  ">
        <h1 className=" text-3xl font-semibold ">User Settings</h1>
      </div>

      <div className="flex w-full flex-col container mt-2  p-6  min-h-[500px] ">
        <Tabs
          aria-label="Options"
          variant="underlined"
          classNames={{
            tabList:
              "gap-8 w-full relative rounded-none p-0 border-b border-divider ",
            cursor: "w-full bg-[#fafcfc]",
            tab: "max-w-fit px-0 h-12",
            tabContent:
              "group-data-[selected=true]:text-[#fafcfc] group-data-[selected=true]:font-semibold text-base",
          }}
        >
          <Tab key="Profile" title="My Profile">
            <div className=" flex flex-col justify-center items-center mt-10 gap-6">
              {!session ? (
                <AcoountSkel />
              ) : (
                <Account key={session.user.id} session={session} />
              )}

              <DeleteAccount />
            </div>
          </Tab>

          <Tab key="Plan" title="My Plan">
            <div className=" flex justify-center items-center mt-10">
              Plan Setting and billing
            </div>
          </Tab>
          <Tab key="appearance" title="Appearance">
            <div className=" flex justify-center items-center mt-6">
              Appearance Settings and App theme{" "}
            </div>
          </Tab>
          <Tab key="tw" title="Time and Weather">
            <div className=" flex justify-center items-center mt-6">
              <WeatherSettings />

              <Weather />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
