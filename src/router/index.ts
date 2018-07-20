import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index.vue'),
          name: 'dashboard',
          meta: { title: 'dashboard' },
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
})
