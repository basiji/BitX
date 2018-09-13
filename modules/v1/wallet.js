var Constants = require('../constants');

module.exports = function(req, res, connection){

    
    // Check for essential queries
    if(!req.query.method)
        return res.sendStatus(404);

    var method = req.query.method;
    
    // Check for methid
    switch(method){

        case 'new':
            newWallet(req, res, connection);
        break;

        case 'check':
            checkWallet(req, res, connection);
        break;
    }

}


function newWallet(req, res, connection){

    // Check for userid
    if(!req.query.userid)
        return res.sendStatus(404);

    var userid = req.query.userid;

    // Generate new key
    var w_key = '1' + Constants.WKEY.split('').sort(function(){return 0.5-Math.random()}).join('').substr(0,25);

    // Generate qr_code
    var qr_code = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + w_key;

    // Upload qr_code PNG

    // Insert new record
    connection.query("INSERT INTO app_wallets SET ?", {
        userid:userid,
        wkey:w_key,
        qr_code:qr_code,
        balance:0
    }, function(error, insertId){

        if(error)
            console.log(error);

        // return wallet
        return res.json({
            id:insertId, 
            key:w_key,
            qr_code:qr_code,
            balance:0
        });

    });



}