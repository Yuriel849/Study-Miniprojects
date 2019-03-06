// The WHATWG method of working with URLs returns the query string as the searchParams object
    /* searchParams object is useful because...
        the WHATWG method automatically turns the query string into the searchParams object
        the older Node method requires the querystring module to turn the query string into an easily useable object
     */

const { URL } = require('url');

const myURL = new URL('https://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');

console.log('searchParams : ', myURL.searchParams);
console.log('searchParams.getAll() : ', myURL.searchParams.getAll('category')); // 'category'라는 key에 해당하는 모든 값을 가져온다.
console.log('searchParams.get() : ', myURL.searchParams.get('limit')); // 'limit'라는 key에 해당하는 값 중 1번째를 가져온다.
console.log('searchParams.has() : ', myURL.searchParams.has('page')); // 'page'라는 key가 있는지 true OR false로 알려준다.

console.log('searchParams.keys() : ', myURL.searchParams.keys()); // searchParams의 모든 key를 가져온다.
console.log('searchParams.values() : ', myURL.searchParams.values()); // searchParams의 모든 값을 가져온다.

myURL.searchParams.append('filter', 'es3'); // 'filter'라는 key와 'es3'라는 값을 추가한다. 같은 key가 있다면 값을 하나 추가한다.
myURL.searchParams.append('filter', 'es5');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.set('filter', 'es6'); // 'filter'라는 키의 모든 값을 지우고 'es6'로 새로 추가한다.
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.delete('filter'); // 'filter'라는 키와 값을 제거한다.
console.log(myURL.searchParams.getAll('filter'));

console.log('searchParams.toString() : ', myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();
// toString() -> searchParams 객체를 다시 문자열로 만든다 -> 문자열을 myURL.search에 대입하면 주소 객체에 반영된다.