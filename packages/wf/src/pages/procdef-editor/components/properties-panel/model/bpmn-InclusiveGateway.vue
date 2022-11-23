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
                  :value="actionElBusinessObject.name"
                  @update:value="e => {actionElBusinessObject.name = e;updateActionElProperties({name: e})}"
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
import { h, reactive, ref, watch, getCurrentInstance, computed } from "vue";
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
import { NwIcon } from '@platform/main';
import {
  actionElBusinessObject,
  updateActionElProperties
} from "../../../store/bpmn"
import PanelEvent from "../../field/PanelEvent/index.vue"

export default {
  name: 'bpmn-InclusiveGateway',
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
    NSpin,
    NSwitch,
    PanelEvent
  },
  setup() {
    // 是否路由分支
    // const isBranch = computed(() => actionElBusinessObject.value.sourceRef.$type === 'bpmn:ExclusiveGateway' &&
    //     actionElBusinessObject.value.sourceRef.outgoing.length > 1)
    // 会签开启关闭
    return {
      actionElBusinessObject,
      updateActionElProperties
    };
  },
};
</script>
<style lang="less">
</style>
