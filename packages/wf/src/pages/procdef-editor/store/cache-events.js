import { ref, computed } from 'vue'
import {
    queryEvents,
    queryAllEvents
} from '../api/index'

import {
    createElement,
    getExtensionRootEls
} from '../util/index'

import {
    actionElBusinessObject
} from "./bpmn"

import { get } from 'lodash'
// 事件缓存
// 默认流程事件
export const processDefEvents = ref([])
// 默认用户节点事件
export const userTaskDefEvents = ref([])

// 所有事件
export const events = ref([])

// 查询事件
export const loadEvents = () => queryAllEvents({
    page: {
        current: 1,
        size: 999
    }
  }).then(res => {
    events.value = res.sort((a,b) => a.sort - b.sort)
    // processDefEvents.value = res.records.filter(d => d.selectSign && (d.nodeEventType === 0 || d.nodeEventType === 8))
    console.log('======queryEvents=====', res)
}).catch(err => {
    events.value = []
})
// 获取事件
export const getEventsByNodeEventType = (types = []) => {
    return events.value.filter(d => types.includes(d.nodeEventType))
}
// 当前节点可用事件
export const getDefaultEventsByNode = node => {
    const et = elType[node.$type]
    if (et && et.value) {
        console.log('default event====', events.value.filter(d => et.value.includes(d.nodeEventType)))
    }
    
    
}
// 给节点写入默认事件
export const writeDefaultEvents = node => {
    const et = elType[node.$type]
    // 规则中查询需要的事件节点类型
    if (et && et.value) {
        const eventdefs = events.value.filter(d => (d.selectSign === 1 && et.value.includes(d.nodeEventType)))
        const bmpnEvents = createEventEls(eventdefs)
        if (!node.extensionElements.values) node.extensionElements.values = []
        node.extensionElements.values.push(...bmpnEvents)
    }
}
// 特殊默认事件写入 userTask 会签
export const writeUserTaskDefaultEvents = node => {
    // 判断会签
    let et;
    if (!!get(node, 'loopCharacteristics', false)) {
        // 会签
        // 'bpmn:UserTask-multiple'
        et = elType['bpmn:UserTask-multiple']

    } else {
        et = elType['bpmn:UserTask']
    }
    const eventdefs = events.value.filter(d => (d.selectSign === 1 && et.value.includes(d.nodeEventType)))
    const bmpnEvents = createEventEls(eventdefs)
    if (!node.extensionElements.values) node.extensionElements.values = []
    node.extensionElements.values.push(...bmpnEvents)
}
// 根据bpmn节点获取 对应的事件模型类型（多个）
export const getNodeEventTypes = node => {
    const et = elType[node.$type]
    // 规则中查询需要的事件节点类型
    if (et && et.value) {
        return et.value
    } else {
        return []
    }
}
// 过滤
export const filterEvents = (node, eventList) => {
    const et = elType[node.$type]
    // 规则中查询需要的事件节点类型
    if (et && et.value) {
        return eventList.filter(d => et.value.includes(d.nodeEventType))
    } else {
        return []
    }

}

// 创建单独事件

