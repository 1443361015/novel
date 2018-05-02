
import {COM_SHOW_ALERT,COM_ALERT_MSG,COM_LOGIN_INFO} from './types'
export default {
    showAlert({ commit }, status) {
        commit(COM_SHOW_ALERT, status)
    },
    alertMsg({ commit }, str) {
        commit(COM_ALERT_MSG, str)
    },
    loginInfo({ commit },obj){
        commit(COM_LOGIN_INFO, obj)
    }
}

