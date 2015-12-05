# hash-transform

Hash transform that creates a hash (checksum) from an input stream leaving stream unchanged and is then able to be piped to input of another stream.
>hash-transform is written in **ecma6** so I would recommend running nodejs v4.0 or greater (no harmony flag needed)

## installation

`$ npm install hash-transform`

##test

`$ npm test`

## usage

###constructor

`new HashTransform(algorithm[, encoding]);`

###hashing file stream

```javascript

var HashTransform = require('hash-transform');
var path = require('path');
var fs = require('fs');

var file = path.resolve('./test/data/test.txt');
var alg = 'sha256';

var hash = new HashTransform(alg);
var fi = fs.createReadStream(file);

fi.pipe(hash).pipe(process.stdout);

hash.on('end', function(){
	console.log(hash.hash);	
});
```


## license

MIT
