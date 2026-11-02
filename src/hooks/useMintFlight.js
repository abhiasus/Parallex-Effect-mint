import { useEffect } from "react";

// smooth zigzag: cosine-ease x between waypoints, by page y
const xAt = (path, y) => {
  let x = path[0].x;
  for (let k = 0; k < path.length - 1; k++) {
    const a = path[k], b = path[k + 1];
    if (b.y > a.y && y >= a.y && y <= b.y) {
      const f = (y - a.y) / (b.y - a.y);
      return a.x + (b.x - a.x) * (1 - Math.cos(Math.PI * f)) / 2;
    }
    if (y > b.y) x = b.x;
  }
  return x;
};

// page position of an element's centre, ignoring CSS transforms (AOS animates them)
const pageCenter = (el) => {
  let x = 0, y = 0, n = el;
  while (n) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
  return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 };
};

export default function useMintFlight({ app, mint, img, dot, slot, scenes }) {
  useEffect(() => {
    const data = { path: [], start: null, end: null, maxS: 0 };

    const tick = () => {
      const { path, start, end, maxS } = data;
      if (!path.length) return;
      const sy = window.scrollY, vh = window.innerHeight;
      const t = Math.min(sy / (vh * 0.6), 1);
      const e = 1 - (1 - t) * (1 - t);
      const extra = Math.max(0, end.y - (maxS + vh * 0.5));
      const p = Math.min(Math.max((sy - (maxS - vh * 0.6)) / (vh * 0.6), 0), 1);
      const y = Math.min(sy + start.y + (vh * 0.5 - start.y) * e + extra * p, end.y);
      const x = xAt(path, y);
      const settle = Math.min(Math.max((end.y - y) / 140, 0), 1); // straightens up when it lands
      const tilt = -Math.atan2(xAt(path, y + 10) - x, 10) * 57.3 * settle;
      const s = start.s + (1 - start.s) * e;
      mint.current.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${s})`;
      img.current.style.transform = `rotate(${tilt}deg)`;
    };

    const measure = () => {
      const sy = window.scrollY, W = app.current.clientWidth;
      const r = dot.current.getBoundingClientRect();
      data.start = { x: r.left + r.width / 2, y: r.top + sy + r.height / 2, s: r.width / mint.current.offsetWidth };
      const mids = scenes.current.map((el, i) => {
        const b = el.getBoundingClientRect();
        return { y: b.top + sy + b.height / 2, x: W * (i % 2 === 0 ? 0.74 : 0.26) };
      });
      data.end = pageCenter(slot.current);
      data.maxS = document.documentElement.scrollHeight - window.innerHeight;
      data.path = [data.start, ...mids, data.end].sort((a, b) => a.y - b.y);
      mint.current.style.opacity = 1;
      tick();
    };

    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(app.current);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      ro.disconnect();
    };
  }, []);
}