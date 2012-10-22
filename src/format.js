module.exports.routes = function (routes) {
  var returns = new Object()
  
  Object.keys(routes).forEach(function (method) {
    Object.keys(routes[method]).forEach(function (route) {
      if(!returns[route]) returns[route] = [method]
      else returns[route].push(method)
    })
  })
  
  return returns
}