const fs = require('fs');

fs.writeFile('./writeHere.txt', '글을 입력할게요.', (err) => {
    if(err) { throw err; }
    fs.readFile('./writeHere.txt', (err, data) => {
        if(err) { throw err; }
        console.log(data.toString());
    });
});