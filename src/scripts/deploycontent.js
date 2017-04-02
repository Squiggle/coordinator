var DocumentDb = require('documentdb');
// var configLoader = require('config');
// var config = config.get('./.json')

var host = process.argv['host'];
var masterKey = process.argv['key'];

console.log(host);
console.log(masterKey);