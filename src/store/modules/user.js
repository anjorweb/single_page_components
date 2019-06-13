import { loginByUserName } from '_api/user'
import Cookie from 'js-cookie'
const user = {
    state: {
        token: Cookie.get('User-Token'),
        openid: Cookie.get('User-Openid')
    },
    mutations: {
        addToken(state, str) {
            state.token = str
        },
        addOpenid(state, str) {
            state.openid = str
        }
    },
    actions: {
        /**
         * 使用用户名密码登录方法
         * @param {Object} 参数
         */
        loginByUserName({ commit }, params) {
            return new Promise((resolve, reject) => {
                loginByUserName(params).then(res => {
                    commit('addToken', Cookie.get('User-Token'))
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 微信环境下，自动登录使用
         * @param {*} param0
         * @param {*} tokenStr
         */
        autoLogin({ commit }, tokenStr) {
            return new Promise((resolve, reject) => {
                commit('addToken', tokenStr)
                Cookie.set('User-Token', tokenStr, { expires: 2 })
                resolve(true)
            })
        },
        /**
         * 退出方法
         */
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('addToken', '')
                commit('addOpenid', '')
                Cookie.remove('User-Token')
                Cookie.remove('User-Openid')
                commit('saveUserInfo', {
                    name: '',
                    avatar: ''
                })
                resolve(true)
            })
        },
        /**
         * 添加openid方法
         */
        saveOpenid({ commit }, opendStr) {
            return new Promise((resolve, reject) => {
                commit('addOpenid', opendStr)
                Cookie.set('User-Openid', opendStr, { expires: 7 })
                resolve()
            })
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        openid(state) {
            return state.openid
        }
    }
}
export default user
