import {COM_SHOW_ALERT,COM_ALERT_MSG,COM_LOGIN_INFO} from './types';
export default {
    [COM_SHOW_ALERT](state, status) {
        state.showAlert = status
    },
    [COM_ALERT_MSG](state, str) {
        state.alertMsg = str
    },
    [COM_LOGIN_INFO](state, obj) {
        state.loginInfo = obj
    }
}