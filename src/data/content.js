import mintBox from "../assets/image/Minty Fresh Mint Container.png";
import orangeBox from "../assets/image/Minty Fresh Orange Candy Box.png";
import mixBox from "../assets/image/Minty Fresh Orange Strawberry Mint Mix.png";
import strawBox from "../assets/image/Minty Fresh Strawberry Mint Pack.png";
import orangeTic from "../assets/image/orange tic tac.png";
import pinkTic from "../assets/image/pink tic tac.png";

export const SCENES = [
  { bg: "s1", title: "Fresh in one pop", text: "A tiny sugar-free mint for the gaps between meals, meetings and mornings. One pop, cool breath, back to your day." },
  { bg: "s2", title: "Pressed, polished, tasted", text: "Mint oil and sweetener are blended, pressed into a tiny tablet, then tumbled in a pan until glossy. Every batch is tasted before it is packed." },
  { bg: "s3", title: "Pick your cool", text: "Orange, Mint or Strawberry. Can't decide? The Mix box has all three." },
];

// live = the white scrolling tic tac lands next to this box
export const BOXES = [
  { name: "Orange", box: orangeBox, tics: [orangeTic] },
  { name: "Mint", box: mintBox, tics: [], live: true },
  { name: "Mix", box: mixBox, tics: [orangeTic, pinkTic] },
  { name: "Strawberry", box: strawBox, tics: [pinkTic] },
];