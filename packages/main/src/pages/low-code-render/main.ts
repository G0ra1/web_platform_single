import { createApp } from '@platform/main'
import NaiveUi from 'naive-ui'
import App from './App.vue'
import { RegisterWidgetDesigner } from '../low-code-designer/widget-source/index'
createApp(App, true)
.use(NaiveUi)
.use(RegisterWidgetDesigner) // 注册设计渲染组件
.mount('#app')