import Vue from 'vue'
import Browser from '_utils/browser'
import router from './router/index'
const infoArr = []
try {
    const info = Browser.getDeviceInfo({
        domain: location.origin
    })
    for (const key in info) {
        infoArr.push(`${key}=${encodeURIComponent(info[key])}`)
    }
} catch (e) {
    console.dir(e)
}
// 发送错误
function sendError(info) {
    infoArr.push(`path=${router.app.$route.fullPath}`)
    const img = new Image()
    img.src = `/api/frontend-record/index?${infoArr.join('&')}&error=${encodeURIComponent(info)}`
}
if (process.env.NODE_ENV === 'production') {
    Vue.config.errorHandler = function(err, vm, info) {
        // message, // 异常信息
        // name, // 异常名称
        // script, // 异常脚本url
        // line, // 异常行号
        // column, // 异常列号
        // stack // 异常堆栈信息
        const {
            stack, // 异常信息
            name // 异常名称
        } = err
        // vm为抛出异常的 Vue 实例
        // info为 Vue 特定的错误信息，比如错误所在的生命周期钩子
        sendError(`${name}-${stack}`)
    }
}
