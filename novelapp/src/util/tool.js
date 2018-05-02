import store from '../store'

//弹框
export function alert(str) {
    store.dispatch('showAlert', true)
    store.dispatch('alertMsg', str)
    setTimeout(() => {
        store.dispatch('showAlert', false); 
    },1500);
}
//登录状态
export function loginInfo(obj) {
    store.dispatch('loginInfo', obj);
}