export const createEventEl = (event = {}, order = '0') => {
    const {
        id,
        eventType,
        listenerId,
        listenerName,
        listenerType,
        wfEventParamList = [],
        listenerImpl,
        defaultTrigVal,
        selectMust
    } = event
    const ns = [
        'revoke',
        'rejected',
        'before_complete',
        'suspend_process',
        'end_process',
        'activate_process',
        'delete_process'
    ].includes(defaultTrigVal) ? 'netwisd' : 'camunda' // 命名空间 netwisd camunda
    
    const tagName = eventType === 1 ? 'ExecutionListener' : 'TaskListener' // ExecutionListener TaskListener
    return createElement(`${ns}:${tagName}`, {
        fields:  (wfEventParamList || []).map(({
            id,
            paramName,
            paramType,
            paramId,
            paramDefalutValue,
            isPullDown
        }) => createElement(`${ns}:Field`, {
            name: paramId,
            id,
            paramName,
            [`${paramType}`]: paramDefalutValue || '',
            isPullDown
        })),
        class: listenerImpl,
        event: defaultTrigVal,
        eventId: id,
        eventName: listenerName,
        eventSubmitSign: "0",
        listenerId: listenerId,
        listenerType: listenerType,
        listenerImpl: listenerImpl,
        id: listenerId,
        // selectMust
        eventSelectMust: `${selectMust}` || '0',
        order
    })
}
// 批量创建事件节点
export const createEventEls = (eventList) => {
    return eventList.map((event, i) => {
        return createEventEl(event, event.sort || `${i}`)
    })
}
export const createEventElx = (eventList) => {
    return eventList.map(({
        id,
        eventType,
        listenerId,
        listenerName,
        listenerType,
        wfEventParamList = [],
        listenerImpl,
        defaultTrigVal,
        selectMust,
        sort: order,
    }, i) => {
        const ns = [
            'revoke',
            'rejected',
            'before_complete',
            'suspend_process',
            'end_process',
            'activate_process',
            'delete_process'
        ].includes(defaultTrigVal) ? 'netwisd' : 'camunda' // 命名空间 netwisd camunda
        
        const tagName = eventType === 1 ? 'ExecutionListener' : 'TaskListener' // ExecutionListener TaskListener
        return createElement(`${ns}:${tagName}`, {
            fields:  (wfEventParamList || []).map(({
                id,
                paramName,
                paramType,
                paramId,
                paramDefalutValue,
                isPullDown
            }) => createElement(`${ns}:Field`, {
                name: paramId,
                id,
                paramName,
                [`${paramType}`]: paramDefalutValue || '',
                isPullDown
            })),
            class: listenerImpl,
            event: defaultTrigVal,
            eventId: id,
            eventName: listenerName,
            eventSubmitSign: "0",
            listenerId: listenerId,
            listenerType: listenerType,
            listenerImpl: listenerImpl,
            id: listenerId,
            // selectMust
            eventSelectMust: `${selectMust}` || '0',
            order: order || `${i}`
        })
    })
}
// netwisd camunda 事件平行转换
export const transformEvent = (el) => {
    const [ ons, tagName ] = el.$type.split(':')
    const ns = ons === 'netwisd' ? 'camunda' : 'netwisd'

    return createElement(`${ns}:${tagName}`, {
        fields:  (el.fields || []).map(({
            string,
            expression,
            id,
            isPullDown,
            name,
            paramName
        }) => createElement(`${ns}:Field`, {
            string,
            expression,
            id,
            isPullDown,
            name,
            paramName
        })),
        class: el.class,
        event: el.event,
        eventId: el.eventId,
        eventName: el.eventName,
        eventSubmitSign: el.eventSubmitSign,
        listenerId: el.listenerId,
        listenerType: el.listenerType,
        listenerImpl: el.listenerImpl,
        id: el.id,
        // selectMust
        eventSelectMust: el.eventSelectMust,
        order: el.order
    })
}

// 获取根据key获取值
export const getEnumerateByKey = (k) => {
    const item = [...EnumerateTaskListenerEvent, ...EnumerateExecutionListenerEvent].find(d => d.value === k)
    if (item) {
        return item.label
    } else {
        return '-'
    }
}

// 根据标签获取事件类型
export const getEnumerateEvent = (type) => {
    if ([
        'camunda:TaskListener',
        'netwisd:TaskListener'
    ].includes(type)) {
        return EnumerateTaskListenerEvent
    } else {
        return EnumerateExecutionListenerEvent
    }
}

// 获取 todo 消息提醒
// msgSwitch开关获取
const todoEventId = '1522100449434222594'
export const todoMsgSwitch = computed(() => {
    // 1522100449434222594
    const event = actionElBusinessObject.value.extensionElements.values
    .find(d => d.eventId === todoEventId)
    if (!event) { return false }
    const msgSwitch = event.fields.find(d => d.name === 'msgSwitch')
    return msgSwitch.string === 'on'
})
// msgSwitch开关设定
export const setTodoMsgSwitch = (f) => {
    const event = actionElBusinessObject.value.extensionElements.values
    .find(d => d.eventId === todoEventId)
    if (!event) { return }
    const msgSwitch = event.fields.find(d => d.name === 'msgSwitch')
    msgSwitch.string = f ? 'on' : 'off'
    if (!f) {
        setTodoSendType([])
    }
}
// sendType发送方式获取
export const todoSendType = computed(() => {
    const event = actionElBusinessObject.value.extensionElements.values
    .find(d => d.eventId === todoEventId)
    if (!event) { return [] }
    const msgSwitch = event.fields.find(d => d.name === 'sendType')
    return msgSwitch.string ? msgSwitch.string.split(',') : []
})
// sendType 发送方式设定
export const setTodoSendType = (f) => {
    const event = actionElBusinessObject.value.extensionElements.values
    .find(d => d.eventId === todoEventId)
    if (!event) { return }
    const msgSwitch = event.fields.find(d => d.name === 'sendType')
    msgSwitch.string = f.join(',')
    // 判断msgSwitch 是否有值
    if (msgSwitch.string) {
        // 
        setTodoMsgSwitch(true)
    } else {
        setTodoMsgSwitch(false)
    }
}

// 获取事件参数
const getEventField = (id, fieldName) => {
    const event = actionElBusinessObject.value.extensionElements.values
    .find(d => d.eventId === id)
    if (!event) { return null }
    const field = event.fields.find(d => d.name === fieldName)
    return field || {}
}

