// The util module contains varoius convenient functions

const util = require('util');
const crypto = require('crypto');

// util.deprecate(function, message) -> Prints the given message when the given function is fired
const dontUseMe = util.deprecate((x, y) => {
    console.log(x + y);
}, 'dontUseMe 함수는 deprecated 되었으니 더 이상 사용하지 마세요!');
dontUseMe(1,2);

// util.promisify(callback) -> changes the given callback into a promise
const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
    .then((buf) => {
        console.log(buf.toString('base64'));
    })
    .catch((error) => {
        console.error(error);
    });