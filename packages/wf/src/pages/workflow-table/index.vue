<template>
  <n-config-provider :theme-overrides="{}" style="height:100%">
    <n-message-provider>
      <layout />
    </n-message-provider>
  </n-config-provider>
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
import { h, defineComponent, ref, reactive, getCurrentInstance } from "vue";
import {
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
  NMessageProvider,
  NConfigProvider

} from "naive-ui";

import Layout from './layout/index.vue'

export default defineComponent({
  components: {
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
    NMessageProvider,
    NConfigProvider,
    Layout
  },

  setup(props, context) {
    return {
    };
  }
});
</script>