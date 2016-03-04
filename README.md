
# next-loop
[![Inline docs](http://inch-ci.org/github/Cereceres/co-Eventemitter.svg?branch=master)](http://inch-ci.org/github/Cereceres/co-Eventemitter)
[![Circle CI](https://circleci.com/gh/Cereceres/co-Eventemitter.svg?style=svg)](https://circleci.com/gh/Cereceres/co-Eventemitter)


next for JavaScript

# Installing

```bash
$ npm install next-loop
```

# Getting starter

```js

let Next = require( 'next-loop' )
let next = new Next() // you can pass a object to next constructor
// that will be used or passed as thisArg to every function.
```
# Usage

Create

```js
let count = 0
//the function are called with a arg and next, what is the next function
let fun1 = function* ( arg, next ) {
  // every function is evaluated with the arguments
  // passed when the event was emitted and the last
  // param is the next function in the array listener
  // or handler event.
  count++
  let res = next( 3 * arg )
  return res
}

let fun2 = function* ( arg ) {
  // the last function in the array receive the
  // next function that exec again  the first function in the array
  count++
  let res
  count++
  if ( arg < 100 ) {
    res = next( 2 * arg )
  } else {
    res = arg
  }
  return res
}
next.on( 'test', fun1, fun2 ) // returns itself, you can pass as many functions as you need queue
next.emit( 'test',4).then(function (res) {
  assert.equal( res, 432 )
}) // return a promise that is resolved when every function is finish
assert.equal( count,6 )
// count is equal to function number
// the emitter property is a EventEmitter instance self,
// where every method and property affect to Next instance too.
// Also can use once method exposed to Next to use functions wrapper
// with co.
```
### `Class Next-loop`
#### `Next([thisArg])`
To instance the next you can pass a thisArg object what will be passed to every function as thisArg.

### `Instance Next-loop`
#### `next.on(String,Function[,Function...])`
This method added the Functions passed to event Handler of event given(String). Returns itself.

#### `next.once(String,Function[,Function...])`
This method added the Functions passed to event Handler of event given(String) to be emitted only one time. Returns itself.

#### `next.emit(String,Object[,Object...])`
This method emit the event event given(String) and pass every Object argument to every constructor. Returns a promise that is resolved when the every function of event is finished or rejected if a error happen. If a error is through the error event is emitted or if a listener is not found the event "NotListener" also is through and the promise is resolved with the arguments passed when the event was emitted.

#### `next.emitter`
Instance of EventEmitter, every change here affect to next instance.

#### `next.events`
Object where the keys are the events added and values are arrays with the listers functions to every event.

#### `next.ctx`
thisArg passed to every function, this is the same passed to constructor and can be
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
