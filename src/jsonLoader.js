require('babel/register')

var fs = require('fs');

class JsonLoader {
    constructor () {

    }

    read(path) {
        let file = fs.readFileSync(path);
        return JSON.parse(file);
    }
}

export default JsonLoader;
