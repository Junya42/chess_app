import "../App.scss";
import Signup from "../Modals/Signup/Signup";
import ParticleBackground from "../Background/ParticuleBackground";

function Auth() {

  return (
	<div className="All">
		<div className="App">
			<Signup />
		</div>
		<ParticleBackground />
	</div>
  )
}

export default Auth;