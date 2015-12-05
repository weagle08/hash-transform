/**
 * Created by johnsonb on 10/1/2015.
 */
'use strict';

var HashTransform = require('../');
var PassThrough = require('stream').PassThrough;
var path = require('path');
var fs = require('fs');
var assert = require('assert');

describe('HashTransformer Unit Test', function(){
    describe('Create hash from stream', function(){
        it('returns correct hash', function(done){
            var file = path.resolve('./test/data/test.txt');
            var alg = 'sha256';

            var hash = new HashTransform(alg);
            var fi = fs.createReadStream(file);
            fi.pipe(hash).pipe(process.stdout);

            hash.on('end', function(){
                assert(hash.hash != null);
                var areEqual = (hash.hash == 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9');
                assert(areEqual, 'hashes are not equal');
                console.log('\n' + hash.hash);
                done();
            });
        });

        it('throws error on incorrect algorithm', function(){
            try {
                var alg = 'sha156';
                var hash = new HashTransform(alg);
            } catch(e){
                assert(e.message == 'invalid hash algorithm');
                console.log('got expected error');
                return;
            }
            assert(false, 'error was expected');
        });
    });
});
