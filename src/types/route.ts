import { RouteConfig } from 'vue-router'

export type Role = 'admin' | 'editor'

export interface Meta {
  title?: string
  icon?: string
  roles?: Role[]
}

export interface RouteConfigPlus extends RouteConfig {
  hidden?: boolean
  meta?: Meta
}
