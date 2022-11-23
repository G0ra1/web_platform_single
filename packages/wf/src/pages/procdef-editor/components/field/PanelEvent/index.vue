<template>
  <!-- <n-input-group size="small">
    <n-input size="small" disabled />
    <n-button size="small" type="primary" ghost>
      <nw-icon name="" />
    </n-button>
  </n-input-group> -->
  <div style="padding: 5px">
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
          :disabled="currentEvent.eventSelectMust === '1'"
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
          :disabled="currentEvent.eventSelectMust === '1'"
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
      <div v-if="isDefaultEvent" style="display:flex;justify-content: end;align-items: center;margin: 0 10px 5px 0;">
        <div>
          <NwOpenapiPick
            size="small"
            label="选择接口"
            @callback="InterfacesCallback"
            :bizType="currentEvent.$type.split(':')[1] === 'TaskListener' ? 'wfEventTaskApi' : 'wfEventExeApi'"
          />
          
          <!-- openApi:{{currentEvent.openApiPath}}-{{currentEvent.openApiMthDes}} -->
        </div>
      </div>
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
import { NwIcon, NwDic, NwOpenapiPick } from '@platform/main'
import {
    queryDictItemLists,
    queryTags
} from '../../../api/index'
import {
  getExtensionRootEls
} from '../../../util/index'

// 事件控制
import {
  createEventEl,
  getEnumerateEvent,
  transformEvent,
  getNodeEventTypes
} from '../../../store/cache-events'

// bpmn 对象缓存
import {
  actionElBusinessObject,
  getActionEl
} from "../../../store/bpmn"

import EventModal from './modal.vue'

