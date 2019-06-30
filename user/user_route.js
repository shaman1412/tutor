import { authenticate, createUser, getAllUser, updateLesson, updatePassword, geUserById } from './user_controller';
import { Router } from 'express';
import { checkAuthenticate, checkAuthenticateUpdate } from '../authenticate';
var router = Router();

router.post('/authenticate' ,login);
router.post('/register', register);
router.get('/list', checkAuthenticate ,getall);
router.get('/getUserById/:id' ,getUser);
router.put('/updatePass/:id', updateUser);
router.put('/updatelesson/:id', updateLess)
function login(req, res, next){
    authenticate(req.body)
    .then(user=> user ? res.json(user) : res.status(400).json({message : "username and password incorrect"}))
    .catch(err => next(err));
}

function register(req, res, next){
    createUser(req.body).then(user => {  
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
    geUserById(req.params.id).then(user => {  
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
    getAllUser().then(user=> user ? res.json(user) : res.status(400).json({mess : "Error while get all user"}))
    .catch(err => next(err));
}

function updateUser(req,res,next){
    updatePassword(req.params.id, req.body)
    .then(user=> user ? res.json(user) : res.status(400).json({message : "Cant update database"}))
    .catch(e => {res.status(400).json(e);})
}
function updateLess(req,res,next){
    updateLesson(req.params.id, req.body).then(user => {  
        if(user) {res.status(200).json(user);}
        else{
        console.log("Cant update database");
        res.status(400).json({message : "Cant update database"});}
     })
    .catch(e => {res.status(400).json(e);})
}


module.exports =  router;

