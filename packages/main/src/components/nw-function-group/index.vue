<template>
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
import { h,defineComponent, ref, reactive, nextTick, computed } from "vue";
import {
  NConfigProvider,
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NModal,
  NPopconfirm,
  NMessageProvider,
  NSpin
  
} from "naive-ui";

import { NwIcon, request, NwFunctionViewer } from '@platform/main'

// import { createConfig, editConfig } from './data.js'
import { get } from 'lodash'

// 这里设立公共存储

export default defineComponent({
  props: {
    // 预定义
    code: {
      type: String,
      default: ''
    },
    descr: {
      type: String,
      default: ''
    }
  },
  emits: ['complete'],
  components: {
    NConfigProvider,
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NModal,
    NPopconfirm,
    NMessageProvider,
    NSpin,
    NwFunctionViewer,
    NwIcon
  },
  setup(props, context) {
    return {

    }
  }
});
</script>
<style lang="less" scoped>

</style>