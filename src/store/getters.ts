import { State } from '@/types/vuex'

const getters = {
  avatar: (state: State) => state.user.avatar,
  name: (state: State) => state.user.name,
  roles: (state: State) => state.user.roles,
  visitedViews: (state: State) => state.tagsView.visitedViews,
  cachedViews: (state: State) => state.tagsView.cachedViews,
}

export default getters
