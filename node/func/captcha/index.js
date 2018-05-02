var svgCaptcha = require("svg-captcha");

// 验证码  
function verifycodeGetController(req, res) {  
    // 验证码，对了有两个属性，text是字符，data是svg代码  
    var code = svgCaptcha.create({  
        // 翻转颜色  
        inverse: false,  
        // 字体大小  
        fontSize: 36,  
        // 噪声线条数  
        noise: 3,  
        // 宽度  
        width: 80,  
        // 高度  
        height: 30,  
    });  
    // 保存到session,忽略大小写  
    req.session["randomcode"] = code.text.toLowerCase();  
    // 返回数据直接放入页面元素展示即可  
    res.send(code.data);  
}  