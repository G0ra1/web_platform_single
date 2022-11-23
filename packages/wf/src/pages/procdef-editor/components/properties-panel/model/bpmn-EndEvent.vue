<template>
    <n-tabs
    size="small"
    type="card"
    :tabs-padding="5"
    >
      <n-tab-pane name="geneal" tab="常规">
        <n-layout :native-scrollbar="false" class="pro-properties-panel-content">
          <n-form
              ref="formRef"
              label-placement="top"
              :label-width="60"
              size="small"
              style="padding: 5px 10px"
          >
              <n-form-item label="节点ID" path="inputValue">
                <n-input
                  disabled
                  placeholder=""
                  :value="actionElBusinessObject.id"
                />
              </n-form-item>
              <n-form-item label="节点名称" path="inputValue">
                <n-input 
                  placeholder=""
                  v-model:value="actionElBusinessObject.name"
                />
              </n-form-item>
          </n-form>
        </n-layout>
      </n-tab-pane>
      <n-tab-pane name="events" tab="事件">
        <n-layout :native-scrollbar="false" class="pro-properties-panel-content">
          <panel-event />
        </n-layout>
      </n-tab-pane>
    </n-tabs>
</template>
<script lang="jsx">
import { h, reactive, ref, watch, getCurrentInstance } from "vue";
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NTabs,
  NTabPane,
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
  NSwitch 
} from "naive-ui";
import { NwIcon, NwDic } from '@platform/main';
import {
  actionElBusinessObject
} from "../../../store/bpmn"

import PanelEvent from "../../field/PanelEvent/index.vue"
export default {
  name: 'bpmn-EndEvent',
  props: {

  },
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NTabs,
    NTabPane,
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
    NSpin,
    NSwitch,
    PanelEvent
  },
  setup() {
    return {
      actionElBusinessObject
    };
  },
};
</script>
<style lang="less">
</style>
