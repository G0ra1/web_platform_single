<template>
  <div class="widget-panel">
    <div class="header">
      <div class="title">组件库</div>
      <div class="extra">1</div>
    </div>
    <div class="content" >
      <n-scrollbar >
        <!-- <div class="widget-item">
          <NwIcon name="icon-n-y-form" :size="26" />
          <div class="text">
            表单
          </div>
        </div> -->
        <!-- <n-divider title-placement="left" style="margin: 10px 0 0 0; padding: 0 20px;">
          容器
        </n-divider>
        <WidgetDrag :value="CategoryContainer" /> -->
        <n-divider v-if="CategoryField.length" title-placement="left" style="margin: 10px 0 0 0; padding: 0 20px;">
          字段组件
        </n-divider>
        <WidgetDrag :value="CategoryField" />
        <n-divider v-if="CategoryData.length" title-placement="left" style="margin: 10px 0 0 0; padding: 0 20px;">
          数据组件
        </n-divider>
        <WidgetDrag :value="CategoryData" />
        <n-divider title-placement="left" style="margin: 10px 0 0 0; padding: 0 20px;">
          格式组件
        </n-divider>
        <WidgetDrag :value="CategoryFormat" />
        <!-- <n-form
          :label-width="50"
          size="small"
          label-placement="top"
          label-align="right"
        >
          <NwFieldEmail v-model:value="test" />
          <n-input v-model:value="test" />

          <NwFieldGrid :value="[{}]" :columns="testColumns">
            <template v-for="col in testColumns"
              #[col.slots.default]
            >
            222
            </template>
            <template v-for="col in testColumns"
              #[col.slots.edit]
            >
            333
            </template>
          </NwFieldGrid>
        </n-form>
        {{test}} -->
      </n-scrollbar>
    </div>
  </div>
</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from 'vue'
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'
import {
  NwIcon, RequestPaging, VxeHelper, request, NwTable,NwFieldEmail
} from '@platform/main'

import { WidgetPanel } from './store'

import WidgetDrag from './widget-drag.vue'

export default defineComponent({
  components: {
    NwIcon,
    WidgetDrag,
    NwFieldEmail
  },
  setup(props, context) {

    const widgetPanel = new WidgetPanel()
    const {
      CategoryContainer,
      CategoryData,
      CategoryField,
      CategoryFormat
    } = widgetPanel
    widgetPanel.init()
    console.log('====hhhh====', h)
    return {
      test: ref(''),
      testColumns: ref([{
        field: 'test',
        title: '测试',
        slots: {
          default: 'test-def',
          edit: 'test-edit'
        }
      },{
        field: 'test1',
        title: '测试1',
        slots: {
          default: 'test1-def',
          edit: 'test1-edit'
        }
      }]),
      CategoryContainer,
      CategoryData,
      CategoryField,
      CategoryFormat
    }
  }
})

</script>

<style  lang='less' scoped>
.widget-panel {
  // display: flex;
  // flex-direction: column;
  height: 100%;
  >.header {
    display: flex;
    justify-content: space-between;
    border-bottom: var(--border);
    // flex: 0 1 32px;
    height: 32px;
    align-items: center;
    box-sizing: border-box;
    >.title {
      font-size: 14px;
      font-weight: bold;
      text-indent: 10px;
    }
  }

  >.content {
    height: calc(~'100% - 32px');
    // flex: 1;
  }
}
</style>
