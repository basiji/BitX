var dateformat = require('dateformat');

module.exports = function(req, res, connection){

    // Check for method
    var method = req.query.method;

    switch(method){
        
        case 'register':
            register(req, res, connection);
        break;

        case 'signup':
            signup(req, res, connection);
        break;

        case 'login':
            login(req, res, connection);
        break;

        default:
            return res.sendStatus(404);
        

    }

}


// Register user (return userid)
function register(req, res, connection){

    // Check for essential parameters
    if(!req.query.model || !req.query.api)
        return res.sendStatus(404);

    // Insert new record
    connection.query("INSERT INTO app_users SET ?", {
    
        model:req.query.model,
        api:req.query.api
    }, function(error, lastId){
        
        if(error) 
            console.log(error);
        
        return res.json({
            userid:lastId
        });

    });

}

// SignUp user
function signup(req, res, connection){
    
    // Check for essential parameters
    if(!req.query.userid || !req.query.email || !req.query.password)
        return res.sendStatus(404);

    // Check for refId
    if(req.query.referee)
        var referee = req.query.referee;
    else 
        var referee = 'none';

    // Receive parameters
    var email = req.query.email;
    var password = req.query.password;
    var userid = req.query.userid;

    // Check for user existance
    connection.query("SELECT * FROM app_users WHERE email = '" + email + "'", function (error, result){
        
        if(error)
            console.log(error);

        console.log(result);
        
        if(result.length !== 0) {

            // Generate referral code 
            var refcode = Math.random() * (99999999 - 1) + 1;

            // Update user records
            connection.query("UPDATE app_users SET ? WHERE id = '" + userid + "'", {
                
                email:email,
                password:password,
                referee:referee,
                refcode:refcode,
                subdate: dateformat(new Date(), 'yyyy-MM-d')

            }, function (error){
                
                if(error)
                    console.log(error);
            
                return res.json({
                    status:200
                });
                    
            });

        } else {
            return res.json({
                status:400,
                error:'User exists'
            });
        }

    })

}

// Login user
function login(req, res, connection){

    // Check for essential queries
    if(!req.query.email || !req.query.password || !req.query.userid)
        return res.sendStatus(404);

    var email = req.query.email;
    var password = req.query.password;
    
    // Check for user existance
    connection.query("SELECT * FROM app_users WHERE email = '" + email + "'", function(error, result){
        
        if(error)
            console.log(error);
        
        // User not found
        if(result.length === 0)
            return res.json({
                status:400, 
                error:'not found'
            });

        // Check for password
        if(result[0].password === password)
            return res.json({
                status:200, 
                userid:result[0].id
            });
        else 
            return res.json({
                status:400,
                error:'wrong credentials'
            });
        
        
    });

}