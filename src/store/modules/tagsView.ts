import { TagsView } from '@/types/vuex'
import { Route } from 'vue-router'
import { Commit } from 'vuex'

const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: [],
  },
  mutations: {
    ADD_VISITED_VIEWS: (state: TagsView, view: Route) => {
      if (state.visitedViews.some((v: Route) => v.path === view.path)) { return }
      state.visitedViews.push(Object.assign({}, view, {
        title: view.meta.title || 'no-name',
      }))
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_VISITED_VIEWS: (state: TagsView, view: Route) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
    DEL_OTHERS_VIEWS: (state: TagsView, view: Route) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, index + 1)
          break
        }
      }
    },
    DEL_ALL_VIEWS: (state: TagsView) => {
      state.visitedViews = []
      state.cachedViews = []
    },
  },
  actions: {
    addVisitedViews(context: { commit: Commit }, view: Route) {
      context.commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews(context: { commit: Commit, state: TagsView }, view: Route) {
      return new Promise((resolve) => {
        context.commit('DEL_VISITED_VIEWS', view)
        resolve([...context.state.visitedViews])
      })
    },
    delOthersViews(context: { commit: Commit, state: TagsView }, view: Route) {
      return new Promise((resolve) => {
        context.commit('DEL_OTHERS_VIEWS', view)
        resolve([...context.state.visitedViews])
      })
    },
    delAllViews(context: { commit: Commit, state: TagsView }) {
      return new Promise((resolve) => {
        context.commit('DEL_ALL_VIEWS')
        resolve([...context.state.visitedViews])
      })
    },
  },
}

export default tagsView
