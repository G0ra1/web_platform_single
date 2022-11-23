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
            <n-form-item
            label="选择流程"
            path="inputValue"
            label-style="align-items: center"
            >
              <template #label >
                <div>选择流程</div>
                <n-button
                  style="margin-left: 5px;"
                  type="info"
                  size="small"
                  @click="pickProcessRef.show()"
                >选择</n-button>
              </template>
              <pick-process
                ref="pickProcessRef"
                v-model:calledElement="actionElBusinessObject.calledElement"
                v-model:childProcdefName="actionElBusinessObject.childProcdefName"
                v-model:calledElementVersion="actionElBusinessObject.calledElementVersion"
                @update:cmdChildLogProcdefId="e => actionElBusinessObject.cmdChildLogProcdefId = e"
                @update:ctmChildLogProcdefId="e => actionElBusinessObject.ctmChildLogProcdefId = e"
              />
            </n-form-item>
            <n-form-item label="多任务子流程" label-style="align-items: center;" path="inputValue">
              <!-- <template #label>
                <span style="margin-right: 10px;">多任务子流程</span>
              </template> -->
              <n-switch
                size="small"
                :value="isMultiInstance"
                @update:value="setMultiInstance"
              />
            </n-form-item>
            <n-form-item label="可查看主流程日志" label-style="align-items: center;" path="inputValue">
              <!-- <template #label>
                <span style="margin-right: 10px;">可查看主流程日志</span>
              </template> -->
              <n-switch
                size="small"
                
                :value="actionElBusinessObject.isLookOver === '1'"
                @update:value="e => actionElBusinessObject.isLookOver = (e ? '1' : '0')"
              />
            </n-form-item>
          </n-form>
        </n-layout>
      </n-tab-pane>
      <n-tab-pane name="button" tab="变量映射">
        <div class="pro-properties-panel-content" >
          <pick-call-activity-variables />
        </div>
      </n-tab-pane>
      <n-tab-pane name="human" tab="人员">
        <div class="pro-properties-panel-content" >
          <pick-human />
        </div>
      </n-tab-pane>
      <n-tab-pane name="events" tab="事件">
        <n-layout :native-scrollbar="false" class="pro-properties-panel-content">
          <panel-event />
        </n-layout>
      </n-tab-pane>
      <n-tab-pane name="vars" tab="变量">

      </n-tab-pane>
    </n-tabs>
</template>
<script lang="jsx">
import { h, reactive, ref, watch, getCurrentInstance, computed, nextTick } from "vue";
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
  NInputNumber,
  NSelect,
  NCheckbox,
  NRadio,
  NRadioGroup,
  NSpin,
  NSwitch,
  NSlider
} from "naive-ui";
import { NwIcon, NwDic } from '@platform/main';
import {
  actionElBusinessObject
} from "../../../store/bpmn"
import {
  createElement
} from '../../../util/index'
import { get } from 'lodash'
import PanelEvent from "../../field/PanelEvent/index.vue"
import PickProcess from "../../field/PickProcess/index.vue"
import PickHuman from "../../field/PickHuman/index.vue"
import PickCallActivityVariables from "../../field/PickCallActivityVariables/index.vue"
export default {
  name: 'bpmn-CallActivity',
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
    NInputNumber,
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
    NSlider,
    PanelEvent,
    PickProcess,
    PickHuman,
    PickCallActivityVariables
  },
  setup() {
    const pickProcessRef = ref(null)
    return {
      pickProcessRef,
      actionElBusinessObject,
      // 获取是否会签
      isMultiInstance: computed(() => {
        return !!actionElBusinessObject.value.loopCharacteristics
      }),
      setMultiInstance (flag) {
        if (flag) { // 开启会签
          actionElBusinessObject.value.loopCharacteristics = createElement('bpmn:MultiInstanceLoopCharacteristics', {
            'camunda:collection': 'wfAssignee',
            'camunda:elementVariable': 'wfLocalAssignee'
          })
        } else { // 关闭会签
          actionElBusinessObject.value.loopCharacteristics = null 
        }
    },
    };
  },
};
</script>
<style lang="less">
</style>
