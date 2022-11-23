<template>
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 600px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-field" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        选择表单字段
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    <vxe-grid
      class="nw-vxe-grid"
      ref="gridFormRef"
      v-bind="gridFormOption"
    />
    <div class="nw-modal-action">
      <!-- <n-button
      type="info"
      size="small"
      style="margin-right: 5px"
      @click="handleModalComplete"
      >确定</n-button> -->
      <n-button  size="small"
      @click="visible = false" >取消</n-button>
    </div>
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

import {
  Grid as VxeGrid
} from 'vxe-table'

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
  emits: ["callback"],
  setup(props, context){

    // 流程节点表单数据
    const forms = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Forms')

    // 是否加载中
    const isLoading = ref(false)
    // 模态展示
    const visible = ref(false)

    // 表格dom
    const gridFormRef = ref(null)
    //
    const defGridOption = {
      rowId: 'id',
      rowKey: false,
      // height: 'auto',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: false
    }
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
      data: forms.values ? forms.values.filter(d => d.values && d.values.length) : [],
      expandConfig: {
        // labelField
        expandAll: true,
        reserve: true,
        // accordion: true
      },
      columns: [
        {
          title: '表单名称',
          type: 'expand',
          // field: 'formNameCh',
          slots: {
            default: ({row}) => {
              return  <span style="font-weight:bold">{row.formNameCh}</span>
            },
            content: ({ row: fRow }) => {
              console.log('===content===', fRow)
              const vgr = ref(null)
              // 刷新一次列宽
              nextTick().then(() => {
                vgr.value.refreshColumn()
              })
              return <VxeGrid
                ref={r => vgr.value = r}
                class="nw-vxe-grid"
                {...{
                  ...defGridOption,
                  data: fRow.values,
                  columns: [
                    {
                      title: '字段名',
                      field: 'nameCh',
                      slots: {
                        default: ({ row }) => {
                          return `${fRow.formNameCh} → ${row.nameCh}`
                        }
                      }
                    },
                    {
                      title: '字段编码',
                      field: 'javaName',
                      width: 120,
                    },{
                      title: '类型',
                      field: 'dbType',
                      width: 70
                    },{
                      title: '是否映射',
                      field: 'powerCode',
                      width: 70,
                      slots: {
                        default: ({ row }) => {
                          return row.powerCode === '1' ? '是' : '否'
                        }
                      }
                    },
                    {
                      title: '操作',
                      width: 54,
                      slots: {
                        default: ({ row }) => {
                          return [
                            <NButton
                            size="small"
                            type="info"
                            onClick={() => {
                              context.emit('callback',
                                `${fRow.formName}.${row.javaName}`,
                                `${fRow.formNameCh} → ${row.nameCh}`,
                                `${fRow.id}.${row.modelFieldId}`
                              )
                              visible.value = false
                            }}
                            >
                            {{
                              default: () => {
                                return '选择'
                              }
                            }}
                            </NButton>
                          ]
                        }
                      }
                    }
                  ]
                }}
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
            }
          }
        },
        { field: "formName", title: "表单编码" },
        // {
        //   field: '',
        //   title: '操作',
        //   width: 120,
        //   showHeaderOverflow: true,
        //   fixed: 'right',
        //   slots: {
        //     default: ({row}) => {
        //       return [
        //         <NButton
        //           text
        //           size="small"
        //           type="success"
        //           onClick={() => {
        //           }}
        //           style="margin-right: 5px;"
        //         >
        //           {{
        //             default: () => '已选择',
        //             // icon: () => <NwIcon name="icon-jigou" />
        //           }}
        //         </NButton>
        //       ]
              
        //     }
        //   }
        // }
      ]
    })

    return {
      props,
      isLoading,
      gridFormRef,

      gridFormOption,
      
      visible,
      // 这里回显 字段field
      show (field) {
        visible.value = true

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