<template>
  <!-- <n-input-group size="small">
    <n-input size="small" disabled />
    <n-button size="small" type="primary" ghost>
      <nw-icon name="" />
    </n-button>
  </n-input-group> -->
  <div style="padding: 5px;">
    <div style="display: flex;justify-content: space-between;padding: 5px 0;">
       <n-button type="info" size="small" @click="handleModalShow" >设置表单权限</n-button>
      <!--<n-button type="error" size="small" @click="handleClearForm" >清除所有</n-button> -->
    </div>
    <div style="height: 150px;border-bottom: 1px solid #ccc;overflow: hidden">
      <vxe-grid
        class="nw-vxe-grid"
        ref="gridFormRef"
        v-bind="gridFormOption"
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
import { NwIcon, NwPickCpts } from '@platform/main'

import {
  
  getExtensionRootEl,
  createElement
} from '../../../util/index'

import {
  getRootElement,
  actionElBusinessObject
} from "../../../store/bpmn"

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
    FormModal,
    NwPickCpts
  },
  props:{
  },
  setup(props){
    // 表单
    const formModalRef = ref(null)

    // 表格dom
    const gridFormRef = ref(null)

    // 数据模型分类
    const modelGroup = ref([])

    // 所有备选表单
    const formsData = ref([])

    // 获取bpmn元素数据
    const netwisdForms = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Form')
    if (!netwisdForms.values) netwisdForms.values = []
    const netwisdFormsProxy = ref(netwisdForms.values)
    // const netwisdForms = getExtensionRootEl(props.element, 'netwisd:Forms').values

    console.log('netwisdForms==', netwisdForms)
    // props
    // props.element.element.businessObject.extensionElements.values.find(d => d.$type === 'netwisd:Forms')
    // 回显表
    const gridFormOption = ref({
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
      //data: netwisdFormsProxy,
      data: netwisdForms.values,
      columns: [
        {
          title: '表单字段',
          field: 'nameCh',
          slots: {
            default: ({row}) => {
              
                    // <NButton
                    //   text
                    //   type="info"
                    //   onClick={() => {
                    //     // 编辑模板
                    //     redirectPage(`/main/vue-runtime.html?formId=${row.id}`, true)
                    //   }}
                    //   style="margin-right: 10px;"
                    //   title="预览"
                    // >
                    //   {{
                    //     default: () => <NwIcon name="icon-yulan" size={14}  />,
                    //     // icon: () => <NwIcon name="icon-jigou" />
                    //   }}
                    // </NButton>
              return [
                <div style="display: flex;justify-content: space-between;">
                  <div>
                    {row.nameCh} ({row.javaName})
                  </div>
                </div>
              ]
            }
          }
        },
        {
          title: '权限',
          field: 'powerCode',
          width: '70px'
        }
      ]
    })

    // 模态
    const handleModalShow = () => {
       console.log('=====getExtensionRootEl=====', getExtensionRootEl(getRootElement(), 'netwisd:Form').values)
      // 这里传入回显
      formModalRef.value.show(netwisdForms)
    }
    // 选择完成，赋值到xml
    const handleModalComplete = (e) => {

      const processForms = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Form').values

      gridFormRef.value.reloadData(processForms || [])
      
    }
    // 删除xml form
    const handleDelForm = (el) => {
      const index = netwisdForms.values.indexOf(el)
      if (index >= 0) netwisdForms.values.splice(index, 1)
      gridFormRef.value.reloadData(netwisdForms.values)
    }
    // 清除所有
    const handleClearForm = () => {
      netwisdForms.values.splice(0)
      gridFormRef.value.reloadData(netwisdForms.values)
    }
    return {
      formModalRef,

      props,
      gridFormRef,
      gridFormOption,
      handleModalShow,
      handleModalComplete,
      handleClearForm
      
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