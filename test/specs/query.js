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
    assert(req.url === '/user/5/21?q1=2&q2=t')
    assert(query.q1 === '2')
    assert(query.q2 === 't')
    res.end()
    check('post')
  }
  
  on.del = function (req, res, params, query) {
    assert(req.method.toLowerCase() === 'delete')
    assert(req.url === '/user/5?q1=3&q2=t')
    assert(query.q1 === '3')
    assert(query.q2 === 't')
    res.end()
    check('del')
  }
  
  on.get = function (req, res, params, query) {
    assert(req.method.toLowerCase() === 'get')
    assert(req.url === '/user/5/age?q1=3&q2=t')
    assert(query.q1 === '3')
    assert(query.q2 === 't')
    res.end()
    check('get')
  }
  
  on.put = function (req, res, params, query) {
    assert(req.method.toLowerCase() === 'put')
    assert(req.url === '/user/admin?q1=3&q2=t')
    assert(query.q1 === '3')
    assert(query.q2 === 't')
    res.end()
    check('put')
  }

  helpers.router.post('/user/:id/:age', on.post)
  helpers.router.get('/user/:id/age', on.get)
  helpers.router.del('/user/:id', on.del)
  helpers.router.put('/:type/:subtype', on.put)

  request.post(interpolate('%s/user/5/21?q1=2&q2=t', helpers.address))
  request.get(interpolate('%s/user/5/age?q1=3&q2=t', helpers.address))
  request.put(interpolate('%s/user/admin?q1=3&q2=t', helpers.address))
  request.del(interpolate('%s/user/5?q1=3&q2=t', helpers.address))
}