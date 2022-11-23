<template>
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 900px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-y-form" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        表单字段选择
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    <!-- <div class="nw-modal-control">
      <n-button type="info" size="small" style="margin-right: 5px" >确定</n-button>
      <n-button  size="small" >取消</n-button>
    </div> -->
    <d-splitter
      class="nw-layout-content-splitter"
      splitBarSize="1px"
      style="height: 600px"
    >
      <template v-slot:DSplitterPane>
        <d-splitter-pane class="splitter-bpmn-view" size="400px" minSize="330px" @sizeChange="sizeChange">
          <div class="nw-modal-table-title">
            表单列表
          </div>
          <!-- 表单列表 -->
          <vxe-grid
            class="nw-vxe-grid"
            ref="gridFormRef"
            v-bind="gridFormOption"
          />

        </d-splitter-pane>
        <d-splitter-pane class="splitter-bpmn-attrs" minSize="300px" >
          <n-spin v-if="actionForm" :show="isLoading">
            <div class="nw-modal-table-title">
              {{actionForm.formNameCh}} 表单字段
            </div>
            <vxe-grid
              class="nw-vxe-grid"
              ref="gridFormItemRef"
              v-bind="gridFormItemOption"
            />
          </n-spin>
          <div v-if="!actionForm" class="unselect-form">
            左侧选择表单
          </div>
        </d-splitter-pane>
      </template>
    </d-splitter>
    <!-- <n-layout has-sider class="nw-modal-layout" >
      <n-layout-content>
        
      </n-layout-content>
    </n-layout> -->
    <!-- <div class="nw-modal-action">
      <n-button
      type="info"
      size="small"
      style="margin-right: 5px"
      @click="handleModalComplete"
      >确定</n-button>
      <n-button  size="small"
      @click="visible = false" >取消</n-button>
    </div> -->
  </n-modal>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed } from 'vue'
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
  NSelect,
  NSwitch
} from 'naive-ui'
import { NwIcon } from '@platform/main'
import { detailForm } from '../../../../api/index'

import {
  getExtensionRootEl,
  createElement
} from '../../../../util/index'

