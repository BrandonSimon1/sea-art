import logo from "./logo.svg";
import "./App.css";
import { cos, sin } from "mathjs";
import { path } from "d3-path";
import { useLayoutEffect, useState } from "react";

function Water({ x, y, width, height, waves, ...props }) {
  const waveWidth = width / waves;
  const r = waveWidth / 2;
  const p = path();
  p.moveTo(x, y);
  p.lineTo(x, y + height);
  p.lineTo(x + width, y + height);
  p.lineTo(x + width, y);
  for (let i = 0; i < waves; i++) {
    p.arc(x + width - waveWidth * i - r, y, r, 0, Math.PI, false);
  }
  const pathString = p.toString();
  return <path d={pathString} {...props} />;
}

function useSineJitter(initial, updateInterval, width, duration, startAngle) {
  const [value, setValue] = useState(startAngle !== undefined ? width * sin(startAngle) + initial : initial);
  const [angle, setAngle] = useState(startAngle !== undefined ? startAngle : Math.random() * 2 * Math.PI);
  useLayoutEffect(() => {
    setTimeout(() => {
      setValue(width * sin(angle) + initial);
      setAngle(angle + (Math.PI / duration) * updateInterval);
    }, updateInterval);
  }, [initial, updateInterval, width, angle, duration]);
  return value;
}

function Sun({
  x,
  y,
  r,
  rayDistance,
  rayWidth,
  rayLength,
  fill,
  rays,
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} />
      {Array(rays)
        .fill(0)
        .map((_, i) => (
          <rect
            key={i}
            y={y - rayWidth / 2}
            x={x + r + rayDistance}
            fill={fill}
            width={rayLength}
            height={rayWidth}
            transform={`rotate(${(360 / rays) * i} ${x} ${y})`}
          />
        ))}
    </g>
  );
}

function App() {
  const water1x = useSineJitter(-0.5, 10, 0.5, 3000);
  const water2x = useSineJitter(-0.5, 10, 0.5, 3000);
  const water3x = useSineJitter(-0.5, 10, 0.5, 3000);
  const water1y = useSineJitter(70, 10, 0.5, 3000);
  const water2y = useSineJitter(75, 10, 0.5, 3000);
  const water3y = useSineJitter(80, 10, 0.5, 3000);
  const value4 = useSineJitter(50, 10, 50, 60000, 3 * Math.PI / 2);
  const value5 = useSineJitter(50, 10, 40, 30000, Math.PI / 2);
  return (
    <svg
      viewBox="0 0 100 100"
      width="100vw"
      height="100vh"
      preserveAspectRatio="none"
    >
      <Sun
        x={value4}
        y={value5}
        r={2}
        rays={7}
        rayDistance={1}
        rayWidth={1}
        rayLength={3}
        fill="gold"
      />
      <Water
        x={water1x}
        y={water1y}
        width={101}
        height={50}
        fill="lightblue"
        waves={30}
      />
      <Water
        x={water2x}
        y={water2y}
        width={101}
        height={50}
        fill="blue"
        waves={30}
      />
      <Water
        x={water3x}
        y={water3y}
        width={101}
        height={50}
        fill="darkblue"
        waves={30}
      />
    </svg>
  );
}

export default App;
