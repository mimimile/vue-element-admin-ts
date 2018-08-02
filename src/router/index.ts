import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import { RouteConfigPlus } from '../types/route'

Vue.use(Router)

export const constantRouterMap: RouteConfigPlus[] = [
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true },
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    hidden: true,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    hidden: true,
  },
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap,
})

export const asyncRouterMap = []
