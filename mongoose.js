const mongoose = require('mongoose');
const configure = require('./configure.json')
mongoose.connect(process.env.MONGODB_URI || configure.connection_mongoose_url, {useCreateIndex : true , useNewUrlParser : true});
const db = mongoose.connectionl;
// db.on('error', console.error.bind(console, 'Connection Error'));
// db.once('open', ()=>{ console.log("Connectio Sucess")})
module.exports = mongoose;