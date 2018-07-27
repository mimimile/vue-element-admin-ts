import tagsView from '../store/modules/tagsView'
import { Route } from 'vue-router'

export interface App {
  sidebar: AppSidebar
  device: AppDevice
}

export type AppDevice = 'mobile' | 'desktop'

export interface AppSidebar {
  opened: 0 | 1
  withoutAnimation: boolean
}

export interface User {
  avatar: string
  name: string
  roles: string
}

export interface TagsView {
  visitedViews: Route[]
  cachedViews: Array<string | undefined>
}

export interface State {
  user: User
  tagsView: TagsView
}
