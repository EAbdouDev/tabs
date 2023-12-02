"use client";
import { Skeleton } from "@nextui-org/react";
import { FC } from "react";

interface AcoountSkelProps {}

const AcoountSkel: FC<AcoountSkelProps> = ({}) => {
  return (
    <div className=" w-full flex flex-col justify-start items-start gap-6 p-4 border rounded-lg max-w-[50rem]">
      <div className="UserAvatar flex flex-col sm:flex-row justify-start items-center w-full gap-6">
        <div className="rounded-lg animate-pulse">
          <div className="h-20 w-20 rounded-lg bg-[#2d2d2d]"></div>
        </div>
        <div className="rounded-lg animate-pulse">
          <div className="h-[40px] w-[106px] rounded-lg bg-[#2d2d2d]"></div>
        </div>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-6">
        <div className=" w-full flex flex-col justify-start items-start gap-2">
          <div className="rounded-lg animate-pulse">
            <div className="h-6 w-[100px] rounded-lg bg-[#2d2d2d]"></div>
          </div>
          <div className="rounded-lg w-full animate-pulse">
            <div className="h-16 w-full rounded-lg bg-[#2d2d2d]"></div>
          </div>
        </div>
        <div className=" w-full flex flex-col justify-start items-start gap-2">
          <div className="rounded-lg animate-pulse">
            <div className="h-6 w-[100px] rounded-lg bg-[#2d2d2d]"></div>
          </div>
          <div className="rounded-lg w-full animate-pulse">
            <div className="h-16 w-full rounded-lg bg-[#2d2d2d]"></div>
          </div>
        </div>

        <div className=" flex justify-end items-end w-full mt-2">
          <div className="rounded-l animate-pulse">
            <div className="h-[40px] w-[106px] rounded-lg bg-[#2d2d2d]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcoountSkel;
