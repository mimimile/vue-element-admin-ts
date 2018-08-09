import { User, UserSetting, UserInfo, userType } from '@/types/vuex'
import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Commit } from 'vuex'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: '',
    name: '123',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
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
  },
}

export default user
