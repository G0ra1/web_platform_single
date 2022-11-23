
// 获取某个bpmn节点的一级扩展节点
export const getExtensionRootEl = (ebo, elName) => {
    if (!ebo.extensionElements.values) ebo.extensionElements.values = []
    return ebo.extensionElements.values.find(d => d.$type === elName)
}

// 获取某个bpmn节点的一级扩展节点
export const getExtensionRootEls = (ebo, elName = []) => {
    if (!ebo.extensionElements.values) ebo.extensionElements.values = []
    return ebo.extensionElements.values.filter(d => elName.includes(d.$type))
}
// 删除 扩展根节点

export const delExtensionRootEl = (el, elName) => {}

// 删除 扩展根节点的values

export const delExtensionSonEl = (el, elName) => {}

// 删除 扩展根节点的values

export const addExtensionSonEl = (el, elName, ) => {


}

// 获取BpmnFactory
export const bpmnFactory = () => window.__BPMN_MODDLE__.get('bpmnFactory')

// 创建元素

export const createElement = (tagName, props) => window.__BPMN_MODDLE__.get('bpmnFactory').create(tagName, props)

// 主动更新元素

export const updateProperties = (el, props) => {
    window.__BPMN_MODDLE__.get('modeling').updateProperties(el, props)
}

export const updateModdleProperties = (el, mel, props) => {
    window.__BPMN_MODDLE__.get('modeling').updateModdleProperties(el, mel, props)
}
// 根据id获取元素
export const getElementById = id => __BPMN_MODDLE__.get('elementRegistry').get(id)

// 获取所有
export const getAllElement = () => __BPMN_MODDLE__.get('elementRegistry').getAll()

// 