const buffer = Buffer.from('본 문자열을 버퍼로 바꿔보세요.'); // Buffer.from(String) -> Changes the string into a buffer

console.log('from() : ', buffer);
console.log('length : ', buffer.length); // length -> The size of the buffer in bytes
console.log('toString() : ', buffer.toString()); // toString([encoding]) -> changes buffer back into string (optional, designate encoding)

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
const buffer2 = Buffer.concat(array); // concat(array) -> Combines the buffers in designated array into one buffer
console.log('concat() : ', buffer2.toString());

const buffer3 = Buffer.alloc(5); // alloc([bytes]) -> Creates an empty buffer (optional, designate size of to-be-created buffer in bytes)
console.log('alloc() : ', buffer3);