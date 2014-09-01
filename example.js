var distributeStream = require('./')
var http = require('http')
var hyperquest = require('hyperquest')
var JSONStream = require('JSONStream')
var ldj = require('ldjson-stream')

var server1 = http.createServer(function(req, res) {
  req.on('data', function(data) {
    console.log('server 1:', data.toString())
  })
}).listen(6001)

var server2 = http.createServer(function(req, res) {
  req.on('data', function(data) {
    console.log('server 2:', data.toString())
  })
}).listen(6002)

var stream = distributeStream([
  hyperquest.post('http://localhost:6001'),
  hyperquest.post('http://localhost:6002')
])

hyperquest('http://www.whitehouse.gov/facts/json/all/all')
  .pipe(JSONStream.parse('*'))
  .pipe(ldj.serialize())
  .pipe(stream)
