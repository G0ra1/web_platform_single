<template>
  <div class="">
    <div v-for="item in props.nodeList" :key="item.nextCamundaNodeId">
      <span :class="item.nodeType.icon"></span>
      {{item.nextCamundaNodeName}}
    </div>
  </div>
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
  props: {
    nodeList: {
      type: Array,
      default: () => []
    }
  },
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
  emits: ["callback"],
  setup(props: any, context: any) {
    return {
      props
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
