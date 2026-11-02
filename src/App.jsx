import { useEffect, useRef } from "react";
import AOS from "aos";
import Hero from "./components/Hero.jsx";
import Scene from "./components/Scene.jsx";
import Finale from "./components/Finale.jsx";
import FlyingMint from "./components/FlyingMint.jsx";
import useMintFlight from "./hooks/useMintFlight.js";
import { SCENES } from "./data/content.js";

export default function App() {
  const app = useRef(null);
  const mint = useRef(null);
  const img = useRef(null);
  const dot = useRef(null);
  const slot = useRef(null);
  const scenes = useRef([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    AOS.init({ duration: 800, once: true, offset: 90, disable: reduce });
  }, []);

  useMintFlight({ app, mint, img, dot, slot, scenes });

  return (
    <div className="app" ref={app}>
      <Hero dotRef={dot} />
      {SCENES.map((s, i) => (
        <Scene
          key={s.title}
          {...s}
          side={i % 2 ? "r" : "l"}
          innerRef={(el) => (scenes.current[i] = el)}
        />
      ))}
      <Finale slotRef={slot} />
      <FlyingMint mintRef={mint} imgRef={img} />
    </div>
  );
}