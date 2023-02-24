<template>
  <div class="page-panel" >
    <div class="header">
      
    </div>
    <div class="content">
      <n-scrollbar class="page">
        <div style="padding: 2px">
        <template v-for="item in SourceWidget" :key="item.key">
          <component :is="`dw-${item.tagName}`" :value="item" >
          </component>
        </template>
        </div>
      </n-scrollbar>
    </div>
  </div>
</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted, provide } from 'vue'
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

import { designer } from '../../store/index'
import { compileConfig } from '../../utils/index'

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
    const {
      SourceWidget
    } = designer
    return {
      SourceWidget
    }
  }
})

</script>

<style  lang='less'>

.page-panel {
  
  box-sizing: border-box;
  height: 100%;
  >.header {
    height: 32px;
    box-sizing: border-box;
    border-bottom: var(--border);
  }
  >.content {
    height: calc(~'100% - 32px');
    padding: 20px;
    box-sizing: border-box;
    background: var(--light-gray5);
    >.page {
      height: 100%;
      border: 1px solid #ccc;
      box-shadow: 0 0 6px rgba(0,0,0,.3);
      box-sizing: border-box;
      // background: #fff;
      background-image: linear-gradient(90deg, rgba(60, 10, 30, .08) 3%, transparent 0), linear-gradient(1turn, rgba(60, 10, 30, .08) 3%, transparent 0);
      background-size: 20px 20px;
      // background-position: 40%;
      background-repeat: repeat;
      background-color: #fff;
      // padding: 10px;
    }
  }
}
</style>
