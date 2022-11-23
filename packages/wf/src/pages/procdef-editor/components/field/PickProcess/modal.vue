<template>
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 800px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <nw-icon name="icon-y-form" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        选择流程
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    <!-- <div class="nw-modal-control">
      <n-button type="info" size="small" style="margin-right: 5px" >确定</n-button>
      <n-button  size="small" >取消</n-button>
    </div> -->
    <n-spin :show="isLoading">
      <vxe-grid
        class="nw-vxe-grid"
        ref="gridProcessRef"
        v-bind="gridOption"
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
    </n-spin>
  </n-modal>
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
  NTag
} from 'naive-ui'
import { NwIcon } from '@platform/main'
import {
  queryProcess,
  queryProcessVersionList
} from '../../../api/index'


import {
  getExtensionRootEl,
  createElement
} from '../../../util/index'

import {
  events,
  loadEvents,
  createEventEl
} from '../../../store/cache-events'

import {
  Grid as VxeGrid
} from 'vxe-table'

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
  setup(props, context){
    const isLoading = ref(false)
    // 模态展示
    const visible = ref(false)

    // 表格dom
    const gridProcessRef = ref(null)

    // 数据模型分类
    const selectedEvents = ref([])

    const loadProcessVersion = async (camundaProcdefKey) => {
      return queryProcessVersionList(camundaProcdefKey).then(res => res);
    }
    // 获取bpmn元素数据
    // const netwisdForms = getExtensionRootEl(props.element, 'netwisd:Forms')

    // const netwisdForms = getExtensionRootEl(props.element, 'netwisd:Forms').values

    // console.log('netwisdForms==', netwisdForms)
    // props
    // props.element.element.businessObject.extensionElements.values.find(d => d.$type === 'netwisd:Forms')

    // 模态已选择的缓存
    const selectedForms = ref([])
    const defGridOption = {
      rowId: 'id',
      rowKey: false,
      // height: 'auto',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: false
    }
    const gridOption = ref({
      rowId: 'id',
      rowKey: false,
      height: '400px',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: false,
      // 
      tableMenu: {
         
      },
      // data: [],
      
      pagerConfig: {
        pageSize: 20,
        pageSizes: [10, 20, 50]
      },
      proxyConfig: {
        props: {
          // list: 'list',
          total: 'total'
        },
        ajax: {
          // 接收 Promise
          // query: () => viewQueryDir('/').then(async d => ({list: [
          //   {
          //     key: '/',
          //     name: '/',
          //     type: 'dir',
          //     children: d
          //     }
          // ]})),
          query: ({ page }) => {
            return queryProcess({
              // parentOrgId: actionOrg.value ? actionOrg.value.id : '0',
              // page.currentPage, page.pageSize
              page:{
                current: page.currentPage,
                size: page.pageSize
              }
            }).then(async d => {
              return ({
                result: d.records,
                total: d.total
              })
            })}
        }
      },
      expandConfig: {
        // labelField
        // expandAll: true,
        reserve: true,
        lazy: true,
        showIcon: false,
        loadMethod ({ row }) {
          row._isLoading = true
          return loadProcessVersion(row.camundaProcdefKey).then(r => {
            // console.log('==loadProcessVersion===', r)
            row._isLoading = false
            row._verisonList = r
          })
        },
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
      columns: [
        {
          title: '流程分类',
          minWidth: 100,
          field: 'procdefTypeName'
        },
        {
            title: '流程名称',
            showOverflow: 'title',
            minWidth: 200,
            type: 'expand',
            slots: {
              default: ({row}) => {
                return  `${row.procdefName}`
              },
              content: ({row}) => {


                return <div class="process-version-list">
                  {row._verisonList.length ? row._verisonList.map(d => (
                  <div class="version-item"
                  onClick={() => {
                    handleModalComplete(d)
                  }}
                  >
                    
                    <div class="version-item-icon">
                      <NwIcon size={40} name={d.icon} />
                      <div class="version-item-icon-v">
                      v{d.procdefVersion}
                      </div>
                    </div>
                    <div class="version-item-text">
                      <div>{d.procdefName}</div>
                      <div>
                        <NTag type="success" size="small" round >
                          {{
                            default: () => d.versionTag
                          }}
                        </NTag>
                      </div>
                      <NButton type="info" size="small">
                        {{
                          default: () => '选择'
                        }}
                      </NButton>
                    </div>
                  </div>
                  )) : <div>
                    没有其他版本
                  </div>}
                </div>
              }
            }
        },
        { field: 'camundaProcdefKey', title: '流程Key', minWidth: 150},
        { field: 'procdefVersion', title: '版本', width: 50, 
          slots: {
            default: ({ row, rowIndex }) => `v${row.procdefVersion}`
          }
        },
        { field: 'versionTag', title: '版本Tag', width: 80},
        // {
        //   title: '表达式名称',
        //   field: 'expreName',
        //   minWidth: 100
        // },
        {
          title: '操作',
          width: 180,
          // fixed: 'right',
          slots: {
            default: ({ row, rowIndex, $table, ...p }, ...pp) => {
                // 根据不同类型展示
              return [
                <NButton
                  loading={row._isLoading}
                  style="margin-right: 5px;"
                  type="warning"
                  size="small"
                  onClick={() => {
                    console.log(row, p, pp)
                    $table.setRowExpand(row, !$table.isExpandByRow(row))
                  }}
                >
                  {{
                    default: () => '其他版本'
                    
                  }}
                </NButton>,
                <NButton
                  type="info"
                  size="small"
                  onClick={() => {
                    handleModalComplete(row)
                  }}
                >
                  {{
                    default: () => '选择'
                    
                  }}
                </NButton>
              ]
            }
          }
        }
      ]
    })

    // 选择完成，赋值到xml
    const handleModalComplete = (row) => {
      context.emit('update:callback', row);
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
      gridProcessRef,
      gridOption,
      selectedEvents,
      visible,
      show (selectedIds = []) {
        visible.value = true
        isLoading.value = true
        loadEvents().then(() => {
          isLoading.value = false
          // 复制已选
          selectedEvents.value = events.value.filter(d => selectedIds.includes(d.id))
        })

        // 赋值已选择的

      },
      handleModalComplete,
      handleClearForm
      
    }
  }
}
</script>

<style lang='less'>
@import "../../../style/vxe-table.less";
.process-version-list {
  display: flex;
  justify-content: center;
  .version-item {
    display: flex;
    padding: 10px;
    cursor: pointer;
    border-radius: 8px;
    &-icon {
      position: relative;
      // height: 40px;
      // width: 40px;
      border: 2px solid #f56c6c;
      border-radius: 8px;
      padding: 5px;
      &-v {
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 30px;
        height: 14px;
        // border-top: 1px solid #ccc;
        // border-left: 1px solid #ccc;
        border-radius: 8px 0 0 0 ;
        text-align: center;
        line-height: 14px;
        font-size: 12px;
        background: #f56c6c;
        color: #fff;
        font-weight: bold;
      }
    }
    &-text {
      padding-left: 5px;
    }
  }
  .version-item:hover {
    background: #c6e2ff;
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