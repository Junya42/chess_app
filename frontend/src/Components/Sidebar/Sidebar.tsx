import { Divider } from "@chakra-ui/react";
import { BiHome, BiLeftArrow, BiRightArrow, BiSolidBook } from "react-icons/bi";
import { WiDaySunny } from "react-icons/wi";
import { FaChess } from "react-icons/fa";
import { TbAnalyzeFilled } from "react-icons/tb";
import SideButton, { OpenButton } from "./Button";
import { useState } from "react";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);

  const containerClass = "backdrop-blur-sm bg-black/30 fixed left-10 top-20 h-4/5 border py-6 border-solid border-slate-800 flex flex-col items-center justify-between";

  const openClass = "my-4 w-80 flex justify-between items-center";

  return (
    <motion.div
      animate={{ width: open ? "16rem" : "6.5rem",
                alignItems: open ? "flex-start" : "flex-start",
              }}
      className={containerClass}>
      <div className="flex flex-col items-start">
        <SideButton label="Home" IconLink={BiHome} open={open} />
        <SideButton label="Play" IconLink={FaChess} open={open} />
        <SideButton label="Learn" IconLink={BiSolidBook} open={open} />
        <SideButton label="Spectate" IconLink={TbAnalyzeFilled} open={open} />
        <motion.div 
          animate={{width: open ? "17.5rem" : "8rem"}}
          className={openClass}>
          <Divider className="ml-4" />
          <OpenButton onClick={() => {setOpen(!open)}} label="Open" IconLink={open ? BiLeftArrow : BiRightArrow}/>
        </motion.div>
      </div>
      <SideButton label="LightMode" IconLink={WiDaySunny} open={open} />
    </motion.div>
  );
};

export default Sidebar;
