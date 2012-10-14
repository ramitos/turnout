var interpolate = require('util').format,
    request = require('request'),
    assert = require('assert')

module.exports = function (helpers, callback) {
  var state = {}
  var on = {}

  var check = function (method) {
    state[method] = true
    if(state.post && state.del && state.get && state.put) callback()
  }

  on.post = function (req, res, params, query) {
    assert(req.method.toLowerCase() === 'post')
    assert(req.url === '/')
    res.end()
    check('post')
  }

  on.del = function (req, res, params, query) {
    assert(req.method.toLowerCase() === 'delete')
    assert(req.url === '/')
    res.end()
    check('del')
  }

  on.get = function (req, res, params, query) {
    assert(req.method.toLowerCase() === 'get')
    assert(req.url === '/')
    res.end()
    check('get')
  }

  on.put = function (req, res, params, query) {
    assert(req.method.toLowerCase() === 'put')
    assert(req.url === '/')
    res.end()
    check('put')
  }

  helpers.router.post('/', on.post)
  helpers.router.get('/', on.get)
  helpers.router.del('/', on.del)
  helpers.router.put('/', on.put)

  request.post(helpers.address)
  request.get(helpers.address)
  request.put(helpers.address)
  request.del(helpers.address)
}