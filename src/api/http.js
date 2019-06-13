import 'whatwg-fetch'
import Cookie from 'js-cookie'
import router from '../router'
import store from '../store'
import Message from '_components/message/src/main.js'
import Loader from '_components/loader/src/main.js'
const loadingInstance = new Loader()
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
                reject({
                    code: -20000,
                    msg: '请求超时'
                })
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
     * x-www-form-urlencoded
     * json
     */
    static async request(method, url, data) {
        const param = {
            method: method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (Cookie.get('User-Token')) {
            param.headers.token = Cookie.get('User-Token')
        }
        let fetch_url = process.env.NODE_ENV === 'development' ? `/api${url}` : `/api${url}`
        if (method === 'GET') {
            fetch_url += this.formatQuery(data)
            // param['body'] = JSON.stringify(data)
        } else if (method === 'File') {
            param['body'] = data
            param['method'] = 'post'
            delete param.headers['Content-Type']
            param.headers['Accept'] = 'application/json, text/plain, */*'
        } else {
            // param['body'] = this.transformRequest(data)
            param['body'] = JSON.stringify(data)
        }
        // 调用loading
        loadingInstance.show()
        return new Promise((resolve, reject) => {
            this._fetch(fetch(fetch_url, param), 5000)
                .then(response => {
                    return this.isSuccess(response)
                })
                .then(response => {
                    const resCode = Number(response.code)
                    // 未登录
                    if (resCode === 999 || resCode === 100041) {
                        store.dispatch('logout').then(() => {
                            router.app.$router.replace({ path: '/login' })
                        })
                        reject('error')
                    }
                    if (resCode !== 0) {
                        Message(`${response.msg}`)
                        reject(response)
                        return;
                    }
                    resolve(response.data)
                }).catch(() => {
                    loadingInstance.close()
                    reject('error')
                    // Message(`${error.msg}，请刷新重试`)
                })
        })
    }
    /**
     * 请求成功的处理
     * @param {Object} res response 返回
     */
    static isSuccess(response) {
        loadingInstance.close()
        // return response.json()
        //     .then(json => {
        //         if (response.ok) {
        //             // 存token
        //             const token = response.headers.get('token')
        //             if (token) {
        //                 Cookie.set('User-Token', token, { expires: 7 })
        //             }
        //             return json
        //         } else {
        //             return Promise.reject(json)
        //         }
        //     })
        if (response.status >= 200 && response.status < 300) {
            // 存token
            const token = response.headers.get('token')
            if (token) {
                Cookie.set('User-Token', token, { expires: 2 })
            }
            return response.json()
        } else {
            this.requestException(response)
            return Promise.reject(false)
        }
    }
    /**
     * 异常处理
     * @param {Object} res response 返回
     */
    static requestException(res) {
        const error = new Error(res.statusText)
        error.response = res
        Message(`${res.status}：${res.statusText}`)
        throw error
    }
    static file(url, data) {
        return this.request('File', url, data)
    }
    static goUrl(url, data) {
        location.href = `/api${url}?url=${encodeURIComponent(data.rewrite_url)}`
    }
    /**
     * get请求
     * @param {String} url 地址
     * @param {Object} data 参数
     */
    static get(url, data) {
        return this.request('GET', url, data)
    }
    /**
     * post请求
     * @param {String} url 地址
     * @param {Object} data 参数
     */
    static post(url, data) {
        return this.request('POST', url, data)
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
        // return JSON.stringify(query)
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
