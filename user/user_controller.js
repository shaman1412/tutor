const userModel = require('./user_model');
const bcrypts = require('bcrypt');
const jwt = require('jsonwebtoken');
const configure = require('../configure.json')
module.exports = {
    authenticate,
    getAllUser,
    geUserById,
    createUser,
    updatePassword,
    _delete,
    updateLesson
}

async function authenticate({username , password}){
let user = await userModel.findOne({username});
    if(user && bcrypts.compareSync(password,user.password)){
        let { password, ...otherAttr} = user.toObject();
        let token = jwt.sign({ ...otherAttr}, configure.key_secret)
        let redirect = '/login/lesson/'+ user._id;
        if(user.role == "Admin"){
            redirect = '/login/edit/';
        }

        return{
            ...otherAttr,
            redirect : 
            token
        }

    }
};

async function getAllUser(){
    return await userModel.find().select(' -password');
}

async function geUserById(id){
    return await userModel.findById(id).select(' -password');
}

async function createUser(userParam){
    // const checkDuplicate =  await function(){
    //   return userModel.findOne({ usernaem : userParam.username});
    // }
    //await userModel.init().then( async function(){
    if(await userModel.findOne({ username : userParam.username})){
        throw 'Username "' + userParam.username + '" is already taken';
    }
    let userCreate = {
        username : userParam.username,
        password : userParam.password,
        //lesson : userParam.lesson,
        role : userParam.role
    }
    const userCeated = new userModel(userCreate);
    if(userParam.password){
        userCeated.password = bcrypts.hashSync(userParam.password,10);
    }
    return  await userCeated.save();

} 

async function updateLesson(id,userParam){
    let user = await userModel.findById(id);
    if(!user) throw 'user not found';
    //if(role != "Admin") throw 'No permission granted';
        let userCreate = {
            lesson : userParam.lesson
        }
        Object.assign(user,userCreate);
    return await user.save();
    

} 

async function updatePassword(id,userParam){
    let user = await userModel.findById(id);
    if(!user) throw 'user not found';
    if(user.role != "Admin") throw 'No permission granted';
        if(userParam.password){
            userParam.password = bcrypts.hashSync( userParam.password, 10);
        }
        let userCreate = {
            password : userParam.password
        }
        Object.assign(user,userCreate);
    return await user.save();
    
}


async function _delete(id){
    return await userModel.findByIdAndDelete(id);
}

