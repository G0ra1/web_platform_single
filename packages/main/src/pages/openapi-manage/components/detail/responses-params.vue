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
  InterfaceDetailResponseParamList
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
        {
          field: 'fieldName',
          title: '参数名称',
          showHeaderOverflow: true,
          treeNode:true,
        },
        {
          field: 'description',
          title: '参数说明',
          showHeaderOverflow: true,
        },
        {
          field: 'type',
          title: '数据类型',
          showHeaderOverflow: true,
        },
        {
          field: 'schema',
          title: 'Schema',
          showHeaderOverflow: true,
        },
      ],
      data: InterfaceDetailResponseParamList,
      treeConfig: {
        // children: 'kids',
        // hasChild: 'hasKids',
      }
    })


    return {

      gridOptions,

      onComplete () {
      }
    };
  },
});
</script>
