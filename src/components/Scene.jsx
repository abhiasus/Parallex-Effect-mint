export default function Scene({ bg, title, text, side, innerRef }) {
  return (
    <section className={`stop ${bg} ${side}`} ref={innerRef}>
      <div className="card" data-aos={side === "r" ? "fade-left" : "fade-right"}>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </section>
  );
}