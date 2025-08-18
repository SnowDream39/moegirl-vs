import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/views/MenuView.vue') },
  { path: '/billboard', component: () => import('@/views/BillboardView.vue') },
  { path: '/song', component: () => import('@/views/SongView.vue') },
  { path: '/producer', component: () => import('@/views/ProducerView.vue') },
  { path: '/:pathMatch(.*)', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
