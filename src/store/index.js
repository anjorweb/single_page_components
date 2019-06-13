import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import actions from './actions'
import user from './modules/user'
import car from './modules/car'
import permission from './modules/permission'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        groups: [1],
        isCollapse: false
    },
    modules: {
        user,
        car,
        permission
    },
    // 根级别的 action
    actions,
    // 根级别的 mutations
    mutations,
    // 根级别的 getters
    getters: {
        getGroups(state) {
            return state.groups
        },
        collapse(state) {
            return state.isCollapse
        }
    }
})
