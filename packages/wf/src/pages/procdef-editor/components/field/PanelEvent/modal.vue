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
      <nw-icon name="icon-event" :size="22" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        选择事件
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
      <n-layout class="nw-modal-layout" >
        <n-layout-header style="padding: 0 5px;">
          <n-form
              class="header-form"
              inline
              ref="formRef"
              label-placement="left"
              :label-width="60"
              size="small"
              style="padding: 5px 0"
          >
            <n-form-item
            label="流程分类"
            path="inputValue"
            :show-feedback="false"
            >
              <n-input
                placeholder=""
                v-model:value="searchForm.procdefTypeName"
              />
            </n-form-item>
            <n-form-item
            label="事件分类"
            path="inputValue"
            :show-feedback="false"
            >
              <n-select
                v-model:value="searchForm.eventType"
                style="width: 120px"
                placeholder=""
                :options="[{
                  label: '全部',
                  value: ''
                },{
                  label: '任务事件',
                  value: 0
                },{
                  label: '执行事件',
                  value: 1
                }]"
              />
            </n-form-item>
            <n-form-item
            label="事件名称"
            path="inputValue"
            :show-feedback="false"
            >
              <n-input
                placeholder=""
                v-model:value="searchForm.listenerName"
              />
            </n-form-item>
            <n-form-item
            label="事件ID"
            path="inputValue"
            :show-feedback="false"
            >
              <n-input
                placeholder=""
                v-model:value="searchForm.listenerId"
              />
            </n-form-item>
            <n-form-item
            label=""
            path="inputValue"
            :show-feedback="false"
            >
              <n-button
              type="warning"
              size="small"
              style="margin-right: 5px"
              @click="() => {
                searchForm = {
                  eventType: '',
                  listenerName: '',
                  listenerId: ''
                }
                gridEventRef.commitProxy('query')
              }"
              >重置</n-button>
              <n-button
              type="info"
              size="small"
              style="margin-right: 15px"
              @click="() => {
                gridEventRef.commitProxy('query')
              }"
              >查询</n-button>
            </n-form-item>
          </n-form>
        </n-layout-header>
        <n-layout-content>
          <vxe-grid
            class="nw-vxe-grid"
            ref="gridEventRef"
            v-bind="gridOption"
          />
        </n-layout-content>
      </n-layout>
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
  NForm,
  NFormItem,
  NInputGroup,
  NInput,
  NButton,
  NSpin,
  NModal,
  NSelect
} from 'naive-ui'
import { NwIcon } from '@platform/main'
import { queryProcdeftype } from '../../../api/index'


import {
  getExtensionRootEl,
  createElement
} from '../../../util/index'

import {
    queryEvents,
} from '../../../api/index'
import {
  events,
  loadEvents,
  createEventEl,
  getNodeEventTypeByKey,
  getEnumerateByKey,
} from '../../../store/cache-events'


