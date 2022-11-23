import { createApp } from '@platform/main'
import App from './index.vue'
import router from './router/index.js'
import "./styless/index.less"
createApp(App).use(router).mount('#app')
