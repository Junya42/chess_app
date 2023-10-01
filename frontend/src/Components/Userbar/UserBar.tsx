import { Avatar, ButtonGroup, IconButton } from "@chakra-ui/react";
import { AiOutlineLogout } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { motion } from "framer-motion";

const UserBar = () => {
  const username = sessionStorage.getItem("username") as string;

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("username");
    window.location.reload();
  };

  return (
    <div className="backdrop-blur-3xl bg-black/30 fixed right-10 top-10 w-72 border-solid border border-slate-800 rounded-full flex items-center justify-center shadow-inner">
      <div className="w-full grid justify-center">
        <p className="text-white text-lg px-10em">{username}</p>
        <ButtonGroup className="px-10em">
          <motion.button whileHover={{ rotate: -90 }}>
            <IconButton
              aria-label="Logout"
              colorScheme="whiteAlpha"
              variant="outline"
              _hover={{
                borderColor: "red.400",
                color: "red.400",
              }}
              onClick={handleLogout}
            >
              <AiOutlineLogout />
            </IconButton>
          </motion.button>
          <motion.button whileHover={{ rotate: 360}}>
            <IconButton
              aria-label="Settings"
              colorScheme="whiteAlpha"
              type="button"
              variant={"solid"}
            >
              <CiSettings />
            </IconButton>
          </motion.button>
        </ButtonGroup>
      </div>
      <Avatar
        className="relative right-0 border-2"
        size="xl"
        name="Dan Abrahmov"
        src="https://i.imgur.com/9HQbDEe.gif"
      />
    </div>
  );
};

export default UserBar;
