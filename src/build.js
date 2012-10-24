module.exports = function () {
  var routes = {};
  new Array('get', 'post', 'put', 'delete').forEach(function (method) {
    routes[method] = {}
  })
  return routes
}