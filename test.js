var Constants = require('./modules/constants');

// Generate new key
var w_key = Constants.WKEY.split('').sort(function(){return 0.5-Math.random()}).join('');
console.log('1' + w_key.substr(0,25));