import { HResult } from './types'

export const h = (...args: any[]): HResult => {
  const [tag, attributes, ...children] = args
  return {
    type: 'element',
    tagName: tag,
    attributes: attributes || {},
    children: children.map(d => d.type && d.type === 'element' ? d : { type: 'text', text: d })
  }
}

