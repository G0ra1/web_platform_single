import { createApp } from '@platform/main'
import App from './index.vue'
import Layout from 'vue-devui/layout'
import Splitter from 'vue-devui/splitter'
// import 'vue-devui/layout/style.css'
import 'vue-devui/splitter/style.css'

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
// import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
// import 'diagram-js-minimap/assets/diagram-js-minimap.css'
import './bpmn/modules/diagram-js-minimap/index.css'

createApp(App)
.use(Layout)
.use(Splitter)
.mount('#app')
// document.documentElement.style.fontSize = '12px'