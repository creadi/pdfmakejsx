// @ts-ignore
import { JSXInternal } from './jsx'
export = mod
export as namespace mod;

declare namespace mod {
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