/**
 * Created by johnsonb on 10/1/2015.
 */
'use strict';

var Transform = require('stream').Transform;
var crypto = require('crypto');


module.exports = class HashTransform extends Transform {
    constructor(algorithm, encoding) {
        if(algorithm == null) {
            throw new Error('algorithm can not be null');
        } else {
            var hashes = crypto.getHashes();
            var idx = hashes.indexOf(algorithm);
            if(idx < 0) {
                throw new Error('invalid hash algorithm');
            }
        }

        super();
        this._hash = crypto.createHash(algorithm);
        this._encoding = encoding || 'hex';
        this.result = null;
    }

    _transform(chunk, encoding, done){
        this._hash.update(chunk);
        done(null, chunk);
    }

    _flush(done){
        this.result = this._hash.digest(this._encoding);
        done();
    }

    get hash(){
        return this.result;
    }
};