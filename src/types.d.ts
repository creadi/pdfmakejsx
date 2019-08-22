interface HText {
  type: 'text'
  text: string
}

interface HElement {
  type: 'element'
  tagName: string
  attributes: object
  children: (Element | HText)[]
}

export type HResult = HElement