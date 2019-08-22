* tsconfig

```js
{
  "compilerOptions": {
    "jsx": "react",
    "noImplicitAny": false, // maybe not necessary but ts did not find JSX at compile time
    // ...
  }
}
```

* types.d.ts

```ts
declare namespace JSX {
  interface IntrinsicElements {
    element: Properties
  }
}
```

* h

```ts
export const h = (...args: any[]) => {
  return args
}
```

---

```jsx
export default <element prop="propValue">data</element>
```

```js
[ 'element', { prop: 'propValue' }, 'data' ]
```

```ts
type Args = [string, object, string]
``` 

---

```jsx
export default <element type="parent">
  <element type="child">data</element>
</element>
```

```js
[
  'element',
  { type: 'parent' },
  [ 'element', { type: 'child' }, 'data' ]
]
```

```ts
type Args = [string, object, [string, object, string]]
``` 

---

```jsx
export default <element type="parent">
  {
    ['a', 'b'].map(data => <element type="child">{data}</element>)
  }
</element>
```

```js
[
  "element",
  {"type":"parent"},
  [
    ["element",{"type":"child"},"a"],
    ["element",{"type":"child"},"b"]
  ]
]
```

```ts
type Args = [string, object, [string, object, string][]]
``` 

---

```jsx
const Component = data =>
  <element type="child">data</element>

export default <element type="parent">
  {
    ['a', 'b'].map(Component)
  }
</element>
```

Same as before

---

```jsx
const Component = data =>
  <element type="child">data</element>

export default <element type="parent">
  {
    ['a', 'b'].map(data => <Component>{data}</Component>)
  }
</element>
```

```js
[ 'element',
  { type: 'parent' },
  [
    [ [Function: Component], null, 'a' ],
    [ [Function: Component], null, 'b' ]
  ]
]
```

```ts
type Args = [string, object, [Function, object | null, string][]]
``` 

Update `h`

```ts
export const h = (...args: any[]) => {
  const [firstArg, props, children] = args
  if (typeof firstArg === 'function') {
    return firstArg(children)
  }
  return args
}
```

```js
[
  "element",
  {"type":"parent"},
  [
    ["element",{"type":"child"},"a"],
    ["element",{"type":"child"},"b"]
  ]
]
```

---

```jsx
const Component = ({ prop }: {prop: string}, children) =>
  <element type="child" prop={prop}>{ children }</element>

export default <element type="parent">
  {
    ['a', 'b'].map(x => <Component prop={x}>data</Component>)
  }
</element>
```

```js
[
  "element",
  {"type":"parent"},
  [
    ["element",{"type":"child"},null],
    ["element",{"type":"child"},null]
  ]
]
```

The components `children` is ignored.

Update `h`

```ts
export const h = (...args: any[]) => {
  const [firstArg, props, children] = args
  if (typeof firstArg === 'function') {
    return firstArg(props, children) // add props
  }
  return args
}
```

This will not work anymore

```jsx
const Component = data =>
  <element type="child">data</element>

export default <element type="parent">
  {
    ['a', 'b'].map(Component)
  }
</element>
```

It should not anyway.

---

```jsx
export default <element type="parent">
  <element></element>
</element>
```

```js
[
  "element",
  {"type":"parent"},
  ["element",null]
]
```