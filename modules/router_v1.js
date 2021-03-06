var express = require('express');

// Define functions
var register = require('./v1/register');
var wallet = require('./v1/wallet');

module.exports = function(connection){

    var router = express.Router();

    // Register / Login
    router.post('/register', function(req, res){
        register(req, res, connection);
    });

    // Wallet
    router.post('/wallet', function(req, res){
        wallet(req, res, connection);
    });

    return router;

}