import { flatten } from 'ramda'
import { HResult } from './types'

const isArrayOfArrays = (data: any): boolean => {
  if (Array.isArray(data)) {
    return !data.map(Array.isArray).includes(false)
  }
  return false
}

export const h = (...args: any[]): HResult => {
  const [tag, attributes, ...children] = args
  return {
    type: 'element',
    tagName: tag,
    attributes: attributes || {},
    children: isArrayOfArrays(children)
      ? flatten(children)
      : children.map(d => d.type && d.type === 'element' ? d : { type: 'text', text: d })
  }
}