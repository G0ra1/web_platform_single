<template>
  <vxe-grid
    v-bind="bind"
    ref="gridRef"
  >
  </vxe-grid>
</template>
<script lang="tsx">
import { ref, reactive, nextTick, h } from "vue";
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NForm,
  NFormItem,
  NGrid,
  NFormItemGi,
  NInputGroup,
  NInput,
  NButton,
  NSpin,
  NModal,
  NSpace,
  NCheckbox,
  NRadioGroup,
  NRadio,
  NDivider,
  NDrawer,
} from "naive-ui";
import { NwIcon, request } from "@platform/main";

export default {
  components: {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NForm,
    NFormItem,
    NGrid,
    NFormItemGi,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NwIcon,
    NSpace,
    NCheckbox,
    NRadioGroup,
    NRadio,
    NDivider,
    NDrawer,
  },
  props: {},
  emits: ["callback"],
  setup(props: any, context: any) {
    const visible = ref<boolean>(false);
    return {
      visible,
      show() {
        visible.value = true;
      },
      submit() {},
      bind: {
        // showHeader: false,
        rowId: 'id',
        size: 'mini',
        border: true,
        resizable: true,
        height: '378px',
        align: null,
        data: [],
        columns: []
      }
    };
  },
};
</script>

<style scoped lang="less">
.handle {
  display: flex;
  border-bottom: 1px solid #ccc;
  height: 100%;
  > .sider {
    flex: 0 0 250px;
    border-right: 1px solid #ccc;
  }
  > .content {
    flex: 1;
  }
}
</style>
