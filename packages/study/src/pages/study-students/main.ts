import { createApp } from '@platform/main'
import App from './index.vue'
import router from './router/index.js'
import "video.js/dist/video-js.css"
import lazyPlugin from 'vue3-lazy'

createApp(App,).use(router).use(lazyPlugin,{
    // loading: require('@/assets/images/default.png'), // 图片加载时默认图片
    // error: require('@/assets/images/error.png')// 图片加载失败时默认图片
}).mount('#app')
