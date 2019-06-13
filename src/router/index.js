import Vue from 'vue'
import Router from 'vue-router'
import layoutDefault from '_view/layout/Default'
import _import from './_import_production'
Vue.use(Router)
const base = `${process.env.BASE_URL}` // 获取二级目录
export const constantRouterMap = [
    {
        path: '/404',
        component: _import('404'),
        name: 'page404'
    },
    {
        path: '/',
        redirect: '/index',
        meta: {
            roles: ['super_admin', 'user']
        },
        component: layoutDefault,
        children: [
            {
                path: '/index',
                name: '首页',
                meta: {
                    login: false
                },
                component: _import('home/Index')
            },
            {
                path: '/virtual-list',
                name: '虚拟列表',
                meta: {
                    login: false
                },
                component: _import('virtual-list/Index')
            },
            {
                path: '/upload-image',
                name: '上传图片',
                meta: {
                    login: false
                },
                component: _import('upload-image/Index')
            }
        ]
    },
    {
        path: '*',
        redirect: '/404',
        hide: true
    }
]
export default new Router({
    mode: 'hash',
    base: base,
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})

export const asyncRouterMap = [
]
