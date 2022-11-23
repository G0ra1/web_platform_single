<template>
  <!-- <n-input-group size="small">
    <n-input size="small" disabled />
    <n-button size="small" type="primary" ghost>
      <nw-icon name="" />
    </n-button>
  </n-input-group> -->
  <div style="padding: 0 5px;height: calc(100%)">
    <div style="display: flex;font-size: 14px;font-weight: bold;justify-content: space-between;padding: 5px 0;">
      <div>
        输入映射
        <n-button type="info" size="small" @click="handleCreateIn" >
          <!-- <nw-icon name="icon-n-y-add-bold" :size="16" /> -->
          添加
        </n-button>
      </div>
      <!-- <n-button type="error" size="small" @click="handleClearHuman" >清除所有</n-button> -->
    </div>
    <div style="height: calc(50% - 36px);border-bottom: 1px solid #ccc;overflow: hidden">
      <vxe-grid
        class="nw-vxe-grid"
        ref="gridInRef"
        v-bind="gridInOption"
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
    <div style="display: flex;font-size: 12px;font-weight: bold;justify-content: space-between;padding: 5px 0;">
      <div>
        输出映射
        <n-button type="info" size="small" @click="handleCreateOut" >
          添加
        </n-button>
      </div>
      <!-- <n-button type="error" size="small" @click="handleClearHuman" >清除所有</n-button> -->
    </div>
    <div style="height: calc(50% - 36px);border-bottom: 1px solid #ccc;overflow: hidden">
      <vxe-grid
        class="nw-vxe-grid"
        ref="gridOutRef"
        v-bind="gridOutOption"
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
import { ref, reactive, nextTick, h, computed } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NSelect,
  NButton,
  NSpin,
  NModal,
  NForm,
  NFormItem
} from 'naive-ui'
import { NwIcon } from '@platform/main'

