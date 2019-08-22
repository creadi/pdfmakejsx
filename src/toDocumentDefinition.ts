import {
  ERROR
} from './strings'
import { HResult } from './types'
const convert = ({ type, tagName, attributes, children }: HResult) => {

}

const parentElementIsPdf = ({ type, tagName }: HResult): boolean =>
  type === 'element' && tagName === 'pdf'

export default (data: HResult) => {
  if (!parentElementIsPdf(data)) {
    throw new Error(ERROR.parentIsNotPdf)
  }
  return {
    ...data.attributes,
  }
}