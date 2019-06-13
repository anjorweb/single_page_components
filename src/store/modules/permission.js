/**
 * 用户权限验证
 */
import { asyncRouterMap } from '@/router'
function hasPermission(route, roles) {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.some(item => {
            return roles.indexOf(item) >= 0
        })
    } else {
        return false
    }
}
const permission = {
    state: {
        addRouters: []
    },
    mutations: {
        SET_ROUTES(state, routers) {
            state.addRouters = routers
        }
    },
    actions: {
        GenerateRoutes({ commit }, roles) {
            return new Promise((resolve, reject) => {
                const accessedRoutes = asyncRouterMap.filter(v => {
                    // if (v.meta && v.meta.roles && v.meta.roles.indexOf('super_admin') >= 0) return true
                    if (v.redirect === '/404') return true
                    if (hasPermission(v, roles)) {
                        if (v.children && v.children.length > 0) {
                            v.children = v.children.filter(child => {
                                if (hasPermission(child, roles)) {
                                    return true
                                } else {
                                    return false
                                }
                            })
                        }
                        return true
                    }
                    return false
                })
                commit('SET_ROUTES', accessedRoutes)
                resolve()
            })
        }
    },
    getters: {
        routers(state) {
            return state.addRouters
        }
    }
}
export default permission
