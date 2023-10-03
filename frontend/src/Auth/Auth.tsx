import "../App.scss";
import Signup from "../Modals/Signup/Signup";
import ParticleBackground from "../Background/ParticuleBackground";

function Auth() {

  return (
	<div className="All">
		<div className="App">
			<Signup />
		</div>
		<ParticleBackground hueState={240} saturationState={40} lightnessState={5} alphaState={1}/>
	</div>
  )
}

export default Auth;