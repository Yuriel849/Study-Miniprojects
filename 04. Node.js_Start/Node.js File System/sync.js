/* Synchronous, Asynchronous, Blocking, Nonblocking
    Most Node.js functions are synchronous-blocking OR asynchronous-nonblocking
        Synchronous <> Asynchronous : 함수가 바로 백그라운드에서 반환되는지 여부
        Blocking <> Nonblocking : 백그라운드 작업 완료 여부

        Synchronous-Blocking : 호출된 함수가 작업을 모두 완료할 때까지 대기, 그 후에 다음 코드를 실행한다.
        Asynchronous-Nonblocking : 호출된 함수는 백그라운드에서 작업하도록 놔두고 기다리지 않고 다음 코드를 실행한다.
 */

// Asynchronous-Nonblocking, but in order to maintain order... use callbacks within callbacks (also promises and async/await)
const fs = require('fs');

console.log('시작');
fs.readFile('./readme.txt', (err, data) => {
    if(err) { throw err; }
    console.log('1번', data.toString());
    fs.readFile('./readme.txt', (err, data) => {
        if(err) { throw err; }
        console.log('2번', data.toString());
        fs.readFile('./readme.txt', (err, data) => {
            if(err) { throw err; }
            console.log('3번', data.toString());
        });
    });
});
console.log('끝');