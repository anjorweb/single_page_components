import 'whatwg-fetch'
import { Loading, Message } from 'element-ui'
import Cookie from 'js-cookie'
import router from '../router'
import store from '../store'
import axios from 'axios'
import Qs from 'qs'
axios.defaults.transformRequest = [
    (data, header) => {
        console.dir(data)
        // 改变请求内容
        // 仅仅需要 return data 即可
        return data
    }
]
const options = {
    lock: true,
    background: 'rgba(255, 255, 255, 0.5)'
}
let loadingInstance
/**
 * HTTP工具类
 */
export default class Http {
    /**
     * 处理超时方法
     * @param {Promise} fetch_promise 原生fetch异步
     * @param {Number} timeout 超时时间
     */
    static _fetch(fetch_promise, timeout) {
        let abort_fn = null
        const abort_promise = new Promise((resolve, reject) => {
            abort_fn = function() {
                reject('请求超时')
            }
        })
        const race_promise = Promise.race([
            fetch_promise,
            abort_promise
        ])
        setTimeout(() => {
            abort_fn()
        }, timeout)
        // race_promise.abort = abort_fn
        return race_promise
    }
    /**
     * 发起普通请求方法
     * @param {String} method 请求类型
     * @param {String} url 请求链接
     * @param {Object} data 请求的参数
     */
    static request(serviceParams) {
        serviceParams.params = Qs.stringify(serviceParams.params)
        const serviceInterface = axios.create({
            baseURL: '/api/',
            timeout: 15000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            // withCredentials: true
        })
        // 调用loading
        loadingInstance = Loading.service(options)
        // request 拦截器
        serviceInterface.interceptors.request.use(
            config => {
                const token = Cookie.get('User-Token')
                if (token) {
                    config.headers['token'] = token
                }
                return config
            },
            error => {
                loadingInstance.close()
                Message.error(error.message)
                return Promise.reject(error)
            }
        )
        // response拦截器
        serviceInterface.interceptors.response.use(
            response => {
                loadingInstance.close()
                const data = response.data
                // 对response做处理
                if (response.status === 400 || response.data.code === 999) {
                    store.dispatch('logout').then(() => {
                        router.push({ path: '/login' })
                    })
                    return null
                }
                if (response.status !== 200) {
                    Message.error(`${response.status}:${response.statusText}`)
                    return null
                }
                if (Number(data.code) !== 0) {
                    Message.error(data.msg)
                    return Promise.reject(data)
                }
                return response
            },
            error => {
                loadingInstance.close()
                Message.error(error.message)
                return Promise.reject(error)
            }
        )
        return serviceInterface(serviceParams)
    }
    /**
     * 请求成功的处理
     * @param {Object} res response 返回
     */
    static isSuccess(res) {
        loadingInstance.close()
        if (res.status >= 200 && res.status < 300) {
            // 存token
            const token = res.headers.get('token')
            if (token) {
                Cookie.set('User-Token', token, { expires: 7 })
            }
            return res.json()
        } else {
            this.requestException(res)
        }
    }
    /**
     * 异常处理
     * @param {Object} res response 返回
     */
    static requestException(res) {
        const error = new Error(res.statusText)
        error.response = res
        Message.error(`${res.status}：${res.statusText}`)
        throw error
    }
    static file(url, data) {
        return this.request({
            url: url,
            method: 'post',
            params: data,
            isFile: true
        })
    }
    /**
     * get请求
     * @param {String} url 地址
     * @param {Object} data 参数
     */
    static get(url, data) {
        return this.request({
            url: url,
            method: 'get',
            params: data
        })
    }
    /**
     * post请求
     * @param {String} url 地址
     * @param {Object} data 参数
     */
    static post(url, data) {
        return this.request({
            url: url,
            method: 'post',
            params: data
        })
    }
    /**
     * put请求
     * @param {String} url 地址
     * @param {Object} data 参数
     */
    static put(url, data) {
        return this.request('PUT', url, data)
    }
    /**
     * delete请求
     * @param {String} url 地址
     * @param {Object} data 参数
     */
    static delete(url, data) {
        return this.request('DELETE', url, data)
    }
    /**
     * patch请求
     * @param {String} url 地址
     * @param {Object} data 参数
     */
    static patch(url, data) {
        return this.request('PATCH', url, data)
    }
    /**
     * 格式化json，适用于post请求
     * @param {Object} query 待格式化的参数
     */
    static transformRequest(query) {
        let ret = ''
        for (const it in query) {
            ret +=
                encodeURIComponent(it) +
                '=' +
                encodeURIComponent(query[it]) +
                '&'
        }
        ret = ret.slice(0, ret.length - 1)
        return ret
    }
    /**
     * 格式化json，适用于get请求
     * @param {Object} query 待格式化的参数
     */
    static formatQuery(query) {
        // {a: 1, b:2};
        var params = []
        if (!query) return ''
        for (const key in query) {
            const val = query[key]
            if (val !== undefined) {
                params.push(key + '=' + query[key])
            }
        }
        return params.length ? '?' + params.join('&') : ''
    }
}
