/* @jsx h */
import { h } from './h'


export default <pdf pageMargins={0} pageOrientation="landscape" pageSize="A4">
  <content>
    <canvas>
      <line x1={0} x2={300} y1={0} y2={300} />
      <rect x={100} y={200} w={300} h={50} color="blue"/>
      <polyline points={[{x: 100, y: 0}, { x: 350, y: 0 }, { x: 300, y: 300 }]} closePath={true} color="green" />
      <ellipse x={200} y={200} r1={100} r2={50} color="red" />
    </canvas>
  </content>
</pdf>
