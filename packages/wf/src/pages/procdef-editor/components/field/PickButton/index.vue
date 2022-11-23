<template>
  <!-- <n-input-group size="small">
    <n-input size="small" disabled />
    <n-button size="small" type="primary" ghost>
      <nw-icon name="" />
    </n-button>
  </n-input-group> -->
  <div style="padding: 5px;height: calc(100% - 10px)">
    <div style="display: flex;justify-content: space-between;padding: 5px 0;">
      <div>所有按钮</div>
      <n-button type="error" size="small" @click="handleClear" >取消所有</n-button>
    </div>
    <div style="height: calc(100% - 36px);border-bottom: 1px solid #ccc;overflow: hidden">
      <vxe-grid
        class="nw-vxe-grid"
        ref="gridButtonRef"
        v-bind="gridButtonOption"
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
  NSwitch
} from 'naive-ui'
import { get } from 'lodash'
import { NwIcon } from '@platform/main'

import {
  getExtensionRootEl,
  createElement
} from '../../../util/index'

import {
  actionElBusinessObject,
  getElements
} from "../../../store/bpmn"

import {
  buttons
} from "../../../store/cache-button"


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
    NwIcon,
    NSwitch
  },
  props:{
  },
  setup(props){
    // console.log('==netwisd:Buttons===', getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Buttons'))
    // 模态展示
    const visible = ref(false)

    // 表格dom
    const gridButtonRef = ref(null)
    
    // 回显表
    const gridButtonOption = ref({
      rowId: 'id',
      rowKey: false,
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      // 
      tableMenu: {
         
      },
      //data: netwisdFormsProxy,
      data: buttons,
      columns: [
        {
          title: '按钮名称',
          field: 'label',
          width: 70
        },
        {
          title: '按钮编码',
          field: 'value'
        },
        {
          title: '开启',
          width: 50,
          slots: {
            default: ({row}) => {
              return [
                <NSwitch
                  size="small"
                  value={
                    !!get(getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Buttons'), 'values', []).find(d => d.code === row.value)
                  }
                  onUpdateValue={e => {
                    const buttons = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Buttons')
                    if (!buttons.values) buttons.values = []
                    if (e) {
                      // 选中
                      buttons.values.push(createElement('netwisd:Button', {
                        code: row.value,
                        name: row.label,
                      }))
                    } else {
                      // 取消
                      const button = buttons.values.find(d => d.code === row.value)
                      const index = buttons.values.indexOf(button)
                      buttons.values.splice(index, 1)
                    }
                  }}
                />
              ]
            }
          }
        }
      ]
    })
    const handleClear = () => {
      getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Buttons').values = []
    }
    return {
      props,
      gridButtonRef,
      gridButtonOption,
      visible,
      handleClear
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