import HeyComp from "@components/dashboardHome/HeyComp";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <header>
        <HeyComp />
      </header>
    </div>
  );
};

export default page;
