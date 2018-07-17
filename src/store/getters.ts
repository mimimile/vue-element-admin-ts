import { State } from '@/types/vuex'

const getters = {
  avatar: (state: State) => state.user.avatar,
  name: (state: State) => state.user.name,
  roles: (state: State) => state.user.roles,
}

export default getters
