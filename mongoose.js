const mongoose = require('mongoose');
const configure = require('./configure.json');
//mongoose.connect(process.env.MONGODB_URI || configure.connection_mongoose_url, {useCreateIndex : true , useNewUrlParser : true});
//mongoose.connect("mongodb://heroku_xb9h2xlf:ied4cv08o8b7ppf1i4rdpnl278@ds345597.mlab.com:45597/heroku_xb9h2xlf", {useCreateIndex : true , useNewUrlParser : true});

var mongodb = mongoose.connect("mongodb+srv://shaman1412:14127628@cluster0.pjxf2.mongodb.net/tutorSoldier", { useCreateIndex: true, useNewUrlParser: true });
console.log(mongoose.connection.readyState);
// npmconst db = mongoose.connectionl;
// db.on('error', console.error.bind(console, 'Connection Error'));
// db.once('open', ()=>{ console.log("Connectio Sucess")})
module.exports = mongodb;