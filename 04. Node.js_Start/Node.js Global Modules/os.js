// The os module contains information about the Operating System (OS) <> JS on browser cannot acccess info on the OS
const os = require('os');

console.log('운영체제 정보-------------------------------');
console.log('os.arch() : ', os.arch()); // 프로세스 아키텍처 정보 (== process.arch())
console.log('os.platform() : ', os.platform()); // 운영체제 플랫폼 정보 (== process.platform())
console.log('os.type() : ', os.type()); // 운영체제 종류 정보
console.log('os.uptime() : ', os.uptime()); // 운영체제의 부팅 이후 흐른 시간 (초 단위) (<> process.uptime() -> 노드의 실행 후 시간)
console.log('os.hostname() : ', os.hostname()); // 컴퓨터의 이름
console.log('os.release() : ', os.release()); // 운영체제 버전

console.log('경로---------------------------------------');
console.log('os.homedir() : ', os.homedir()); // 홈 디렉터리 경로
console.log('os.tmpdir() : ', os.tmpdir()); // 임시 파일 저장 경로

console.log('cpu 정보-----------------------------------');
console.log('os.cpus() : ', os.cpus()); // CPU 각 코어 정보 (Node.js는 싱글쓰레드지만 cluster모듈을 사용하면 멀티프로세싱 가능하다!)
console.log('os.cpus().length : ', os.cpus().length); // CPU 코어 개수 (hyper-threading 사용하기에 쿼드코어지만 8개가 나온다!)

console.log('메모리 정보---------------------------------');
console.log('os.freemem() : ', os.freemem()); // 사용 가능한 메모리 공간 (RAM)
console.log('os.totalmem() : ', os.totalmem()); // 전체 RAM 용량

// 하나의 객체 -> 각종 에러와 신호에 대한 정보가 있다!
console.log(os.constants);