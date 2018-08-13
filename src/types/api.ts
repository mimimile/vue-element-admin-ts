import { userType } from '@/types/vuex'

export interface UserInfo {
  roles: userType[]
  token: string
  introduction: string
  avatar: string
  name: string
}
