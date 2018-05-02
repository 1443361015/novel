
var captchapng = require('captchapng');

var express = require('express');
var url = require('url');
var querystring = require("querystring");  
// 引入 nodemailer
var nodemailer = require('nodemailer');

// 创建一个SMTP客户端配置
var config = {
    host: 'smtp.163.com',
    port: 25,
    auth: {
        user: 'tcm15284752021@163.com', //刚才注册的邮箱账号
        pass: 'zxc123456'  //邮箱的授权码，不是注册时的密码
    }
};

//captchapng版本 0.0.1
function getImg(code){
    var p = new captchapng(80,30,code); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    return imgbase64;
}

//图片验证码
function codePic(req, res){

    var imgStr = parseInt(Math.random()*9000+1000); //生成随机数验证码
    req.session.codePic = imgStr; //把验证码存储进session
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    var img = getImg(req.session.codePic);
    res.end(img);
}

// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);

// 发送邮件
function codeEmail(req, res){

    var emailStr = parseInt(Math.random()*9000+1000); //生成随机数验证码
    
    //获取返回的url对象的query属性值   
    var arg = url.parse(req.url).query;  
      
    //将arg参数字符串反序列化为一个对象  
    var params = querystring.parse(arg); 
    
    let email = params.email;//邮箱 

    req.session.emailCode = emailStr; //把验证码存储进session    
    req.session.email = email;

    let mailOptions = {
        from: config.auth.user, // 发送者  
        to: email, // 接受者,可以同时发送多个,以逗号隔开  
        subject: '《阅小说》账号注册邮箱验证码', // 标题  
        text:'邮箱验验证码有效期为15分钟,邮箱验证码:'+ req.session.emailCode  
    }
    transporter.sendMail(mailOptions, function(error, info){
        let succ = {};
        if(error) {
            succ.succ = false;
            succ.msg = '发送失败'
        }else{
            succ.succ = true;
            succ.msg = '发送成功'
        }
        res.json(succ);
    });
};

module.exports = {
    codePic:codePic,
    codeEmail:codeEmail
}

