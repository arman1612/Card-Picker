// import React from "react";

const playsound = () => {
  try {
    const audio = new Audio(require("./sounds/starting_sound.wav"));
    audio.play();
  } catch (error) {
    console.error("Error playing sound:", error);
  }
};

export default playsound;
