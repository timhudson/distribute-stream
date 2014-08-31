var Writable = require('readable-stream').Writable
var util = require('util')

util.inherits(DistributeStream, Writable)

function DistributeStream(streams, options) {
  if (!(this instanceof DistributeStream))
    return new DistributeStream(streams, options)

  this.streams = Array.isArray(streams) ? streams : [streams]
  this.options = options || {}
  this.options.select = this.options.select || function() {
    return Math.floor(Math.random() * streams.length)
  }

  Writable.call(this, options)
}

DistributeStream.prototype._write = function(data, enc, cb) {
  var stream = this.streams[this.options.select()]
  stream.write(data)
  if (cb) cb()
}

DistributeStream.prototype.end = function(data, enc, cb) {
  if (data) this._write(data, enc)

  this.streams.forEach(function(stream) {
    stream.end()
  })

  return Writable.prototype.end.call(this)
}

module.exports = DistributeStream
