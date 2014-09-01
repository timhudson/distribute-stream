# distribute-stream

Distribute chunks between multiple write streams

```
npm install distribute-stream
```

[![build status](http://img.shields.io/travis/timhudson/distribute-stream.svg?style=flat)](http://travis-ci.org/timhudson/distribute-stream)

## Example

``` js
var fs = require('fs')
var split = require('split2')
var distributeStream = require('./')

fs.createReadStream('path/to/line-delimited.json')
  .pipe(split())
  .pipe(distributeStream([
    someWriteStream,
    someOtherWriteStream
  ]))
```

## License

MIT
