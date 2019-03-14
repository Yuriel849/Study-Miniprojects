// The crypto module provides various methods of encryption

/* 양방향 암호화
        양방향 대칭형 암호화는 복호화 가능한 암호화 -> 암호화할 때 key가 만들어진다!
        복호화하려면 암호화할 때 사용한 key와 똑같은 key가 필요하다.

        양방향 비대칭 암호화, HMAC 등 다양한 암호화 방식이 있다.
            "https://nodejs.org/api/crypto.html"에서 확인할 수 있다.
 */

const crypto = require('crypto');

console.log(crypto.getCiphers()); // 사용가능한 암호화 알고리즘 목록 출력

    // crypto.createCipher(알고리즘, 키)
const cipher = crypto.createCipher('aes-256-cbc', '열쇠');
    // cipher.update(문자열, 문자열의 인코딩, 출력인코딩)
let result = cipher.update('암호화할 문장', 'utf8', 'base64');
    // cipher.final(출력인코딩) -> 암호화 완료!
result += cipher.final('base64');
console.log('암호화 : ', result);

    // crypto.createDecipher(알고리즘, 키) -> 암호화할 때 사용한 알고리즘 & 키와 똑같아야 한다!
const decipher = crypto.createDecipher('aes-256-cbc', '열쇠');
    // decipher.update(암호화된 문자열, 문자열의 인코딩, 출력인코딩)
let result2 = decipher.update(result, 'base64', 'utf8');
    // decipher.final(출력인코딩) -> 복호화 완료!
result2 += decipher.final('utf8');
console.log('복호화 : ', result2);