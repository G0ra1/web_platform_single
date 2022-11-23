import { createApp } from '@platform/main'
import App from './App.vue'

import Splitter from 'vue-devui/splitter'
import 'vue-devui/splitter/style.css'

createApp(App).use(Splitter).mount('#app')
