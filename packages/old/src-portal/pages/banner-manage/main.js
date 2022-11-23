import { createApp } from '/@/plugins/app'
import App from './index.vue'
import VueUeditorWrap from 'vue-ueditor-wrap';
createApp(App).then(r => r.use(VueUeditorWrap).mount('#app'))