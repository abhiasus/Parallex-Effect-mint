import capsule from "../assets/image/tic tac.png";

export default function FlyingMint({ mintRef, imgRef }) {
  return (
    <div className="mint" ref={mintRef} aria-hidden="true">
      <img ref={imgRef} src={capsule} alt="" />
    </div>
  );
}