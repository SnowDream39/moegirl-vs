import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/menu', component: () => import('@/views/MenuView.vue') },
  { path: '/home', component: () => import('@/views/HomeView.vue') },
  { path: '/billboard', component: () => import('@/views/BillboardView.vue') },
  { path: '/vocadb', component: () => import('@/views/VocadbView.vue') },
  // 空hash，则跳转至Login页面
  { path: '', redirect: '/menu' },
  // 未匹配，则跳转至Login页面
  { path: '/:pathMatch(.*)', redirect: '/menu' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
