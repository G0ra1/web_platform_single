import { ref, watch } from 'vue'
import BpmnModdle from 'bpmn-js/lib/Modeler'; //如果手动引入bpmn-js/lib/Modeler，则具备左侧工具栏，可以编辑流程图
// 功能模块扩展配置
import additionalModules from '../bpmn/modules/index'
// 元素扩展配置
import moddleExtensions from '../bpmn/moddle/index'

export const dom = ref(null)

export const initViewer = async () => {
    await new Promise(resolve => {
        watch(dom, () => {
            resolve()
        })
    })
    window.__BPMN_MODDLE__ = new BpmnModdle({
        // BpmnViewer BpmnModdle
        container: dom.value,
        keyboard: {
            bindTo: window
        },
        // propertiesPanel: {
        //   parent: '#js-properties-panel'
        // },
        additionalModules,
        moddleExtensions
    })
}
