import { propOr, propEq, omit } from 'ramda'
import {
  ERROR
} from './strings'
import { HResult, HElement, HText } from './types'

const isElement = (data: HResult): data is HElement =>
  data.type === 'element'

const isText = (data: HResult): data is HText =>
  data.type === 'text'

const handleChild = (child: HResult) =>
  isText(child) ? child.text : convert(child)

const convert = (data: HResult) => {
  if (isElement(data)) {
    const { tagName, attributes, children } = data
    const simpleTags = [
      'text',
      'columns',
      'stack',
      'ol',
      'ul',
    ]
    if (simpleTags.includes(tagName)) {
      return {
        [tagName]: children.map(handleChild),
        ...attributes,
      }
    }
    if (tagName === 'image') {
      return {
        image: propOr('', 'src', attributes),
        ...omit(['src'], attributes),
      }
    }
    if (tagName === 'table') {
      return {
        layout: propOr(undefined, 'layout', attributes),
        table: {
          body: children
            .filter(propEq('tagName', 'row'))
            .filter(isElement)
            .map(({ children }) => children.map(handleChild)),
          ...omit(['layout'], attributes)
        }
      }
    }
    return null
  }
  return null
}

const parentElementIsPdf = (data: HResult): boolean => {
  if (isText(data)) {
    return false
  }
  return data.type === 'element' && data.tagName === 'pdf'
}

export default (data: HResult) => {
  if (isElement(data) && parentElementIsPdf(data)) {
    return {
      ...data.attributes,
      content: data.children.map(convert).filter(Boolean)
    }
  }
  throw new Error(ERROR.parentIsNotPdf)
}