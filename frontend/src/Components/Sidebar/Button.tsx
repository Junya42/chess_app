import React from "react"; // Import React
import { IconButton } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { motion } from "framer-motion";

interface ButtonProps {
  label: string;
  IconLink: IconType;
  open: boolean;
}

interface OpenButtonProps {
  label: string;
  IconLink: IconType;
  onClick: () => void;
}

export function OpenButton({ onClick, label, IconLink }: OpenButtonProps) {
  return (
    <IconButton
      aria-label={label}
      borderColor="white"
      color="white"
      variant="ghost"
      className="sticky"
      _hover={{
        borderColor: "blue.600",
        color: "blue.600",
      }}
      onClick={onClick}
    >
      <IconLink />
    </IconButton>
  );
}

const SideButton: React.FC<ButtonProps> = ({ label, IconLink, open }) => {
  const color = label === "LightMode" ? "yellow.300" : "purple.600";
  const openColor =
    label === "LightMode"
      ? "my-6 hover:text-white"
      : "my-6 hover:text-purple-600";

  if (!open) {
    return (
      <IconButton
        aria-label={label}
        borderColor="white"
        color="white"
        variant="outline"
        isRound={true}
        className="my-4 mx-8"
        _hover={{
          borderColor: `${color}`,
          color: `${color}`,
        }}
      >
        <IconLink />
      </IconButton>
    );
  }
  return (
    <button className="flex text-slate-200">
      <IconButton
        aria-label={label}
        borderColor="white"
        color="white"
        variant="outline"
        isRound={true}
        className="my-4 mx-8"
        _hover={{
          borderColor: `${color}`,
          color: `${color}`,
        }}
      >
        <IconLink />
      </IconButton>
      <motion.div
        animate={{
          scale: open ? "1" : "0",
          width: open ? "auto" : "0",
          height: open ? "auto" : "0",
        }}
        className={openColor}
      >
        {label}
      </motion.div>
    </button>
  );
};

export default SideButton;
