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
                  @update:value="e => updateActionElProperties({name: e})"
                />
              </n-form-item>
              <!-- v-if="isBranch" -->
              <n-form-item
                v-if="isBranch"
                path="inputValue"
                label-style="align-items: center"
              >
                <template #label>
                  <span style="margin-right: 10px;">序列表达式</span>
                    <n-button
                    :disabled="isDefaultGoing"
                    size="small"
                    type="info"
                    @click="handleExp"
                  >设置</n-button>
                </template>
                <!-- <n-input 
                  placeholder=""
                  type="textarea"
                  :value="''"
                  @update:value="e => {}"
                /> -->
                <expression-editor
                  ref="expressionEditorRef"
                  @callback="expCallBack"
                />
              </n-form-item>
              
              <n-form-item
                v-if="isBranch"
                path="inputValue"
              >
                <template #label>
                  <span style="margin-right: 10px;">默认连接</span>
                  <n-switch
                  size="small"
                  :value="isDefaultGoing"
                  @update:value="e => setDefaultGoing(e)"
                  />
                </template>
              </n-form-item>
          </n-form>
        </n-layout>
      </n-tab-pane>
      <n-tab-pane name="events" tab="事件">
        <n-layout :native-scrollbar="false" class="pro-properties-panel-content">
          <panel-event />
        </n-layout>
      </n-tab-pane>
      <n-tab-pane name="vars" tab="变量">
        <div class="pro-properties-panel-content" >
          <panel-vars />
        </div>
      </n-tab-pane>
    </n-tabs>
</template>
<script lang="jsx">
import { h, reactive, ref, watch, computed, getCurrentInstance, nextTick } from "vue";
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

import {
  syncSequenceFlowVars
} from "../../../store/cache-vars.js"

import {
  updateProperties,
  createElement,
  getExtensionRootEl
} from '../../../util/index'
import PanelEvent from "../../field/PanelEvent/index.vue"
import ExpressionEditor from "../../field/ExpressionEditor/modal.vue"
import PanelVars from "../../field/PanelVars/index.vue"

export default {
  name: 'bpmn-SequenceFlow',
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
    PanelEvent,
    ExpressionEditor,
    PanelVars
  },
  setup(props, context) {
    const ctx = getCurrentInstance().ctx
    const expressionEditorRef = ref(null)
    // 是否路由分支
    const isBranch = computed(() => actionElBusinessObject.value.sourceRef.$type === 'bpmn:ExclusiveGateway' &&
        actionElBusinessObject.value.sourceRef.outgoing.length > 1)

    // 是否为默认连接
    const isDefaultGoing = ref(null)
    const getIsDefaultGoing = () => isDefaultGoing.value = (actionElBusinessObject.value.sourceRef.default ? (actionElBusinessObject.value.sourceRef.default.id === actionElBusinessObject.value.id) : false)
    getIsDefaultGoing()
    return {
      isBranch,
      actionElBusinessObject,
      updateActionElProperties,
      expressionEditorRef,
      expCallBack (e, s, o) {
        console.log('expCallBack', e, s, o) // o 是 e的对象化
        updateActionElProperties({
          'conditionExpression': createElement('bpmn:FormalExpression', {
            body: `$\{${s}\}`
          })
          // 'sequExpText': createElement('netwisd:SequExpText', {
          //   body: e
          // })
        })
        const SequExpText = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:SequExpText')
        if (SequExpText) {
          SequExpText.body = e
        } else {
          actionElBusinessObject.value.extensionElements.values.push(createElement('netwisd:SequExpText', {
              body: e
          }))
        }
        // 更新生成Vars
        syncSequenceFlowVars(o)
      },
      handleExp () {
        // 获取SequExpText
        const SequExpText = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:SequExpText')
        // alert(JSON.parse(SequExpText.body))
        expressionEditorRef.value.show(JSON.parse(SequExpText.body))
      },
      // 获取是否为默认
      isDefaultGoing,
      // 设定默认
      setDefaultGoing: (f) => {
        if (f) {

          // actionElBusinessObject.value.sourceRef.default = actionElBusinessObject.value.id
          // window.__BPMN_ELEMENT_SELECT__.element.source.default = actionElBusinessObject.value.id
          // 这里需要使用update 
          updateProperties(
            window.__BPMN_ELEMENT_SELECT__.element.source,
            {
            'default': window.__BPMN_ELEMENT_SELECT__.element.businessObject
            }
          )
          // 这里删除当前连接的表达式
          updateActionElProperties({
            'conditionExpression': null
            // 'sequExpText': createElement('netwisd:SequExpText', {
            //   body: e
            // })
          })

          const SequExpText = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:SequExpText')
          if (SequExpText) {
            SequExpText.body = '{"id":"1","name":"root","type":3,"children":[]}'
          }
          // 清除变量
          getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Vars').values = []
        } else {
          // actionElBusinessObject.value.sourceRef.default = ''
          updateProperties(
            window.__BPMN_ELEMENT_SELECT__.element.source,
            {
            'default': null,
            }
          )
        }
        nextTick().then(() => {
          getIsDefaultGoing()
        })
      }
    };
  },
};
</script>
<style lang="less">
</style>
