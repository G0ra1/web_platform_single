<template>
  <n-modal
    class="nw-modal"
    v-model:show="handleVisible"
    preset="dialog"
    style="width: 800px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
    bordered
  >
    <template #icon>
      <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>办理</div>
    </template>
    <div class="handle-body" style="height: 400px">
      <n-tabs
        class="handle-body-tabs"
        pane-class="handle-body-tab-pane"
        v-model:value="tabValue"
        style="height: 100%"
        size="small"
        type="card"
        :tabs-padding="5"
      >
        <n-tab-pane name="handle" tab="办理">
          <handle />
        </n-tab-pane>
        <n-tab-pane name="circularize" tab="传阅">
          <circularize />
        </n-tab-pane>
        <n-tab-pane name="notify" tab="知会">
          <notify />
        </n-tab-pane>
      </n-tabs>
    </div>

    <template #action>
      <div style="padding: 5px">
        <n-button type="info" size="small" style="margin-right: 5px" @click="sendSubmit">
          提交
        </n-button>
        <n-button size="small" @click="handleVisible = false">取消</n-button>
      </div>
    </template>
  </n-modal>
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
  NTabs,
  NTabPane
} from "naive-ui";
import {
  NwIcon,
  request
} from "@platform/main";

import Handle from './handle/index.vue'
import Circularize from './circularize/index.vue'
import Notify from './notify/index.vue'

import { handleVisible, sendSubmit } from '../store'
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
    NTabs,
    NTabPane,
    Handle,
    Circularize,
    Notify
  },
  props: {},
  emits: ["callback"],
  setup(props: any, context: any) {
    const tabValue = ref<string>('handle');
    return {
      handleVisible,
      tabValue,
      sendSubmit,
    };
  },
};
</script>

<style lang="less" scoped>
.handle-body {
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-top: 6px;
  .handle-body-tabs {
    display: flex;
    flex-direction: column;
    flex: 1;
    .handle-body-tab-pane {
      padding-top: 0;
      flex: 1
    }
  }
}

</style>
