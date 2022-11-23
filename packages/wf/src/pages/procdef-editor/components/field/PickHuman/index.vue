<template>
  <!-- <n-input-group size="small">
    <n-input size="small" disabled />
    <n-button size="small" type="primary" ghost>
      <nw-icon name="" />
    </n-button>
  </n-input-group> -->
  <div style="padding: 5px;height: calc(100% - 10px)">
    <div style="display: flex;justify-content: space-between;padding: 5px 0;">
      <n-button type="info" size="small" @click="handleModalShow" >设置</n-button>
      <n-button type="error" size="small" @click="handleClearHuman" >清除所有</n-button>
    </div>
    <div style="height: calc(100% - 36px);border-bottom: 1px solid #ccc;overflow: hidden">
      <vxe-grid
        class="nw-vxe-grid"
        ref="gridHumanRef"
        v-bind="gridHumanOption"
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
} from 'naive-ui'
import { NwIcon } from '@platform/main'

import {
  
  getExtensionRootEl,
  createElement
} from '../../../util/index'

import {
  actionElBusinessObject
} from "../../../store/bpmn"

import {
  syncVars
} from "../../../store/cache-vars"

import FormModal from './modal.vue'

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
    FormModal
  },
  props:{
  },
  setup(props){
    // 表单
    const formModalRef = ref(null)

    // 表格dom
    const gridHumanRef = ref(null)

    // 数据模型分类
    const modelGroup = ref([])

    // 所有备选表单
    const formsData = ref([])

    // 获取bpmn元素数据
    const netwisdHumanExps = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:HumanExps')
    if (!netwisdHumanExps.values) netwisdHumanExps.values = []
    const netwisdHumanExpsProxy = ref(netwisdHumanExps.values)
    // const netwisdHumanExps = getExtensionRootEl(props.element, 'netwisd:Forms').values

    console.log('netwisdHumanExps==', netwisdHumanExps)
    // props
    // props.element.element.businessObject.extensionElements.values.find(d => d.$type === 'netwisd:Forms')

    // 回显表
    const gridHumanOption = ref({
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
      //data: netwisdHumanExpsProxy,
      data: netwisdHumanExps.values,
      columns: [
        {
          title: '人员配置',
          field: 'expreName',
          slots: {
            default: ({row}) => {
              return [
                <div style="display: flex;justify-content: space-between;">
                  <div>
                    {row.expreName}
                  </div>
                  <div>
                    <NButton
                      text
                      type="error"
                      onClick={() => {
                        handleDelHuman(row)
                      }}
                      title="删除"
                    >
                      {{
                        default: () => <NwIcon name="icon-guanbichuangkou" size={8} />,
                        // icon: () => <NwIcon name="icon-jigou" />
                      }}
                    </NButton>
                  </div>
                </div>
              ]
            }
          }
        }
      ]
    })

    // 模态
    const handleModalShow = () => {
      // 这里传入回显
      formModalRef.value.show(netwisdHumanExps)
    }
    // 选择完成，赋值到xml
    const handleModalComplete = (e) => {
      netwisdHumanExps.values.splice(0)
      netwisdHumanExps.values.push(...e)
      console.log('netwisdHumanExps.values==', netwisdHumanExps.values)
      // 同步变量
      syncVars()
      gridHumanRef.value.reloadData(netwisdHumanExps.values)
    }
    // 删除xml form
    const handleDelHuman = (el) => {
      const index = netwisdHumanExps.values.indexOf(el)
      if (index >= 0) netwisdHumanExps.values.splice(index, 1)
      gridHumanRef.value.reloadData(netwisdHumanExps.values)
    }
    // 清除所有
    const handleClearHuman = () => {
      netwisdHumanExps.values.splice(0)
      gridHumanRef.value.reloadData(netwisdHumanExps.values)
    }
    return {
      formModalRef,

      props,
      gridHumanRef,
      gridHumanOption,
      handleModalShow,
      handleModalComplete,
      handleClearHuman
      
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