import { createApp } from 'vue'
// 全局样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'
import 'virtual:uno.css'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.mount('#app')
