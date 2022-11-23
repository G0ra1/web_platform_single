<template>
    <n-tabs
    size="small"
    type="card"
    :tabs-padding="5"
    >
      <n-tab-pane name="geneal" tab="常规">
        <n-layout :native-scrollbar="false" class="pro-properties-panel-content">
          <n-form
              :model="actionElBusinessObject"
              ref="formRef"
              label-placement="top"
              :label-width="60"
              size="small"
              style="padding: 5px 10px"
          >
              <n-form-item label="流程分类" path="inputValue">
                <!-- <pick-procdef-type /> -->
                <!-- <nw-dic
                  :value="actionElBusinessObject.procdefTypeId"
                  @update:value="e => actionElBusinessObject.procdefTypeId = e"
                  @update:label="e => actionElBusinessObject.procdefTypeName = e"
                  size="small"
                  :request="{
                    XHR: queryAllDefType,
                    params: {},
                  }"
                  :response="{
                    dataMethod: (res) =>
                      res.map(({ id: value, procdefTypeName: label }) => ({
                        value,
                        label,
                      })),
                  }"
                  placeholder="请选择门户"
                /> -->
                <n-tree-select
                  size="small"
                  :options="typeTree"
                  :value="actionElBusinessObject.procdefTypeId"
                  @update:value="updateProcdefType"
                  children-field="kids"
                  key-field="id"
                  label-field="procdefTypeName"
                >

                </n-tree-select>
              </n-form-item>
              <!--  -->
              <n-form-item label="流程定义KEY" path="inputValue">
                <n-input
                  placeholder=""
                  :value="actionElBusinessObject.id"
                  @update:value="e => updateProcdefKey(e)"
                />
              </n-form-item>
              <n-form-item label="简称" path="inputValue">
                <n-input 
                  placeholder=""
                  v-model:value="actionElBusinessObject.procdefNameAbbr"

                />
              </n-form-item>
              <n-form-item label="流程定义名称" path="inputValue">
                <n-input 
                  placeholder=""
                  v-model:value="actionElBusinessObject.name"

                />
              </n-form-item>
              <n-form-item label="版本标识" path="inputValue">
                <n-input
                  placeholder=""
                  v-model:value="actionElBusinessObject.versionTag"
                />
              </n-form-item>
              <n-form-item label="图标" path="inputValue">
                <nw-icon-pick v-model:value="actionElBusinessObject.icon" />
              </n-form-item>
              <n-form-item label="备注" path="inputValue">
                <n-input
                  type="textarea"
                  placeholder=""
                  v-model:value="actionElBusinessObject.remark"
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
      <n-tab-pane name="form" tab="表单">
          <div class="pro-properties-panel-content" >
            <pick-form />
          </div>
      </n-tab-pane>
      <!-- <n-tab-pane name="others" tab="其他">

      </n-tab-pane> -->
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
  NTreeSelect,
  NCheckbox,
  NRadio,
  NRadioGroup,
  NSpin,
} from "naive-ui";
import { NwIcon, NwDic, NwIconPick } from '@platform/main';
import PickProcdefType from "../../field/PickProcdefType/index.vue"
import PickForm from "../../field/PickForm/index.vue"
import PanelEvent from "../../field/PanelEvent/index.vue"
import { queryAll as queryAllDefType } from '../../../../procdeftype/api/index'

import {
  actionElBusinessObject
} from "../../../store/bpmn"

export default {
  name: 'bpmn-Process',
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
    NTreeSelect,
    NForm,
    NFormItem,
    NFormItemGi,
    NCheckbox,
    NRadio,
    NRadioGroup,
    NwDic,
    NSpin,
    PickProcdefType,
    PickForm,
    PanelEvent,
    NwIconPick
  },
  setup() {
    const typeTree = ref([])
    
    const queryDefTypeTree = () => {
      queryAllDefType().then(r => {
        typeTree.value = r
      })
    }
    queryDefTypeTree()
    return {
      actionElBusinessObject,
      queryAllDefType,
      typeTree,
      updateProcdefType (id, item) {
        // actionElBusinessObject.procdefTypeId = e
        // actionElBusinessObject.procdefTypeName = e
        actionElBusinessObject.value.procdefTypeId = id
        actionElBusinessObject.value.procdefTypeName = item.procdefTypeName
      },
      // 获取
      updateProcdefKey (d) {
        if (d === '' || (d.indexOf('_') < 0 && /[\w\u4E00-\u9FA5]+$/.test(d))) {
          // 符合要求
          actionElBusinessObject.value.id = d
        }
        
      }
    };
  },
};
</script>
<style lang="less">
</style>
