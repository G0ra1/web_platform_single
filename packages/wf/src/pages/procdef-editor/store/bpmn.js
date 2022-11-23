import { ref, watch, reactive } from 'vue'
import { initViewer } from './viewer-design'
import { updateProperties, updateModdleProperties, createElement } from '../util/index'

import { writeDefaultEvents } from './cache-events'
// 当前选定的
// export const actionEl = ref(null)
// export const actionEl = ref()

// export const actionEl = {
//     value: null
// }

// 当前元素的businessObject
export const actionElBusinessObject = ref(null)
watch(actionElBusinessObject, (n, o) => {
    if (n === o) {
        window.__BPMN_ELEMENT_SELECT__ && updateProperties(window.__BPMN_ELEMENT_SELECT__.element, {
            'netwisd:isChange': '1'
        })
    } else {
        window.__BPMN_ELEMENT_SELECT__ && updateProperties(window.__BPMN_ELEMENT_SELECT__.element, {})
    }
    // const name = window.__BPMN_ELEMENT_SELECT__.element.businessObject.name
    // setTimeout(() => updateProperties(window.__BPMN_ELEMENT_SELECT__.element, { name }), 1)
    
    // updateModdleProperties(window.__BPMN_ELEMENT_SELECT__.element, actionElBusinessObject.value, {})
    // 这里加入isChange
    
}, {
    deep: true
})
// 当前元素
export const actionEl = ref({})

export const getActionEl = () => window.__BPMN_ELEMENT_SELECT__
// 导入xml
export const importXML = xml => {
    return window.__BPMN_MODDLE__.importXML(xml)
}

// 获取xml .saveXML({ format: true })
export const getXML = (option = {
    format: true 
}) => window.__BPMN_MODDLE__.saveXML(option)

// 初始化sync
export const init = async () => {
    await initViewer()
    initEventBus()
}
// 获取当前活动的原生businessObject
export const getActionEBO = () => {
    const ebo = window.__BPMN_ELEMENT_SELECT__.element.businessObject
    if (!ebo.extensionElements.values) ebo.extensionElements.values = []
    return ebo
}
// 获取root process节点
export const getRootElement = () => window.__BPMN_MODDLE__.getDefinitions().rootElements[0]

// 获取指定及诶按
export const getElements = (tagNames = []) => {
    if (tagNames.length === 0) {
        return window.__BPMN_MODDLE__.getDefinitions().rootElements[0].flowElements
    } else {
        return window.__BPMN_MODDLE__.getDefinitions().rootElements[0].flowElements.filter(d => tagNames.includes(d.$type))
    }
}
// 更新元素
export const updateActionElProperties = props => {
    updateProperties(window.__BPMN_ELEMENT_SELECT__.element, props)
}
// 初始化事件
export const initEventBus = () => {
    const eventBus = window.__BPMN_MODDLE__.get('eventBus');
    console.log('eventBus', eventBus);
    eventBus.on('hand.end', (...e) => {
        // 删除链接
        console.log('hand.end', e)
    })
    eventBus.on('connection.remove', (...e) => {
        // 删除链接
        console.log('删除链接', e)
        actionEl.value = {}
        window.__BPMN_ELEMENT_SELECT__ = null
        // -----新修改businessObject ----
        actionElBusinessObject.value = null
    })
    eventBus.on('shape.remove', (e) => {
        // 删除元素
        console.log('删除元素', e)
        // 越过label
        if (e.element.type !== 'label') {
            actionEl.value = {}
            window.__BPMN_ELEMENT_SELECT__ = null
            // -----新修改businessObject ----
            actionElBusinessObject.value = null
        }
    })
    eventBus.on('element.click', (e) => {
        // 单击元素
        console.log('单击元素', e)
        actionEl.value = {
            id: e.element.id,
            tagName: e.element.type.replace(':', '-')
        }
        window.__BPMN_ELEMENT_SELECT__ = e

        // if (!e.element.businessObject.name) {updateProperties(e.element, { name: 'a' })}
        // -----新修改businessObject ----
        actionElBusinessObject.value = e.element.businessObject
    })
    eventBus.on('element.dblclick', (...e) => {
        // 双击元素
        console.log('双击元素', e)
    })
    eventBus.on('copyPaste.copyElement', 749, (context) => {
        console.log('=====copyPaste.copyElement=====', context)
    })
    eventBus.on('copyPaste.pasteElement', function(context) {

    });
    eventBus.on('shape.added', (e, ...p) => {
        // 添加元素
        console.log('添加元素', e, p)
        if (e.element.type === 'label') {
            return
        }
        // 这里统一处理默认的extensionElements
        if (!e.element.businessObject.extensionElements) {
            e.element.businessObject.extensionElements = createElement('bpmn:ExtensionElements', {
                values: []
            })
        }

        window.__BPMN_ELEMENT_SELECT__ = e
        // -----新修改businessObject ----
        actionElBusinessObject.value = e.element.businessObject

        // __BPMN_XML_INIT_OF_DEFEVENT
        // 
        console.log('=是否已经初始化=',window.__BPMN_XML_INITED)
        if (!window.__BPMN_XML_INITED) {
            // 这里是初始化xml时触发的
            // 判断是否需要对初始xml写入默认事件
            if (window.__BPMN_XML_INIT_OF_DEFEVENT) {
                // 这里处理默认的事件
                writeDefaultEvents(e.element.businessObject)
            }
        } else {
            // 加载完成后 这里是正常添加的节点
            writeDefaultEvents(e.element.businessObject)
        }
    })
    eventBus.on('connection.added', (e) => {
        // 添加链接
        console.log('添加链接', e.element)
        // 
        if (!e.element.businessObject.extensionElements) {
            e.element.businessObject.extensionElements = createElement('bpmn:ExtensionElements', {
                values: [
                    createElement('netwisd:SequExpText', {
                        body: '{"id":"1","name":"root","type":3,"children":[]}'
                    }),
                    createElement('netwisd:Vars', {
                        values: []
                    }),
                ]
            })
        }
        // updateProperties(e.element, { name: '1' })console.log('=是否已经初始化=',window.__BPMN_XML_INITED)
        if (!window.__BPMN_XML_INITED) {
            // 这里是初始化xml时触发的
            // 判断是否需要对初始xml写入默认事件
            if (window.__BPMN_XML_INIT_OF_DEFEVENT) {
                // 这里处理默认的事件
                writeDefaultEvents(e.element.businessObject)
            }
        } else {
            // 加载完成后 这里是正常添加的节点
            writeDefaultEvents(e.element.businessObject)
        }
    })

}

// 对比程序
