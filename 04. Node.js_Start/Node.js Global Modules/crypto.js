// The crypto module provides various methods of encryption

/* 단방향 암호화
        비밀번호는 보통 "단방향 암호화" 알고리즘 사용 -> 복호화 불가능한 암호화 
        단방향 암호화는 주로 해시 기법 (어떤 문자열을 고정된 길이의 문자열로 다른 문자열로 바꾸는 것) 사용
 */

const crypto = require('crypto');

// Node.js hash algorithm
console.log('base64 : ', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex : ', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64 : ', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));
    /*
        crypto.createHash(algorithm) -> Create hash algorithm with the given encryption algorithm
        crypto.update(string) -> Encrypt the given string
        crypto.digest(encoding) -> Encodes the string with the given encoding
     */

// Use pbkdf2 algorithm to encrypt passwords
    // "pbkdf2" : Adds a string called "salt" to the string, before repeatedly encrypting with the hash algorithm
crypto.randomBytes(64, (err, buf) => { // crypto.randomBytes -> creates a 64-byte-long string -> this is the "salt"
    const salt = buf.toString('base64');
    console.log('salt : ', salt);
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
        console.log('password : ', key.toString('base64'));
    });
    /*
        Takes the string '비밀번호' and adds the salt to it, before encrypting it with the sha512 algorithm.
        The result of the encryption is a 64-byte-long string, and this is encrypted again with the sha512 algorithm.
        The string is encryped 100,000 times, after which the callback is fired.
     */
});
