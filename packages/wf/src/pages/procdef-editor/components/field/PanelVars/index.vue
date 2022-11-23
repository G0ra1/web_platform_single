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
      <vxe-grid
        class="nw-vxe-grid"
        ref="gridVarsRef"
        v-bind="gridVarsOption"
        style="
          border: 1px solid #ccc;
          moz-user-select: -moz-none;
          -moz-user-select: none;
          -o-user-select:none;
          -khtml-user-select:none;
          -webkit-user-select:none;
          -ms-user-select:none;
          user-select:none;
        "
      />
    </div>
  </div>
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

    // 表格dom
    const gridVarsRef = ref(null)

    // 获取bpmn元素数据
    const netwisdVars = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Vars')
    if (!netwisdVars.values) netwisdVars.values = []
    // 回显表
    const gridVarsOption = ref({
      rowId: 'id',
      rowKey: false,
      height: 'auto',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      // 
      tableMenu: {
         
      },
      data: netwisdVars.values,
      columns: [
        {
          title: '变量名',
          field: 'javaName',
          showOverflow: 'title'
        },
        {
          title: '字段名',
          field: 'nameCh',
          showOverflow: 'title'
        },
        {
          title: '作用域',
          field: 'nameCh',
          width: 50,
          slots: {
            default: ({row}) => {
              const f = row.actionScope === '0'
              return [
                <NButton
                  type={f ? 'info' : 'success'}
                  size="small"
                  onClick={() => {
                    row.actionScope = row.actionScope === '0' ? '1' : '0'
                  }}
                >
                  {f ? '全局' : '局部'}
                </NButton>
              ]
            }
          }
        }
      ]
    })

    return {
      props,
      gridVarsRef,
      gridVarsOption,
      
    }
  }
}
</script>

<style lang='less'>
@import "../../../style/vxe-table.less";
.nw-modal {
  &.n-dialog > .n-dialog__close {
    top: 5px;
    right: 4px;
  }
  &.n-dialog > .n-dialog__title {
    border-bottom: 1px solid #c6c6c6;
    background: #e8eaec;
    padding-left: 5px;
    height: 34px;
    .n-base-icon {
      width: unset;
      height: unset;
    }
  }
  &-action {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-top: 1px solid #c6c6c6;
  }
  &-control {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-bottom: 1px solid #e8eaec;
  }
  &-layout {
    &-sider {
      &-title {
        font-size: 12px;
        font-weight: bold;
        background: #f8f8f9;
        padding: 0 5px;
        height: 23px;
        line-height: 23px;
        border-bottom: 1px solid #e8eaec
      }
    }
  }
}
</style>