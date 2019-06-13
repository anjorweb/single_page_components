import Message from './src/main.js'
export default {
    install(Vue) {
        Vue.prototype.$message = Message
    }
}
