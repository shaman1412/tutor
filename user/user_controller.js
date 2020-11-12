const bcrypts = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('./user_model');
const configure = require('../configure.json');
const mongoose = require('mongoose');
async function authenticate({ username, password }) {
  console.log(mongoose.connection.readyState);
  const user = await UserModel.findOne({ username });
  if (user && bcrypts.compareSync(password, user.password)) {
    const { password, username, _id, role, ...otherAttr } = user.toObject();
    const token = jwt.sign({ username, role, _id }, configure.key_secret);
    let redirectValue = `/login/lesson/${user._id}`;
    if (user.role && user.role === 'Admin') {
      redirectValue = '/login/list';
    }

    return {
      username,
      role,
      ...otherAttr,
      redirect: redirectValue,
      token
    };
  }
  return null;
}

async function getAllUser() {
  const user = await UserModel.find().select(' -password');
  return user;
}

async function geUserById(id) {
  const user = await UserModel.findById(id).select(' -password');
  return user;
}

async function createUser(userParam) {
  // const checkDuplicate =  await function(){
  //   return userModel.findOne({ usernaem : userParam.username});
  // }
  //  await userModel.init().then( async function(){
  if (await UserModel.findOne({ username: userParam.username })) {
    const error = `Username${userParam.username}is already taken`;
    throw error;
  }
  const userCreate = {
    username: userParam.username,
    password: userParam.password,
    // lesson : userParam.lesson,
    role: userParam.role
  };
  const userCeated = new UserModel(userCreate);
  if (userParam.password) {
    userCeated.password = bcrypts.hashSync(userParam.password, 10);
  }
  return await userCeated.save();
}

async function updateLesson(id, userParam) {
  let user = await UserModel.findById(id);
  if (!user) throw 'user not found';
  //if(role != "Admin") throw 'No permission granted';
  let userCreate = {
    lesson: userParam.lesson
  };
  Object.assign(user, userCreate);
  return await user.save();
}

async function updatePassword(id, userParam) {
  let user = await UserModel.findById(id);
  if (!user) throw 'user not found';
  if (user.role != 'Admin') throw 'No permission granted';
  if (userParam.password) {
    userParam.password = bcrypts.hashSync(userParam.password, 10);
  }
  let userCreate = {
    password: userParam.password
  };
  Object.assign(user, userCreate);
  return await user.save();
}

async function _delete(id) {
  return await UserModel.findByIdAndDelete(id);
}

module.exports = {
  authenticate,
  getAllUser,
  geUserById,
  createUser,
  updatePassword,
  _delete,
  updateLesson
};
