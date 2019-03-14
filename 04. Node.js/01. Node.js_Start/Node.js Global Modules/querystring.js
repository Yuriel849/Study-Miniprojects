/*
    Unlike the WHATWG method of working with URLs, where the searchParams object can be used right away,
        with the older Node method of working with URLs,
        the querystring module must first be used to turn the query string into an easily manipulated object
 */

 const url = require('url');
 const querystring = require('querystring');

 const parsedUrl = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&categortry=javascript');
 const query = querystring.parse(parsedUrl.query);
 
 console.log('querystring.parse() : ', query); // 주어진 URL의 query 부분을 JS객체로 분해한다.
 console.log('querystring.stringify() : ', querystring.stringify(query)); // 분해된 JS객체를 다시 query 문자열로 조립한다.