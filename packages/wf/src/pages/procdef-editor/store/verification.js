import { ref, watch } from 'vue'

// 验证提示
export const visible = ref(false)

export const msg = ref([])

// 类型 文字 处理函数
export const pushMsg = ({
    text,
    icon = 'icon-jinggao',
    fun = () => {}
}) => {
    msg.value.push({
        text,
        icon,
        fun
    })
}

export const validate = () => {
    msg.value = []
    console.log('====检测===',  window.__BPMN_MODDLE__.getDefinitions())

    const bpmnProcess = window.__BPMN_MODDLE__.getDefinitions().rootElements[0]
    // ------验证流程
    if (!bpmnProcess.id) {
        pushMsg({
            text: '流程定义KEY不能为空'
        })
    }
    if (!bpmnProcess.name) {
        pushMsg({
            text: '流程定义名称不能为空'
        })
    }
    if (!bpmnProcess.procdefNameAbbr) {
        pushMsg({
            text: '简称不能为空'
        })
    }
    if (!bpmnProcess.procdefTypeId) {
        pushMsg({
            text: '流程分类未选择'
        })
    }
    if (!bpmnProcess.versionTag) {
        pushMsg({
            text: '流程版本标识不能为空'
        })
    }
    if (!bpmnProcess.icon) {
        pushMsg({
            text: '流程图标未选择'
        })
    }
    // 验证流程表单

    const processForm = bpmnProcess.extensionElements.values.find(d => d.$type === 'netwisd:Form')
    // // 流程内表单检测
    if (processForm) {
        if(!processForm.values || !processForm.values.length) {
            pushMsg({
                text: '流程未选择表单'
            })
        }
    } else {
        // 错误
    }

    // 流程检测事件
    bpmnProcess.extensionElements.values && bpmnProcess.extensionElements.values.filter(i => [
        'camunda:TaskListener',
        'camunda:ExecutionListener',
        'netwisd:TaskListener',
        'netwisd:ExecutionListener'
    ].includes(i.$type)).forEach(l => {
        if (l.listenerId === 'bizListener' || l.listenerId === 'bizDelegate') {
            if (!l.fields.every(e => (e.expression || e.string))) {
                pushMsg({
                    text: `流程中'${l.eventName}'事件未选择参数`
                })
            }
        }
    })
    
    // 节点检测
    bpmnProcess.flowElements.forEach(d => {
        if (d.$type === 'bpmn:UserTask') {
            // 基础属性
            if (!d.name) {
                pushMsg({
                    text: `${d.id}用户节点名称不能为空`
                })
            }
            // 人员表达式
            const humanExps = d.extensionElements.values.find(d => d.$type === 'netwisd:HumanExps')
            if (d.id !== 'firstNode' && (!humanExps || !humanExps.values || !humanExps.values.length)) {
                pushMsg({
                    text: `${d.name}用户节点至少含有一个人员表达式`
                })
            }
            // 表单
            // const forms = d.extensionElements.values.find(d => d.$type === 'netwisd:Forms')
            // if (!forms || !forms.values || !forms.values.length) {
            //     pushMsg({
            //         text: `${d.name}用户节点至少含有一个表单`
            //     })
            // }
        } else if (d.$type === 'bpmn:ExclusiveGateway') {
            if (!d.outgoing || d.outgoing.length < 2) {
                pushMsg({
                    text: `${d.name}网关至少含有两个链接`
                })
            }
            if (d.outgoing) {
                // 排他网关后必须设定表达式
                d.outgoing.forEach(l => {
                    // 这里是否加入默认连接验证
                    // 这里default 默认路由可能不存在
                    if (d.default) {
                        if(l.id !== d.default.id && !l.conditionExpression) {
                            pushMsg({
                                text: `${d.name}网关后的链接必须设置表达式`
                            })
                        }
                    } else {
                        if(!l.conditionExpression) {
                            pushMsg({
                                text: `${d.name}网关后的链接必须设置表达式`
                            })
                        }
                    }
                    
                })
            }
        } else if (d.$type === 'bpmn:CallActivity') {
            if (!d.name) {
                pushMsg({
                    text: `${d.id}外链流程节点名称不能为空`
                })
            }
            // cmdChildLogProcdefId
            if (!d.cmdChildLogProcdefId) {
                pushMsg({
                    text: `${d.name || d.id}外链流程节点未选择流程`
                })
            }
        }
        // 所有组件都需要检测事件
        d.extensionElements.values && d.extensionElements.values.filter(i => [
            'camunda:TaskListener',
            'camunda:ExecutionListener',
            'netwisd:TaskListener',
            'netwisd:ExecutionListener'
        ].includes(i.$type)).forEach(l => {
            if (l.listenerId === 'bizListener' || l.listenerId === 'bizDelegate') {
                if (!l.fields.every(e => (e.expression || e.string))) {
                    pushMsg({
                        text: `${d.name || d.id} 元素中'${l.eventName}'事件未选择参数`
                    })
                }
            }
        })

    })

    // ---最终判断
    if (msg.value.length) {
        visible.value = true
    }

    return !msg.value.length
}

// 使用 __BPMN_MODDLE__.get('eventBus').fire 触发事件
// 检测process

// export const bpmnProcess