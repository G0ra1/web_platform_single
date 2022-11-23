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
      <n-layout has-sider class="nw-modal-layout" >
        <n-layout-content>
          <vxe-grid
            class="nw-vxe-grid"
            ref="gridEventRef"
            v-bind="gridOption"
          />
        </n-layout-content>
      </n-layout>
      <div class="nw-modal-action">
        <n-button
        type="info"
        size="small"
        style="margin-right: 5px"
        @click="handleModalComplete"
        >确定</n-button>
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
} from 'naive-ui'
import { NwIcon } from '@platform/main'
import { queryProcdeftype } from '../../../api/index'


import {
  getExtensionRootEl,
  createElement
} from '../../../util/index'

import {
  events,
  loadEvents,
  createEventEl
} from '../../../store/cache-events'


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
    const gridEventRef = ref(null)

    // 数据模型分类
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
      data: events,
      columns: [
        {
          title: '流程分类',
          field: 'procdefTypeName',
          width: 80
        },
        { field: "listenerName", title: "事件名称" },
        { field: "listenerId", title: "事件ID", showOverflow: true},
        { field: "eventType", title: "事件分类", showOverflow: true,},
        { field: "nodeEventType", title: "节点类型", showOverflow: true,},
        { field: "defaultTrigVal", title: "默认周期", showOverflow: true,},
        { field: "selectSign", title: "默认事件", showOverflow: true,},
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
                  selectedEvents.value.push(row)
                }}
                style="margin-right: 5px;"
              >
                {{
                  default: () => '选择',
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
    return {
      props,
      isLoading,
      gridEventRef,
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