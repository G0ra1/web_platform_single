import { createApp, h, defineComponent, createVNode } from 'vue'
import {
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider
} from 'naive-ui'
import App from './index.vue'
import VXETable from 'vxe-table'
import 'xe-utils'
import 'vxe-table/lib/style.css'
import { drag } from '/@/plugins/drag'
// createApp(App).use(VXETable).mount('#app')


const app = createApp(defineComponent({
  render() {
    return h(NMessageProvider, {}, {
      default: () => h(NNotificationProvider, {}, {
        default: () => h(NDialogProvider, {}, {
          default: () => h(App)
        })
      })
    })
  }
}))
app.use(VXETable)
app.directive('drag', drag)
app.mount('#app')