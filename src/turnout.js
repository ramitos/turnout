var mr = require('match-route'),
    qs = require('querystring'),
    parse = require('./parse'),
    clone = require('clone'),
    url = require('url')

var defaults = Object()

module.exports = function () {
  var routes = clone(defaults)
  
  var turnout = function (req, res, next) {
    mr(req, routes, function (route, params, query) {
      if(route) route(req, res, params, query)
      else next()
    })
  }
  
  turnout.get = function (path, callback) {
    routes.get[path] = callback
  }
  
  turnout.post = function (path, callback) {
    routes.post[path] = callback
  }
  
  turnout.put = function (path, callback) {
    routes.put[path] = callback
  }
  
  turnout.del = function (path, callback) {
    routes.delete[path] = callback
  }
  
  turnout.routes = function () {
    return parse.routes(routes)
  }
  
  return turnout
}

;new Array('get', 'post', 'put', 'delete').forEach(function (method) {
  defaults[method] = Object()
})