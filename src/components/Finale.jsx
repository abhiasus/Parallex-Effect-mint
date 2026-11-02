import Pack from "./Pack.jsx";
import { BOXES } from "../data/content.js";

export default function Finale({ slotRef }) {
  return (
    <section className="finale">
      <h2 data-aos="zoom-in">Which box is yours?</h2>
      <div className="packs">
        {BOXES.map((b, i) => (
          <Pack key={b.name} {...b} index={i} slotRef={slotRef} />
        ))}
      </div>
    </section>
  );
}