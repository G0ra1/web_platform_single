<template>
  <n-config-provider
    :theme-overrides="theme"
    abstract
  >
    <n-layout class="nw-layout-full code-designer">
      <n-layout-header
      bordered
      style="flex: 0 0 32px;border-bottom: var(--border);"
      >
      </n-layout-header>
      <n-layout has-sider  >
        <n-layout-sider bordered style="border-right: var(--border);" :width="210" contentStyle="">
          <WidgetPanel />
        </n-layout-sider>
        <n-layout-content contentStyle="padding: 0;">
          <!-- <PagePanel /> -->
          <FormPanel />
        </n-layout-content>
        <n-layout-sider style="border-left: var(--border);box-shadow: 0px 0px 3px #979797;" bordered  :width="210" contentStyle="padding: 2px;">
          <AttributePanel />
        </n-layout-sider>
      </n-layout>
      <n-layout-footer style="padding-left: 10px;font-size: 12px;color: #fff ;flex: 0 0 22px;background: #007acc" bordered >
        当前选取: {{'<'}}表单页面{{'>'}}
        Path: 
      </n-layout-footer>
    </n-layout>
  </n-config-provider>
</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from 'vue'
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

import {
  NwIcon, RequestPaging, VxeHelper, request
} from '@platform/main'

import WidgetPanel from './components/widget-panel/index.vue'
import PagePanel from './components/page-panel/index.vue'
import FormPanel from './components/form-panel/index.vue'
import AttributePanel from './components/attribute-panel/index.vue'

import theme from './theme/index'

export default defineComponent({
  components: {
    NwIcon,
    WidgetPanel,
    PagePanel,
    FormPanel,
    AttributePanel
  },
  setup(props, context) {
    return {
      theme
    }
  }
})

</script>

<style  lang='less' >
@import "./style/index.less";

</style>
