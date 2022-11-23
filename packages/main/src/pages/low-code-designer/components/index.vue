<template>
  <n-config-provider
    :theme-overrides="{}"
    abstract
  >
    <n-layout class="nw-layout-full">
      <n-layout-header>header</n-layout-header>
      <n-layout has-sider>
        <n-layout-sider content-style="padding: 24px;">
          1
        </n-layout-sider>
        <n-layout-content content-style="padding: 24px;">
          2
        </n-layout-content>
        <n-layout-sider content-style="padding: 24px;">
          3
        </n-layout-sider>
      </n-layout>
      <n-layout-footer>footer</n-layout-footer>
    </n-layout>
  </n-config-provider>
</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from 'vue'
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NSpace,
  NTag,
  NInput,
  NInputGroup,
  NDrawer,
  NDrawerContent,
  useDialog,
  NLayoutSider,
  NTree,
  NForm,
  NFormItem,
  NSpin,
  NCard,
  NPopover,
  NGrid,
  NPopconfirm,
  NGridItem,
  useMessage,
  NRate,
  NModal
} from 'naive-ui'
import {
  NwIcon, RequestPaging, VxeHelper, request, NwTable,
} from '@platform/main'

export default defineComponent({
  components: {
    NwTable,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NPopconfirm,
    NSpace,
    NwIcon,
    NGrid,
    NGridItem,
    NForm,
    NFormItem,
    NPopover,
    NCard,
    NTag,
    NSpin,
    NInput,
    NInputGroup,
    NDrawer,
    NDrawerContent,
    NTree,
    NLayoutSider,
    NRate,
    NModal
  },
  setup(props, context) {

    return {
    }
  }
})

</script>

<style  lang='less' scoped>
</style>
