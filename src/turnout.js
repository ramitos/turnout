var format = require('./format'),
    qs = require('querystring'),
    regex = require('./regex'),
    url = require('url')
    
var build = function () {
  var routes = {};
  new Array('get', 'post', 'put', 'delete').forEach(function (method) {
    routes[method] = {}
  })
  return routes
}

var route = function (req, res, routes, fallback) {
  var method = req.method.toLowerCase()
  var parsedurl = url.parse(req.url)
  var querystring = parsedurl.query
  var query = qs.parse(querystring)
  var pathname = parsedurl.pathname
  var callback = null
  var params = {}
      
  Object.keys(routes[method]).forEach(function (route) {
    var keys = []
    var rexp = regex(route, keys, false, false)
    var match = pathname.match(rexp)
    if(!match) return
    
    match.shift()
    callback = routes[method][route]
    
    match.forEach(function (param, index) {
      params[keys[index].name] = param
    })
  })
  
  if(!callback) fallback()
  else callback(req, res, params, query)
}

module.exports = function () {
  var routes = build()
  
  var turnout = function (req, res, next) {
    route(req, res, routes, next)
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
    return format.routes(routes)
  }
  
  return turnout
}