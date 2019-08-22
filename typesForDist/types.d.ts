import { JSXInternal } from './jsx.d'
export = pdfmakejsx
export as namespace pdfmakejsx

/*
  This technique to get JSX types on the distributed package is inpired by
  https://github.com/preactjs/preact/blob/master/src/index.d.ts

  Difficulty was to get TS to that this is the JSX flavour we are talking about
*/

declare namespace pdfmakejsx {
  export import JSX = JSXInternal
  interface HText {
    type: 'text'
    text: string
  }
  
  interface HElement {
    type: 'element'
    tagName: string
    attributes: object
    children: (HElement | HText)[]
  }
  
  type HResult = HElement | HText

  function h(data: any): HResult

  function toDocumentDefinition(data: HResult): any

  namespace h {
    export import JSX = JSXInternal;
  }

}