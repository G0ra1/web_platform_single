<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <init />
      <router-view />
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
import themeOverrides from "./theme";
import init from './init.vue'
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
    init
  },

  setup(props, context) {
    return {
      themeOverrides
    };
  }
});
</script>