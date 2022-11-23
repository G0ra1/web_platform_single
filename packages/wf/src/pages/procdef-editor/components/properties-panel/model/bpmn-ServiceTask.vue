<template>
bpmn-ServiceTask
</template>
<script lang="jsx">
import { h, reactive, ref, watch } from "vue";
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NSteps,
  NStep,
  NGrid,
  NTree,
  NButton,
  NConfigProvider,
  NModal,
  NForm,
  NFormItem,
  NFormItemGi,
  NInput,
  NSelect,
  NCheckbox,
  NRadio,
  NRadioGroup,
  NSpin,
} from "naive-ui";
import { NwIcon, NwDic } from '@platform/main';
export default {
  name: 'bpmn-ServiceTask',
  props: {},
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NSteps,
    NStep,
    NGrid,
    NTree,
    NButton,
    NwIcon,
    NConfigProvider,
    NModal,
    NInput,
    NSelect,
    NForm,
    NFormItem,
    NFormItemGi,
    NCheckbox,
    NRadio,
    NRadioGroup,
    NwDic,
    NSpin
  },
  setup() {
    return {
    };
  },
};
</script>
<style lang="less">
</style>
