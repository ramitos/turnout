var interpolate = require('util').format,
    test = require('specced')(),
    join = require('path').join,
    router = require('../')(),
    blage = require('blage')

test.timeout = 10000

test.specs = {
  routing: require('./specs/routing'),
  params: require('./specs/params'),
  query: require('./specs/query')
}

test.before = function (helpers, callback) {
  var onRequest = blage(router)
  var address = require('http').createServer(onRequest).listen().address()
  helpers.address = interpolate('http://%s:%s', address.address, address.port)
  helpers.router = router
  callback()
}

test.run(function (e) {
  console.log('tests not passed')
  process.exit(1)
}, function () {
  console.log('all passed')
  process.exit(0)
})