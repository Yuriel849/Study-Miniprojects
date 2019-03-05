// var.js 모듈을 차조하는 파일

const { odd, even } = require('./var');

function checkOddOrEven(num) {
    if(num % 2) { // 홀수면 true
        return odd;
    }
    return even;
}

module.exports = checkOddOrEven;