# turnout

## usage
```js
var router = require('../')()

require('http').createServer(function (req, res) {
    router(req, res, function () {
    res.statusCode = 404
    res.end()
    })
}).listen()

router.post('/todo/:id', function (req, res, params, query) {})

router.put('/todo/:id/:state', function (req, res, params, query) {})

router.get('/user/:id', function (req, res, params, query) {})

router.del('/user/:id', function (req, res, params, query) {})
```

## install
    $ npm install turnout

## test [![Build Status](https://secure.travis-ci.org/ramitos/turnout.png)](http://travis-ci.org/ramitos/turnout)

    $ npm test

## api

### methods

###### get
```js
router.get('/', callback)
``` 
###### post
```js
router.post('/', callback)
```
###### put
```js
router.put('/', callback)
```
###### delete
```js
router.del('/', callback)
```
### path

###### path
```js
router.get('/todo/:id', callback)
```
###### regexp
```js
router.get(/\/todo\/(\d*?)/, callback)
```
### params
```js
router.get('/todo/:id', function (req, res, params) {
  assert(params.id === '5')
})

request.get('http://address:port/todo/5')
``` 
### query
```js
router.get('/todos/:state', function (req, res, params, query) {
  assert(query.priority === 'urgent')
})

request.get('http://address:port/todo/completed?priority=urgent')
```
## credits
 * The API is inspired by [TJ Holowaychuk](https://github.com/visionmedia)'s [express](https://github.com/visionmedia/express).
 * The path regular expression function comes from [TJ Holowaychuk](https://github.com/visionmedia)'s [express](https://github.com/visionmedia/express). The copyright is present.

## license
    Copyright (C) 2012 Sérgio Ramos <mail@sergioramos.me>
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
    documentation files (the "Software"), to deal in the Software without restriction, including without limitation the 
    rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit 
    persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the 
    Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE 
    WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
    OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.