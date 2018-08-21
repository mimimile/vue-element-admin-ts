import tagsView from '../store/modules/tagsView'
import { Route } from 'vue-router'
import { RouteConfigPlus } from './route'

export interface App {
  sidebar: AppSidebar
  device: AppDevice
}

export type AppDevice = 'mobile' | 'desktop'

export interface AppSidebar {
  opened: 0 | 1
  withoutAnimation: boolean
}


export type userType = 'admin' | 'editor'
export interface UserInfo {
  username: userType
  password: string
}

export interface UserSetting {
  articlePlatfrom: any[]
}

export interface User {
  user: string
  status: string
  code: string
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  setting: UserSetting
}

export interface Permission {
  routers: RouteConfigPlus[]
  addRouters: RouteConfigPlus[]
}

export interface TagsView {
  visitedViews: Route[]
  cachedViews: Array<string | undefined>
}

export interface State {
  app: App
  user: User
  permission: Permission
  tagsView: TagsView
}
