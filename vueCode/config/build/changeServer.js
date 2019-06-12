let base = require('./base');
var argument = process.argv.splice(2);

if (argument[0] === 'testServer') {
    base('http://localhost/hdys/hdys/php/');
} else if (argument[0] === 'devServer'){
    base('http://10.1.11.48:80/')
} else if (argument[0] === 'production'){
    base('https://www.hjjrchina.com/hjjr/')
}


