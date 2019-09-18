import { is, pathEq, prop, propOr, propEq, omit, find } from 'ramda'
import { ERROR } from './strings'
import { HResult, HElement, HText } from './types'

const isElement = (data: HResult): data is HElement =>
  data.type === 'element'

const isText = (data: HResult): data is HText =>
  data.type === 'text'

const handleChild = (child: HResult) => {
  if (is(Number, child)) {
    return String(child)
  }
  if (is(String, child)) {
    return child
  }
  return isText(child) ? String(child.text) : convert(child)
}

const isCanvasElement = (data: HElement): boolean =>
  [
    'rect',
    'polyline',
    'ellipse',
    'line',
  ].includes(data.tagName)

const convert = (data: HResult) => {
  if (isElement(data)) {
    const { tagName, attributes, children } = data
    const simpleTags = [
      'columns',
      'ol',
      'stack',
      'text',
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
        ...attributes,
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
    if (tagName === 'canvas') {
      return {
        canvas: children
          .filter(isElement)
          .filter(isCanvasElement)
          .map(({ tagName, attributes }) => ({
            type: tagName,
            ...attributes,
          }))
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

export default (data: HResult) => {
  if (isElement(data) && parentElementIsPdf(data)) {
    return {
      ...data.attributes,
      content: getElementChildren('content', data).map(convert).filter(Boolean),
      footer: getElementChildren('footer', data).map(convert).filter(Boolean),
      header: getElementChildren('header', data).map(convert).filter(Boolean),
      background: getElementChildren('background', data).map(convert).filter(Boolean),
    }
  }
  throw new Error(ERROR.parentIsNotPdf)
}