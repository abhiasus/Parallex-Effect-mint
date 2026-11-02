export default function Pack({ name, box, tics, live, slotRef, index }) {
  return (
    <figure className="pack" data-aos="zoom-in-up" data-aos-delay={index * 100}>
      <div className="pack-row">
        <img className="pack-box" src={box} alt={`${name} box`} />
        <div className="pack-tics">
          {live ? (
            <span className="slot" ref={slotRef} /> // white tic tac lands here
          ) : (
            tics.map((t, i) => <img key={i} className="tic" src={t} alt="" />)
          )}
        </div>
      </div>
      <figcaption>{name}</figcaption>
    </figure>
  );
}