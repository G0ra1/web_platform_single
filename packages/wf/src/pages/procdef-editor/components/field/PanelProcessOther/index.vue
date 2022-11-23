<template>
  <!-- <n-input-group size="small">
    <n-input size="small" disabled />
    <n-button size="small" type="primary" ghost>
      <nw-icon name="" />
    </n-button>
  </n-input-group> -->
  <div style="padding: 5px;height: calc(100% - 10px)">
    <div style="display: flex;justify-content: space-between;padding: 5px 0;">
      所有变量
      <!-- <n-button type="info" size="small" @click="handleModalShow" >设置</n-button>
      <n-button type="error" size="small" @click="handleClearHuman" >清除所有</n-button> -->
    </div>
    <div style="height: calc(100% - 36px);border-bottom: 1px solid #ccc;overflow: hidden">
     
    </div>
  </div>
  <form-modal
    ref="formModalRef"
    @update:callback="handleModalComplete"
  />
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NButton,
  NSpin,
  NModal,
  NSelect
} from 'naive-ui'
import { NwIcon } from '@platform/main'

import {
  getExtensionRootEl,
  createElement
} from '../../../util/index'

import {
  actionElBusinessObject
} from "../../../store/bpmn"



export default {
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NwIcon
  },
  props:{
  },
  setup(props){

    // 获取bpmn元素数据
    const netwisdVars = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Vars')
    if (!netwisdVars.values) netwisdVars.values = []
    // const netwisdVars = getExtensionRootEl(props.element, 'netwisd:Forms').values


    return {
      props,
      
    }
  }
}
</script>

<style lang='less'>
</style>