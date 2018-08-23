import Layout from '@/views/layout/index.vue'
import { RouteConfig } from 'vue-router'

const componentsRouter: RouteConfig = {
  path: '/components',
  component: Layout,
  redirect: 'noredirect',
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component',
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/components-demo/tinymce.vue'),
      name: 'TinymceDemo',
      meta: { title: 'tinymce' },
    },
    {
      path: 'tinymce',
      component: () => import('@/views/components-demo/tinymce.vue'),
      name: 'TinymceDemo',
      meta: { title: 'tinymce' },
    },
  ],
}

export default componentsRouter
