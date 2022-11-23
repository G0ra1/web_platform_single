import { createApp } from '@platform/main'
import NaiveUi from 'naive-ui'
import App from './App.vue'
import { RegisterWidgetDesigner } from './widget-source/index'
import WidgetShell from './components/widget-shell/index.vue'

import Draggable from 'vuedraggable'
createApp(App, true)
.use(NaiveUi)
.use(RegisterWidgetDesigner) // 注册设计渲染组件
.component('draggable', Draggable)
.component('WidgetShell', WidgetShell)
.mount('#app')