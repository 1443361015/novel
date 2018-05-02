import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import setters from './setters'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getters,
    setters,
    actions,
    mutations
})