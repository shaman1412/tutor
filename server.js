const express = require("express");
const app = express();
const path = require("path");
const connectDB = require('./mongoose.js')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser');
const userRoute = require('./user/user_route');
const cookieParser = require('cookie-parser');
const authenticate = require('./authenticate');
var cors = require('cors');
app.use(express.static(__dirname+'/frontend/picture'));
app.use(express.static(__dirname+'/frontend/admin_create'));
app.use(express.static(__dirname+'/frontend/admin_edit'));
app.use(express.static(__dirname+'/frontend/user_lesson'));
app.use(express.static(__dirname+'/frontend/login'));
app.use(express.static(__dirname+'/frontend/Not_found'));
app.use(express.static(__dirname+'/frontend'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
//app.use(cors());
app.use(cookieParser());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const route = express.Router();
app.get('/',authenticate.checkAutoLogin,(req,res)=>{
    res.redirect('/login');
})

app.get('/login',authenticate.checkAutoLogin,(req,res)=>{
    res.sendFile(path.join(__dirname+'/frontend/login/login.html'));
})


route.get('/create',authenticate.checkAuthenticate,(req,res)=>{
    res.sendFile(path.join(__dirname+'/frontend/admin_create/admin_createUser.html'));
})



route.get('/edit',authenticate.checkAuthenticate,(req,res)=>{
    res.sendFile(path.join(__dirname+'/frontend/admin_edit/admin_edit.html'));
})

route.get('/lesson',authenticate.checkAuthenticateLesson,(req,res)=>{
    res.sendFile(path.join(__dirname+'/frontend/user_lesson/user_lesson.html'));
})

route.get('/lesson/:id',authenticate.checkAuthenticateLesson,(req,res)=>{
    res.sendFile(path.join(__dirname+'/frontend/user_lesson/user_lesson.html'));
})

route.get('/lessonView/:id',authenticate.checkAuthenticateLessonView,(req,res)=>{
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

app.get('*',(req,res)=>{
    // res.sendFile('/frontend/login_page.html', {root: __dirname });
    res.sendFile(path.join(__dirname+'/frontend/Not_found/colorlib-error-404-3/index.html'));
})

//app.use(jwt());

app.listen(PORT,()=>{
    console.log("Server Start")
})

