<template>
  <n-layout class="design-layout" has-sider position="static" >
    <n-layout-sider
    class="design-layout-sider"
    bordered
    collapse-mode="width"
    :collapsed-width="0"
    show-trigger
    :width="170"
    @collapse="collapsed = true"
    @expand="collapsed = false"
    >
      侧栏
    </n-layout-sider>
    <n-layout-content class="design-layout-content" :native-scrollbar="false" >
      <!-- 这里写入多个 -->
    </n-layout-content>
    <n-layout-sider
    class="design-layout-attr"
    :width="170"
    border
    >
    右侧栏
    </n-layout-sider>
  </n-layout>
</template>
<script>
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NMessageProvider,
  NNotificationProvider,
  NSpin,
  NModal,
  NButton
} from 'naive-ui'
export default {
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NMessageProvider,
    NNotificationProvider,
    NSpin,
    NModal,
    NButton
  },
  props:{
    value: {
      type: Object
    }
  },
  setup(props){
    return {
    }
  }
}
</script>

<style lang='less'>
.design-layout {
  height: 100%;
}
</style>