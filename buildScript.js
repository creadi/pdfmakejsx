const fs = require('fs')

/*
  This technique to get JSX types on the distributed package is inpired by
  https://github.com/preactjs/preact/blob/master/src/index.d.ts

  Difficulty was to get TS to understand that this is the JSX flavour we are talking about
*/


const jsxTypes = fs.readFileSync('src/jsx.d.ts', 'utf-8')
fs.writeFileSync(
  'dist/jsx.d.ts',
  jsxTypes.split('declare namespace JSX {').join('export namespace JSXInternal {'),
  'utf-8'
)

// this part should be updated if API changes

const mainTypes = `
import { JSXInternal } from './jsx.d'
export = pdfmakejsx
export as namespace pdfmakejsx

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
`
fs.writeFileSync(
  'dist/types.d.ts',
  mainTypes,
  'utf-8'
)