import {
  actionElBusinessObject,
  getRootElement
} from '../../../../store/bpmn'
import { get } from 'lodash'

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
  setup(props, context){
    // 流程节点表单数据
    const forms = ref([])

    // 设置参数的form
    const actionForm = ref(null)
    // 表单列
    const actionFormFields = ref([])

    // 备用已选择的map
    const selectedFormMap = ref({})
    // 是否加载中
    const isLoading = ref(false)
    // 模态展示
    const visible = ref(false)

    // 表格dom
    const gridFormRef = ref(null)
    const gridFormItemRef = ref(null)

    const queryDetailForm = (row) => {
      isLoading.value = true
      detailForm(row.id).then(res => {
        isLoading.value = false
        res.fieldList.forEach(d => {
          if (d.childTableSetKey) {
            d.javaName = `${d.childTableSetKey}.${d.javaName}`
          }
        })
        // const cacheFields = selectedFormMap.value[row.id].fields

        actionFormFields.value = res.fieldList
        
      })
    }
    //
    // 表单列表
    const gridFormOption = ref({
      rowId: 'id',
      rowKey: false,
      height: '400px',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      // 
      tableMenu: {
         
      },
      data: forms,
      rowClassName: ({row}) => {
        return (actionForm.value && row.id === actionForm.value.id) ? 'form-active' : ''
      },
      columns: [
        {
          title: '表单名称',
          field: 'formNameCh'
        },
        { field: "formName", title: "表单编码" },
        {
          field: '',
          title: '操作',
          width: 120,
          showHeaderOverflow: true,
          fixed: 'right',
          slots: {
            default: ({row}) => {
              return [
                <NButton
                  text
                  size="small"
                  color="#1890ff"
                  onClick={() => {

                    // 这里请求表单的字段列表
                    actionForm.value = row
                    console.log('row', row)
                    selectedFormMap.value[row.id] = {
                      el: row,
                      fields: []
                    }
                    queryDetailForm(row)

                    // detailForm(row.id).then(res => {
                    //   isLoading.value = false
                    //   selectedFormMap.value[row.id] = {
                    //     el: row,
                    //     fields: res.fieldList.map(d => ({
                    //       ...d,
                    //       powerCode: 'edit',
                    //       isOrm: 0
                          
                    //       }))
                    //   }
                    // })
                  }}
                  style="margin-right: 5px;"
                >
                  {{
                    default: () => '选择',
                    // icon: () => <NwIcon name="icon-jigou" />
                  }}
                </NButton>
              ]
            }
          }
        }
      ]
    })
    // 主备选表
    const gridFormItemOption = ref({
      rowId: 'id',
      rowKey: false,
      height: '400px',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      // 
      tableMenu: {
         
      },
      data: actionFormFields,
      columns: [
        {
          field: 'nameCh',
          title: '字段名称',
          width: 150,
        },
        {
          field: "javaName",
          title: "字段编码",
          // slots: {
          //   default: ({row}) => {
          //     if (row.childTableSetKey) {
          //       return `${row.childTableSetKey}.${row.javaName}`
          //     } else {
          //       return `${row.javaName}`
          //     }
              
          //   }
          // }
        },
        {
          field: "dbType",
          title: "类型",
          width: 70,
          showOverflow: true
        },
        {
          field: 'startEnable',
          title: '操作',
          width: 70,
          showHeaderOverflow: true,
          fixed: 'right',
          slots: {
            default: ({row}) => {
              return [
                <NButton
                  size="small"
                  color="#1890ff"
                  onClick={() => {
                    // formName
                    console.log('=====actionForm.value====', actionForm.value, row)
                    context.emit('callback',
                      `${actionForm.value.formName}.${row.javaName}`,
                      `${actionForm.value.formNameCh} → ${row.nameCh}`,
                      `${actionForm.value.id}.${row.id}`

                    )
                    visible.value = false
                  }}
                  style="margin-right: 5px;"
                >
                  {{
                    default: () => '选择',
                    // icon: () => <NwIcon name="icon-jigou" />
                  }}
                </NButton>
              ]
            }
          }
        }
      ]
    })

    // 选择完成，赋值到xml
    const handleModalComplete = () => {
      // 生成mod
      const res = Object.values(selectedFormMap.value).map(({
        el,
        fields = []
      }) => {
        console.log('====fields=====', fields)
        return createElement('netwisd:Form', {
          id: el.id,
          formName: el.formName,
          formNameCh: el.formNameCh,
          values: fields.filter(d => d.isSelected).map(f => createElement('netwisd:Field', {
            modelFieldId: f.id,
            nameCh: f.nameCh,
            // javaName: f.childTableSetKey ? `${f.childTableSetKey}.${f.javaName}` : f.javaName,
            javaName: f.javaName,
            dbType: f.dbType,
            powerCode: f.powerCode,
            isOrm: `${+f.isOrm}`,
            isMoreRow: '0'
          }))
        })
      })
      context.emit('update:callback', res);
      visible.value = false
    }
    // 删除xml form
    const handleDelForm = (el) => {

    }
    // 清除所有
    const handleClearForm = () => {

    }
    return {
      props,
      isLoading,
      gridFormRef,
      gridFormItemRef,

      gridFormOption,
      gridFormItemOption,
      actionForm,
      visible,
      // 这里回显没有做---------
      show (selectedForms = []) {
        console.log('====selectedForms====', selectedForms)
        // 重置
        actionForm.value = null
        visible.value = true
        // isLoading.value = true
        forms.value = getExtensionRootEl(getRootElement(), 'netwisd:Forms').values

      },
      handleModalComplete,
      handleClearForm,
      sizeChange () {
        gridFormRef.value.refreshColumn()
        gridFormItemRef.value.refreshColumn()
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import "../../../../style/vxe-table.less";
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
  &-table-title {
    height: 35px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    font-weight: bold;
  }
}
:deep(.form-active) {
  background: #c6e2ff !important;
}
.unselect-form {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
  height: 100%;
}
</style>