import {
  getExtensionRootEls,
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
    // 类型下拉
    const optionsSource = [
      {
        value: 'source',
        label: 'Source'
      },
      {
        value: 'sourceExpression',
        label: 'Source Expression'
      },
      {
        value: 'all',
        label: 'All'
      },
    ]
    // 根据row 获取类型
    const getSourceType = (row) => {
      if (row.source !== undefined) {
        return 'source'
      } else if (row.sourceExpression !== undefined) {
        return 'sourceExpression'
      } else if (row.variables === 'all') {
        return 'all'
      } else {
        return ''
      }
    }
    // 获取source值
    const getSourceValue = (row) => {
      if (row.source !== undefined) {
        return row.source
      } else if (row.sourceExpression !== undefined) {
        return row.sourceExpression
      } else {
        return ''
      }
    }
    // 输入
    const InData = computed(() => {
      return getExtensionRootEls(actionElBusinessObject.value, [
        'camunda:In'
      ]).filter(d => !d.businessKey)
    })

    const OutData = computed(() => {
      return getExtensionRootEls(actionElBusinessObject.value, [
        'camunda:Out'
      ])
    })

    // 表格dom
    const gridInRef = ref(null)
    const gridOutRef = ref(null)

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
    const gridInOption = ref({
      rowId: 'id',
      rowKey: false,
      height: 'auto',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      showHeader: false,
      // 
      tableMenu: {
         
      },
      expandConfig: {
        // labelField
        // expandAll: true,
        reserve: true,
        showIcon: false
        // toggleMethod ({expanded, row}) {
        //   if (expanded) {
        //     loadProcessVersion(row.camundaProcdefKey).then(r => {
        //       console.log('==loadProcessVersion===', r)
        //       row._verisonList = r
        //     })
        //   }
        //   return expanded
        // }
      },
      //data: netwisdHumanExpsProxy,
      data: InData,
      columns: [
        {
          title: '',
          field: 'expreName',
          type: 'expand',
          slots: {
            default: ({row, $table}) => {
              // &lt;empty&gt; 空
              return [
                <div class="variables-fx"
                onClick={() => {
                  $table.setRowExpand(row, !$table.isExpandByRow(row))
                }}
                >
                  <div class="variables-fx-text" title={`${row.source || row.sourceExpression || '<empty>'}:=${row.target || '<empty>'}`}>
                    {row.source || row.sourceExpression || '<empty>'}:={row.target || '<empty>'}
                  </div>
                  <div class="variables-fx-control">
                    {row.readOnly === '0' ? <NButton
                      text
                      type="error"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDel(row)
                      }}
                      title="删除"
                    >
                      {{
                        default: () => <NwIcon name="icon-guanbichuangkou" size={8} />,
                        // icon: () => <NwIcon name="icon-jigou" />
                      }}
                    </NButton> : ''}
                  </div>
                </div>
              ]
            },
            content: ({row}) => {

              return <div class="variables-form">
                <div class="variables-form-item">
                  <span class="variables-form-item-label">
                    类型
                  </span>
                  <span class="variables-form-item-blank">
                    <NSelect
                      size="small"
                      placeholder="选择类型"
                      options={optionsSource}
                      value={getSourceType(row)}
                      onUpdateValue={d => {
                        const dtype = getSourceType(row)
                        if (dtype !== d) {
                          delete row[dtype]
                          if (d === 'all') {
                            row.variables = 'all'
                          } else {
                            row[d] = ''
                          }
                        }
                      }}
                    />
                  </span>
                </div>
                <div class="variables-form-item">
                  <span class="variables-form-item-label">
                    源
                  </span>
                  <span class="variables-form-item-blank">
                    <NInput
                      size="small"
                      placeholder=""
                      value={getSourceValue(row)}
                      onUpdateValue={e => {
                        const dtype = getSourceType(row)
                        if (dtype !== 'all') {
                          row[dtype] = e
                        }
                      }}
                    />
                  </span>
                </div>
                <div class="variables-form-item">
                  <span class="variables-form-item-label">
                    目标
                  </span>
                  <span class="variables-form-item-blank">
                    <NInput
                      size="small"
                      placeholder=""
                      value={row.target}
                      onUpdateValue={e => row.target = e}
                    />
                  </span>
                </div>
              </div>
              
            }
          }
        }
      ]
    })
    // 回显表
    const gridOutOption = ref({
      rowId: 'id',
      rowKey: false,
      height: 'auto',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      showHeader: false,
      // 
      tableMenu: {
         
      },
      expandConfig: {
        // labelField
        // expandAll: true,
        reserve: true,
        showIcon: false
        // toggleMethod ({expanded, row}) {
        //   if (expanded) {
        //     loadProcessVersion(row.camundaProcdefKey).then(r => {
        //       console.log('==loadProcessVersion===', r)
        //       row._verisonList = r
        //     })
        //   }
        //   return expanded
        // }
      },
      //data: netwisdHumanExpsProxy,
      data: OutData,
      columns: [
        {
          title: '',
          field: 'expreName',
          type: 'expand',
          slots: {
            default: ({row, $table}) => {
              // &lt;empty&gt; 空
              return [
                <div class="variables-fx"
                onClick={() => {
                  $table.setRowExpand(row, !$table.isExpandByRow(row))
                }}
                >
                  <div class="variables-fx-text" title={`${row.source || row.sourceExpression || '<empty>'}:=${row.target || '<empty>'}`}>
                    {row.source || row.sourceExpression || '<empty>'}:={row.target || '<empty>'}
                  </div>
                  <div class="variables-fx-control">
                    <NButton
                      text
                      type="error"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDel(row)
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
            },
            content: ({row}) => {

              return <div class="variables-form">
                <div class="variables-form-item">
                  <span class="variables-form-item-label">
                    类型
                  </span>
                  <span class="variables-form-item-blank">
                    <NSelect
                      size="small"
                      placeholder="选择类型"
                      options={optionsSource}
                      value={getSourceType(row)}
                      onUpdateValue={d => {
                        const dtype = getSourceType(row)
                        if (dtype !== d) {
                          delete row[dtype]
                          if (d === 'all') {
                            row.variables = 'all'
                          } else {
                            row[d] = ''
                          }
                        }
                      }}
                    />
                  </span>
                </div>
                <div class="variables-form-item">
                  <span class="variables-form-item-label">
                    源
                  </span>
                  <span class="variables-form-item-blank">
                    <NInput
                      size="small"
                      placeholder=""
                      value={getSourceValue(row)}
                      onUpdateValue={e => {
                        const dtype = getSourceType(row)
                        if (dtype !== 'all') {
                          row[dtype] = e
                        }
                      }}
                    />
                  </span>
                </div>
                <div class="variables-form-item">
                  <span class="variables-form-item-label">
                    目标
                  </span>
                  <span class="variables-form-item-blank">
                    <NInput
                      size="small"
                      placeholder=""
                      value={row.target}
                      onUpdateValue={e => row.target = e}
                    />
                  </span>
                </div>
              </div>
              
            }
          }
        }
      ]
    })


    // 删除xml form
    const handleDel = (row) => {
      const inCache = actionElBusinessObject.value.extensionElements.values
      inCache.splice(inCache.indexOf(row), 1)
    }

    // 清除所有
    const handleClearHuman = () => {
      netwisdHumanExps.values.splice(0)
      // gridHumanRef.value.reloadData(netwisdHumanExps.values)
    }

    // 添加
    const handleCreateIn = () => {
      actionElBusinessObject.value.extensionElements.values.push(createElement('camunda:In', {
        source: '',
        target: '',
        readOnly: '0'
      }))
    }
    const handleCreateOut = () => {
      actionElBusinessObject.value.extensionElements.values.push(createElement('camunda:Out', {
        source: '',
        target: '',
        readOnly: '0'
      }))
    }
    return {
      props,
      gridInRef,
      gridOutRef,
      gridInOption,
      gridOutOption,

      handleClearHuman,
      handleCreateIn,
      handleCreateOut
    }
  }
}
</script>

<style lang='less'>
@import "../../../style/vxe-table.less";
// 列表行样式
.variables-fx {
  display: flex;
  justify-content: space-between;
  &-text {
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    width: calc(100% - 15px);
    cursor: pointer;
  }
  &-control {

  }
}
// 列表展开内容样式
.variables-form {
  &-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 3px 0;
    &-label {
      width: 30px;
      text-align: right;
      padding-right: 5px;
    }
    &-blank {
      flex: 1
    }
  }
}


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