import { param2Obj } from '@/utils'
import { userType } from '@/types/vuex'
import { UserInfo } from '@/types/api'

interface UserMap {
  [type: string]: UserInfo
}

const userMap: UserMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
  },
}

const typeList = ['admin', 'editor']

export default {
  loginByUsername: (config: any) => {
    const { username } = JSON.parse(config.body)
    return userMap[username as userType]
  },
  getUserInfo: (config: any) => {
    const { token } = param2Obj(config.url) as any
    if (typeList.indexOf(token) < 0) {
      return false
    }
    const infoName = token as userType
    return userMap[infoName]
  },
  logout: () => 'success',
}
