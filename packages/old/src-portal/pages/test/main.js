// import { createApp } from 'vue'
import { createApp, defineComponent } from 'vue/dist/vue.esm-bundler.js'
import App from './index.vue'
import naive from 'naive-ui'
import NwComponents from '../template-render/plugins/components.js'

createApp(App).use(NwComponents).use(naive).mount('#app')