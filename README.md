
# next-loop
[![Inline docs](http://inch-ci.org/github/Cereceres/next.svg?branch=master)](http://inch-ci.org/github/Cereceres/next)
[![Circle CI](https://circleci.com/gh/Cereceres/next.svg?style=svg)](https://circleci.com/gh/Cereceres/next)

[![Build Status](https://travis-ci.org/Cereceres/next.svg?branch=master)](https://travis-ci.org/Cereceres/next)


next for JavaScript

# Installing

```bash
$ npm install next
```

# Getting starter

```js

let Next = require( 'next' )
let next = new Next() // you can pass a object to next constructor
// that will be used or passed as thisArg to every generator.
```
# Usage

Create

```js
let count = 0
//the generator are called with a arg and next, what is the next generator
let fun1 = function* ( arg, next ) {
  // every generator is evaluated with the arguments
  // passed when the event was emitted and the last
  // param is the next generator in the array listener
  // or handler event.
  count++
  // every generator is wrapper with co
  let res = yield Promise.resolve( 4 )
  assert.equal( res, 4 )
  //this statement pass the control flow to next generator in the array
  yield next
  assert.equal( arg, {a:3})
}

let fun2 = function* ( arg ) {
  // the last generator in the array not receive the
  // next generator.
  count++
  let res = yield Promise.resolve( '54' )
  assert.equal( res, '54' )
  assert.equal.deep( arg, {a:3} )
}
next.on( 'test', fun1, fun2 ) // returns itself, you can pass as many generators as you need queue
next.emit( 'test',{a:3}) // return a promise that is resolved when every generator is finish
// every error is catched and the promise is rejected with that error. Also error event is amitted when this
// error is catched
// every generator is called with arg={a:3}

assert.equal( count,2 )
// count is equal to generator number
// the emitter property is a EventEmitter instance self,
// where every method and property affect to Next instance too.
// Also can use once method exposed to Next to use generators wrapper
// with co.
```
### `Class Next`
#### `Next([thisArg])`
To instance the next you can pass a thisArg object what will be passed to every generator as thisArg.

### `Instance Co-eventemitter`
#### `next.on(String,Function[,Function...])`
This method added the Functions passed to event Handler of event given(String). Returns itself.

#### `next.once(String,Function[,Function...])`
This method added the Functions passed to event Handler of event given(String) to be emitted only one time. Returns itself.

#### `next.emit(String,Object[,Object...])`
This method emit the event event given(String) and pass every Object argument to every constructor. Returns a promise that is resolved when the every generator of event is finished or rejected if a error happen. If a error is through the error event is emitted or if a listener is not found the event "NotListener" also is through and the promise is resolved with the arguments passed when the event was emitted.

#### `next.emitter`
Instance of EventEmitter, every change here affect to next instance.

#### `next.events`
Object where the keys are the events added and values are arrays with the listers generators to every event.

#### `next.ctx`
thisArg passed to every generator, this is the same passed to constructor and can be
upgraded at any time.

# Testing

Running the tests

```bash
npm test
```


## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.  For any bugs report please contact to me via e-mail: cereceres@ciencias.unam.mx.

## Licence
The MIT License (MIT)

Copyright (c) 2015 Jesús Edel Cereceres.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
