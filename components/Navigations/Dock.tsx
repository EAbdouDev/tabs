"use client";

import {
  useMotionValue,
  useTransform,
  motion,
  MotionValue,
  useSpring,
} from "framer-motion";
import {
  BrainCircuit,
  CloudLightning,
  FileText,
  FolderKanban,
  ListTodo,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { FC, useRef } from "react";

interface DockProps {}

const Dock: FC<DockProps> = ({}) => {
  let mouseX = useMotionValue(Infinity);
  let widthSync = useTransform(mouseX, [0, 300], [40, 80]);
  let width = useSpring(widthSync);

  const Apps = [
    {
      name: "Tabs Docs",
      icon: <FileText className={`w-7 h-7`} />,
      path: "/",
    },
    {
      name: "Tabs Plan",
      icon: <FolderKanban className={`w-7 h-7`} />,
      path: "/",
    },
    {
      name: "Tabs Weather",
      icon: <CloudLightning className={`w-7 h-7`} />,
      path: "/",
    },
    {
      name: "Tabs ToDo",
      icon: <ListTodo className={`w-7 h-7`} />,
      path: "/",
    },
    {
      name: "Tabs Brain",
      icon: <BrainCircuit className={`w-7 h-7`} />,
      path: "/",
    },
    {
      name: "Tabs Chat",
      icon: <MessageCircle className={`w-7 h-7`} />,
      path: "/",
    },
  ];
  return (
    <div
      onMouseMove={(e) => {
        mouseX.set(e.pageX);
      }}
      onMouseLeave={() => mouseX.set(Infinity)}
      className=" mx-auto h-16 flex justify-center items-end pb-3  gap-4 rounded-2xl bg-[#0f0f0f] backdrop-blur-md border p-4"
    >
      {Apps.map((i, idx) => (
        <AppIcon
          key={idx}
          mouseX={mouseX}
          link={i.path}
          name={i.name}
          icon={i.icon}
        />
      ))}
    </div>
  );
};

export default Dock;

interface AppIconProps {
  mouseX: MotionValue;
  link: any;
  icon: any;
  name: any;
}
function AppIcon({ mouseX, link, icon, name }: AppIconProps) {
  let ref = useRef<HTMLDivElement>(null);
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });
  let widthSync = useTransform(distance, [-200, 0, 200], [40, 85, 40]);
  let width = useSpring(widthSync, { damping: 15, mass: 0.1, stiffness: 200 });

  // MotionValue for scale
  let scaleSync = useTransform(distance, [-200, 0, 200], [0.8, 1, 0.8]);
  let scale = useSpring(scaleSync, { damping: 15, mass: 0.1, stiffness: 200 });

  return (
    <motion.div
      style={{ width: width, scale: scale }}
      ref={ref}
      className=" aspect-square w-10   rounded-full bg-[#1c1c1c] flex justify-center items-center"
    >
      <Link
        href={link}
        className=" flex justify-center items-center w-full h-full "
      >
        {icon}
      </Link>
    </motion.div>
  );
}
