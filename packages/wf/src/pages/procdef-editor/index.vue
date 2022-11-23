<template>
  <n-config-provider abstract :theme-overrides="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <layout />
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script>
import { defineComponent, ref, nextTick } from 'vue'

import {
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  NConfigProvider,
  NSpin,
  zhCN,
  dateZhCN
} from 'naive-ui'
import theme from './theme/index.js'
import { init } from './store/index.js'
import Layout from './layout/index.vue'
export default defineComponent({
  name: "App",
  components: {
    Layout,
    NMessageProvider,
    NNotificationProvider,
    NDialogProvider,
    NConfigProvider,
    NSpin
  },
  setup() {
    const inited = ref(false)
    // nextTick().then(() => {
    //   alert(2)
    // })
    init().then(() => {
      inited.value = true
    })
    const sizeChange = (size) => {
      console.log(size);
    }

    return {
      inited,
      zhCN,
      dateZhCN,
      sizeChange,
      theme
    }
  },
})
</script>

<style lang="less"> 
body {
  overflow: hidden;
}
</style>
