module.exports.routes = function (routes) {
  var returns = new Array()
  var obj = new Object()
  
  Object.keys(routes).forEach(function (method) {
    Object.keys(routes[method]).forEach(function (route) {
      if(!obj[route]) obj[route] = [method]
      else obj[route].push(method)
    })
  })
    
  Object.keys(obj).forEach(function (route) {
    var topush = {}
    topush[route] = obj[route]
    returns.push(topush)
  })
  
  return returns
}