import Layout from 'vue-devui/layout'
import Splitter from 'vue-devui/splitter'
import 'vue-devui/layout/style.css'
import 'vue-devui/splitter/style.css'

import { createApp } from '@platform/main'
import App from './App.vue'
createApp(App)
.use(Layout)
.use(Splitter)
.mount('#app')