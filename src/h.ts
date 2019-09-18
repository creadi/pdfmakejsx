import { is, flatten } from 'ramda'
import { HResult } from './types'

export const h = (...args: any[]): HResult => {
  const [tag, attributes, ...rest] = args
  if (is(Function, tag)) {
    return tag(attributes, rest)
  }
  const children = rest || []
  return {
    type: 'element',
    tagName: tag,
    attributes: attributes || {},
    children: flatten(children).map(d => d.type && d.type === 'element' ? d : { type: 'text', text: d })
  }
}