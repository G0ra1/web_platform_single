<template>
  <!-- <n-popover trigger="hover" :show-arrow="false" style="padding: 0">
        <template #trigger>
            <n-button type="primary">
                <nw-icon name="icon-n-n-sys" :size="16" />
            </n-button>
        </template>
        <div style="display: flex; flex-direction: column;padding: 5px;">
            <n-button @click="suspendProcess" style="margin-bottom: 5px;">流程挂起</n-button>
            <n-button @click="activateProcess" style="margin-bottom: 5px;">流程激活</n-button>
            <n-button @click="endProcess" style="margin-bottom: 5px;">流程终止</n-button>
            <n-button @click="handleDeleteProcess" style="margin-bottom: 5px;">流程删除</n-button>
        </div>
    </n-popover> -->
  <n-button v-if="props.rules.wf_sus_process" @click="handleSuspendProcess" style="margin-right: 5px" type="error">挂起</n-button>
  <n-button v-if="props.rules.wf_act_process" @click="handleActivateProcess" style="margin-right: 5px" type="error">激活</n-button>
  <n-button v-if="props.rules.wf_end_process" @click="handleEndProcess" style="margin-right: 5px" type="error">终止</n-button>
  <n-button v-if="props.rules.wf_del_process" @click="handleDeleteProcess" style="" type="error">删除</n-button>
  <NwDialog ref="nwDialogRef" />
</template>

<script lang="tsx">
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
  NSelect,
  NForm,
  NFormItem,
  NPopconfirm,
  NMessageProvider,
  NPopover,
  NSpace,
} from "naive-ui";

import { NwIcon } from "@platform/main";

import NwDialog from "./dialog.vue";

import { nwDialogRef,
    handleDeleteProcess,
    handleEndProcess,
    handleSuspendProcess,
    handleActivateProcess
} from "./store";
export default defineComponent({
  props: {
    rules: {
        type: Object,
        default: () => ({})
    }
  },
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
    NSelect,
    NForm,
    NFormItem,
    NPopconfirm,
    NMessageProvider,
    NwIcon,
    NPopover,
    NSpace,
    NwDialog,
  },
  setup(props, context) {
    return {
      props,
      nwDialogRef,
      suspendProcess() {},
      activateProcess() {},
      endProcess() {},
      handleEndProcess,
    handleSuspendProcess,
    handleActivateProcess,
      handleDeleteProcess,
    };
  },
});
</script>
<style lang="less"></style>
