import { User, UserSetting, UserInfo, userType } from '@/types/vuex'
import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Commit } from 'vuex'
import { UserInfo as UserInfoApi } from '@/types/api'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatfrom: [],
    },
  },
  mutations: {
    SET_CODE: (state: User, code: string) => {
      state.code = code
    },
    SET_TOKEN: (state: User, token: string) => {
      state.token = token
    },
    SET_INTRODUCTION: (state: User, introduction: string) => {
      state.introduction = introduction
    },
    SET_SETTING: (state: User, setting: UserSetting) => {
      state.setting = setting
    },
    SET_STATUS: (state: User, status: string) => {
      state.status = status
    },
    SET_NAME: (state: User, name: string) => {
      state.name = name
    },
    SET_AVATAR: (state: User, avatar: string) => {
      state.avatar = avatar
    },
    SET_ROLES: (state: User, roles: string[]) => {
      state.roles = roles
    },
  },
  actions: {
    // 用户登录
    LoginByUsername(context: { commit: Commit }, userInfo: UserInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, rejects) => {
        loginByUsername(username as userType, userInfo.password).then((response) => {
          const data = response.data
          context.commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        }).catch((error) => {
          rejects(error)
        })
      })
    },

    // 登出
    FedLogOut(context: { commit: Commit }) {
      return new Promise((resolve) => {
        context.commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 获取用户信息
    GetUserInfo(context: { commit: Commit, state: User }) {
      return new Promise((resolve, reject) => {
        getUserInfo(context.state.token).then((response) => {
          if (!response.data) {
            reject('error')
          }
          const data: UserInfoApi = response.data

          const commit = context.commit
          if (data.roles && data.roles.length > 0) {
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    },
  },
}

export default user