export default {
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NForm,
    NFormItem,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NwIcon,
    NSelect
  },
  props:{
  },
  setup(props, context){
    const searchForm = ref({
      eventType: '',
      listenerName: '',
      listenerId: '',
      procdefTypeName: ''
    })

    const isLoading = ref(false)
    // 模态展示
    const visible = ref(false)

    // 表格dom
    const gridEventRef = ref(null)

    // 已选定的
    const selectedEvents = ref([])


    // 获取bpmn元素数据
    // const netwisdForms = getExtensionRootEl(props.element, 'netwisd:Forms')

    // const netwisdForms = getExtensionRootEl(props.element, 'netwisd:Forms').values

    // console.log('netwisdForms==', netwisdForms)
    // props
    // props.element.element.businessObject.extensionElements.values.find(d => d.$type === 'netwisd:Forms')

    // 模态已选择的缓存
    const selectedForms = ref([])

    // 主备选表
    const gridOption = ref({
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
      
      pagerConfig: {
        border: true,
        pageSize: 20,
        pageSizes: [10, 20, 50],
        perfect: true
      },
      proxyConfig: {
        props: {
          // list: 'list',
          total: 'total'
        },
        ajax: {
          query: ({ page }) => {
            // alert(JSON.stringify(searchForm.value))
            return queryEvents({
              // parentOrgId: actionOrg.value ? actionOrg.value.id : '0',
              // page.currentPage, page.pageSize
              ...searchForm.value,
              selectMust: 0,
              nodeEventType: nodeEventTypes.value.join(','),
              page:{
                current: page.currentPage,
                size: page.pageSize
              }
            }).then(async d => {
              // 这里进行类型过滤
              // const result = d.records.filter(d => nodeEventTypes.value.includes(d.nodeEventType))
              return ({
                //result,
                result: d.records,
                total: d.total
              })
            })}
        }
      },
      columns: [
        {
          title: '流程分类',
          field: 'procdefTypeName',
          width: 80
        },
        { field: "listenerName", title: "事件名称", showOverflow: 'title' },
        { field: "listenerId", title: "事件ID", showOverflow: 'title'},
        {
          field: "eventType",
          title: "事件分类",
          showOverflow: true,
          width: 60,
          slots: {
            default: ({ row }) => {
              return row.eventType ? '执行事件' : '任务事件'
            }
          }
        },
        {
          field: "nodeEventType",
          title: "节点类型",
          showOverflow: true,
          slots: {
            default: ({ row }) => {
              return getNodeEventTypeByKey(row.nodeEventType)
            }
          }
          
        },
        {
          field: "defaultTrigVal",
          title: "默认周期",
          showOverflow: true,
          slots: {
            default: ({ row }) => {
              return getEnumerateByKey(row.defaultTrigVal)
            }
          }
        },
        // { field: "selectSign", title: "默认事件", showOverflow: true,},
        {
          field: 'startEnable',
          title: '操作',
          width: 70,
          showHeaderOverflow: true,
          fixed: 'right',
          slots: {
            default: ({row}) => {
              const index = selectedEvents.value.indexOf(row)
              if (index >= 0) {
                return [
                  <NButton
                    text
                    size="small"
                    type="success"
                    onClick={() => {
                      selectedEvents.value.splice(index, 1)
                    }}
                    style="margin-right: 5px;"
                  >
                    {{
                      default: () => '已选择',
                      // icon: () => <NwIcon name="icon-jigou" />
                    }}
                  </NButton>
                ]
              }
              return [
              <NButton
                text
                size="small"
                color="#1890ff"
                onClick={() => {
                  // selectedEvents.value.push(row)
                  // 这里直接添加
                  context.emit('update:callback', row);
                }}
                style="margin-right: 5px;"
              >
                {{
                  default: () => '添加',
                  // icon: () => <NwIcon name="icon-jigou" />
                }}
              </NButton>]
            }
          }
        }
      ]
    })

    // 选择完成，赋值到xml
    const handleModalComplete = () => {
      context.emit('update:callback', selectedEvents.value);
      visible.value = false
    }
    // 删除xml form
    const handleDelForm = (el) => {

    }
    // 清除所有
    const handleClearForm = () => {

    }
    const nodeEventTypes = ref([])
    return {
      searchForm,
      props,
      isLoading,
      gridEventRef,
      gridOption,
      selectedEvents,
      visible,
      show (n) {
        nodeEventTypes.value = n
        visible.value = true
        // isLoading.value = true
        // loadEvents().then(() => {
        //   isLoading.value = false
        //   // 复制已选
        //   // selectedEvents.value = events.value.filter(d => selectedIds.includes(d.id))
        // })

        // 赋值已选择的

      },
      handleModalComplete,
      handleClearForm
      
    }
  }
}
</script>

<style lang='less' scoped>
@import "../../../style/vxe-table.less";
.header-form {

}
// .nw-modal {
//   &.n-dialog > .n-dialog__close {
//     top: 5px;
//     right: 4px;
//   }
//   &.n-dialog > .n-dialog__title {
//     border-bottom: 1px solid #c6c6c6;
//     background: #e8eaec;
//     padding-left: 5px;
//     height: 34px;
//     .n-base-icon {
//       width: unset;
//       height: unset;
//     }
//   }
//   &-action {
//     background: #f8f8f9;
//     display: flex;
//     justify-content: flex-end;
//     padding: 5px;
//     border-top: 1px solid #c6c6c6;
//   }
//   &-control {
//     background: #f8f8f9;
//     display: flex;
//     justify-content: flex-end;
//     padding: 5px;
//     border-bottom: 1px solid #e8eaec;
//   }
//   &-layout {
//     &-sider {
//       &-title {
//         font-size: 12px;
//         font-weight: bold;
//         background: #f8f8f9;
//         padding: 0 5px;
//         height: 23px;
//         line-height: 23px;
//         border-bottom: 1px solid #e8eaec
//       }
//     }
//   }
// }
</style>