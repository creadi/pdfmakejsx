import {
  ERROR
} from './strings'
import { HResult, HElement, HText } from './types'

const isElement = (data: HResult): data is HElement =>
  data.type === 'element'

const isText = (data: HResult): data is HText =>
  data.type === 'text'

const convert = (data: HResult) => {
  if (isElement(data)) {
    const { tagName, attributes, children } = data
    switch (tagName) {
      case 'text': return {
        text: children.map(child => isText(child) ? child.text : convert(child)),
        ...attributes,
      }
      case 'columns': return {
        columns: children.map(child => isText(child) ? child.text : convert(child)),
        ...attributes,
      }
      default: return null
    }
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