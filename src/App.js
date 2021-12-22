import logo from './logo.svg';
import './App.css';
import {
  compositionDependencies,
  cos, sin
} from 'mathjs'
import { path } from "d3-path";

function SemiCircle({ x, y, width, down, ...props }) {
  const r = width / 2
  let angle
  if (down) {
    angle = 0
  } else {
    angle = 180
  }
  const p = path()
  p.moveTo(x + width, y)
  p.arc(x + r, y, r, angle, angle + Math.PI, false)
  p.moveTo(x + width, y)
  const pathString = p.toString()
  return <path d={pathString} {...props}></path>
}

function App() {
  return (
    <svg viewBox="0 0 100 100" width="100vw" height="100vh" preserveAspectRatio="none">
      <mask x="0" y="0" width="100%" height="100%" id="semiCircleMask">
        <rect x="0" y="70" width="100" height="30" fill="white"></rect>
        {Array(10).fill(0).map((_, i) => <SemiCircle key={i} x={10 * i} y={69} width={10} down={true} fill="black" stroke="none"></SemiCircle>)}
      </mask>
      <rect x="0" y="70" width="100" height="30" fill="blue" mask="url(#semiCircleMask)"></rect>
    </svg>
  );
}

export default App;
