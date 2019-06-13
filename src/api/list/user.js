import Http from '../http'

export const loginByUserName = params => {
    return Http.post('/user/login', params)
}
// 获取验证码
export const getMsgCode = params => {
    return Http.post('/message-code/get', params)
}
// 退出登录
export const logout = params => {
    return Http.post('/user/login-out', params)
}

