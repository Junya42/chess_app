import "./new.scss";
import Navbar from "./Navbar/Navbar";
import Aside from "./Aside/Aside";
import Footer from "./Footer/Footer";
import MainManager from "./Main/MainManager";
import { useState } from "react";
import Signup from "./Modals/Signup/Signup";
import ParticleBackground from "./Background/ParticuleBackground";

function App() {

	const [ page, setPage ] = useState<string>("Home");

	if (!sessionStorage.getItem("access_token")) {
		return (
			<h1>TOKEN NOT FOUND IN SESSION STORAGE</h1>
		);
	}
	const access_token = JSON.parse(sessionStorage.getItem("access_token") as string);

	console.log(access_token);

  
  return (
	<div className="All">
		<div className="App">
			<Navbar setPage={setPage}/>
			<Aside />
			<MainManager page={page}/>
			<Footer />
		</div>
		<ParticleBackground />
	</div>
  )
}

export default App;