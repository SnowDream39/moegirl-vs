import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/views/MenuView.vue') },
  { path: '/billboard', component: () => import('@/views/BillboardView.vue') },
  { path: '/vocadb', component: () => import('@/views/VocadbView.vue') },
  { path: '/:pathMatch(.*)', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
