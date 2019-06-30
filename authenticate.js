const jwt = require('jsonwebtoken');
const jwtToken = require('./configure.json');

module.exports = {
    checkAuthenticate,
    checkAuthenticateUpdate
}

async function checkAuthenticate(req,res,next){
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'jwt'){
        const payload = req.headers.authorization.split(' ')[1];
        jwt.verify(payload, jwtToken.key_secret, function(err, decode){
            if(err) res.status(400).json({message : "No permission granted"});
           next()
        });
    }else{
        res.status(400).json({message : "No permission granted"});
    }
}

async function checkAuthenticateUpdate(req,res,next){
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'jwt'){
        const payload = req.headers.authorization.split(' ')[1];
        jwt.verify(payload, jwtToken.key_secret, function(err, decode){
            if(err || decode.role !== "admin") res.status(400).json({message : "No permission granted"});
           next()
        });
    }else{
        res.status(400).json({message : "No permission granted"});
    }
}