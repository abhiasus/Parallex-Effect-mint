export default function Hero({ dotRef }) {
  return (
    <section className="hero">
      <h1 className="title">
        m<span className="iw">ı<i className="dot" ref={dotRef} /></span>nty
        <br />
        fresh
      </h1>
      <p className="sub">Scroll down and watch the dot drop.</p>
    </section>
  );
}