import { Permission } from '@/types/vuex'
import router, { constantRouterMap, asyncRouterMap } from '@/router'
import { RouteConfigPlus, Meta, Role } from '@/types/route'
import { Commit } from 'vuex'

function hasPermission(route: RouteConfigPlus, roles: Role[]) {
  console.warn('route', route)
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      return route.meta && route.meta.roles ? route.meta.roles.indexOf(role) >= 0 : false
    })
  } else {
    return true
  }
}

/**
 * @desc 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routers: RouteConfigPlus[]
 * @param roles: Role[]
 */
function filterAsyncRouter(routers: RouteConfigPlus[], roles: Role[]) {
  const accessedRouters = routers.filter((route) => {
    if (hasPermission(route, roles)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state: Permission, routers: RouteConfigPlus[]) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
  },
  actions: {
    GenerateRoutes(context: { commit: Commit }, data: Meta) {
      return new Promise((resolve, reject) => {
        const { roles } = data
        let accessedRouters
        if (!roles) {
          reject('error')
        } else if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        context.commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
  },
}

export default permission
