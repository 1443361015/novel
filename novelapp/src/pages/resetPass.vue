<template>
    <div class="login">
        <div class="title">重置密码</div>
        <div class="coordinates-icon">
            <div class="coordinates topAct">
                <img src="../assets/images/logo.png" />
            </div>
            <div class="circle-1-1 circle-show-2"></div>
            <div class="circle-2-2 circle-show-1"></div>
            <div class="circle-3-3 circle-show"></div>
        </div>
        <div class="login-form">
            <form action="#">
                <div class="user-name common-div">
                    <span class="eamil-icon common-icon">
                        <i class="iconfont icon-people"></i>
                    </span>
                    <input type="text" v-model="email" placeholder="邮箱" />  
                </div>
                <div class="user-pasw common-div">
                    <span class="pasw-icon common-icon">
                        <i class="iconfont icon-lock"></i>
                    </span>
                    <input type="password" v-model="password" placeholder="密码" />        
                </div>
                <div class="user-code common-div">
                    <span class="pasw-icon common-icon">
                        <i class="iconfont icon-lock"></i>
                    </span>
                    <input type="text" style="width: 50%;" v-model="codeEmail" placeholder="验证码" />
                    <span class="verifi-code" @click="getCodeEmail" v-show="!sendCode">
                        获取验证码
                    </span>
                    <span class="verifi-code readonly" v-show="sendCode">
                        {{timeOut}}秒重新获取
                    </span>
                </div>
                <div class="login-btn" @click="regist">提交</div>
            </form>
        </div>
        <div class="forgets">
            <router-link to=""></router-link>
            <router-link to="/">记起密码?登录>></router-link>
        </div>
        <div class="prompt">
            <p>注：若未收到验证码，请查看垃圾箱</p>
        </div>
    </div>
</template>

<script>

