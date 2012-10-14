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
  
  on.post = function (req, res, params) {
    assert(req.method.toLowerCase() === 'post')
    assert(req.url === '/user/5/21')
    assert(params.age === '21')
    assert(params.id === '5')
    res.end()
    check('post')
  }
  
  on.del = function (req, res, params) {
    assert(req.method.toLowerCase() === 'delete')
    assert(req.url === '/user/5')
    assert(params.id === '5')
    res.end()
    check('del')
  }
  
  on.get = function (req, res, params) {
    assert(req.method.toLowerCase() === 'get')
    assert(req.url === '/user/5/age')
    assert(params.id === '5')
    res.end()
    check('get')
  }
  
  on.put = function (req, res, params) {
    assert(req.method.toLowerCase() === 'put')
    assert(req.url === '/user/admin')
    assert(params.subtype === 'admin')
    assert(params.type === 'user')
    res.end()
    check('put')
  }
  
  helpers.router.post('/user/:id/:age', on.post)
  helpers.router.put('/:type/:subtype', on.put)
  helpers.router.get('/user/:id/age', on.get)
  helpers.router.del('/user/:id', on.del)
  
  request.post(interpolate('%s/user/5/21', helpers.address))
  request.put(interpolate('%s/user/admin', helpers.address))
  request.get(interpolate('%s/user/5/age', helpers.address))
  request.del(interpolate('%s/user/5', helpers.address))
}