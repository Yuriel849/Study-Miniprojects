// Check whether a folder or file is accessible, and if not, create a new folder and a new file, and rename the file
const fs = require('fs');

    // fs.access(path, option, callback) -> Checks whether the folder or file designated by the given path is accessible
        // "option" -> Optional parameters are constants -> F_OK (does file exist?), R_OK (readable?), W_OK (writeable?)
        // If the folder/file does not exist or the optional parameters do not exist, the ENOENT error occurs!
fs.access('./folder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if(err) {
        if(err.code === 'ENOENT') {
            console.log('폴더 없음');
                // fs.mkdir(path, callback) -> Makes a folder(=directory)
                    // Error occurs if there is already a folder with that name, so MUST use fs.access() prior to calling fs.mkdir()
            fs.mkdir('./folder', (err) => {
                if(err) { throw err; }
                console.log('폴더 만들기 성공');
                    // fs.open(path, option, callback) -> Returns the file's ID (here, the variable "fd")
                        // If file at designated path does not exist, first creates a file
                        // option -> Designates what to do -> "w" to write, "r" to read only, "a" to append to prexisting file
                fs.open('./folder/file.js', 'w', (err, fd) => {
                    if(err) { throw err; }
                    console.log('빈 파일 만들기 성공', fd);
                        // fs.rename(old path, new path, callback) -> Changes the name of the file at the given old path to the new name in the given new path
                            // The new path doesn't even have to be in the same folder as the old (in addition to renaming the file, the file can be moved entirely)
                    fs.rename('./folder/file.js', './folder/testFile.js', (err) => {
                        if(err) { throw err; }
                        console.log('이름 바꾸기 성공');
                    });
                });
            });
        } else {
            throw err;
        }
    } else {
        console.log('이미 폴더 있음');
    }
});