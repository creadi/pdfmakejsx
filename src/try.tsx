/* @jsx h */
import { h } from './h'


export default <pdf pageMargins={20} pageOrientation="landscape" pageSize="A4">
  <columns columnGap={30}>
    <text width={30}>Hello</text>
    <text width="*" alignment="right">World</text>
  </columns>
</pdf>
