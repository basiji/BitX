// Dependencies
var express = require('express');
var mysql = require('mysql');
var Constants = require('./modules/constants');

// Initialization
var app = express();
var connection = mysql.createConnection(Constants.MySQL);

// Connect MySQL
connection.connect(function(error){
    
    if(error)
        console.log(error);

});

// Start server
app.listen(Constants.PORT, function(error){

    if(error)
        console.log(error);
    else
        console.log('Listening on port : ' + Constants.PORT);

});


// Define routers
var router_v1 = require('./modules/router_v1')(connection);
app.use('/', router_v1);

// Static resources
app.use(express.static(__dirname + '/html/ASAN', {maxAge:Constants.CACHE_TIME}));

