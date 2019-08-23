# pdfmakejsx

Create the [document definition](https://pdfmake.github.io/docs/document-definition-object) for [pdfmake](https://github.com/bpampuch/pdfmake) using [JSX](https://jasonformat.com/wtf-is-jsx/).

## Usage

```
npm install pdfmakejsx
```

### Convert JSX to JS

If you are using typescript, `tsconfig.json` needs `compilerOptions.jsx` to be set to `react`.

You can also add `compilerOptions.jsxFactory` with `h` (default is `React.createElement`) to tell typescript how to interpret TSX files. This is not recommended if you use other JSX libraries in the same codebase. To set the [JSX pragma](https://jasonformat.com/wtf-is-jsx/) on a file to file basis add `/** @jsx h */` at the top of each JSX file.

```tsx
/** @jsx h */
import { h } from 'pdfmakejsx'
```

With a defined `jsxFactory`, just importing `h` is enough.

If you are using [Babel](https://babeljs.io), set the pragma option as explained [here](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#pragma).

### Example

* `pdf.tsx`

```tsx
import { h } from 'pdfmakejsx'

export default (title: string) =>
  <pdf pageOrientation="landscape" pageSize="A4">
    <content>
      <text fontSize={20} bold={true}>{ title }</text>
    </content>
  </pdf>
```

* `try.ts`

```ts
import { toDocumentDefinition } from 'pdfmakejsx'
import pdf from './pdf.tsx'

const page = pdf('Hello')
console.log(toDocumentDefinition(page))
```

`npx ts-node try.ts` logs

```json
{
  "pageOrientation": "landscape",
  "pageSize": "A4",
  "content": [
    {
      "text": [
        "Hello"
      ],
      "fontSize": 20,
      "bold": true
    }
  ]
}
```

This is a document definition that can be passed to `pdfmake`.

**`pdfmakejsx` does not include `pdfmake`, you will have to install that separately.**

### Base elements

`<pdf>` has to be the parent element. It takes only 3 direct children: `<content>`, `<header>` and `<footer>`, any other will be ignored.

The base elements, such as `<text>` above, are as close as possible to the `pdfmake` [specs](https://pdfmake.github.io/docs/document-definition-object/). It is highly recommended to use typescript to let your IDE and compiler tell you which elements and properties are allowed.

However some elements differ slightly form the document definition specs:

* A required `src` property has been added to `<image>`

```jsx
<image src="image.png" width={100}/>
```

becomes

```json
{
  "image": "image.png",
  "width": 100
}
```

* Tables have `<row>` elements

```jsx
<table widths={[200, '*']}>
  <row>
    <text bold={true}>A</text>
    <text bold={true}>B</text>
  </row>
  <row>
    <text>1</text>
    <text>2</text>
  </row>
</table>
```

becomes

```json
{
"table": {
  "body": [
    [
      {"text": ["A"],"bold": true},
      {"text": ["B"],"bold": true}
    ],
    [
      {"text": ["1"]},
      {"text": ["2"]}
    ]
  ],
  "widths": [200,"*"]
}
```


* `<canvas>` has its own internal elements

`<line>`, `<rect>`, `<polyline>` and `<ellipse>` will be ignored if used outside of canvas. So will any other elements inside the canvas.

```jsx
<canvas>
  <line x1={0} x2={300} y1={0} y2={300} />
  <rect x={100} y={200} w={300} h={50} color="blue"/>
  <polyline points={[{x: 100, y: 0}, { x: 350, y: 0 }, { x: 300, y: 300 }]} closePath={true} color="green" />
  <ellipse x={200} y={200} r1={100} r2={50} color="red" />
  <text>Will be ignored</text>
</canvas>
```

becomes

```json
{
  "canvas":[
    {"type":"line","x1":0,"x2":300,"y1":0,"y2":300},
    {"type":"rect","x":100,"y":200,"w":300,"h":50,"color":"blue"},
    {"type":"polyline","points":[{"x":100,"y":0},{"x":350,"y":0},{"x":300,"y":300}],"closePath":true,"color":"green"},
    {"type":"ellipse","x":200,"y":200,"r1":100,"r2":50,"color":"red"}
  ]
}
```
