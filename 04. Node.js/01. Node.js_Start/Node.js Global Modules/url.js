// The url module is used to work with URLs
const url = require('url');

/* There are 2 methods of manipulating URLs -> WHATWG & the older Node.js method
        BUT WHATWG method is incapable of handling URLs without the host info (ex) "/book/bookList.apsx")
        WHATWG method turns the query string into a special object, the "searchParams"
 */

const URL = url.URL;
const myURL = new URL('https://www.google.com/search?client=firefox-b-d&q=node+js');
    /* URL constructor
        url 모듈에 포함
        URL 생성자에 주소를 넣어서 객체를 만들면, 객체에는 주소가 부분별로 정리되어 있다! (WHATWG 방식의 URL)
     */

// WHATWG method (url module's URL constructor + url.format(obj))
console.log('new URL() : ', myURL);
console.log('url.format() : ', url.format(myURL));
console.log('----------------------------------------');

// Older Node.js method (url.parse(addr) + url.format(obj))
const parsedUrl = url.parse('https://www.google.com/search?client=firefox-b-d&q=node+js')
console.log('url.parse() : ', parsedUrl);
console.log('url.format() : ', url.format(parsedUrl));

/* url.format(obj)
    분해되었던 url 객체를 다시 원래 상태(하나의 주소)로 조립한다.
 */