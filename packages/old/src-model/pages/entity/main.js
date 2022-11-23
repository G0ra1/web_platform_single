import { createApp } from '/@/plugins/app'
import App from './index.vue'
import 'highlight.js/styles/stackoverflow-light.css'
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";
createApp(App).then(r => r.use(hljsVuePlugin).mount('#app'))