//import { mapActions } from 'vuex'
import * as _ from '../util/tool'
const REG_EAMIL = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
export default {
    name:'regist',
    data() {
        return {
            email: '',
            password: '',
            codeEmail: '',
            sendCode: false,
            timeOut: 60
        }
    },
    computed: {
    },
    methods: {
        getCodeEmail () {
            let me = this;
            if (!this.email) {
                _.alert('请输入邮箱')
                return
            }
            if(!REG_EAMIL.test(this.email)){
                _.alert('邮箱格式错误');
                return 
            }

            this.$ajax.get('/api/getValidEmail',{
                params:{
                    email: this.email
                }
            }).then(res => {
                if(res.data.succ){
                    _.alert(res.data.msg);
                    me.sendCode = true;
                    me.timeOut = 60;
                    me.setTimeOut()
                }else{
                    _.alert('系统错误')
                }
            }).catch(res => {
                    _.alert('系统错误')
            });
        },
        setTimeOut () {
            let me = this;
            let timer = setTimeout(() => {
                if(me.timeOut < 0) return;
                me.timeOut--
                me.setTimeOut()
            }, 1000)
            if(me.timeOut <= 0) {
                me.sendCode = false;
            }
        },
        regist () {
            var me = this;
            if (!this.email || !this.password || !this.codeEmail) {
                alert('请填写完整')
                return
            }

            if(!REG_EAMIL.test(this.email)){
                _.alert('邮箱格式错误');
                return 
            }

            if(this.password.length <　6 || this.password.length > 16){
                _.alert('密码长度6-16之间');
                return
            }

            if(/^\d$/.test(this.password)){
                _.alert('密码不能全为数字');
            }
            let params = {
                email:this.email,
                password:this.password,
                codeEmail:this.codeEmail
            }

            this.$ajax.post('/api/resetPass',this.$qs.stringify(params))
            .then(res => {
                if(res.data.succ){
                    _.alert(res.data.msg)
                    setTimeout(function(){
                        me.$router.push('/');//跳转到登录界面
                    },1000)
                    
                }else{
                    _.alert(res.data.msg);
                }
            })
            .catch(res => {
                 _.alert('邮件发送失败')
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function';


.login{
    width:100%;
    height: 100%;
    overflow:hidden;
    background-color: #323542;
    padding-bottom: px2rem(260px);
    .title{
        width:100%;
        height:auto;
        overflow:hidden;
        font-size:18px;
        text-align:center;
        line-height:px2rem(200px);
        color:#fff;
    }
    .coordinates-icon{
        width:px2rem(400px);
        height:px2rem(250px);
        margin:px2rem(50px) auto;
        position:relative;
        .coordinates{
            width:px2rem(150px);
            overflow:hidden;
            position:absolute;
            z-index:8;
            left: 32%;
            img{
                width:100%;
                height:auto;
            }
        }
        .circle-1-1{
            width:100%;
            height:px2rem(150px);
            overflow:hidden;
            border:1px solid rgba(255,255,255,0.5);
            border-radius:100%;
            background-color:#3a3d4a;
            position:absolute;
            bottom:0;
            z-index:1;
            opacity:0;
        }
        .circle-2-2{
            width:px2rem(230px);
            height:px2rem(80px);
            overflow:hidden;
            border:1px solid rgba(255,255,255,0.4);
            border-radius:100%;
            background-color:#4e515c;
            left:75%;
            margin-left:px2rem(-217px);
            bottom:px2rem(35px);
            position:absolute;
            z-index:2;
            opacity:0;
        }
        .circle-3-3{
            width:px2rem(130px);
            height:px2rem(50px);
            overflow:hidden;
            border:1px solid rgba(255,255,255,0.3);
            border-radius:100%;
            background-color:#71747d;
            z-index:3;
            left:35%;
            margin-left:px2rem(-8px);
            bottom:px2rem(50px);
            position:absolute;
            opacity:0;
        }
    }
    .login-form{
        width:px2rem(600px);
        height:auto;
        margin:0 auto;
        .common-div{
            width:100%;
            height:px2rem(80px);
            overflow:hidden;
            border-radius:4px;
            margin-bottom: px2rem(50px);
            >.common-icon{
                float:left;
                width:px2rem(40px);
                height:px2rem(40px);
                line-height: px2rem(40px);
                font-size: px2rem(40px);
                color: #ffffff;
                overflow:hidden;
                margin:px2rem(20px);
                text-align: center;
                img{
                    width:100%;
                    height:auto;
                }
            }
            >input{
                float:left;
                line-height: px2rem(80px);
                background-color:transparent;
                border:none;
                outline:none;
                font-size:16px;
                color:#fff;
            }
            .verifi-code {
                display: inline-block;
                width: px2rem(200px);
                height: px2rem(80px);
                line-height: px2rem(80px);
                background: #0bd38a;
                color: #fff;
                text-align: center;
                padding-left: px2rem(20px);
            }
            .readonly {
                background: #eee;
                color: #555;
            }
        }
        .user-name,.user-pasw,.user-code{
            background-color:rgba(255,255,255,0.1);
        }
        .login-btn{
            background-color:#0bd38a;
            color:#fff;
            font-size:20px;
            text-align:center;
            height:px2rem(100px);
            line-height:px2rem(100px);
            margin-bottom: px2rem(50px);
            border-radius:4px;
        }
    }
    .forgets{
        width:px2rem(600px);
        height:auto;
        margin:0 auto;
        >a{
            color:#fff;
            opacity:0.2;
            font-size:16px;
            +a{
                float:right;
            }
        }
    }
    .forgets::after{
        clear: both;
        content: '';
        display: block;
    }
    .prompt{
        width: 8rem;
        height: auto;
        margin: 0 auto;
        >p{
            font-size: px2rem(24px);
            color: #ffffff;
            opacity: 0.5;
            margin-top: px2rem(40px);
        }
    }
}

.topAct{
    animation:topAct 3s ease-in-out infinite;
    -webkit-animation:topAct 3s ease-in-out infinite;
    -moz-animation:topAct 3s ease-in-out infinite;
    -o-animation:topAct 3s ease-in-out infinite;
    -ms-animation:topAct 3s ease-in-out infinite;
}
@keyframes topAct
{
    0% {top:px2rem(-100px);}
    50% {top:px2rem(-30px);}
    100%{top:px2rem(-100px);}
}
@-webkit-keyframes topAct
{
    0% {top:px2rem(-100px);}
    50% {top:px2rem(-30px);}
    100%{top:px2rem(-100px);}
}
@-moz-keyframes topAct
{
    0% {top:px2rem(-100px);}
    50% {top:px2rem(-30px);}
    100%{top:px2rem(-100px);}
}

.circle-show{
    animation:circleShow 3s ease-in-out infinite 1s;
    -webkit-animation:circleShow 3s ease-in-out infinite 1s;
    -moz-animation:circleShow 3s ease-in-out infinite 1s;
    -ms-animation:circleShow 3s ease-in-out infinite 1s;
    -o-animation:circleShow 3s ease-in-out infinite 1s;
}
@keyframes circleShow
{
    0% {opacity:0;}
    50% {opacity:1;}
    100%{opacity:0;}
}
@-webkit-keyframes circleShow
{
    0% {opacity:0;}
    50% {opacity:1;}
    100%{opacity:0;}
}
@-moz-keyframes circleShow
{
    0% {opacity:0;}
    50% {opacity:1;}
    100%{opacity:0;}
}

.circle-show-1{
    animation:circleShow1 3s ease-in-out infinite 1.2s;
    -webkit-animation:circleShow1 3s ease-in-out infinite 1.2s;
    -moz-animation:circleShow1 3s ease-in-out infinite 1.2s;
    -ms-animation:circleShow1 3s ease-in-out infinite 1.2s;
    -o-animation:circleShow1 3s ease-in-out infinite 1.2s;
}
@keyframes circleShow1
{
    0% {opacity:0;}
    50% {opacity:1;}
    100%{opacity:0;}
}
@-webkit-keyframes circleShow1
{
    0% {opacity:0;}
    50% {opacity:1;}
    100%{opacity:0;}
}
@-moz-keyframes circleShow1
{
    0% {opacity:0;}
    50% {opacity:1;}
    100%{opacity:0;}
}

.circle-show-2{
    animation:circleShow2 3s ease-in-out infinite 1.4s;
    -webkit-animation:circleShow2 3s ease-in-out infinite 1.4s;
    -moz-animation:circleShow2 3s ease-in-out infinite 1.4s;
    -ms-animation:circleShow2 3s ease-in-out infinite 1.4s;
    -o-animation:circleShow2 3s ease-in-out infinite 1.4s;
}
@keyframes circleShow2
{
    0% {opacity:0;}
    50% {opacity:1;}
    100%{opacity:0;}
}
@-webkit-keyframes circleShow2
{
    0% {opacity:0;}
    50% {opacity:1;}
    100%{opacity:0;}
}
@-moz-keyframes circleShow2
{
    0% {opacity:0;}
    50% {opacity:1;}
    100%{opacity:0;}
}
</style>