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
            <n-form-item label="任务过期时间" path="inputValue">
              <n-input
                placeholder="Input"
                v-model:value="actionElBusinessObject.dueDay"
              />
            </n-form-item>
            <n-form-item label="重要程度" path="inputValue">
              <n-input
                placeholder="Input"
                v-model:value="actionElBusinessObject.priority"
              />
            </n-form-item>
            
            <n-form-item label="到达当前节点消息提醒" path="inputValue">
              <template #label>
                <span style="margin-right: 10px;">到达当前节点消息提醒</span>
                <n-switch
                size="small"
                :value="todoMsgSwitch"
                @update:value="(e) => setTodoMsgSwitch(e)"
                />
              </template>
              <div>
                 <!-- :disabled="!todoMsgSwitch" -->
                <n-checkbox-group :value="todoSendType" @update:value="e => setTodoSendType(e)">
                  <n-space item-style="display: flex;">
                    <n-checkbox value="inmail" label="站内信" />
                    <n-checkbox value="email" label="邮件" />
                    <n-checkbox value="wechat" label="微信" />
                  </n-space>
                </n-checkbox-group>
              </div>
            </n-form-item>
            <n-form-item label="申请人节点消息提醒" path="inputValue">
              <template #label>
                <span style="margin-right: 10px;">申请人节点消息提醒</span>
                <n-switch
                size="small"
                :value="applyMsgSwitch"
                @update:value="(e) => setApplyMsgSwitch(e)"
                />
              </template>
              <div>
                <!-- :disabled="!applyMsgSwitch" -->
                <n-checkbox-group :value="applySendType" @update:value="e => setApplySendType(e)">
                  <n-space item-style="display: flex;">
                    <n-checkbox value="inmail" label="站内信" />
                    <n-checkbox value="email" label="邮件" />
                    <n-checkbox value="wechat" label="微信" />
                  </n-space>
                </n-checkbox-group>
              </div>
            </n-form-item>
            
            <n-form-item v-if="actionElBusinessObject.id !== 'firstNode'" label="会签" label-style="align-items: center;" path="inputValue">
              <template #label>
                <span style="margin-right: 10px;">会签</span>
                <n-switch
                size="small"
                :value="isMultiInstance()"
                @update:value="setMultiInstance"
                />
              </template>
              <n-radio-group
                        v-if="isMultiInstance()"
                        :value="getMultiInstanceType()"
                        @input="() => {}"
                    >
                    <!-- <Radio size="small" label="charactClear">
                        <span>一般</span>
                    </Radio> -->
                    <n-radio size="small" value="Sequential0">
                        <i class="entry bpmn-icon-parallel-mi-marker"></i>
                        <span>并行多实例</span>
                    </n-radio>
                    <n-radio disabled size="small" value="Sequential1">
                        <i class="entry bpmn-icon-sequential-mi-marker"></i>
                        <span>串行多实例</span>
                    </n-radio>
                    <!-- <Radio size="small" label="charactLoop">
                        <i class="entry bpmn-icon-loop-marker"></i>
                        <span>循环</span>
                    </Radio> -->
              </n-radio-group>
            </n-form-item>

            <div v-show="isMultiInstance()">
              <n-form-item label="会签通过率" label-style="align-items: center;justify-content: space-between;" path="inputValue">
                <template #label>
                  <span>会签通过率</span>
                  <div style="width: 100px;">
                    <n-input-number
                    size="small"
                    :value="Math.round(getMultiInstanceProperties('passingRate') * 100)"
                    @update:value="e => upDateMultiInstancePassingRate(e)"
                    :max="100"
                    :min="0"
                    /></div>
                </template>
                <n-slider
                  style="font-size:12px;margin: 0 10px"
                  :step="5"
                  :marks="{ 0: '0%', 25: '25%',50: '50%',75: '75%',100: '100%',}"
                  :value="Math.round(getMultiInstanceProperties('passingRate') * 100)"
                  @update:value="e => upDateMultiInstancePassingRate(e)"
                />
                <!-- <div>
                
                </div> -->
              </n-form-item>
              <br>
              <n-form-item label="通过处理" path="inputValue">
                <n-select
                  size="small"
                  placeholder="请选择处理方式"
                  :options="[{
                    value: '0',
                    label: '流转后置节点'
                  },{
                    value: '1',
                    label: '回退前置节点'
                  }]"
                :value="getMultiInstanceProperties('passingHandle')"
                @update:value="e => upDateMultiInstanceProperties('passingHandle', e)"
                />
              </n-form-item>
              <n-form-item label="不通过处理" path="inputValue">
                <n-select
                  size="small"
                  placeholder="请选择处理方式"
                  :options="[{
                    value: '0',
                    label: '流转后置节点'
                  },{
                    value: '1',
                    label: '回退前置节点'
                  }]"
                :value="getMultiInstanceProperties('unpassingHandle')"
                @update:value="e => upDateMultiInstanceProperties('unpassingHandle', e)"
                />
              </n-form-item>
            </div>
            
          </n-form>
        </n-layout>
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
      <n-tab-pane name="form" tab="表单">
        <n-layout :native-scrollbar="false" class="pro-properties-panel-content">
          <pick-form-item />
        </n-layout>
      </n-tab-pane>
      <n-tab-pane name="button" tab="按钮">
        <n-layout :native-scrollbar="false" class="pro-properties-panel-content">
          <pick-button />
        </n-layout>
      </n-tab-pane>
      <n-tab-pane name="vars" tab="变量">
        <div class="pro-properties-panel-content" >
          <panel-vars />
        </div>
      </n-tab-pane>
      <n-tab-pane name="others" tab="其他">
        <n-layout :native-scrollbar="false" class="pro-properties-panel-content">
          <n-form
              ref="otherformRef"
              label-placement="top"
              :label-width="60"
              size="small"
              style="padding: 5px 10px"
          >
            <n-form-item label="选人规则" path="selectRule">
              <n-select
                size="small"
                placeholder=""
                :options="[{
                  value: '0',
                  label: '默认选人'
                },{
                  value: '1',
                  label: '总是先选人'
                },{
                  value: '2',
                  label: '只取第一个人'
                },{
                  value: '3',
                  label: '总是不选人'
                },{
                  value: '4',
                  label: '弹出选人'
                }]"
                v-model:value="actionElBusinessObject.selectRule"
              />
            </n-form-item>
            <n-form-item label="批量审批" path="batchRule">
              <n-select
                size="small"
                placeholder=""
                :options="[{
                  value: '0',
                  label: '否'
                },{
                  value: '1',
                  label: '与上一节点相同跳过'
                },{
                  value: '2',
                  label: '只要有相同就跳过'
                }]"
                v-model:value="actionElBusinessObject.batchRule"
              />
            </n-form-item>
            <n-form-item label="是否支持撤回" path="cancelRule">
              <n-select
                size="small"
                placeholder=""
                :options="[{
                  value: '1',
                  label: '是'
                },{
                  value: '0',
                  label: '否'
                }]"
                v-model:value="actionElBusinessObject.cancelRule"
              />
            </n-form-item>
            <n-form-item label="是否支持驳回" path="returnRule">
              <n-select
                size="small"
                placeholder=""
                :options="[{
                  value: '1',
                  label: '是'
                },{
                  value: '0',
                  label: '否'
                }]"
                v-model:value="actionElBusinessObject.returnRule"
              />
            </n-form-item>
          </n-form>
        </n-layout>
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
  NSpace,
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
  NCheckboxGroup,
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
  todoMsgSwitch,
  setTodoMsgSwitch,
  todoSendType,
  setTodoSendType,
  
  applyMsgSwitch,
  setApplyMsgSwitch,
  applySendType,
  setApplySendType,
  
  writeUserTaskDefaultEvents
} from "../../../store/cache-events"
import {
  createElement
} from '../../../util/index'
import { get, cloneDeep } from 'lodash'
import PanelEvent from "../../field/PanelEvent/index.vue"
import PickFormItem from "../../field/PickFormItem/index.vue"
import PickHuman from "../../field/PickHuman/index.vue"
import PickButton from "../../field/PickButton/index.vue"
import PanelVars from "../../field/PanelVars/index.vue"

