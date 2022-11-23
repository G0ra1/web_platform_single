<template>
  <!-- <n-input-group size="small">
    <n-input size="small" disabled />
    <n-button size="small" type="primary" ghost>
      <nw-icon name="" />
    </n-button>
  </n-input-group> -->
  <div style="padding: 5px 10px">
    <div style="display: flex;justify-content: space-between;padding: 5px 0;">
      <n-button type="info" size="small" @click="handleModalShow" >选择</n-button>
      <!-- <n-button type="error" size="small" @click="handleClear" >清除所有</n-button> -->
      <div style="display:flex;align-items: center;font-size:12px;">
        <div
          class="event-row-left-icon"
          style="background: #2080f0;"
        >E</div>
        执行事件
        &nbsp;
        &nbsp;
        <div
          class="event-row-left-icon"
          style="background: #18a058;"
        >T</div>
        任务事件
      </div>
    </div>
    <div style="height: 206px;border-bottom: 1px solid #ccc;overflow: hidden">
      <vxe-grid
        class="nw-vxe-grid"
        ref="gridSelectedRef"
        v-bind="gridSelectedOption"
        v-on="gridSelectedEvent"
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
    
    <n-form
      v-if="currentEvent"
      :model="currentEvent"
      ref="formRef"
      label-placement="top"
      :label-width="60"
      size="small"
    >
      <n-form-item label="事件名称" path="eventName">
        <n-input
          placeholder=""
          disabled
          :value="currentEvent.eventName"
        />
      </n-form-item>
      <n-form-item label="事件分类" path="inputValue">
        <n-input
          placeholder=""
          disabled
          :value="currentEvent.$type"
        />
      </n-form-item>
      <n-form-item label="监听ID" path="listenerId">
        <n-input
          placeholder=""
          disabled
          :value="currentEvent.listenerId"
        />
      </n-form-item>
      <n-form-item label="自定义RestUrl" path="listenerImpl">
        <n-input
          placeholder=""
          disabled
          :value="currentEvent.listenerImpl"
        />
      </n-form-item>
      <n-form-item label="事件类型" path="listenerImpl">
        <n-select
          placeholder=""
          :value="currentEvent.event"
          :options="getEnumerateEvent(currentEvent.$type)"
          @update:value="updateEvent"
        />
      </n-form-item>
      <n-form-item
        v-if="currentEvent.$type.split(':')[1] === 'TaskListener'"
        label="失败是否回滚"
        path="eventSubmitSign"
      >
        <n-radio-group
          v-model:value="currentEvent.eventSubmitSign"
        >
          <n-radio value="1" > 是 </n-radio>
          <n-radio value="0" > 否 </n-radio>
        </n-radio-group>
      </n-form-item>
    </n-form>
    <div
      v-if="currentEvent"
      style="height: 120px"
    >
      <div style="display: flex;justify-content: space-between;">
        参数
        <!-- <div style="display:flex;align-items: center;">
          <div
            class="event-row-left-icon"
            style="background: #2080f0;"
          >S</div>
          字符串
          &nbsp;
          &nbsp;
          <div
            class="event-row-left-icon"
            style="background: #18a058;"
          >E</div>
          表达式
        </div> -->
      </div>
      <vxe-grid
        class="nw-vxe-grid"
        ref="gridParamterRef"
        v-bind="gridParamterOption"
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
  <div>
    
  </div>
  <event-modal
    ref="eventModalRef"
    @update:callback="handleModalComplete"
  />
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed } from 'vue'
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
  NSelect,
  NRadio,
  NRadioGroup,
  NSpin,
  NModal,
} from 'naive-ui'
import { NwIcon } from '@platform/main'

import {
  getExtensionRootEls
} from '../../../util/index'

// 事件控制
import {
  createEventEl,
  getEnumerateEvent,
  transformEvent
} from '../../../store/cache-events'

// bpmn 对象缓存
import {
  actionElBusinessObject,
  getActionEl
} from "../../../store/bpmn"

