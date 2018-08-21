import router from '../router'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

import { UserInfo } from '@/types/api'
import { userType } from '@/types/vuex'

NProgress.configure({ showSpinner: false })

function hasPermission(roles: userType[], permissionRoles: userType[]) {
  if (roles.indexOf('admin') >= 0) { return true } // 管理权限通过
  if (!permissionRoles) { return true }
  return roles.some((role) => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  // 进度条开始
  NProgress.start()
  // 判断token是否存在
  if (getToken()) {
    if (to.name === 'login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 判断当前用户是否已拉取玩user_info信息
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then((res) => {
          const data: UserInfo = res.data
          const roles = data.roles
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters)
            const nextRouter = { ...to, replace: true }
            next(nextRouter)
          }).catch((err) => {
            console.warn('Verification failed, please login again')
            store.dispatch('FedLogOut').then(() => {
              // Message.error(err || 'Verification failed, please login again')
              next({ path: '/' })
            })
          })
        })
      } else {
        // 没有权限
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        }
      }
    }
  } else {
    // 没有 token
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ name: 'login' })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
