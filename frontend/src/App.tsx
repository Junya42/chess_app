import "./new.scss";
/*import Navbar from "./zNavbar/Navbar";
import Aside from "./zAside/Aside";
import Footer from "./zFooter/Footer";
import MainManager from "./zMain/MainManager";
import Signup from "./Modals/Signup/Signup";
import { Avatar, Box, ButtonGroup, IconButton } from "@chakra-ui/react";
import { AiOutlineLogout } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { useState } from "react";*/
import { useMemo } from "react";
import ParticleBackground from "./Background/ParticuleBackground";
import UserBar from "./Components/Userbar/UserBar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Main from "./Components/Main/Main";

function App() {
  //const [page, setPage] = useState<string>("Home");
  const particleBackground = useMemo(() => <ParticleBackground />, []);

  if (!sessionStorage.getItem("access_token")) {
    return <h1>TOKEN NOT FOUND IN SESSION STORAGE</h1>;
  }
  /*const access_token = JSON.parse(
    sessionStorage.getItem("access_token") as string
  );*/

  //console.log(access_token);

  /*
  			<Navbar setPage={setPage}/>
			<Aside />
			<MainManager page={page}/>
			<Footer />
	*/
  return (
    <div className="All">
      <div className="App">
        <UserBar />
        <Sidebar />
        <Main />
      </div>
      {particleBackground}
    </div>
  );
}

export default App;
