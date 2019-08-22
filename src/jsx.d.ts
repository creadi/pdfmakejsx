// pdfmake types

type Margins = number | [number, number] | [number, number, number, number]

type PageSize = '4A0' | '2A0' | 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9' | 'A10'
  | 'B0' | 'B1' | 'B2' | 'B3' | 'B4' | 'B5' | 'B6' | 'B7' | 'B8' | 'B9' | 'B10'
  | 'C0' | 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6' | 'C7' | 'C8' | 'C9' | 'C10'
  | 'RA0' | 'RA1' | 'RA2' | 'RA3' | 'RA4'
  | 'SRA0' | 'SRA1' | 'SRA2' | 'SRA3' | 'SRA4'
  | 'EXECUTIVE' | 'FOLIO' | 'LEGAL' | 'LETTER' | 'TABLOID'

type Alignment = 'left' | 'right' | 'justify' | 'center'

// from https://github.com/bpampuch/pdfmake/blob/master/examples/textDecorations.js
type Decoration = 'underline' | 'lineThrough' | 'overline'
type DecorationStyle = 'dashed' | 'dotted' | 'double' | 'wavy'

// element properties

interface PdfProps {
  pageMargins?: Margins
  pageOrientation?: 'portrait' | 'landscape'
  pageSize?: PageSize | { width: number; height: number }
}

interface Style {
  font?: string
  fontSize?: number
  fontFeatures?: any // ??
  bold?: boolean
  italics?: boolean
  alignment?: Alignment
  color?: string
  //columnGap?: any;
  fillColor?: string
  decoration?: Decoration
  decorationStyle?: DecorationStyle
  decorationany?: any // ?
  decorationColor?: string
  background?: any // ??
  lineHeight?: number
  characterSpacing?: number
  noWrap?: boolean
  markerColor?: string
  leadingIndent?: any // ??
  width?: number | 'auto' | '*'
  margins?: number[]
  pageBreak?: 'before' | 'after'
}

interface ColumnsProps extends Style {
  columnGap?: number
}

interface ImageProps {
  src: string
  width?: number
  height?: number
  fit?: [number, number]
  pageBreak?: 'before' | 'after'
  opacity?: number
}

// jsx

declare namespace JSX {
  interface IntrinsicElements {
    pdf: PdfProps
    text: Style
    columns: ColumnsProps
    stack: Style
    ul: Style
    ol: Style
    image: ImageProps
  }
}