export default {
  name: 'bpmn-UserTask',
  props: {

  },
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NSpace,
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
    NCheckboxGroup,
    NCheckbox,
    NRadio,
    NRadioGroup,
    NwDic,
    NSpin,
    NSwitch,
    NSlider,
    PanelEvent,
    PickFormItem,
    PickHuman,
    PickButton,
    PanelVars
  },
  setup() {
    // 会签开启关闭
    const setMultiInstance = (flag) => {
        // 删除原有所有事件

        let delCount = -1
        const extEls = actionElBusinessObject.value.extensionElements.values
        while (extEls.find((el, i) => {
            delCount = i;
            console.log(el.$type)
            return el.$type === 'camunda:ExecutionListener' ||
            el.$type === 'camunda:TaskListener' ||
            el.$type === 'netwisd:ExecutionListener' ||
            el.$type === 'netwisd:TaskListener'
          })
        ) {
          extEls.splice(delCount, 1)
        }
        if (flag) { // 开启会签

          actionElBusinessObject.value.candidateUsers = '${wfLocalAssignee}'

          actionElBusinessObject.value.loopCharacteristics = createElement('bpmn:MultiInstanceLoopCharacteristics', {
              // 扩展属性
              'collection': 'wfAssignee',
              'elementVariable': 'wfLocalAssignee',
              'passingRate': ".75",
              'passingHandle': "0",
              'unpassingHandle': "1",
              completionCondition: createElement('bpmn:FormalExpression', {
                'xsi:type': 'bpmn:tFormalExpression',
                body: '${wfDecisionInstances/nrOfInstances >= 0.75 }'
              })
          })
            // 转换 事件 为多实例
            

            // actionElBusinessObject.value.extensionElements.values = cloneDeep(actionElBusinessObject.value.extensionElements.values
            // .filter(d => 
            //   d.$type !== 'camunda:ExecutionListener' && 
            //   d.$type !== 'camunda:TaskListener' && 
            //   d.$type !== 'netwisd:ExecutionListener' && 
            //   d.$type !== 'netwisd:TaskListener'
            // ))
            // 重新添加多实例事件

            // ActionEl.element.businessObject.extensionElements.values.push(
            //     ...this.editorDefEvents.filter(d => [12, 8, 2].includes(d.nodeEventType)).map(EventFactory(this.modeler.get('bpmnFactory')))
            // )
        } else { // 关闭会签
        
          actionElBusinessObject.value.candidateUsers = '${wfAssignee}'
          delete actionElBusinessObject.value.loopCharacteristics
          // 转换 事件 为用户
          // actionElBusinessObject.value.extensionElements.values = cloneDeep(actionElBusinessObject.value.extensionElements.values
          // .filter(d => 
          //   d.$type !== 'camunda:ExecutionListener' && 
          //   d.$type !== 'camunda:TaskListener' && 
          //   d.$type !== 'netwisd:ExecutionListener' && 
          //   d.$type !== 'netwisd:TaskListener'
          // ))
          // this.element.businessObject.extensionElements.values.push(
          //     ...this.editorDefEvents.filter(d => [12, 8, 1].includes(d.nodeEventType)).map(EventFactory(this.modeler.get('bpmnFactory')))
          // )
            
        }
        writeUserTaskDefaultEvents(actionElBusinessObject.value)
    }
    return {
      todoMsgSwitch,
      setTodoMsgSwitch,
      todoSendType,
      setTodoSendType,

      applyMsgSwitch,
      setApplyMsgSwitch,
      applySendType,
      setApplySendType,

      actionElBusinessObject,
      setMultiInstance,
      isMultiInstance () {
          return !!get(actionElBusinessObject.value, 'loopCharacteristics', false)
      },
      // 获取并行 串行
      getMultiInstanceType () {
          return get(actionElBusinessObject.value, 'loopCharacteristics.isSequential', false) ? 'Sequential1' : 'Sequential0'
      },
      getMultiInstanceProperties (param) {
        return get(actionElBusinessObject.value, `loopCharacteristics.${param}`, '0')
      },
      //单独更新会签通过率
      upDateMultiInstancePassingRate (v) {
        const value = Math.round(v) / 100
        actionElBusinessObject.value.loopCharacteristics.passingRate = `${value}`
        actionElBusinessObject.value.loopCharacteristics.completionCondition.body = '${wfDecisionInstances/nrOfInstances >= ' + value + ' }'
      },
      upDateMultiInstanceProperties (param, value) {
          // get(this.element.businessObject, 'loopCharacteristics', false)
        actionElBusinessObject.value.loopCharacteristics[param] = value
      },
      // 通知提醒 标记获取
      
    };
  },
};
</script>
<style lang="less">
</style>
