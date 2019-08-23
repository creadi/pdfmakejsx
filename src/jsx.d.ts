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

type TableRowFunction = (row: number) => number

type TableLayoutString = 'noBorders' | 'headerLineOnly' | 'lightHorizontalLines'

interface TableLayoutFunctions {
  hLineWidth?: (i: number, node: any) => number
  vLineWidth?: (i: number, node: any) => number
  hLineColor?: (i: number, node: any) => string
  vLineColor?: (i: number, node: any) => string
  fillColor?: (i: number, node: any) => string
  paddingLeft?: (i: number, node: any) => number
  paddingRight?: (i: number, node: any) => number
  paddingTop?: (i: number, node: any) => number
  paddingBottom?: (i: number, node: any) => number
}

type Width = number | 'auto' | '*'

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
  width?: Width
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

interface TableProps {
  dontBreakRows?: boolean
  headerRows?: number
  heights?: number[] | TableRowFunction
  layout?: TableLayoutString | TableLayoutFunctions
  widths?: Width[]
}

interface CanvasCommonProps {
  lineWidth?: number
  lineColor?: string
  dash?: { length?: number, space?: number }
  strokeOpacity?: number
}

interface CanvasStrokeProps extends CanvasCommonProps {
  lineCap?: 'square' | 'round'
}

interface CanvasPolygonProps extends CanvasCommonProps {
  lineCap?: 'square' | 'round'
  color?: string
  fillOpacity?: number
  linearGradient?: string[]
}

interface CanvasRectProps extends CanvasPolygonProps {
  x: number
  y: number
  w: number
  h: number
  r?: number
}

interface CanvasPolylineProps extends CanvasStrokeProps, CanvasPolygonProps {
  closePath?: boolean
  points: { x: number, y: number }[]
}

interface CanvasLineProps extends CanvasStrokeProps {
  x1: number
  x2: number
  y1: number
  y2: number
}

interface CanvasEllipseProps extends CanvasPolygonProps {
  x: number
  y: number
  r1: number
  r2: number
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
    table: TableProps
    row: {}
    content: {}
    footer: {}
    header: {}
    canvas: {}
    rect: CanvasRectProps
    polyline: CanvasPolylineProps
    line: CanvasLineProps
    ellipse: CanvasEllipseProps
  }
}