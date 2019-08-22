export interface HText {
  type: 'text'
  text: string
}

export interface HElement {
  type: 'element'
  tagName: string
  attributes: object
  children: (HElement | HText)[]
}

export type HResult = HElement | HText