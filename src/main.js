import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Message from '_components/message/index.js'
import Cookie from 'js-cookie'

// 导入事件分发器 eventHub
import EventHub from './eventHub.js'
const width = window.innerWidth
const height = window.innerHeight
/**
 * 导入ui组件和全局css
 */
import './ui'
Vue.config.productionTip = false
/**
 * 不是生产环境，做一些事情
 */
if (process.env.NODE_ENV !== 'production') {
    // var vConsole = require('vconsole/dist/vconsole.min.js');
    // var vConsole = new vConsole();
    Vue.config.performance = true
}
Vue.use(Message)

Object.defineProperty(Vue.prototype, '$width', {
    value: width
})
Object.defineProperty(Vue.prototype, '$height', {
    value: height
})
Object.defineProperty(Vue.prototype, '$cookie', {
    value: Cookie
})
/**
 * 增加路由守卫，处理登录逻辑
 */
import './login'

// 错误收集
import './errorHandler'
/**
 * 实例化Vue
 */
new Vue({
    router,
    store,
    render: h => h(App),
    data: {
        eventHub: EventHub
    }
}).$mount('#app')
