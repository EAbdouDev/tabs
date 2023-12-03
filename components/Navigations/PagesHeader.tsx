import { FC } from "react";

interface PagesHeaderProps {
  text: string;
}

const PagesHeader: FC<PagesHeaderProps> = ({ text }) => {
  return (
    <h1 className=" w-fit text-xl md:text-2xl 2xl:text-3xl font-semibold ">
      {text}
    </h1>
  );
};

export default PagesHeader;
