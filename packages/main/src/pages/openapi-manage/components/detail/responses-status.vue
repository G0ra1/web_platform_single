<template>
  <vxe-grid
    v-bind="gridOptions"
    ref="gridComponent"
    class="mytable-scrollbar"
  >
  </vxe-grid>
</template>

<script lang="jsx">
import { defineComponent, reactive, ref, h, computed, getCurrentInstance } from "vue";
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
  NPopconfirm,
  useMessage,
} from "naive-ui";

import { 
  InterfaceDetailResponseStatus
} from '../../store/index.js' 

export default defineComponent({
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
    NPopconfirm
  },
  setup() {

    // 表格配置
    const gridOptions = reactive({
      rowId: 'id',
      size: 'mini',
      border: false,
      resizable: true,
      // height: 'auto',
      align: null,
      columns: [
        { field: 'code', title: '状态码', showHeaderOverflow: true, width: 200 },
        { field: 'description', title: '说明', showHeaderOverflow: true, },
        { field: 'schema', title: 'schema', showHeaderOverflow: true, }
      ],
      data: InterfaceDetailResponseStatus
    })


    return {

      gridOptions,

      onComplete () {
      }
    };
  },
});
</script>
