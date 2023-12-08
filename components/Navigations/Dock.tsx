"use client";

import { Tooltip } from "@nextui-org/react";
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
  Home,
  ListTodo,
  MessageCircle,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { FC, useRef } from "react";

interface DockProps {}

const Dock: FC<DockProps> = ({}) => {
  let mouseY = useMotionValue(Infinity); // Change from mouseX to mouseY
  let heightSync = useTransform(mouseY, [0, 300], [40, 80]); // Change from width to height
  let height = useSpring(heightSync);

  const Apps = [
    {
      name: "Home",
      icon: <Home className={`w-7 h-7`} />,
      path: "/dashboard",
    },
    {
      name: "Tabs Docs",
      icon: <FileText className={`w-7 h-7`} />,
      path: "/dashboard/tabsdocs",
    },
    {
      name: "Tabs Plan",
      icon: <FolderKanban className={`w-7 h-7`} />,
      path: "/dashboard/tabsplan",
    },

    {
      name: "Tabs ToDo",
      icon: <ListTodo className={`w-7 h-7`} />,
      path: "/dashboard/tabstodo",
    },
    {
      name: "Tabs Brain",
      icon: <BrainCircuit className={`w-7 h-7`} />,
      path: "/",
    },
    {
      name: "Tabs Chat",
      icon: <MessageCircle className={`w-7 h-7  `} />,
      path: "/",
    },
    {
      name: "Tabs Settings",
      icon: <Settings className={`w-7 h-7`} />,
      path: "/dashboard/settings",
    },
  ];
  return (
    <div
      onMouseMove={(e) => {
        mouseY.set(e.pageY); // Change from e.pageX to e.pageY
      }}
      onMouseLeave={() => mouseY.set(Infinity)}
      className="mx-auto w-16 flex flex-col items-center justify-center gap-4 rounded-2xl bg-[#0f0f0f] backdrop-blur-md border p-4"
    >
      {Apps.map((i, idx) => (
        <AppIcon
          key={idx}
          mouseY={mouseY} // Change from mouseX to mouseY
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
  mouseY: MotionValue; // Change from mouseX to mouseY
  link: any;
  icon: any;
  name: any;
}
function AppIcon({ mouseY, link, icon, name }: AppIconProps) {
  let ref = useRef<HTMLDivElement>(null);
  let distance = useTransform(mouseY, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });
  let heightSync = useTransform(distance, [-200, 0, 200], [40, 60, 40]); // Change from width to height
  let height = useSpring(heightSync, {
    damping: 15,
    mass: 0.1,
    stiffness: 200,
  });

  let scaleSync = useTransform(distance, [-150, 0, 150], [0.8, 0.9, 0.8]);
  let scale = useSpring(scaleSync, { damping: 15, mass: 0.1, stiffness: 200 });

  return (
    <motion.div
      style={{ height: height, scale: scale }} // Change from width to height
      ref={ref}
      className="aspect-square h-10 rounded-full bg-[#1c1c1c] flex justify-center items-center"
    >
      <Tooltip showArrow={true} content={name} placement="right">
        <Link
          href={link}
          className="flex justify-center items-center w-full h-full outline-none"
        >
          {icon}
        </Link>
      </Tooltip>
    </motion.div>
  );
}