import EventModal from './modal.vue'
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
    NSelect,
    NRadio,
    NRadioGroup,
    NModal,
    NButton,
    NwIcon,
    EventModal
  },
  props:{
    size: {
      type: String,
      default: 'small'
    },
    value: {
      type: Object,
      default: () => ({})
    },
    element: {
      type: Object,
      defalt: () => ({})
    }
  },
  setup(props){
    // 模态控制
    const eventModalRef = ref(null)
    // 表格dom
    const gridSelectedRef = ref(null)
    // 参数表格
    const gridParamterRef = ref(null)

    const events = computed(() => {
      return getExtensionRootEls(actionElBusinessObject.value, [
        'camunda:ExecutionListener',
        'netwisd:ExecutionListener',
        'camunda:TaskListener',
        'netwisd:TaskListener'
      ])
    })
    // let events = [] // 已选事件

    // 当前选中事件
    const currentEvent = ref(null)
    // 变量列表数据
    const currentEventParamter = ref([])

    // 更新已选表格
    const refreshGrid = () => {
      // loadEvents()
      // gridSelectedRef.value.reloadData(events)
    }
    const gridSelectedEvent = ref({
      'cell-click': ({row}) => {
        console.log(row)
        // 选中事件
        currentEvent.value = row
        // 赋值参数列表
        currentEventParamter.value = row.fields
      }
    })
    // 回显表
    const gridSelectedOption = ref({
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
      rowClassName: ({row}) => {
        return currentEvent.value === row ? 'event-active' : ''
      },
      //data: netwisdFormsProxy,
      data: events,
      columns: [
        {
          title: '已选事件',
          field: 'formNameCh',
          slots: {
            default: ({row}) => {
              return [
                <div class="event-row">
                  <div class="event-row-left">
                  {row.$type.split(':')[1] === 'ExecutionListener' ?
                  <div
                    class="event-row-left-icon"
                    style="background: #2080f0;"
                    title="任务事件"
                  >E</div>
                  :
                  <div
                    class="event-row-left-icon"
                    style="background: #18a058;"
                    title="执行事件"
                  >T</div>
                  }
                    
                    {row.eventName}
                  </div>
                  <div class="event-row-right">
                    <NButton
                      text
                      type="error"
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log('====row===',row)
                        const list = row.$parent.values
                        // 删除
                        list.splice(list.indexOf(row), 1)
                        if (currentEvent.value === row) {
                          currentEvent.value = null
                        }
                        // 重新加载数据
                        // refreshGrid()
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

    // 参数表格配置
    const gridParamterOption = ref({
      rowId: 'id',
      rowKey: false,
      height: 'auto',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      resizable: true,
      border: true,
      // 
      tableMenu: {
         
      },
      // rowClassName: () => {
      //   return 'event-active'
      // },
      //data: netwisdFormsProxy,
      data: currentEventParamter,
      columns: [
        
        {
          title: '',
          width: 25,
          className: 'input-cell',
          slots: {
            default: ({row}) => {
              return [
                <div 
                  title={`${row.paramName} (${row.name})`}
                  style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;"
                >
                  {row.expression === undefined ?
                  <NwIcon name="icon-n-y-abc" size={20} />
                  // <div
                  //   class="event-row-left-icon"
                  //   style="background: #2080f0;"
                  //   title="字符串"
                  // >S</div>
                  :
                  <NwIcon name="icon-n-y-expression" size={18} />
                  // <div
                  //   class="event-row-left-icon"
                  //   style="background: #18a058;"
                  //   title="表达式"
                  // >E</div>
                  }
                  </div>
              ]
            }
          }
        },
        {
          title: '参数名 (ID) ',
          width: 200,
          field: 'paramName',
          slots: {
            default: ({row}) => {
              return [
                <div 
                  title={`${row.paramName} (${row.name})`}
                  style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;"
                >
                  {row.paramName} ({row.name})
                </div>
              ]
            }
          }
        },{
          title: '默认值',
          field: 'name',
          width: 200,
          className: 'input-cell',
          slots: {
            default: ({ row }) => {
              // 这里判断

              const type = row.expression === undefined ? 'string' : 'expression'
              return [
                <NInput
                theme-overrides={{
                  heightSmall: '22px'
                }}
                size='small'
                value={row[type]}
                onUpdate:value={(e) => {
                  row[type] = e
                }}
                />
              ]
            }
          }
        }
      ]
    })

    return {
      props,
      eventModalRef,
      gridSelectedRef,
      gridSelectedOption,
      gridSelectedEvent,
      gridParamterRef,
      gridParamterOption,
      handleModalShow () {
        eventModalRef.value.show(events.value.map(d => d.eventId))
      },
      // 弹窗选择完成
      handleModalComplete (v) {
        // 过滤掉所有事件
        const values = actionElBusinessObject.value.extensionElements.values
        // 清除所有事件
        let delCount = -1
        while (values.find((d, i) => {
          const f = ['ExecutionListener', 'TaskListener'].includes(d.$type.split(':')[1])
          if (f) { delCount = i }
          return f
        })) {
          values.splice(delCount, 1)
        }
        
        values.push(...createEventEl(v))

        if (currentEvent.value) {
          
          currentEvent.value = values.find(d => d.eventId === currentEvent.value.eventId)
        }
        // currentEvent.value = null
        // refreshGrid()
      },
      handleClear () {

      },
      // 当前选择的事件
      currentEvent,
      // 获取事件类型枚举
      getEnumerateEvent,
      // 根据类型切换
      updateEvent (e) {
        // 判断选择前和选择后是否属于同类型
        // currentEvent.value.event
        const nw_event = [
            'revoke',
            'rejected',
            'before_complete',
            'suspend_process',
            'end_process',
            'activate_process',
            'delete_process'
        ]
        const newFlag = nw_event.includes(e)
        const oldFlag = nw_event.includes(currentEvent.value.event)
        currentEvent.value.event = e
        console.log('currentEvent.value==', currentEvent.value)
        // alert(`${e}-${currentEvent.value.event}`)
        // 判断选择前和选择后两个值是否为同类值
        if (newFlag ^ oldFlag) {
          // 不同类转换
          console.log(actionElBusinessObject.value.extensionElements.values, currentEvent.value)
          let index = -1
          actionElBusinessObject.value.extensionElements.values.find((d, i) => {
            const r = d.eventId === currentEvent.value.eventId
            if (r) {
              index = i
            }
            return r
          })
          currentEvent.value = actionElBusinessObject.value.extensionElements.values[index] = transformEvent(currentEvent.value)

          refreshGrid()
          
        }
      }
    }
  }
}
</script>

<style lang='less'>
@import "../../../style/vxe-table.less";
.event-row {
  display: flex;
  justify-content: space-between;
  &-left {
    display: flex;
    align-items: center;
    &-icon {
      display: inline-flex;
      // float: left;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      // line-height: 14px;
      font-size: 10px;
      font-weight: bold;
      // text-align: center;
      height: 16px;
      width: 16px;
      color:#fff;
      margin-right: 5px;
    }
  }
  &-right {

  }
}
.event-active {
  background: #c6e2ff
}
.input-cell {
  >.vxe-cell {

    padding-left: 3px;
    padding-right: 3px;
    overflow: hidden;
    .n-input {
      .n-input__border {
        border: none
      }
    }
  }
  
}
</style>