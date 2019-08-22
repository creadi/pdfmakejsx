import c from './try'
import dd from './toDocumentDefinition'

console.log(c.children[0])
console.log('---')
console.log(JSON.stringify(dd(c), null, 1))