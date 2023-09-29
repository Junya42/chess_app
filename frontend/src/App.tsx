import "./App.scss";
import Navbar from "./Navbar/Navbar";
import Aside from "./Aside/Aside";
import Footer from "./Footer/Footer";
import MainManager from "./Main/MainManager";
import { useState } from "react";
import Signup from "./Modals/Signup/Signup";

function App() {

  const [ page, setPage ] = useState<string>("Home");
  
  return (
    <div className="App">
      <Navbar setPage={setPage}/>
      <Aside />
      <MainManager page={page}/>
      <Footer />
      <Signup />
    </div>
  )
}

export default App;