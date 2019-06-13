
// 商品的接口
import Http from '../http'
// 微信share
export const getWeixin = params => {
    return Http.get('/wx/wx-share', params)
}
// 获取微信用户信息
export const getWxUserInfo = params => {
    return Http.post('/wx/wx-info', params)
}
// 跳转到登录
export const goWxLogin = params => {
    return Http.goUrl('/wx/wx-login', params)
}
