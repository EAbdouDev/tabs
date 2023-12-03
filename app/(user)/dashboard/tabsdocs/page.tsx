import PagesHeader from "@components/Navigations/PagesHeader";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <header>
        <PagesHeader text="Tabs Docs" />
      </header>
    </div>
  );
};

export default page;
