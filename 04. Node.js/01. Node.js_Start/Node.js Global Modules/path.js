// The path module is used to work with folder and file paths
const path = require('path');

const string = __filename;

console.log('path.sep : ', path.sep); // 경로의 구분자 (Windows에서는 "\", POSIX에서는 "/")
console.log('path.delimiter : ', path.delimiter); // 환경변수의 구분자 (Windows에서는 ";", POSIX에서는 ":")
console.log('-------------------------------------------');
console.log('path.dirname() : ', path.dirname(string)); // 파일이 위치한 폴더 경로 (인수로 파일 경로를 대입해야!)
console.log('path.extname() : ', path.extname(string)); // 파일의 확장자
console.log('path.basename() : ', path.basename(string)); // 파일의 이름 (확장자 포함)
console.log('path.basename() : ', path.basename(string, path.extname(string))); // 파일의 이름 (확장자 미포함)
console.log('-------------------------------------------');
console.log('path.parse() : ', path.parse(string)); // 파일 경로를 root, dir, base, ext, name으로 분리하여 표시
console.log('path.format() : ', path.format({ // path.parse()로 구분한 객체를 하나의 파일 경로로 합친다
    dir: 'C:\\Users\\Yuriel\\git\\Study-Miniprojects\\04. Node.js_Start\\Node.js Global Modules',
    name: 'path',
    ext: '.js'
}));
console.log('path.normalize() : ', path.normalize('C:\\\\\\Users////Yuriel\\path.js'));
          // path.normalize() -> "/" OR "\"를 혼용하거나 여러번 실수로 사용했을 때 정상적인 경로로 변환
console.log('-------------------------------------------');
console.log('path.isAbsolute() : ', path.isAbsolute('C:\\')); // 파일 경로가 절대경로인지 아닌지 true OR false로 표현
console.log('path.isAbsolute() : ', path.isAbsolute('./home'));
console.log('-------------------------------------------');
console.log('path.relative() : ', path.relative('C:\\Users\\Yuriel\\path.js', 'C:\\')); // 1번째 경로에서 2번째 경로로 가는 방법 표시
console.log('path.join() : ', path.join(__dirname, '..', '..', '/Users', '.', '/Yuriel')); // 여러 인자를 넣으면 하나의 경로로 합친다
          // 상대경로인 ".." (부모 디렉터리) & "." (현 위치) 또한 처리가능!
console.log('path.resolve() : ', path.resolve(__dirname, '..', 'Users', '.', '/Yuriel')); // path.join()과 비슷
          /* path.join() VS path.resolve()
            "/"를 만났을 때...
                -> path.join()은 상대경로로 인식하고 처리한다.
                -> path.resolve()는 절대경로로 인식하고 앞서 나온 경로를 무시(삭제)하고 새로나온 "/"부터 경로를 작성한다.
                      위 예시에서 '/Yuriel'이 나오자 앞서 나온 __dirname/../Users는 없애버린다! -> 결과는 "C:\Yuriel"
           */

/*
상대경로 VS 절대경로
    상대경로는 현재 파일이 기준이 된다. 현재 파일과 같은 경로면 점 한 개 ("."), 현재 파일보다 한 단계 상위 경로면 점 두 개 ("..")
    절대경로는 루트폴더(Windows에서는 C:\)나 Node 프로세스가 실행되는 위치가 기준이 된다.
 */