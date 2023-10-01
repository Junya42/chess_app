import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import Board from "../../zMain/Board/Board";

export default function Main() {
  const [sliderValue, setSliderValue] = useState<number>(44);

  const ParentClass = `fixed place-self-center grid`;
  const ChildClass = `backdrop-blur-sm bg-black/30 place-self-center`;

  return (
    <motion.div
      layout
      style={{
        width: sliderValue + 4 + "rem",
        height: sliderValue + 4 + "rem",
      }}
      className={ParentClass}
    >
      <div
        style={{
          width: sliderValue + "rem",
          height: sliderValue + "rem",
        }}
        className={ChildClass}
      >
		<Board />
	  </div>
      <Slider
        min={30}
        max={55}
        aria-label="slider-ex-2"
        colorScheme="pink"
        onChange={(val) => setSliderValue(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </motion.div>
  );
}
