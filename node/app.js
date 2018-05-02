var express=require('express');

//var cookieParser = require('cookie-parser');
var	session = require('express-session');
var FileStore = require('session-file-store')(session);
//引入url模块解析url字符串
var url = require('url');
//引入querystring模块处理query字符串
var querystring = require('querystring');
var users = require('./dao/users');
var code = require('./dao/code')//验证码

var bodyParser = require('body-parser'); //中间件

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var identityKey = 'skey';
var arr = [];

app.use(session({
    name: identityKey,
    secret: 'tcmsession',  // 用来对session id相关的cookie进行签名
    store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        secure: false,
        maxAge: 15 * 60 * 1000  // 有效期，单位是毫秒
    }
}));
var OptPool = require('./conn/OptPool');  //引入连接池
var optPool = new OptPool();
var pool = optPool.getPool();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Credentials","true");
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
    res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With,userId,token");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


//写个接口userSel.action (查询用户表)
app.get('/userSel.action',function(req,res){
    users.seluser(req,res);
});

//图片验证码
app.get('/api/login!getValidPic.action',function(req,res){
    code.codePic(req,res); 
});


//发送邮箱验证码
app.get('/api/getValidEmail',function(req,res){
    code.codeEmail(req,res); 
});

//登录
app.post('/api/login',function(req,res){
    users.login(req,res);
})

//获取当前登录账号
app.get('/api/getLogin',function(req,res){
    users.getLogin(req,res);
})


//注册
app.post('/api/register',function(req,res){
    users.register(req,res);
})

//重置密码
app.post('/api/resetPass',function(req,res){
    users.resetPass(req,res);
})


//配置服务端口
var server = app.listen(3000, function () {

    var host = server.address().address;

    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})

