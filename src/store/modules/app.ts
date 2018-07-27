import Cookies from 'js-cookie'
import { App, AppDevice } from '@/types/vuex'
import { Commit } from 'vuex'

const openedStatus = Cookies.get('sidebarStatus')

const app = {
  state: {
    sidebar: {
      opened: openedStatus ? !+openedStatus : 0,
      withoutAnimation: false,
    },
    device: 'desktop',
  },
  mutations: {
    TOGGLE_SIDEBAR: (state: App) => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', '1')
      } else {
        Cookies.set('sidebarStatus', '0')
      }
      state.sidebar.opened = state.sidebar.opened ? 1 : 0
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state: App, withoutAnimation: boolean) => {
      Cookies.set('sidebarStatus', '1')
      state.sidebar.opened = 0
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state: App, device: AppDevice) => {
      state.device = device
    },
  },
  actions: {
    toggleSideBar(context: { commit: Commit }) {
      context.commit('TOGGLE_SIDEBAR')
    },
    closeSideBar(context: { commit: Commit }, params: { withoutAnimation: boolean }) {
      context.commit('CLOSE_SIDEBAR', params.withoutAnimation)
    },
    toggleDevice(context: { commit: Commit }, device: AppDevice) {
      context.commit('TOGGLE_DEVICE', device)
    },
  },
}

export default app
