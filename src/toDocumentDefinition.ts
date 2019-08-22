import { pathEq, prop, propOr, propEq, pipe, omit, find } from 'ramda'
import { ERROR, WARN } from './strings'
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

const getElementChildren = (tagName: string, data: HElement): HResult[] =>
  propOr([], 'children', find(pathEq(['tagName'], tagName), prop('children', data)))

const elementsOutsideContainers = (data: HElement) => {
  if (data.children.map(isText).length > 0) {
    return true
  }
  const containers = ['content', 'footer', 'header']
  const elements = data.children
    .filter(isElement).map(prop('tagName'))
    .filter(el => !containers.includes(el))
  if (elements.length > 0) {
    return true
  }
  return false
}


export default (data: HResult) => {
  if (isElement(data) && parentElementIsPdf(data)) {
    if (elementsOutsideContainers(data)) {
      console.warn(WARN.elementsOutsideContainers)
    }
    return {
      ...data.attributes,
      content: getElementChildren('content', data).map(convert).filter(Boolean),
      footer: getElementChildren('footer', data).map(convert).filter(Boolean),
      header: getElementChildren('footer', data).map(convert).filter(Boolean),
    }
  }
  throw new Error(ERROR.parentIsNotPdf)
}