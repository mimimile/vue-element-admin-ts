import { State } from '@/types/vuex'

const getters = {
  sidebar: (state: State) => state.app.sidebar,
  avatar: (state: State) => state.user.avatar,
  name: (state: State) => state.user.name,
  roles: (state: State) => state.user.roles,
  visitedViews: (state: State) => state.tagsView.visitedViews,
  cachedViews: (state: State) => state.tagsView.cachedViews,
  permissionRouters: (state: State) => state.permission.routers,
  addRouters: (state: State) => state.permission.addRouters,
}

export default getters
