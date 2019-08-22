/* @jsx h */
import { h } from './h'


export default <pdf pageMargins={20} pageOrientation="landscape" pageSize="A4">
  <table layout="noBorders" widths={[50, '*']}>
    <row>
      <text>A</text>
      <text>B</text>
    </row>
    <row>
      <text>1</text>
      <text>2</text>
    </row>
  </table>
</pdf>