// 获取 apply 消息提醒----------------------
const applyEventId = '1522101216320765953'
// msgSwitch开关获取
export const applyMsgSwitch = computed(() => {
    const event = actionElBusinessObject.value.extensionElements.values
    .find(d => d.eventId === applyEventId)
    if (!event) { return false }
    const msgSwitch = event.fields.find(d => d.name === 'msgSwitch')
    return msgSwitch.string === 'on'
})
// msgSwitch开关设定
export const setApplyMsgSwitch = (f) => {
    const event = actionElBusinessObject.value.extensionElements.values
    .find(d => d.eventId === applyEventId)
    
    if (!event) { return }
    const msgSwitch = event.fields.find(d => d.name === 'msgSwitch')
    msgSwitch.string = f ? 'on' : 'off'
    if (!f) {
        setApplySendType([])
    }
}
// sendType发送方式获取
export const applySendType = computed(() => {
    const event = actionElBusinessObject.value.extensionElements.values
    .find(d => d.eventId === applyEventId)
    if (!event) { return [] }
    const msgSwitch = event.fields.find(d => d.name === 'sendType')
    // const msgSwitch = getEventField(applyEventId, 'msgSwitch')
    return msgSwitch.string ? msgSwitch.string.split(',') : []
})
// sendType 发送方式设定
export const setApplySendType = (f) => {
    const event = actionElBusinessObject.value.extensionElements.values
    .find(d => d.eventId === applyEventId)
    if (!event) { return }
    const msgSwitch = event.fields.find(d => d.name === 'sendType')
    // const msgSwitch = getEventField(applyEventId, 'sendType')
    msgSwitch.string = f.join(',')
    if (msgSwitch.string) {
        // 
        setApplyMsgSwitch(true)
    } else {
        setApplyMsgSwitch(false)
    }
}


// 事件类型
export const EnumerateTaskListenerEvent = [
    // {
    //     value: "",
    //     label: "无"
    // },
    {
        value: "create",
        label: "创建"
    },
    {
        value: "assignment",
        label: "签收"
    },
    {
        value: "revoke",
        label: "撤回"
    },
    {
        value: "rejected",
        label: "被驳回"
    },
    {
        value: "before_complete",
        label: "提交前"
    },
    {
        value: "complete",
        label: "完成"
    },
    {
        value: "delete",
        label: "删除"
    },
    {
        value: "update",
        label: "修改"
    } 
]
export const EnumerateExecutionListenerEvent = [
    // {
    //     value: "",
    //     label: "无"
    // },
    {
        value: "start",
        label: "开始"
    },
    {
        value: "end",
        label: "结束"
    },
    {
        value: "suspend_process",
        label: "流程挂起"
    },
    {
        value: "end_process",
        label: "流程终止"
    },
    {
        value: "activate_process",
        label: "流程激活"
    },
    {
        value: "delete_process",
        label: "流程删除"
    }
]
// 获取根据key获取值
export const getNodeEventTypeByKey = (k) => {
    const item = nodeEventType.find(d => d.value === k)
    if (item) {
        return item.label
    }
    return '-'
}
// 事件流程节点类型
export const nodeEventType = [
    {
        value: '8',
        label: "全部节点类型"
    },
    {
        value: '0',
        label: "流程定义"
    },
    {
        value: '13',
        label: "流程定义-子流程"
    },
    {
        value: '14',
        label: "流程定义-内嵌子流程"
    },
    {
        value: '15',
        label: "流程定义-外嵌流程"
    },
    {
        value: '12',
        label: "用户任务"
    },
    {
        value: '1',
        label: "用户任务-单实例"
    },
    {
        value: '2',
        label: "用户任务-多实例"
    },
    {
        value: '3',
        label: "序列流"
    },
    {
        value: '4',
        label: "开始"
    },
    {
        value: '5',
        label: "结束"
    },
    {
        value: '6',
        label: "子流程"
    },
    {
        value: '7',
        label: "网关"
    }
]

// 事件节点类型映射到node
const elType = {
    // 流程定义
    'bpmn:Process' : {
        value: ['8', '0'],
    },
    // 用户任务
    'bpmn:UserTask': {
        value: ['8', '1', '12'],

    },
    // 单实例
    'bpmn:UserTask-single': {
        value: ['8', '1'],

    },
    // 多实例
    'bpmn:UserTask-multiple': {
        value: ['8', '2', '12'],

    },
    // 序列流
    'bpmn:SequenceFlow': {
        value: ['8', '3'],

    },
    // 开始
    'bpmn:StartEvent': {
        value: ['8', '4'],

    },
    // 结束
    'bpmn:EndEvent': {
        value: ['8', '5'],

    },
    // 子流程 13,14
    'bpmn:SubProcess': {
        value: ['8', '13', '14'], // 6

    },
    // 子流程
    'bpmn:CallActivity': {
        value: ['8', '13', '15'], // 6

    },
    // 网关
    'bpmn:ExclusiveGateway': {
        value: ['8', '7'],

    },
    // 网关
    // 'bpmn:All': {
    //     value: [8, 8],
    // },
    // 8全部  12用户任务
}