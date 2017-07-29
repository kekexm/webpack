console.log(__dirname+'\\'+'src');
console.log(__filename);

var path = require('path');

console.log(path);
console.log(path.resolve(__dirname,'src/index.js'));

console.log(global.process.env)
console.log('*************************************************************')
console.log(process.env.NODE_ENV)

console.log(path.resolve(__dirname,'./src/index.js')==path.resolve(__dirname,'src/index.js'));