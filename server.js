const express = require("express");
const app = express();
const path = require("path");
const connectDB = require('./mongoose.js')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser');
const userRoute = require('./user/user_route');
var cors = require('cors');
app.use(express.static(__dirname+'/frontend/picture'));
app.use(express.static(__dirname+'/frontend/admin_create'));
app.use(express.static(__dirname+'/frontend/admin_edit'));
app.use(express.static(__dirname+'/frontend/user_lesson'));
app.use(express.static(__dirname+'/frontend/login'));
app.use(express.static(__dirname+'/frontend'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors());
const route = express.Router();
// app.get('/',(req,res)=>{
//     res.send("HEllo");
// })

app.get('/login',(req,res)=>{
    // res.sendFile('/frontend/login_page.html', {root: __dirname });
    res.sendFile(path.join(__dirname+'/frontend/login/index.html'));
})


route.get('/create',(req,res)=>{
    res.sendFile(path.join(__dirname+'/frontend/admin_create/admin_createUser.html'));
})



route.get('/edit',(req,res)=>{
    res.sendFile(path.join(__dirname+'/frontend/admin_edit/admin_edit.html'));
})

route.get('/lesson/:paramid',(req,res)=>{
    res.sendFile(path.join(__dirname+'/frontend/user_lesson/user_lesson.html'));
})

route.get('/lessonView',(req,res)=>{
    res.sendFile(path.join(__dirname+'/frontend/user_lesson/user_view.html'));
})




app.get('/test', (req,res)=>{
    res.sendFile(path.join(__dirname+"/frontend/index_tmp.html"))
})

app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
})



app.use('/login',route);

app.use('/user',userRoute);
//app.use(jwt());

app.listen(PORT,()=>{
    console.log("Server Start")
})