import * as d3 from 'd3'

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
    EventModal,
    NwOpenapiPick
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

    // 过滤
    const events = computed(() => {
      return getExtensionRootEls(actionElBusinessObject.value, [
        'camunda:ExecutionListener',
        'netwisd:ExecutionListener',
        'camunda:TaskListener',
        'netwisd:TaskListener'
      ]).filter(d => ((+d.order) >= 0) ).sort((a, b) => a.order - b.order)
    })
    // let events = [] // 已选事件

    // 当前选中事件
    const currentEvent = ref(null)
    // 变量列表数据
    const currentEventParamter = ref([])
    // if默认参数
    const isDefaultEvent = ref(true)
    // 更新已选表格
    const refreshGrid = () => {
      // loadEvents()
      // gridSelectedRef.value.reloadData(events)
    }
    const gridSelectedEvent = ref({
      'cell-click': ({row}) => {
        // 选中事件
        currentEvent.value = row
        // 赋值参数列表
        currentEventParamter.value = row.fields
        //隐藏选择openApi
        if(row.eventSelectMust === '0') {
          isDefaultEvent.value = true;
        } else {
          isDefaultEvent.value  = false;
        }
        // 这里触发第一次查询tag
        //const rowServiceId = currentEventParamter.value.find(d => d.name === 'serviceId')
        //if (rowServiceId) {
          //serviceId.value = rowServiceId[rowServiceId.expression === undefined ? 'string' : 'expression']
          //queryTags_(row.$type.split(':')[1])
        //}
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
                    <div class="action-order" >
                      {row.order !== '0' ? <NwIcon
                        class="action-order-up"
                        name="icon-n-n-up"
                        size={10}
                        onClick={(e) => {
                          e.stopPropagation()
                          upOrder(row)
                        }}
                      /> : ''}
                      {row.order !== getMaxOrder() ? <NwIcon
                        class="action-order-down"
                        name="icon-n-n-down"
                        size={10}
                        onClick={(e) => {
                          e.stopPropagation()
                          downOrder(row)
                        }}
                      /> : ''}
                    </div>
                    <div class="action-remove">
                      {row.eventSelectMust === '0' ? <NButton
                        text
                        type="error"
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log('====row===',row)
                          const list = actionElBusinessObject.value.extensionElements.values
                          // 删除
                          list.splice(list.indexOf(row), 1)
                          if (currentEvent.value === row) {
                            currentEvent.value = null
                          }
                          // 删除导致order断裂 重新对order赋值
                          resetOrder()
                        }}
                        title="删除"
                      >
                        {{
                          default: () => <NwIcon name="icon-n-y-close" size={10} />,
                          // icon: () => <NwIcon name="icon-jigou" />
                        }}
                      </NButton> : ''}
                    </div>
                  </div>
                </div>
              ]
            }
          }
        }
      ]
    })
    // 缓存serviceId
    const serviceId = ref('')
    const tags = ref([])
    // 获取tag
    const queryTags_ = (type) => {
      if (serviceId.value) {

        queryTags(type, serviceId.value).then(r => {
          tags.value = r.map(d => ({
            value: d,
            label: d
          }))
        })
      } 
    }

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
          width: 130,
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
              // 这里判断 services

              const type = row.expression === undefined ? 'string' : 'expression'
              return row[type];
              // if (row.name === 'serviceId') {
              //   return [<NwDic
              //       size="small"
              //       style={{
              //           display: 'flex'
              //       }}
              //       value={row[type]}
              //       onUpdateValue={e => {
              //           serviceId.value = e
              //           row[type] = e
              //           queryTags_(currentEvent.value.$type.split(':')[1])
              //           // 切换
              //           const bizTag = currentEventParamter.value.find(d => d.name === 'bizTag')
              //           if (bizTag) {
              //             bizTag[type] = ''
              //           }
              //       }}
              //       request={{
              //       XHR: () => queryDictItemLists({code: 'APP_NAME'}),
              //       params: {},
              //       }}
              //       response={{
              //       dataMethod: (res) => res.map(d => ({
              //           value: d.dictItemCode,
              //           label: d.dictItemName
              //       })),
              //       }}
              //       placeholder=""
              //   />]
              // } else if (row.name === 'bizTag') {
              //   // return serviceId.value
              //   return [<NSelect
              //     size="small"
              //     style={{
              //         display: 'flex'
              //     }}
              //     options={tags.value}
              //     value={row[type]}
              //     onUpdateValue={e => {
              //       row[type] = e
              //     }}
              //   />]

              // } else {

              //   return [
              //     <NInput
              //     disabled={currentEvent.value.eventSelectMust === '1'}
              //     theme-overrides={{
              //       heightSmall: '22px'
              //     }}
              //     size='small'
              //     value={row[type]}
              //     onUpdate:value={(e) => {
              //       row[type] = e
              //     }}
              //     />
              //   ]
              // }
            }
          }
        }
      ]
    })
    // 获取最大的order
    const getMaxOrder = () => {
      const max = d3.max(getExtensionRootEls(actionElBusinessObject.value, [
        'camunda:ExecutionListener',
        'netwisd:ExecutionListener',
        'camunda:TaskListener',
        'netwisd:TaskListener'
      ]), d => d.order)
      return max < 0 ? -1 : max
    } 

    // 重新遍历赋值order

    const resetOrder = () => {
      events.value.forEach((d, i) => {
        d.order = `${i}`
      })
    }
    // 向上排序
    const upOrder = (n) => {
      // yua
      const t = `${+n.order - 1}`
      const target = events.value.find(d => d.order === t)
      target.order = n.order
      n.order = t
    }

    const downOrder = (n) => {
      const t = `${+n.order + 1}`
      const target = events.value.find(d => d.order === t)
      target.order = n.order
      n.order = t
    }
    return {
      props,
      eventModalRef,
      gridSelectedRef,
      gridSelectedOption,
      gridSelectedEvent,
      gridParamterRef,
      gridParamterOption,
      isDefaultEvent,
      InterfacesCallback(p) {
        let serviceId = currentEventParamter.value.find(d => d.name === 'serviceId')
        if(serviceId) {

          // row.expreParamValue = d.sysCode
          // const bizTag = paramList.value.find(d => d.paramName === 'bizTag')
          // if (bizTag) {
          //     bizTag.expreParamValue = d.mthPath.split('/').pop()
          // }

          if(serviceId.expression === undefined) {
            serviceId.string = p.sysCode
          } else {
            serviceId.expression = p.sysCode
          }
        }
        let bizTag = currentEventParamter.value.find(d => d.name === 'bizTag')

        const _bizTag = p.mthPath.split('/').pop()
        if(bizTag) {
          if(bizTag.expression === undefined) {
            bizTag.string = _bizTag
          } else {
            bizTag.expression = _bizTag
          }
        }
        currentEvent.value.openApiPath = p.mthPath
        currentEvent.value.openApiMthDes = p.mthDescription
        
      },
      handleModalShow () {
        console.log('====events=======', events)
        // eventModalRef.value.show(events.value.map(d => d.eventId))
        eventModalRef.value.show(getNodeEventTypes(actionElBusinessObject.value))
      },
      // 弹窗选择完成
      handleModalComplete (v) {
        // 过滤掉所有事件
        const values = actionElBusinessObject.value.extensionElements.values
        // 清除所有事件
        // let delCount = -1
        // while (values.find((d, i) => {
        //   const f = ['ExecutionListener', 'TaskListener'].includes(d.$type.split(':')[1])
        //   if (f) { delCount = i }
        //   return f
        // })) {
        //   values.splice(delCount, 1)
        // }
        values.push(createEventEl(v, `${1 + +getMaxOrder()}`))

        if (currentEvent.value) {
          
          // currentEvent.value = values.find(d => d.eventId === currentEvent.value.eventId)
          currentEvent.value = values.find(d => d.order === currentEvent.value.order)
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
            // const r = d.eventId === currentEvent.value.eventId
            const r = d.order === currentEvent.value.order
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
    position: relative;
    .action-order {
      position: absolute;
      right: 28px;
      height: 100%;
      color:#ccc;
      .action-order-up {
        position: absolute;
        top: 2px;
        border-radius: 2px;
        padding: 0 2px;
      }
      .action-order-up:hover {
        background: #4caf50;
        cursor: pointer;
        color: #fff;
      }
      .action-order-down {
        position: absolute;
        bottom: 2px;
        border-radius: 2px;
        padding: 0 2px;
      }
      .action-order-down:hover {
        background: #4caf50;
        cursor: pointer;
        color: #fff;
      }
    }
    
    .action-remove {

      position: absolute;
      right: 0px
    }
    
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