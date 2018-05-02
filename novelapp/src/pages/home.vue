<template>
    <div class="home">
        <keep-alive>
            <div v-if="loginInfo.state">{{ loginInfo.user }}欢迎你</div>
            <div v-else>游客你好！体验更多功能请
                <router-link to="/">登录</router-link>
            </div>
        </keep-alive>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import * as _ from '../util/tool'
export default {
    name : 'home',
    data(){
        return{
            
        }
    },
    created(){
        this.$ajax.get('/api/getLogin')
        .then(res => {
            _.loginInfo({
                state:res.data.info.state,
                user:res.data.info.user
            })
        }).catch(res => {
            _.alert('系统错误')
        });
    },
    computed: mapState({
        loginInfo: state => {
            return state.loginInfo 
        }
    })
}
</script>

<style>

</style>




