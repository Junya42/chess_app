import "./new.scss";
import { useMemo, useState } from "react";
import ParticleBackground from "./Background/ParticuleBackground";
import UserBar from "./Components/Userbar/UserBar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Main from "./Components/Main/Main";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

function App() {
  const [hue, setHue] = useState<number>(260);
  const [saturation, setSaturation] = useState<number>(40);
  const [lightness, setLightness ] = useState<number>(5);
  const [alpha, setAlpha] = useState<number>(5);
  const particleBackground = useMemo(
    () => <ParticleBackground hueState={hue} saturationState={saturation} lightnessState={lightness} alphaState={0.1 * alpha}/>,
    [hue, saturation, lightness, alpha]
  );

  if (!sessionStorage.getItem("access_token")) {
    return null;
  }

  return (
    <div className="All">
      <div className="App">
        <UserBar />
        <Sidebar />
        <Main />
        <div className="fixed right-10 top-[50%] w-36 h-20">
          <Slider
            min={0}
            max={359}
            aria-label="slider-ex-2"
            colorScheme="pink"
            onChange={(val) => setHue(val)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </div>

        <div className="fixed right-10 top-[55%] w-36 h-20">
          <Slider
            min={0}
            max={100}
            aria-label="slider-ex-2"
            colorScheme="pink"
            onChange={(val) => setSaturation(val)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </div>

        <div className="fixed right-10 top-[60%] w-36 h-20">
          <Slider
            min={0}
            max={100}
            aria-label="slider-ex-2"
            colorScheme="pink"
            onChange={(val) => setLightness(val)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </div>

        <div className="fixed right-10 top-[65%] w-36 h-20">
          <Slider
            min={1}
            max={10}
            aria-label="slider-ex-2"
            colorScheme="pink"
            onChange={(val) => setAlpha(val)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </div>

      </div>
      {particleBackground}
    </div>
  );
}

export default App;
