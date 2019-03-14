const fs = require('fs');

const readStream = fs.createReadStream('./readme.txt', { highWaterMark: 16 }); // highWaterMark -> optional, designates size of buffer
const data = [];


// Read Stream
readStream.on('data', (chunk) => { // Event listener -> "data" event fires when the stream starts to read the file
    data.push(chunk);
    console.log('data :', chunk, chunk.length);
});

readStream.on('end', () => { // Event listener -> "end" event fires when the stream finishes reading the file
    console.log('end :', Buffer.concat(data).toString());
});

readStream.on('error', (err) => { // Event listener -> "error" event fires when an error occurs
    console.log('error :', err);
});

const writeStream = fs.createWriteStream('./writeHere.txt');
writeStream.on('finish', () => { // Event listener -> "finish" event fires when writeStream finishes writing
    console.log('파일 쓰기 완료');
});

// Write Stream
writeStream.write('이 문자열을 씁니다.\n');
writeStream.write('writeHere.txt에 출력합니다.\n');

// Pipes
readStream.pipe(writeStream); // Automatically pipes the data from the readStream to the writeStream (useful for copying files)
    // Does not overwrite what was written with writeStream.write() above, but adds to that
