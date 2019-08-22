/* @jsx h */
import { h } from './h'


export default <pdf pageMargins={20} pageOrientation="landscape" pageSize="A4">
  <content>
    {['a', 'b', 'c'].map(d => <text>{d}</text>)}
  </content>
</pdf>
