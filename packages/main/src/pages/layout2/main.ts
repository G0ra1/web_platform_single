import { createApp } from '@platform/main'
import App from './App.vue'
import NaiveUi from 'naive-ui'
import Splitter from 'vue-devui/splitter'
import 'vue-devui/splitter/style.css'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'

createApp(App, true)
.use(NaiveUi)
.use(Splitter)
.component('InfiniteLoading', InfiniteLoading)
.mount('#app')
