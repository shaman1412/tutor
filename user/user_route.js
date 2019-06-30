

const user_controller = require('./user_controller');
const app = require('express');
const authenticateControl = require('../authenticate');
var router = app.Router();

router.post('/authenticate' ,login);
router.post('/register', register);
router.get('/list', authenticateControl.checkAuthenticate ,getall);
router.get('/getUserById/:id' ,getUser);
router.put('/updatePass/:id', updateUser);
router.put('/updatelesson/:id', updateLess)
router.put('/delete/:id', deleteUser)
function login(req, res, next){
    user_controller.authenticate(req.body)
    .then(user=> user ? res.json(user) : res.status(400).json({message : "username and password incorrect"}))
    .catch(err => next(err));
}

function register(req, res, next){
    user_controller.createUser(req.body).then(user => {  
        if(user) {res.status(200).json(user);}
        else{
        console.log("Cant update database");
        res.status(400).json({message : "Cant update database"});}
     })
    .catch(err => {
        console.log("sdfdf");
        next(err);
   });
}


function getUser(req,res, next){
    user_controller.geUserById(req.params.id).then(user => {  
        if(user) {res.status(200).json(user);}
        else{
        console.log("Cant get user profile");
        res.status(400).json({message : "Cant get user profile"});}
     })
    .catch(err => {
        console.log("sdfdf");
        next(err);
   });
}

function getall(req,res, next){
    user_controller.getAllUser().then(user=> user ? res.json(user) : res.status(400).json({mess : "Error while get all user"}))
    .catch(err => next(err));
}

function deleteUser(req,res, next){
    user_controller._delete(req.params.id).then(user=> user ? res.json(user) : res.status(400).json({mess : "Error while get all user"}))
    .catch(err => next(err));
}


function updateUser(req,res,next){
    user_controller.updatePassword(req.params.id, req.body)
    .then(user=> user ? res.json(user) : res.status(400).json({message : "Cant update database"}))
    .catch(e => {res.status(400).json(e);})
}
function updateLess(req,res,next){
    user_controller.updateLesson(req.params.id, req.body).then(user => {  
        if(user) {res.status(200).json(user);}
        else{
        console.log("Cant update database");
        res.status(400).json({message : "Cant update database"});}
     })
    .catch(e => {res.status(400).json(e);})
}


module.exports =  router;

