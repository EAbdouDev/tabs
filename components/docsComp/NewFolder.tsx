"use client";
import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, Input } from "@nextui-org/react";

interface NewFolderProps {}

const NewFolder: FC<NewFolderProps> = ({}) => {
  const [name, setName] = useState("");
  return (
    <Dialog>
      <DialogTrigger className=" py-2 px-4 font-medium bg-white text-black rounded-lg hover:opacity-80 transition-all ease-soft-spring">
        New Folder
      </DialogTrigger>
      <DialogContent className=" border-2">
        <DialogHeader className=" mb-4">
          <DialogTitle>New Folder</DialogTitle>
        </DialogHeader>
        <Input
          className=" w-full"
          variant="bordered"
          placeholder="Folder name..."
          onChange={(e) => setName(e.target.value)}
          value={name}
        ></Input>

        <div className=" flex justify-end w-full">
          <Button color="primary" className="">
            Create{" "}
            {name
              ? `"${name.substring(0, 6)}${name.length > 5 ? "..." : ""}"`
              : ""}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewFolder;
