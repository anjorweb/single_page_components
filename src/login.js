import router from './router'
import { asyncRouterMap } from './router'
// import store from './store'
import Cookie from 'js-cookie'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { setStorage } from '_utils/sessionStorage.js'
router.addRoutes(asyncRouterMap)
NProgress.configure({
    showSpinner: false
})
// 路由白名单
// const writeList = ['/login', '/404', '/500']
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.meta && to.meta.login) {
        if (Cookie.get('User-Token')) {
            next()
        } else {
            if (to.path) {
                setStorage('rewrite_url', to.path)
            }
            next({ path: '/login' })
        }
    } else {
        next()
    }
})
router.afterEach(() => {
    NProgress.done()
})
