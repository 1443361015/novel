var url = require('url');
var querystring = require("querystring");  

var bcrypt = require('bcrypt');
var conn = require('../conn');
module.exports = {
    
    //注册用户
    register (req, res) {
        let email = req.body.email; //邮箱
        let password = req.body.password; //密码
        let codeEmail =   req.body.codeEmail; //邮箱验证码
        //验证码不相等
        if(req.session.emailCode != codeEmail) {
            res.json({
                succ:false,
                msg:'验证码错误'
            }); 
            return;
        }
        if(req.session.email != email){
            res.json({
                succ:false,
                msg:'账号与验证码不匹配'
            }); 
            return;
        }

        if(password.length < 6){
            res.json({
                succ:false,
                msg:'密码不能小于6位'
            });
            return;
        }
        
        //查询该账号是否存在
        conn.connPool('select * from users where email = ?',[email],(err,rows) => {
            if(err){
            }else{
                let data = JSON.stringify(rows);
                if(JSON.stringify(data) == "{}"){
                    
                    let sql = 'insert into users(email, password) values(?, ?)';

                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            res.json({
                                succ:false,
                                msg:'系统错误'
                            });
                        }
                        else{
                            password = hash;
                            let arr = [email, password];
                            conn.connPool(sql, arr, (err,rows) => {
                                if(err){
                                    res.json({
                                        succ:false,
                                        msg:'系统错误'
                                    });
                                }else{
                                    res.json({
                                        succ:true,
                                        msg:'注册账号成功！'
                                    });
                                }
                            });
                        }
                    });
                }
                else{
                    res.json({
                        succ:false,
                        msg:'该账号已存在！'
                    });
                }
            }
        })

    },

    //用户登录
    login (req, res){
        let email = req.body.email; //邮箱
        let password = req.body.password; //密码
        
        let sql = 'select * from users where email = ?';
        conn.connPool(sql,[email],(err,rows) => {
            if(err){
                res.json({
                    succ: false,
                    msg : '系统错误'
                });

            }else{
                let data = JSON.parse(JSON.stringify(rows));
                if(JSON.stringify(data) == "{}"){
                    res.json({
                        succ:false,
                        msg:'账号密码错误'
                    });//账号不存在
                }
                else{
                    bcrypt.compare(password, data[0].password, function(err, hashres) {//验证密码
                        // res === true 
                        if(err){
                            res.json({
                                succ: false,
                                msg : '系统错误'
                            });
                        }else{
                            if(hashres){
                                req.session.loginState = true;
                                req.session.loginuser = email;
                                //登录状态
                                res.json({
                                    succ: true,
                                    msg : '登录成功'
                                });
                            }else{
                                res.json({
                                    succ: false,
                                    msg : '账号密码错误'
                                }); //密码错误
                            }
                        }
                    });
                }
            }
        })
    },
    //获取当前登录状态
    getLogin(req,res){
        if(req.session.loginState){
            res.json({
                succ:true,
                info:{
                    state:true,
                    user:req.session.loginuser
                },
                msg:'登录状态存在'
            })
        }else{
            res.json({
                succ:false,
                info:{
                    state:false,
                    user:req.session.loginuser
                },
                msg:'登录状态不存在'
            })
        }
    },
    resetPass(req,res){
        let email = req.body.email; //邮箱
        let password = req.body.password; //密码
        let codeEmail =   req.body.codeEmail; //邮箱验证码
        //验证码不相等
        if(req.session.emailCode != codeEmail) {
            res.json({
                succ:false,
                msg:'验证码错误'
            }); 
            return;
        }
        if(req.session.email != email){
            res.json({
                succ:false,
                msg:'邮箱验证码不匹配'
            }); 
            return;
        }

        if(password.length < 6){
            res.json({
                succ:false,
                msg:'密码不能小于6位'
            });
            return;
        }
        
        //查询该账号是否存在
        conn.connPool('select * from users where email = ?',[email],(err,rows) => {
            if(err){
                res.json({
                    succ:false,
                    msg:'系统错误'
                });
            }else{
                let data = JSON.stringify(rows);
                if(JSON.stringify(data) == "{}"){
                    res.json({
                        succ:false,
                        msg:'该账号不存在'
                    });//账号不存在
                }
                else{
                    
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            res.json({
                                succ:false,
                                msg:'系统错误'
                            });
                        }
                        else{
                            let sql = 'update users set password = ? where email = ?';
                            password = hash;
                            let arr = [password,email];
                            conn.connPool(sql, arr, (err,rows) => {
                                if(err){
                                    res.json({
                                        succ:false,
                                        msg:'系统错误'
                                    });
                                }else{
                                    res.json({
                                        succ:false,
                                        msg:'密码修改成功'
                                    });
                                }
                            });
                        }
                    });
                }
            }
        })
    }
}
