const jwt = require('jsonwebtoken');
const jwtToken = require('./configure.json');
const userModel = require('./user/user_model');
const url = require('url');
module.exports = {
    checkAuthenticate,
    checkAuthenticateLesson,
    checkAutoLogin,
    checkAuthenticateLessonView,
    checkAuthenticateMethod,
    checkAuthenticateMethodDelete,
    checkAuthenticateMethodGetUserByID
}

async function checkAutoLogin(req,res,next){
    if(req.cookies && req.cookies.tutorloginToken){
        let payload = req.cookies.tutorloginToken;
        await jwt.verify(payload, jwtToken.key_secret, function(err,decode){
            if(err){ next();}
            if(decode.role && decode.role == "Admin"){
                res.redirect('/login/create');
            }else{ res.redirect('/login/lesson/' + decode._id);}
        });
    }else{
       next();
    }
    
}


async function checkAuthenticate(req,res,next){
    if(req.cookies && req.cookies.tutorloginToken){
        let payload = req.cookies.tutorloginToken;
        jwt.verify(payload, jwtToken.key_secret, function(err, decode){
            if(err) { next();}
            if(decode.role && decode.role == "Admin"){
               next();
              //  res.end();
            }else{ res.redirect('/login/lesson/' + decode._id);}
        });
    }else{
      res.redirect('/');
    }
}

async function checkAuthenticateLesson(req,res,next){
    if(req.cookies && req.cookies.tutorloginToken){
        let payload = req.cookies.tutorloginToken;
        jwt.verify(payload, jwtToken.key_secret, function(err, decode){
            if(err) { next();}
            if(req.params.id == decode._id || decode.role == "Admin"){
               next();
              //  res.end();
            }else{ res.redirect('/login/lesson/' + decode._id);}
        });
    }else{
      next();
    }
}

async function checkAuthenticateLessonView(req,res,next){
    if(req.cookies && req.cookies.tutorloginToken){
        let url_parse = url.parse(req.url,true);
        var query = url_parse.query;
        let payload = req.cookies.tutorloginToken;
        jwt.verify(payload, jwtToken.key_secret, function(err, decode){
            if(err) { next();}
            if(req.params.id == decode._id || decode.role == "Admin"){
               next();
              //  res.end();
            }else{ res.redirect('/login/lesson/' + decode._id);}
        });
    }else{
      next();
    }
}


async function checkAuthenticateMethod(req,res,next){
    if(req.cookies && req.cookies.tutorloginToken){
        let url_parse = url.parse(req.url,true);
        var query = url_parse.query;
        let payload = req.cookies.tutorloginToken;
        jwt.verify(payload, jwtToken.key_secret, function(err, decode){
            if(err) {res.send({"Message": "No permission granted"});}
            if(decode.role && decode.role == "Admin"){
               next();
              //  res.end();
            }else{
                res.send({"Message": "No permission granted"});
            }
        });
    }else{
        res.send({"Message": "No permission granted"});
    }
}


async function checkAuthenticateMethodGetUserByID(req,res,next){
    if(req.cookies && req.cookies.tutorloginToken){
        let url_parse = url.parse(req.url,true);
        var query = url_parse.query;
        let payload = req.cookies.tutorloginToken;
        jwt.verify(payload, jwtToken.key_secret, function(err, decode){
            if(err) { res.send({"Message": "No permission granted"});}
            if(req.params.id == decode._id || (decode.role &&  decode.role == "Admin")){
               next();
              //  res.end();
            }else{
            res.send({"Message": "No permission granted"});
            }
        });
    }else{
        res.send({"Message": "No permission granted"});
    }
}

async function checkAuthenticateMethodDelete(req,res,next){
    if(req.cookies && req.cookies.tutorloginToken){
        let url_parse = url.parse(req.url,true);
        let payload = req.cookies.tutorloginToken;
        jwt.verify(payload, jwtToken.key_secret, function(err, decode){
            if(err) { res.send({"Message": "No permission granted"});}
            if(decode.role &&  decode.role == "Admin"){
                if(req.params.id == decode._id ){
                    res.send({"Message": "Cant delete using account this moment"});
                }else{
                    next();
                }
               
              //  res.end();
            }else{
            res.send({"Message": "No permission granted"});
            }
        });
    }else{
        res.send({"Message": "No permission granted"});
    }

}